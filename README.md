# TIC2601-project

The frontend is in client folder and backend is in server folder.
They are separate apps that needs to be installed and run individually.

Frontend is using [nextjs](https://nextjs.org/). Basically React. And backend is the standard nodejs + express + mysql.

## Installation

### Backend

For the backend to work, you need to create the relevant SQL database too.
Assuming you already have MySQL in your machine.

cd into the server folder and install the application's dependencies.

```bash
cd server
npm install
```

cd into the server/db folder and execute the sql commands in order

1. createDB.sql (Create the database)
2. createTable.sql (Create the table/s)

Many ways to do this. I did it by

```bash
cd server/db
mysql
source createDB.sql
source createTable.sql
```

seed table by executing the script seed.js by

```bash
node seed.js
```

For the app to connect to the database in your local machine, you need to configure some parameters in the .env file, you can see .env.example for an example. Basically add your database user and password values into .env.

After successful installation, you should be able to run the app with 'npm run dev' and access the app at [localhost:8081](http://localhost:8081/).

```bash
npm run dev
```

### Frontend

The frontend package manager is yarn as opposed to npm (which we used in the backend), you might need to install [yarn](https://yarnpkg.com/getting-started/install) in your machine.

```bash
npm install -g yarn
```

cd into the client folder and install the application's dependencies.

```bash
cd client
yarn install
```

After successful installation, you should be able to run the app with 'yarn dev' and access the app at [localhost:3000](http://localhost:3000/).

```bash
yarn dev
```

## Usage

To see the whole thing working together, you need to start both applications concurrently and the frontend should be able to retrieve 'users' data, at page [/users](http://localhost:3000/users) from your backend.

Start backend

```bash
cd server
npm run dev
```

Start frontend

```bash
cd client
yarn dev
```

Go to [localhost:3000](http://localhost:3000/) and you should see everything working.
