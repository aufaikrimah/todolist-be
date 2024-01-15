
# Todo API Documentation

## Overview

The Todo API allows you to manage your todo list. It provides endpoints for creating, retrieving, updating, and deleting todos. The API is secured using API keys. It is built with Node.js, Express.js and uses a MySQL database. The application is deployed using Railway.

### Base URL: https://api-todolist-byaufa-production.up.railway.app/

### GitHub Repository: https://github.com/aufaikrimah/todolist-be.git



## Instalasi

1. Clone the repository:

   ```bash
   git clone https://github.com/aufaikrimah/todolist-be.git
   ```

2. Navigate to the repository directory:

   ```bash
   cd todolist-be
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Ensure that you have MySQL installed and configure the database connection in the .env and config.json files.

## Running the Server

To start the server, use the following command:

```bash
node app.js
```

or with nodemon:

```bash
nodemon app.js
```

The server will run at http://localhost:3000 by default. You can configure the port in the .env file if needed.


# Endpoint API

Here is a list of available API endpoints:

# User

### 1. REGISTER USER

Registers a new user.

### Request
- Method: POST
- URL: [http://localhost:3000/api/register](http://localhost:3000/api/register)
- Description: Registers a new user with the provided credentials.

**Request Body**
```json
{
  "username": "aufa",
  "password": "1234567"
}
``````

### Response

**Successful Response:**

- **Status:** Created (201)
- **Content-Type:** application/json
```json
{
  "id": 12,
  "username": "aufa",
  "password": "$2b$10$tk4bErUH5agLqyxHg9CCJuXJzWyhSV7dJQIfntPR/9BbPlBsWVl36",
  "updatedAt": "2024-01-14T12:22:18.980Z",
  "createdAt": "2024-01-14T12:22:18.980Z"
}
```


### 2. LOGIN USER
Logs in an existing user.

