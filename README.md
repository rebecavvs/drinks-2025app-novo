DRINKS-2025APP-NOVO: Aplicativo Mobile - Gerenciamento de Drinks

Este documento apresenta o projeto DRINKS-2025APP-NOVO, um aplicativo mobile desenvolvido utilizando React Native. A aplicação integra Firebase para funcionalidades de autenticação e persistência de dados do usuário, e consome a API pública TheCocktailDB para exibir uma vasta gama de informações sobre drinks. O design e a experiência do usuário foram cuidadosamente elaborados com base no protótipo fornecido no Figma.

Sumário

- Visão Geral das Funcionalidades
- Requisitos Técnicos Atendidos
- Estrutura do Projeto
- Instalação e Execução
- Configuração do Firebase
- Protótipo Figma
- Considerações Finais

Visão Geral das Funcionalidades

O aplicativo oferece as seguintes funcionalidades principais:

- Autenticação de Usuário: Sistema completo de Login e Registro com e-mail e senha, utilizando Firebase Authentication.
- Gestão de Perfil: Os usuários podem visualizar e (opcionalmente) atualizar seus dados de perfil, persistidos no Firebase Firestore.
- Listagem de Drinks: Exibição de uma lista dinâmica de drinks obtidos da API TheCocktailDB.
- Detalhes do Drink: Ao selecionar um drink, é possível visualizar informações detalhadas como ingredientes, medidas e instruções de preparo.
- Navegação Intuitiva: Implementação de navegação em pilha (Stack Navigation) para fluxos sequenciais e navegação lateral (Drawer Navigation) para acesso rápido às principais seções do aplicativo (Início, Perfil).
- Feedback Visual: Utilização de indicadores de carregamento para informar o usuário sobre o status de operações assíncronas (ex: busca de dados, autenticação).

Requisitos Técnicos Atendidos

Este projeto demonstra a aplicação dos seguintes requisitos técnicos:

- React Hooks: Utilização extensiva de useState e useEffect para gerenciamento de estado e efeitos colaterais em componentes funcionais. Inclusão de custom hooks (useAuth, useFirestore) para abstrair lógicas complexas e promover reusabilidade.
- React Navigation: Implementação de navegação entre 3+ telas principais (LoginScreen, DashboardScreen, DetailScreen, ProfileScreen). Configuração de Stack Navigation e Drawer Navigation.
- Estado de Carregamento: Gerenciamento do estado de loading para exibir ActivityIndicator durante a busca de dados de APIs e Firebase.
- Telas de Navegação:
    - Login/Registro: `LoginScreen.js`
    - Dashboard (Principal): `DashboardScreen.js`
    - Detalhes: `DetailScreen.js`
    - Perfil: `ProfileScreen.js`
- Integração com API Externa: Consumo da API TheCocktailDB para obter e exibir dados de drinks.
- Firebase:
    - Authentication: Utilização para login e registro de usuários.
    - Firestore: Armazenamento e recuperação de dados de perfil do usuário.
    - Persistência do estado de autenticação.
- Drawer Navigation: Menu lateral configurado com opções de navegação e funcionalidade de logout.

Estrutura do Projeto

A organização do código segue a seguinte estrutura:

DRINKS-2025APP-NOVO/
├── src/
│   ├── components/       # Componentes de UI reutilizáveis (ex: LoadingSpinner, DrawerContent)
│   ├── screens/          # Telas principais do aplicativo (ex: LoginScreen, DashboardScreen)
│   ├── navigation/       # Gerenciamento das pilhas e drawers de navegação
│   ├── services/         # Funções de interação com Firebase e APIs externas
│   ├── hooks/            # Custom React Hooks para lógica reusável
│   └── App.js            # Componente raiz do aplicativo
├── index.js              # Ponto de entrada do React Native
├── package.json          # Metadados do projeto e dependências
└── README.md             # Este arquivo

FIGMA PROTÓTIPO: https://www.figma.com/design/UbOJ16mBNlitOU6L1knmVf/App-Navega%C3%A7%C3%A3o-%E2%80%93-Prot%C3%B3tipo?node-id=5-18&p=f&t=BBELkvPyU4or4GGv-0
