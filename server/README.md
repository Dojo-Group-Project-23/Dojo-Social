# Users

## Register
> localhost:8000/register (POST)

### Model Form
#### firstName => Validations: Required
#### lastName => Validations: Required
#### email => Validations: Required, Valid Email
#### username => Validations: Required, Min Length 3
#### imgURL => Validations: None
#### password => Validations: Required, Min Length 8
#### confirmPassword => Validations: Required, Must Mact Password

### Successful Registration
```JSON
{
    "msg": "success",
    "user": {
        "firstName": "Phil",
        "lastName": "Mckracken",
        "email": "pm@mail.com",
        "username": "phil",
        "imgURL": "",
        "password": "$2b$10$0v1YM8T2lEt51oBtkEkYRe4TkObbxEIUILnsuqzU.Xqcmo6lpDYwe",
        "_id": "63d4874734c770debf1e2462",
        "createdAt": "2023-01-28T02:24:07.843Z",
        "updatedAt": "2023-01-28T02:24:07.843Z",
        "__v": 0
    }
}
```
### Failed Validation Examples
```JSON
{
    "errors": {
        "firstName": {
            "name": "ValidatorError",
            "message": "First name is required",
            "properties": {
                "message": "First name is required",
                "type": "required",
                "path": "firstName",
                "value": ""
            },
            "kind": "required",
            "path": "firstName",
            "value": ""
        },
        "lastName": {
            "name": "ValidatorError",
            "message": "Last name is required",
            "properties": {
                "message": "Last name is required",
                "type": "required",
                "path": "lastName",
                "value": ""
            },
            "kind": "required",
            "path": "lastName",
            "value": ""
        },
        "email": {
            "name": "ValidatorError",
            "message": "Please enter a valid email",
            "properties": {
                "message": "Please enter a valid email",
                "type": "user defined",
                "path": "email",
                "value": "pm"
            },
            "kind": "user defined",
            "path": "email",
            "value": "pm"
        },
        "username": {
            "name": "ValidatorError",
            "message": "Username must be 3 characters or longer",
            "properties": {
                "message": "Username must be 3 characters or longer",
                "type": "minlength",
                "minlength": 3,
                "path": "username",
                "value": "ph"
            },
            "kind": "minlength",
            "path": "username",
            "value": "ph"
        }
    },
    "_message": "User validation failed",
    "name": "ValidationError",
    "message": "User validation failed: firstName: First name is required, lastName: Last name is required, email: Please enter a valid email, username: Username must be 3 characters or longer"
}
```




## Fetch All Users
> localhost:8000/api/users (GET)
### User logged in, sucessful request
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
### User not logged in ** For all routes except login, logout, register **
```JSON
{
    "verfied": false
}
```