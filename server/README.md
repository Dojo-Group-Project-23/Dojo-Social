# Dojo-Social
> Developers Guide to project server

## Users
### Register
> http://localhost:8000/register

#### Model Form
##### firstName
Validations: Required
##### lastName
Validations: Required
##### email
Validations: Required, Valid Email
##### username
Validations: Required, Min Length 3
##### imgURL
Validations: None
##### password
Validations: Required, Min Length 8
##### confirmPassword
Validations: Required, Must Mact Password

### Routes and Responses
#### http://localhost:8000/api/users (GET)
> User logged in, sucessful request
```JSON
[
    {
        "_id": "63d47c3a34c770debf1e2452",
        "firstName": "Ben",
        "lastName": "Dover",
        "email": "bdover@mail.com",
        "username": "bdover",
        "imgURL": "https://trade-journal-363.s3.amazonaws.com/866-8-21",
        "password": "$2b$10$ucbPaHOtKqWSwclgOs7Fp./hCqadFS7uUYbxi96KijYyE0F4bq.4y",
        "createdAt": "2023-01-28T01:36:58.320Z",
        "updatedAt": "2023-01-28T01:49:53.979Z",
        "__v": 0
    },
    {
        "_id": "63d4874734c770debf1e2462",
        "firstName": "Phil",
        "lastName": "Mckracken",
        "email": "pm@mail.com",
        "username": "phil",
        "imgURL": "",
        "password": "$2b$10$0v1YM8T2lEt51oBtkEkYRe4TkObbxEIUILnsuqzU.Xqcmo6lpDYwe",
        "createdAt": "2023-01-28T02:24:07.843Z",
        "updatedAt": "2023-01-28T02:24:07.843Z",
        "__v": 0
    }
]
```
> User not logged in ** For all routes except login, logout, register **
```JSON
{
    "verfied": false
}
```