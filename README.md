# Pomodoro Task Manager

Цей додаток допомогає користувачам правильно менеджети свій час, працювати з Pomodoro таймером та розставляти собі задачі на день/тиждень/місяць

- [Жива сторінка](https://taskmanager-frontend-omega.vercel.app/)
- [Фронтенд](https://github.com/blavikensbutcher/taskmanager_frontend)
- [Бекенд](https://github.com/blavikensbutcher?tab=repositories)

#### Ключові особливості:

1. Pomodoro Timer. Цей метод використовує таймер для того, щоб розбити роботу на інтервали, які називаються «pomodori» (італійське слово, що означає «помідори») які розділені короткими перервами. (50 хвилин роботи / 10 відпочінку за замовчуванням)

2. Time blocking. Це спосіб розставити собі плани на день і виділити їм стільки часу, скільки потрібно.

3. Tasks. Класичний задачник, де можна додати свої плани на сьогодні, на неділю, наступну неділю чи місяць. Їх можна зручно переміщувати між інтервалами часу і час зміниться самостійно, також можна виставити приорітет наскільки ця задача важлива. Тут є два види списка перелік так Kanban дошка.

## Технології, які використовувалися для створення додатка

### TanStack Query <img src="https://tanstack.com/_build/assets/logo-color-100w-lPbOTx1K.png" width=30>

- це бібліотека для управління асинхронними запитами в React-додатках. Вона забезпечує кешування, синхронізацію стану, фонове оновлення та багато інших функцій для зручного керування даними.

### Nest.js <img src="https://nestjs.com/logo-small-gradient.76616405.svg" width=30>

- це прогресивний фреймворк для Node.js, який використовує TypeScript і забезпечує модульну архітектуру для розробки серверних додатків. Nest.js базується на концепціях та шаблонах, які використовуються в Angular.

### Next.js <img src="https://static-00.iconduck.com/assets.00/next-js-icon-512x512-zuauazrk.png" width=30>

- Фреймворк для React, який дозволяє створювати серверні та клієнтські рендеринг-додатки з мінімальною конфігурацією. Він підтримує статичну генерацію сайтів, серверний рендеринг, API-роути та багато іншого.

### Axios <img src="https://logowik.com/content/uploads/images/axios5736.logowik.com.webp" width=30>

- популярна бібліотека для виконання HTTP-запитів у браузері та Node.js. Вона забезпечує простий API для роботи з запитами та обробкою відповідей, підтримує перехоплення запитів/відповідей і автоматично обробляє JSON-дані.

### Cookie Parser <img src="https://cdn-icons-png.flaticon.com/512/1689/1689340.png" width=30>

- Middleware для Node.js, який дозволяє парсити cookies, отримані з HTTP-запитів. Він допомагає легко працювати з куками у ваших додатках, забезпечуючи зручний доступ до їх значень.

### Lodash <img src="https://static-00.iconduck.com/assets.00/lodash-icon-2048x1864-lr0l3sao.png" width=30>

- це потужна бібліотека для JavaScript, яка надає безліч корисних функцій для роботи з масивами, об'єктами, рядками тощо. Вона допомагає скоротити код і підвищити його читабельність, надаючи зручні методи для виконання поширених операцій.

### Tailwind <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" width=30>

- Утилітарно-орієнтована CSS фреймворк, яка дозволяє швидко створювати адаптивні та стильні інтерфейси без написання користувацького CSS. Вона надає набір класів, які можна комбінувати для створення складних компонентів прямо в HTML.

## Документація доступна за посиланням

 <img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*C_u3RtbZnYzRI10IUWbPfg.png" width=100>

[Docs](https://rest-nestjs.onrender.com/docs)

## Docker compose

`docker-compose run --build` - to run docker container

## The scripts from package.json

`npm run start:dev` - to run server using nodemon

## The structure of the template

**.env.example** - the example of the `.env` file that contains global variables of the service. `.env.example` should be without production data. Should be in GIT;

**.env** - the copied file of `.env.example` && `.env.local.example` with real data of variables. Should be excluded from GIT;

**.gitignore** - patterns of files or folders to ignore checking git changes;

**main.ts** - the file to start the service.

**package.json** - the main file of information, and configuration, and dependencies of the service;

**package-lock.json** - the file from `package.json` that contains all information about all node modules that were installed like dependencies and
devDependencies;

# EN

# Pomodoro Task Manager

This app helps users manage their time effectively with a Pomodoro timer and organize tasks for daily, weekly, and monthly planning.

- [Live Page](https://taskmanager-frontend-omega.vercel.app/)
- [Frontend](https://github.com/blavikensbutcher/taskmanager_frontend)
- [Backend](https://github.com/blavikensbutcher?tab=repositories)

#### Key Features:

1. **Pomodoro Timer**: This method uses a timer to break work into intervals called "pomodori" (Italian word meaning "tomatoes") which are separated by short breaks. (50 minutes of work / 10 minutes of rest by default)

2. **Time Blocking**: A way to plan your day and allocate as much time as needed for each task.

3. **Tasks**: A classic task manager where you can add your plans for today, the week, the next week, or the month. Tasks can be easily moved between time intervals, and the time will adjust automatically. You can also set the priority of each task. There are two types of lists: a checklist and a Kanban board.

## Technologies Used to Create the App

### TanStack Query <img src="https://tanstack.com/_build/assets/logo-color-100w-lPbOTx1K.png" width=30>

- A library for managing asynchronous queries in React applications. It provides caching, state synchronization, background updates, and many other features for convenient data management.

### Nest.js <img src="https://nestjs.com/logo-small-gradient.76616405.svg" width=30>

- A progressive Node.js framework that uses TypeScript and provides a modular architecture for developing server-side applications. Nest.js is based on concepts and patterns used in Angular.

### Next.js <img src="https://static-00.iconduck.com/assets.00/next-js-icon-512x512-zuauazrk.png" width=30>

- A framework for React that allows creating server-side and client-side rendered applications with minimal configuration. It supports static site generation, server-side rendering, API routes, and more.

### Axios <img src="https://logowik.com/content/uploads/images/axios5736.logowik.com.webp" width=30>

- A popular library for making HTTP requests in the browser and Node.js. It provides a simple API for working with requests and responses, supports request/response interception, and automatically handles JSON data.

### Cookie Parser <img src="https://cdn-icons-png.flaticon.com/512/1689/1689340.png" width=30>

- Middleware for Node.js that parses cookies received from HTTP requests. It helps to easily work with cookies in your applications, providing convenient access to their values.

### Lodash <img src="https://static-00.iconduck.com/assets.00/lodash-icon-2048x1864-lr0l3sao.png" width=30>

- A powerful JavaScript library that provides many useful functions for working with arrays, objects, strings, etc. It helps to reduce code and improve its readability by providing convenient methods for performing common operations.

### Tailwind <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" width=30>

- A utility-first CSS framework that allows you to quickly create responsive and stylish interfaces without writing custom CSS. It provides a set of classes that can be combined to create complex components directly in HTML.

## Documentation Available Here

<img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*C_u3RtbZnYzRI10IUWbPfg.png" width=100>

[Docs](https://rest-nestjs.onrender.com/docs)
