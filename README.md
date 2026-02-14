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

### 3. Editar Configuração

Abra o arquivo `src/renderer/renderer.ts` e altere as linhas 13-14:

```typescript
const CONFIG = {
  username: 'seu-usuario-github', // Seu usuário do GitHub
  token: 'seu-token-aqui',        // Cole seu token aqui
};
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
- ✅ Sempre visível na tela (always-on-top)
- ✅ Transparente e sem bordas
- ✅ Arrastável pela barra superior
- ✅ Tooltips com detalhes das contribuições
- ✅ Atualização automática dos dados

## 🎨 Níveis de Contribuição

O widget usa as mesmas cores do GitHub:
- Cinza escuro: Nenhuma contribuição
- Verde escuro: Poucas contribuições
- Verde médio: Contribuições moderadas
- Verde claro: Muitas contribuições
- Verde brilhante: Contribuições intensas

## 🔒 Segurança

⚠️ **IMPORTANTE**: Nunca compartilhe seu token do GitHub publicamente. Adicione `src/renderer/renderer.ts` ao `.gitignore` se for versionar o código.
