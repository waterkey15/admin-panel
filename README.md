# Project Scope

Scope is to code a full-stack application for an admin panel. Only the role "admin" will be able to see to admin-panel and only the role "admin" will be able to delete or edit users. 


## Technologies

- React (used ANTD for UI)
- Node JS (used JOI for API validation, used Axios for sending API requests will use blob)
- MySQL (will use Sequelize ORM)

```bash
pip install foobar
```

## To-Dos
- Adding Role column to database
- Make a create user form in React that excepts database properties
- Make email unique
- Make delete button a toggle button 
- Adding isActive column to database to see if a user can sign in to see the admin-panel

## Prerequisites
- NodeJs installed
- MySQL installed 
- A running database called adminPanel and a table called users that has name, age, mobile, email, password columns

## Running Frontend
```bash
cd admin-panel-frontend
npm install
npm run start
```

## Running Backend
```bash
cd admin-panel-backend
npm install
node index.js
```

