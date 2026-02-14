# GitHub Activity Widget

Widget de desktop criado com Electron + TypeScript que exibe o gráfico de atividades do GitHub na sua tela inicial.

## 🚀 Como Usar

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar GitHub Token

Você precisa criar um Personal Access Token do GitHub:

1. Acesse: https://github.com/settings/tokens
2. Clique em "Generate new token" → "Generate new token (classic)"
3. Dê um nome ao token (ex: "Widget Desktop")
4. Selecione o escopo: `read:user`
5. Clique em "Generate token"
6. Copie o token gerado

### 3. Criar arquivo .env

Crie um arquivo `.env` na raiz do projeto (use `.env.example` como modelo):

```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione suas credenciais:

```env
GITHUB_USERNAME=seu-usuario-github
GITHUB_TOKEN=seu-token-aqui

# Posição do widget (opcional)
WIDGET_X=20
WIDGET_Y=20
```

### 4. Executar o Widget

```bash
npm start
```

## 📦 Scripts Disponíveis

- `npm run build` - Compila o TypeScript
- `npm start` - Compila e inicia o widget
- `npm run dev` - Compila e inicia (modo desenvolvimento)
- `npm run watch` - Compila automaticamente ao salvar

## ✨ Funcionalidades

- ✅ Design idêntico ao GitHub (fundo preto com pontos verdes)
- ✅ Aparece na tela inicial (desktop wallpaper layer)
- ✅ Roda em segundo plano de forma leve
- ✅ Transparente e sem bordas
- ✅ Arrastável pela barra superior
- ✅ Tooltips com detalhes das contribuições
- ✅ Configuração via arquivo .env

## 🎨 Níveis de Contribuição

O widget usa as mesmas cores do GitHub:
- Cinza escuro: Nenhuma contribuição
- Verde escuro: Poucas contribuições
- Verde médio: Contribuições moderadas
- Verde claro: Muitas contribuições
- Verde brilhante: Contribuições intensas

## 🔒 Segurança

⚠️ **IMPORTANTE**: Nunca compartilhe seu token do GitHub publicamente. O arquivo `.env` já está no `.gitignore` para proteger suas credenciais.
