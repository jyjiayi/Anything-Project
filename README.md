## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)

## General info

This web application is a Random Decision Maker, it serves the purpose of selecting an answer
randomly from a list of provided options.

## Technologies

Project is created with:

- React
- Spring Boot

## Setup

To run this project, please follow the instructions in order:

Database (MariaDB)

1. Run the database.sql to create the database
2. Run the schema.sql to create the tables
3. Run the data.sql to insert the sample data

Backend

1. Import the backend folder as a Maven project in an IDE
2. Under src/main/resources/application.properties, change "root" to your own database username in spring.datasource.username=root
3. Under src/main/resources/application.properties, change "root" to your own database password in spring.datasource.password=root
4. Run the project as Spring Boot application

Frontend

1. Open the frontend folder in an IDE
2. Install all the node modules by running npm install
3. Start the project by running npm start# Anything-Project
