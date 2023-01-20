# Keeper Backend API

## What is this project?

This is a Rest API written in **typescript** with **Express.js**.
This API is used as main backend for Keeper.com

## What is Keeper.com?

[Keeper.com]() a Task managing site. Created to create list of task and manage them easily.

## Pre requisites for this repository

- **Node.js** version **19.1.0** or higher installed in your device
- Basic knowledge of **Typescript** and **Express.js**
  - What is _Middleware_,What is a _Router_
- Understanding of _Hyper Text Transfer Protocol_ (HTTP)
  - Request types like Get, Post, Put, Delete.
- basic understanding of **MongoDB** database

## How to set-up project in your device

Follow steps given below to setup the project

### Clone repository

First, clone this repository to your device.

Run Command below to clone it.

```bash
git clone https://github.com/Arjun259194/Keeper.com-backend.git
```

Then open terminal (this example bash) inside that repository

### Install Dependencies

1. run `npm install ` to install all the dependencies given in `package.json` file.

   ```bash
   npm install
   ```

1. Recommend having typescript install globally in system
   ```bash
   npm install -g typescript
   ```

### Dependencies used in project

| Module name  |             Usage             |
| :----------: | :---------------------------: |
|  Express.js  | node framework for Rest APIs  |
|    bcrypt    |    Used to hash passwords     |
|    colors    | To highlight terminal prints  |
|     cors     | Cross-Origin Resource Sharing |
|    dotenv    |    To access ENV variables    |
|    helmet    |    For safe http responses    |
| jsonwebtoken |   To create and verify JWTs   |
|   mongoose   |    to connect to database     |

### Dependencies used for development

| Module name  |                   Usage                    |
| :----------: | :----------------------------------------: |
| concurrently | Used to run terminal commands concurrently |
|   nodemon    |      to auto restart server on change      |

### Environment variable set up

This project uses 3 environment variables, `PORT`,`MONGO_URL` and `JWT_KEY`

| Environment variable name |                        Use                        |  required   | default in project |
| :-----------------------: | :-----------------------------------------------: | :---------: | :----------------: |
|          `PORT`           |       The post that the server will run on        |     ❌      |        4000        |
|        `MONGO_URL`        | Database url, used to connect to mongoDB database |     ✅      |     no default     |
|         `JWT_KEY`         |     User to create and verify json-web-token      | recommended |   `"topSecret"`    |

_Note: Will recommend adding a secure JWT_KEY ex.`$2b$10$6hgr7fflig98sS95FmLAOu`_

#### Set up Environment variables in your device

1. Add a `.env` file to project to set Environment variables
1. Open the file in your code editor
1. Add These lines to set-up ENV Variables

   ```bash
   PORT="<PORT>"
   MONGO_URL="<DATABASE URL>"
   JWT_KEY="<KEY FOR JWT>"
   ```

4. Save file and you are good to go.

_NOTE:Restart the server after adding `.env` file and don't share your .env file online_

### Commands for project

1. to start project in development
   ```bash
   npm run dev
   ```
1. To build distribution folder for production
   ```bash
   npm run build
   ```
1. To start server in productions
   ```bash
   npm start
   ```
   _NOTE: to understand how these commands work read `package.json` file_
