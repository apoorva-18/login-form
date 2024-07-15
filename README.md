# login-form
# Express API

## Setting Up the Database

1. Make sure you have PostgreSQL installed and running.
2. Run the following command to create the database and tables:
3. ```sh
psql -U your-username -d your-database -a -f db/init_db.sql

project-structure should be like this-
.
├── db
│   └── init_db.sql
├── public
│   ├── index.html
│   ├── login.html
│   └── register.html
├── .gitignore
├── app.js
├── package.json
└── README.md

# Running the application
npm install // for installing dependencies
npm start   //run the application
The application should be running on #http://localhost:3000.
