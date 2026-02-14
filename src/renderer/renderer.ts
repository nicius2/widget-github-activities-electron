interface ContributionDay {
     date: string;
     count: number;
     level: number;
}

interface ContributionWeek {
     days: ContributionDay[];
}

interface Window {
     env: {
          GITHUB_USERNAME: string;
          GITHUB_TOKEN: string;
     };
}

// Read configuration from environment variables exposed by preload
const CONFIG = {
     username: window.env?.GITHUB_USERNAME || '',
     token: window.env?.GITHUB_TOKEN || '',
};

async function fetchGitHubContributions(): Promise<{ contributions: ContributionDay[]; name: string }> {
     const query = `
    query($userName:String!) {
      user(login: $userName) {
        name
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

     try {
          console.log('Making API request to GitHub...');
          console.log('Username:', CONFIG.username);
          console.log('Token (first 10 chars):', CONFIG.token.substring(0, 10) + '...');

          const response = await fetch('https://api.github.com/graphql', {
               method: 'POST',
               headers: {
                    'Authorization': `Bearer ${CONFIG.token}`,
                    'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                    query,
                    variables: { userName: CONFIG.username },
               }),
          });

          console.log('Response status:', response.status);
          const data = await response.json();
          console.log('Response data:', data);

          if (data.errors) {
               console.error('GitHub API Error:', data.errors);
               throw new Error('Erro ao buscar dados do GitHub. Verifique seu token e usuário.');
          }

          const weeks = data.data.user.contributionsCollection.contributionCalendar.weeks;
          const contributions: ContributionDay[] = [];

          weeks.forEach((week: any) => {
               week.contributionDays.forEach((day: any) => {
                    const level = getLevelFromContributionLevel(day.contributionLevel);
                    contributions.push({
                         date: day.date,
                         count: day.contributionCount,
                         level: level,
                    });
               });
          });

          return { contributions, name: data.data.user.name || CONFIG.username };
     } catch (error) {
          console.error('Error fetching contributions:', error);
          throw error;
     }
}

function getLevelFromContributionLevel(contributionLevel: string): number {
     const levels: { [key: string]: number } = {
          'NONE': 0,
          'FIRST_QUARTILE': 1,
          'SECOND_QUARTILE': 2,
          'THIRD_QUARTILE': 3,
          'FOURTH_QUARTILE': 4,
     };
     return levels[contributionLevel] || 0;
}

function renderContributionGraph(contributions: ContributionDay[]): void {
     const graphContainer = document.getElementById('contribution-graph');
     if (!graphContainer) return;

     graphContainer.innerHTML = '';

     // Group contributions by week
     const weeks: ContributionDay[][] = [];
     for (let i = 0; i < contributions.length; i += 7) {
          weeks.push(contributions.slice(i, i + 7));
     }

     weeks.forEach((week) => {
          const weekColumn = document.createElement('div');
          weekColumn.className = 'week-column';

          week.forEach((day) => {
               const dayElement = document.createElement('div');
               dayElement.className = `contribution-day level-${day.level}`;
               dayElement.dataset.date = day.date;
               dayElement.dataset.count = day.count.toString();

               // Add hover event for tooltip
               dayElement.addEventListener('mouseenter', (e) => showTooltip(e, day));
               dayElement.addEventListener('mouseleave', hideTooltip);

               weekColumn.appendChild(dayElement);
          });

          graphContainer.appendChild(weekColumn);
     });

     // Scroll to the end (most recent contributions)
     graphContainer.scrollLeft = graphContainer.scrollWidth;
}

function showTooltip(event: MouseEvent, day: ContributionDay): void {
     const tooltip = document.getElementById('tooltip');
     if (!tooltip) return;

     const formattedDate = new Date(day.date).toLocaleDateString('pt-BR', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
     });

     const contributionText = day.count === 1 ? 'contribuição' : 'contribuições';

     tooltip.innerHTML = `
    <div class="tooltip-date">${formattedDate}</div>
    <div class="tooltip-count">${day.count} ${contributionText}</div>
  `;

     const target = event.target as HTMLElement;
     const rect = target.getBoundingClientRect();

     tooltip.style.left = `${rect.left + rect.width / 2}px`;
     tooltip.style.top = `${rect.top - 50}px`;
     tooltip.style.transform = 'translateX(-50%)';
     tooltip.classList.add('visible');
}

function hideTooltip(): void {
     const tooltip = document.getElementById('tooltip');
     if (tooltip) {
          tooltip.classList.remove('visible');
     }
}

async function init(): Promise<void> {
     const loadingElement = document.getElementById('loading');

     console.log('=== Widget Initialization ===');
     console.log('window.env:', window.env);
     console.log('CONFIG:', CONFIG);

     try {
          if (!CONFIG.token || !CONFIG.username) {
               console.error('Missing credentials!');
               if (loadingElement) {
                    loadingElement.innerHTML = `
          <div style="color: #f85149;">
            ⚠️ Configure seu usuário e token do GitHub<br>
            <span style="font-size: 11px; color: #8b949e;">
              Crie um arquivo .env na raiz do projeto<br>
              Use .env.example como modelo
            </span>
          </div>
        `;
               }
               return;
          }

          console.log('Fetching contributions for user:', CONFIG.username);
          const { contributions, name } = await fetchGitHubContributions();
          console.log('Contributions fetched:', contributions.length);

          // Update title
          const titleElement = document.querySelector('.widget-title');
          if (titleElement) {
               titleElement.textContent = `🌿 Olá, ${name}`;
          }

          renderContributionGraph(contributions);
     } catch (error) {
          console.error('Initialization error:', error);
          if (loadingElement) {
               loadingElement.innerHTML = `
        <div style="color: #f85149;">
          ❌ Erro ao carregar contribuições<br>
          <span style="font-size: 11px; color: #8b949e;">
            ${error instanceof Error ? error.message : 'Erro desconhecido'}
          </span>
        </div>
      `;
          }
     }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
     document.addEventListener('DOMContentLoaded', init);
} else {
     init();
}
