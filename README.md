# ToDoTask

Aplicação para organizar tarefas pessoais, com autenticação Firebase, categorias, busca, filtros e temas claro e escuro.

## Funcionalidades

- Cadastro e login por e-mail/senha ou Google.
- Criação, edição e exclusão de tarefas associadas à conta.
- Categorias, datas opcionais e status de conclusão.
- Busca por título ou descrição, filtros e resumo de progresso.
- Interface responsiva com ícones Lucide.
- Tema inicial baseado no sistema e preferência salva no navegador.

## Tecnologias

React 18, Vite 5, React Router, React Hook Form, Firebase Authentication, Cloud Firestore, React Hot Toast, Lucide React, CSS e Tailwind CSS.

## Executar localmente

Use Node.js 22 LTS e npm.

```bash
npm ci
```

Copie `.env.example` para `.env.local` e preencha os valores do aplicativo Web disponíveis nas configurações do seu projeto Firebase:

```dotenv
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

```bash
npm run dev
```

Abra o endereço informado no terminal. Reinicie o servidor após alterar as variáveis de ambiente.

O arquivo `.env.local` não é versionado. As variáveis `VITE_*` são incluídas no frontend; não coloque credenciais administrativas ou chaves privadas nelas. A autorização de acesso aos dados depende das regras do Firestore.

## Configurar o Firebase

1. Registre um aplicativo Web no seu projeto Firebase.
2. Habilite os provedores **E-mail/senha** e **Google** no Authentication. Configure o e-mail de suporte do provedor Google.
3. Adicione `localhost` e seu domínio de produção aos domínios autorizados no Authentication.
4. Crie o banco Cloud Firestore.
5. Publique o conteúdo de `firestore.rules` na aba de regras do Firestore.

As regras limitam o acesso às tarefas ao proprietário e validam os campos. Documentos antigos fora do formato permitido precisam ser ajustados antes da edição.

## Comandos

| Comando                | Finalidade                                 |
| ---------------------- | ------------------------------------------ |
| `npm run dev`          | Iniciar o servidor de desenvolvimento      |
| `npm run build`        | Gerar a aplicação em `dist/`               |
| `npm run preview`      | Visualizar o build localmente              |
| `npm run lint`         | Verificar código com ESLint                |
| `npm run format`       | Formatar os arquivos com Prettier          |
| `npm run format:check` | Conferir a formatação sem alterar arquivos |
| `npm run check`        | Verificar formatação, lint e build         |

## Estrutura

```text
src/
  assets/       Logo da aplicação
  components/   Navegação, formulários compartilhados, tema e estados de interface
  contexts/     Contexto do usuário autenticado
  firebase/     Inicialização do Firebase e serviços de autenticação e tarefas
  pages/        Páginas associadas às rotas
  utils/        Funções auxiliares de apresentação
  App.jsx       Rotas e assinatura da autenticação
  index.css     Estilos, responsividade e temas
  main.jsx      Entrada da aplicação
public/         Favicon e arquivos públicos
firestore.rules Regras de autorização e validação
firebase.json   Configuração de Hosting e Firestore
```

## Publicação no Firebase

Com a Firebase CLI instalada e autenticada, execute:

```bash
npm run check
firebase deploy --only firestore:rules,hosting --project SEU_PROJECT_ID
```

Substitua `SEU_PROJECT_ID` pelo projeto desejado. O alias em `.firebaserc` veio da configuração original; confira o destino antes de publicar. O Hosting serve `dist/` e redireciona as rotas para `index.html`.

## Validação manual

Ainda não há uma suíte de testes automatizados configurada. Antes de publicar, confira:

- Cadastro, login por senha e Google, e logout.
- Criação, edição, conclusão e exclusão de tarefas.
- Busca, filtros, data vazia e exibição de datas.
- Isolamento entre duas contas, incluindo acesso direto à URL de edição.
- Tema claro/escuro e persistência após recarregar.
- Navegação pelo teclado e interface em telas pequenas.

A página de privacidade descreve o funcionamento atual. A política completa e o canal de atendimento precisam ser definidos pelo responsável pelo serviço.

Desenvolvido por Alana Silva.