### Request
- Method: POST
- URL: [http://localhost:3000/api/login](http://localhost:3000/api/login)
- Description: Logs in an existing user with the provided credentials.

**Request Body**
```json
{
  "username": "aufa",
  "password": "1234567"
}
``````

### Response

**Successful Response:**

- **Status:** OK (200)
- **Content-Type:** application/json
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJpYXQiOjE3MDUyMzUyMDEsImV4cCI6MTcwNTIzODgwMX0.3hgs4wMtBycxkxtgh_6DhY77ETXPDeWhMyjHyTKcpmQ"
}
```
You can obtain an authorization token to perform CRUD operations on todos.

**Unauthorized Response:**

- **Status:** Unauthorized (401)
- **Content-Type:** application/json
```json
{
  "message": "Invalid Credentials"
}
```

# Todos

### 1. CREATE TODO

Creates a new todo in the collection.

### Request

- **Method:** POST
- **URL:** [http://localhost:3000/api/new-todos](http://localhost:3000/api/new-todos)
- **Description:** Creates a new todo using the Postman Collection v2 schema format.

**Request Headers**
- Content-Type: application/json
- Authorization: Bearer `<token you obtained during login>`
for example: Bearer`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJpYXQiOjE3MDUyMzUyMDEsImV4cCI6MTcwNTIzODgwMX0.3hgs4wMtBycxkxtgh_6DhY77ETXPDeWhMyjHyTKcpmQ`

**Request Body**
```json
{
  "title": "documentation",
  "description": "make documentation for web service",
  "status": "active"
}
```
### Response

**Successful Response**:

- **Status:** Created (201)
- **Content-Type:** application/json
```json
{
  "id": 11,
  "title": "documentation",
  "description": "make documentation for web service",
  "status": "active",
  "userId": 12,
  "updatedAt": "2024-01-14T12:30:20.204Z",
  "createdAt": "2024-01-14T12:30:20.204Z"
}
```
**Unauthorized Response:**

- **Status:** Unauthorized (401)
- **Content-Type:** application/json
```json
{
  "message": "Authentication Failed"
}
```

### 2. GET ALL TODO

Retrieves all todos in the collection.

### Request

- **Method:** GET
- **URL:** [http://localhost:3000/api/all-todos](http://localhost:3000/api/all-todos)
- **Description:** Gets all todos in the collection.

**Request Headers**
- Authorization: Bearer `<token you obtained during login>`

### Response

**Successful Response:**

- **Status:** OK (200)
- **Content-Type:** application/json
```json
[
    {
        "title": "deploy",
        "description": "deploy web service with cyclic"
    },
    {
        "title": "API",
        "description": "test endpoint api with Postman"
    },
    {
        "title": "documentation",
        "description": "make documentation for web service"
    }
]
```
**Unauthorized Response:**

- **Status:** Unauthorized (401)
- **Content-Type:** application/json
```json
{
  "message": "Authentication Failed"
}
```

### 3. GET TODO

Gets information about a specific todo.

### Request

- **Method:** GET
- **URL:** [http://localhost:3000/api/todo/11](http://localhost:3000/api/todo/11)
- **Description:** Gets information about a specific todo.

**Request Headers**
- Authorization: Bearer `<token you obtained during login>`

### Response

**Successful Response:**

- **Status:** OK (200)
- **Content-Type:** application/json
```json
{
    "id": 11,
    "title": "documentation",
    "description": "make documentation for web service",
    "status": "active",
    "userId": 12,
    "createdAt": "2024-01-14T12:30:20.000Z",
    "updatedAt": "2024-01-14T12:30:20.000Z"
}
```
**Not Found Response:**

- **Status:** Not Found (404)
- **Content-Type:** application/json
```json
{
    "message": "Todo not found"
}
```
**Unauthorized Response:**

- **Status:** Unauthorized (401)
- **Content-Type:** application/json
```json
{
  "message": "Authentication Failed"
}
```

### 4. UPDATE TODO

Updates information about a specific todo.

### Request

- **Method:** PUT
- **URL:** [http://localhost:3000/api/edit-todo/11](http://localhost:3000/api/edit-todo/11)
- **Description:** Updates information about a specific todo.

**Request Headers**
- Content-Type: application/json
- Authorization: Bearer `<token you obtained during login>`

**Request Body**
- Mode: raw
- Raw:
```json
{
    "title": "doc",
    "description": "make web service documentation",
    "status": "active"
}
```

### Response

**Successful Response:**

- **Status:** OK (200)
- **Content-Type:** application/json
```json
{
    "id": 11,
    "title": "doc",
    "description": "make web service documentation",
    "status": "active",
    "userId": 12,
    "createdAt": "2024-01-14T12:38:56.000Z",
    "updatedAt": "2024-01-14T12:54:37.259Z"
}
```
**Not Found Response:**

- **Status:** Not Found (404)
- **Content-Type:** application/json
```json
{
    "message": "Todo not found"
}
```
**Unauthorized Response:**

- **Status:** Unauthorized (401)
- **Content-Type:** application/json
```json
{
  "message": "Authentication Failed"
}
```

### 5. DELETE TODO

### Request

- **Method:** DELETE
- **URL:** [http://localhost:3000/api/delete-todo/5](http://localhost:3000/api/delete-todo/5)
- **Description:** Deletes a specific todo.

**Request Headers**

- Authorization: Bearer `<token you obtained during login>`

### Responses

**Successful Response:**

- **Status:** OK (200)
- **Content-Type:** application/json
```json
{
    "message": "Todo deleted successfully"
}
````
**Not Found Response:**

- **Status:** Not Found (404)
- **Content-Type:** application/json
```json
{
    "message": "Todo not found"
}
```
**Unauthorized Response:**

- **Status:** Unauthorized (401)
- **Content-Type:** application/json
```json
{
  "message": "Authentication Failed"
}
```
### 6. DELETE ALL TODO

### Request

- **Method:** DELETE
- **URL:** [http://localhost:3000/api/remove-todos](http://localhost:3000/api/remove-todos)
- **Description:** Deletes all todos.

**Request Headers**

- Authorization: Bearer `<token you obtained during login>`

### Responses

**Successful Response:**

- **Status:** No Content (204)
- **Content-Type:** application/json
```json
{
    "message": "Todos deleted successfully"
}
```
**Unauthorized Response:**

- **Status:** Unauthorized (401)
- **Content-Type:** application/json
```json
{
  "message": "Authentication Failed"
}
```

## Description

Creates a collection using the Postman Collection v2 schema format. Include a collection object in the request body that contains the following required properties:

- **info** — An object that contains the following properties:
  - **name** — A string value that contains the collection's name.
  - **schema** — A string that contains a URL to the collection's schema. For example, the [https://schema.getpostman.com/collection/v1](https://schema.getpostman.com/collection/v1) URL.
- **item** — An object that contains the HTTP request and response information.
- **request** — An object that contains the collection's request information. For a complete list of values, refer to the `definitions.request` entry in the `collection.json` schema file. If you pass an empty object for this value, the system defaults to an untitled GET request.

**Note:**

For a complete list of available property values for this endpoint, use the following references available in the `collection.json` schema file:
- **info** object — Use the `definitions.info` entry.
- **item** object — Use the `definitions.items` entry.
- For all other possible values, refer to the `collection.json` schema file.
