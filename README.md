<p align="center">
  <img src="src/assets/logo-todotask.png" alt="ToDoTask" width="320" />
</p>

<h1 align="center">ToDoTask — organização para uma rotina mais leve</h1>

<p align="center">
  Aplicação de gerenciamento de tarefas construída com React e Firebase, com autenticação, persistência de dados e interface responsiva em temas claro e escuro.
</p>

<p align="center">
  <a href="https://todo-app-1ee79.web.app"><strong>Acessar a aplicação</strong></a>
  ·
  <a href="#decisões-técnicas">Decisões técnicas</a>
  ·
  <a href="#executar-localmente">Executar localmente</a>
  ·
  <a href="https://github.com/alanasilva88">Perfil da desenvolvedora</a>
</p>

## Sobre o projeto

O ToDoTask reúne tarefas de trabalho, estudos e projetos pessoais em um único espaço. O usuário pode registrar o que precisa fazer, definir uma data, categorizar atividades e acompanhar o progresso de conclusão.

O projeto demonstra a integração de uma interface React com serviços de autenticação e banco de dados, além de organização de componentes, tratamento de operações assíncronas e publicação de uma SPA no Firebase Hosting.

## Experimente em poucos passos

1. Acesse **[todo-app-1ee79.web.app](https://todo-app-1ee79.web.app)**.
2. Crie uma conta com e-mail e senha ou entre com Google.
3. Adicione uma tarefa, escolha uma categoria e, se desejar, uma data.
4. Edite a tarefa para marcá-la como concluída e veja o resumo de progresso.
5. Explore a busca, os filtros e o seletor de tema no cabeçalho.

Não é necessário instalar o projeto para conhecer a interface. O gerenciamento de tarefas exige autenticação.

## Funcionalidades

| Área           | Recursos implementados                                                                      |
| -------------- | ------------------------------------------------------------------------------------------- |
| Autenticação   | Cadastro, login por e-mail/senha, login com Google e logout                                 |
| Tarefas        | Criação, leitura, edição, exclusão e marcação de conclusão pela edição                      |
| Organização    | Categorias, datas opcionais, busca por título ou descrição e filtros por status e categoria |
| Acompanhamento | Contadores de tarefas, pendências, conclusões e percentual de progresso                     |
| Interface      | Layout responsivo, menu para celular, estados vazios, carregamento e mensagens de erro      |
| Preferências   | Temas claro e escuro, preferência inicial do sistema e escolha persistida no navegador      |
| Formulários    | Validação de campos, exibição de senha e bloqueio durante o envio                           |

## Tecnologias

| Tecnologia                           | Aplicação no projeto                                        |
| ------------------------------------ | ----------------------------------------------------------- |
| **React 18 + JavaScript**            | Componentes, estado e ciclo de vida da interface            |
| **Vite**                             | Desenvolvimento local e build de produção                   |
| **React Router**                     | Navegação entre páginas e rotas de edição com parâmetro     |
| **React Hook Form**                  | Gerenciamento e validação de formulários                    |
| **Firebase Authentication**          | Autenticação com senha e Google                             |
| **Cloud Firestore**                  | Persistência das tarefas vinculadas ao usuário              |
| **CSS + Tailwind CSS**               | Estilos, responsividade e temas                             |
| **Lucide React + React Hot Toast**   | Ícones e notificações de operações                          |
| **ESLint + Prettier + EditorConfig** | Verificação de código e padronização de formatação          |
| **Firebase Hosting**                 | Publicação da aplicação e redirecionamento das rotas da SPA |

## Decisões técnicas

### Separação entre interface e acesso aos dados

As páginas ficam em `src/pages`, enquanto a comunicação com o Firebase está concentrada em `src/firebase`. Isso mantém as chamadas de autenticação e persistência fora da apresentação dos formulários.

Os componentes `AuthForm` e `TarefaForm` são compartilhados, respectivamente, pelos fluxos de login/cadastro e criação/edição. Essa estrutura reduz duplicação e mantém validações e estilos consistentes entre as páginas.

### Estado de autenticação compartilhado

O `UsuarioContext` disponibiliza o usuário autenticado para os componentes. A aplicação aguarda a verificação inicial do Firebase antes de renderizar as rotas, e as telas de tarefas redirecionam visitantes sem sessão para o login.

### Propriedade das tarefas

Cada documento é associado ao `idUsuario`. O serviço filtra a listagem pelo usuário autenticado, verifica a propriedade antes de ler, editar ou excluir uma tarefa e restringe os campos enviados na atualização.

O arquivo [`firestore.rules`](firestore.rules) define autorização por proprietário e validação dos dados no banco. **As verificações do cliente complementam essas regras; não as substituem.** As regras precisam estar publicadas no projeto Firebase utilizado.

### Operações assíncronas e feedback

Os fluxos apresentam estados de carregamento e falha, opções de nova tentativa e notificações de sucesso ou erro. Os efeitos de consulta ignoram respostas quando deixam de estar ativos, e a assinatura de autenticação é cancelada na limpeza do efeito.

### Tema persistente

O tema é aplicado antes da inicialização do React para evitar a troca de fundo durante o carregamento. A preferência é salva no `localStorage` e sincronizada entre abas. Sem escolha salva, a aplicação acompanha a preferência do sistema.

## Estrutura do código

```text
src/
├── assets/         # Identidade visual
├── components/     # Formulários compartilhados, navegação, tema e feedback
├── contexts/       # Usuário autenticado
├── firebase/       # Configuração, autenticação e serviço de tarefas
├── pages/          # Telas associadas às rotas
├── utils/          # Funções auxiliares, como formatação de datas
├── App.jsx         # Rotas e assinatura da autenticação
├── index.css       # Estilos, temas e regras de responsividade
└── main.jsx        # Entrada da aplicação
public/             # Favicon
firestore.rules     # Autorização e validação no Firestore
firebase.json       # Configuração de publicação
```

## Executar localmente

**Pré-requisitos:** Node.js 22 e npm, além de um projeto Firebase com um aplicativo Web registrado.

```bash
git clone https://github.com/alanasilva88/To-Do-React-Firebase.git
cd To-Do-React-Firebase
npm ci
```

Copie `.env.example` para `.env.local` e preencha os valores das configurações do aplicativo Web no Firebase:

```dotenv
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

No console Firebase:

1. Habilite **E-mail/senha** e **Google** no Authentication.
2. Configure o e-mail de suporte do provedor Google e adicione `localhost` aos domínios autorizados.
3. Crie o Cloud Firestore e publique as regras de `firestore.rules`.

Inicie a aplicação:

```bash
npm run dev
```

Abra o endereço informado no terminal. Reinicie o servidor após alterar o ambiente.

O `.env.local` não é versionado. As variáveis `VITE_*` fazem parte do frontend: utilize somente a configuração Web do Firebase, nunca chaves privadas ou credenciais administrativas.

## Qualidade e verificações

```bash
npm run check
```

O comando verifica formatação, executa o ESLint e gera o build de produção. Ele **não executa testes automatizados de comportamento**; ainda não há uma suíte de testes configurada no repositório.

| Comando                | Finalidade                   |
| ---------------------- | ---------------------------- |
| `npm run dev`          | Servidor de desenvolvimento  |
| `npm run build`        | Build de produção em `dist/` |
| `npm run preview`      | Visualização local do build  |
| `npm run lint`         | Análise estática com ESLint  |
| `npm run format`       | Formatação com Prettier      |
| `npm run format:check` | Conferência de formatação    |
| `npm run check`        | Formatação, lint e build     |

Para validar os fluxos manualmente, confira autenticação, CRUD, filtros, datas, persistência de tema e acesso com duas contas diferentes. A abertura direta de uma URL de edição também deve respeitar a propriedade da tarefa.

## Publicação

A aplicação está publicada no **[Firebase Hosting](https://todo-app-1ee79.web.app)**. O servidor entrega a pasta `dist/` e redireciona as rotas para `index.html`.

Para publicar uma cópia em um projeto sob sua administração:

```bash
npx firebase-tools login
npm run check
npx firebase-tools deploy --only hosting --project SEU_PROJECT_ID
```

As regras são publicadas separadamente:

```bash
npx firebase-tools deploy --only firestore:rules --project SEU_PROJECT_ID
```

Use o mesmo projeto configurado no ambiente e autorize o domínio de publicação no Firebase Authentication. O `.firebaserc` deste repositório aponta para o projeto da demonstração; informe seu próprio ID nos comandos. O deploy atual é manual, sem publicação automática por push.

## Próximas evoluções

- Testes de componentes e regras do Firestore com emuladores.
- Pipeline de integração e publicação contínua.
- Divisão de código por rota para reduzir o carregamento inicial.
- Fluxos de recuperação de senha e exclusão de conta.

Esses itens são melhorias planejadas, não funcionalidades disponíveis. A política de privacidade completa e o canal de atendimento também permanecem pendentes de definição.

## Autoria

Desenvolvido por **Alana Silva**.

[GitHub](https://github.com/alanasilva88) · [Aplicação online](https://todo-app-1ee79.web.app)
