# Kanban

Kanban is an application to write all your task

## RESTful endpoints

### GET /tasks

> Get all task

_URL_

```
http://localhost:3000/tasks
```

_Request Header_

```
access_token
```

_Request Body_

```
not needed
```

_Response (200)_

```
[
    {
        "id": 44,
        "title": "za",
        "category": "Todo",
        "UserId": 1,
        "createdAt": "2020-07-16T15:31:38.381Z",
        "updatedAt": "2020-07-16T15:31:38.381Z"
    }
]
```

_Response (401 - Not Authorized)_

```
{
  "message": "Please login first!"
}
```

### GET /tasks/:id

> Get tasks base on requested id.

_URL_

```
http://localhost:3000/tasks/:id
```

_Request Header_

```
access_token
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "id": 44,
    "title": "za",
    "category": "Todo",
    "UserId": 1,
    "createdAt": "2020-07-16T15:31:38.381Z",
    "updatedAt": "2020-07-16T15:31:38.381Z"
}
```

_Response (401 - Not Authorized)_

```
{
  "message": "Please login first!"
}
```

_Response (404 - Not Found)_

```
{
  "message": "task not found"
}
```

### POST /tasks

> Create new task

_URL_

```
http://localhost:3000/tasks
```

_Request Header_

```
access_token
```

_Request Body_

```
{
    "title": "Learn third API",
    "category": "Todo",
}
```

_Response (201)_

```
{
    "message": "Success add new task!"
}
```

_Response (400 - Bad Request)_

```
{
  "message": "title cannot empty", "category cannot empty", "Wrong format task! Task avalaible: Task, Todo, Done, Completed"
}
```

_Response (401 - Not Authorized)_

```
{
  "message": "Please login first!"
}
```

### PUT /tasks/:id

> Edit tasks . this action only for user who's write the task

_URL_

```
http://localhost:3000/tasks/:id
```

_Request Header_

```
access_token
```

_Request Body_

```
{
    "title": "Learn third API",
    "category": "Todo",
}
```

_Response (200)_

```
[
    1,
    [
        {
            "id": 44,
            "title": "Learning Something new",
            "category": "Todo",
            "UserId": 1,
            "createdAt": "2020-07-16T15:31:38.381Z",
            "updatedAt": "2020-07-17T15:50:41.324Z"
        }
    ]
]
```

_Response (400 - Bad Request)_

```
{
  "message": "title cannot empty", "category cannot empty", "Wrong format task! Task avalaible: Task, Todo, Done, Completed"
}
```

_Response (401 - Not Authorized)_

```
{
  "message": "Please login first!"
}
```

_Response (403 - Forbidden)_

```
{
  "message": "forbidden access"
}
```

### DELETE /todos/:id

> DELETE task . this action only for user who's write the task

_URL_

```
http://localhost:3000/tasks/:id
```

_Request Body_

```
not needed
```

_Request Header_

```
access_token
```

_Response (200)_

```
{
        "message": "success delete task!"
}
```

_Response (401 - Not Authorized)_

```
{
  "message": "Please login first!"
}
```

_Response (403 - Forbidden)_

```
{
  "message": "forbidden access"
}
```

### POST /login

> Login User

_URL_

```
http://localhost:3000/login
```

_Request Header_

```
not needed
```

_Request Body_

```
{
  "email": "halo@mail.com",
  "password": "abcd"
}
```

_Response (200)_

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJiaW1hMTIzQGdtYWlsLmNvbSIsImlhdCI6MTU5NDA0MDIxOX0.4ngkGDY0O8VwYbo1IjNXelY9gH9fa60YoAl_wHziKwo"
}
```

_Response (404 - Not Found)_

```
{
  "message": "Wrong Email/Password"
}
```

_Response (400 - Bad Request)_

```
{
  "message": "this email has been registered", "email cannot empty", "password cannot empty"
}
```

### POST /register

> Register User

_URL_

```
http://localhost:3000/register
```

_Request Header_

```
not needed
```

_Request Body_

```
{
   "email": "budi@mail.com",
  "password": "abcd"
}
```

_Response (201)_

```
{
    "message": "Success add new user with email halo2222s2@mail.com"
}
```

_Response (400 - Bad Request)_

```
{
  "message": "this email has been registered", "email cannot empty", "password cannot empty"
}
```

### POST /googleSignin

> Login User with Google

_Request Header_

```
not needed
```

_Request Body_

```
{
  "id_token": "<token from google>"
}
```

_Response (200)_

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJiaW1hMTIzQGdtYWlsLmNvbSIsImlhdCI6MTU5NDA0MDIxOX0.4ngkGDY0O8VwYbo1IjNXelY9gH9fa60YoAl_wHziKwo"
}
```
