# Users
```console
npm install bcrypt cookie-parser cors dotenv express jsonwebtoken mongoose socket.io
```

```JavaScript
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),//REGEX checks for email format
            message: "Please enter a valid email"
        }
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        minlength: [3, "Username must be 3 characters or longer"]
    },
    imgURL: {
        type: String
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    }
},{timestamps:true})
```
### Register Model Form
- firstName => Validations: Required
- lastName => Validations: Required
- email => Validations: Required, Valid Email
- username => Validations: Required, Min Length 3
- imgURL => Validations: None
- password => Validations: Required, Min Length 8
- confirmPassword => Validations: Required, Must Mact Password

### Edit Model Form
- firstName => Validations: Required
- lastName => Validations: Required
- email => Validations: Required, Valid Email
- username => Validations: Required, Min Length 3
- imgURL => Validations: None
- password => user.password **Don't Allow Edit**

### Login Model Form (Only 1 possible validation message)
- email
- password

## Register
> localhost:8000/register (POST)

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
## Login
> localhost:8000/api/login (POST) email/passowrd
### Login Successful
```JSON
{
    "msg": "success",
    "user": {
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
}
```
### Login Failed
```JSON
{
    "error": "Invalid password/email"
}
```

## Logout
> localhost:8000/api/logot (GET)
```JSON
{
    "msg": "Logged out"
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

### Fetch User By Id
> localhost:8000/api/users/:id (GET)
```JSON
{
    "_id": "63d47c3a34c770debf1e2452",
    "firstName": "Phil",
    "lastName": "Mckracken",
    "email": "pm@mail.com",
    "username": "phil",
    "imgURL": "https://trade-journal-363.s3.amazonaws.com/866-8-21",
    "password": "$2b$10$ucbPaHOtKqWSwclgOs7Fp./hCqadFS7uUYbxi96KijYyE0F4bq.4y",
    "createdAt": "2023-01-28T01:36:58.320Z",
    "updatedAt": "2023-01-28T01:36:58.320Z",
    "__v": 0
}
```

### Update User
> localhost:8000/api/users/:id (PUT)
#### Successful Update
```JSON
{
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
}
```
#### Failed Validations
```JSON
{
    "errors": {
        "password": {
            "name": "ValidatorError",
            "message": "Password must be 8 characters or longer",
            "properties": {
                "message": "Password must be 8 characters or longer",
                "type": "minlength",
                "minlength": 8,
                "path": "password",
                "value": "$2b$"
            },
            "kind": "minlength",
            "path": "password",
            "value": "$2b$"
        },
        "username": {
            "name": "ValidatorError",
            "message": "Username must be 3 characters or longer",
            "properties": {
                "message": "Username must be 3 characters or longer",
                "type": "minlength",
                "minlength": 3,
                "path": "username",
                "value": "dd"
            },
            "kind": "minlength",
            "path": "username",
            "value": "dd"
        },
        "email": {
            "name": "ValidatorError",
            "message": "Please enter a valid email",
            "properties": {
                "message": "Please enter a valid email",
                "type": "user defined",
                "path": "email",
                "value": "rwerw"
            },
            "kind": "user defined",
            "path": "email",
            "value": "rwerw"
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
        }
    },
    "_message": "Validation failed",
    "name": "ValidationError",
    "message": "Validation failed: password: Password must be 8 characters or longer, username: Username must be 3 characters or longer, email: Please enter a valid email, lastName: Last name is required, firstName: First name is required"
}
```

### Delete User
> localhost:8000/api/users/:id (DELETE)
```JSON
{
    "_id": "63d47f8634c770debf1e245c",
    "firstName": "Phil",
    "lastName": "Mckracken",
    "email": "pm@mail.com",
    "username": "phil",
    "imgURL": "https://trade-journal-363.s3.amazonaws.com/866-8-21",
    "password": "$2b$10$3TazuoGMpU3KiRCQ0j471u7sYaSOBObi6y9/DqdK8IdMyRPbcuAFa",
    "createdAt": "2023-01-28T01:51:02.572Z",
    "updatedAt": "2023-01-28T01:51:02.572Z",
    "__v": 0
}
```

### General
#### User not logged in ** For all routes except login, logout, register **
```JSON
{
    "verfied": false
}
```

#### Failed request due to invalid id
> Test for "user.name === 'CastError'"
```JSON
{
    "stringValue": "\"{ _id: '63d47c3a34c770debf1ewqe2452' }\"",
    "valueType": "Object",
    "kind": "ObjectId",
    "value": {
        "_id": "63d47c3a34c770debf1ewqe2452"
    },
    "path": "_id",
    "reason": {},
    "name": "CastError",
    "message": "Cast to ObjectId failed for value \"{ _id: '63d47c3a34c770debf1ewqe2452' }\" (type Object) at path \"_id\" for model \"User\""
}
```








# Posts
```JavaScript
const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId, ref: 'User'
    },
    content: {
        type: String,
        required: [true, "Please ensure to enter some content before posting"],
        minlength: [2, 'We require atleast 2 charactes per post']
    }
}, {timestamps:true})
```

### Create/Edit Model Form
- user => user._id *Store in useContext when signed in*
- content => Validations: Required, min lingth 2

> **Expected Object** => {user:user._id, constent:contentState} *name of state doesn't have to be contentState*

## Create New Post
> localhost:8000/api/posts (POST)

### Successful Submit
```JSON
{
    "user": "63d4874734c770debf1e2462",
    "content": "Can you get all of my posts?",
    "_id": "63d6f13509432c702f41f018",
    "createdAt": "2023-01-29T22:20:37.907Z",
    "updatedAt": "2023-01-29T22:20:37.907Z",
    "__v": 0
}
```
### Failed Validations Example
```JSON
 "errors": {
        "content": {
            "name": "ValidatorError",
            "message": "We require atleast 2 charactes per post",
            "properties": {
                "message": "We require atleast 2 charactes per post",
                "type": "minlength",
                "minlength": 2,
                "path": "content",
                "value": "C"
            },
            "kind": "minlength",
            "path": "content",
            "value": "C"
        }
    },
    "_message": "Post validation failed",
    "name": "ValidationError",
    "message": "Post validation failed: content: We require atleast 2 charactes per post"
```

## Fetch All Posts
> localhost:8000/api/posts (GET)
```JSON
[
    {
        "_id": "63d6f13509432c702f41f018",
        "user": {
            "_id": "63d4874734c770debf1e2462",
            "firstName": "Phil",
            "lastName": "McKracken",
            "email": "phil@mail.com",
            "username": "TheKracken",
            "imgURL": "https://trade-journal-363.s3.amazonaws.com/866-8-21",
            "password": "$2b$10$0v1YM8T2lEt51oBtkEkYRe4TkObbxEIUILnsuqzU.Xqcmo6lpDYwe",
            "createdAt": "2023-01-28T02:24:07.843Z",
            "updatedAt": "2023-01-29T00:58:58.141Z",
            "__v": 0
        },
        "content": "Can you get all of my posts?",
        "createdAt": "2023-01-29T22:20:37.907Z",
        "updatedAt": "2023-01-29T22:20:37.907Z",
        "__v": 0
    },
    {
        "_id": "63d6effdd515b74625420b06",
        "user": {
            "_id": "63d4874734c770debf1e2462",
            "firstName": "Phil",
            "lastName": "McKracken",
            "email": "phil@mail.com",
            "username": "TheKracken",
            "imgURL": "https://trade-journal-363.s3.amazonaws.com/866-8-21",
            "password": "$2b$10$0v1YM8T2lEt51oBtkEkYRe4TkObbxEIUILnsuqzU.Xqcmo6lpDYwe",
            "createdAt": "2023-01-28T02:24:07.843Z",
            "updatedAt": "2023-01-29T00:58:58.141Z",
            "__v": 0
        },
        "content": "Hello World",
        "createdAt": "2023-01-29T22:15:25.131Z",
        "updatedAt": "2023-01-29T22:15:25.131Z",
        "__v": 0
    },
    {
        "_id": "63d6ef1c22d1465af201bf41",
        "user": {
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
        "content": "My name is Dr. Dover",
        "createdAt": "2023-01-29T22:11:40.375Z",
        "updatedAt": "2023-01-29T22:30:06.984Z",
        "__v": 0
    }
]
```
## Fetch Post By Post ID
> localhost:8000/api/posts/:postId (GET)
```JSON
[
    {
        "_id": "63d6ef1c22d1465af201bf41",
        "user": {
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
        "content": "My name is Dr. Dover",
        "createdAt": "2023-01-29T22:11:40.375Z",
        "updatedAt": "2023-01-29T22:30:06.984Z",
        "__v": 0
    }
]
```
## Fetch Posts By User Id
> localhost:8000/api/posts/user/:userId (GET)
```JSON
[
    {
        "_id": "63d6f13509432c702f41f018",
        "user": {
            "_id": "63d4874734c770debf1e2462",
            "firstName": "Phil",
            "lastName": "McKracken",
            "email": "phil@mail.com",
            "username": "TheKracken",
            "imgURL": "https://trade-journal-363.s3.amazonaws.com/866-8-21",
            "password": "$2b$10$0v1YM8T2lEt51oBtkEkYRe4TkObbxEIUILnsuqzU.Xqcmo6lpDYwe",
            "createdAt": "2023-01-28T02:24:07.843Z",
            "updatedAt": "2023-01-29T00:58:58.141Z",
            "__v": 0
        },
        "content": "Can you get all of my posts?",
        "createdAt": "2023-01-29T22:20:37.907Z",
        "updatedAt": "2023-01-29T22:20:37.907Z",
        "__v": 0
    },
    {
        "_id": "63d6effdd515b74625420b06",
        "user": {
            "_id": "63d4874734c770debf1e2462",
            "firstName": "Phil",
            "lastName": "McKracken",
            "email": "phil@mail.com",
            "username": "TheKracken",
            "imgURL": "https://trade-journal-363.s3.amazonaws.com/866-8-21",
            "password": "$2b$10$0v1YM8T2lEt51oBtkEkYRe4TkObbxEIUILnsuqzU.Xqcmo6lpDYwe",
            "createdAt": "2023-01-28T02:24:07.843Z",
            "updatedAt": "2023-01-29T00:58:58.141Z",
            "__v": 0
        },
        "content": "Hello World",
        "createdAt": "2023-01-29T22:15:25.131Z",
        "updatedAt": "2023-01-29T22:15:25.131Z",
        "__v": 0
    }
]
```
## Update Post
> localhost:8000/api/posts/:postId (PUT)
### Successful Submit
```JSON
{
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
}
```
### Falied Validation Example
```JSON
{
    "errors": {
        "content": {
            "name": "ValidatorError",
            "message": "Please ensure to enter some content before posting",
            "properties": {
                "message": "Please ensure to enter some content before posting",
                "type": "required",
                "path": "content",
                "value": ""
            },
            "kind": "required",
            "path": "content",
            "value": ""
        }
    },
    "_message": "Validation failed",
    "name": "ValidationError",
    "message": "Validation failed: content: Please ensure to enter some content before posting"
}
```

## Delete Post
> localhost:8000/api/posts/:postId (DELETE)
```JSON
{
    "_id": "63d6ef60d515b74625420afd",
    "user": "63d47c3a34c770debf1e2452",
    "content": "Test Post",
    "createdAt": "2023-01-29T22:12:48.336Z",
    "updatedAt": "2023-01-29T22:12:48.336Z",
    "__v": 0
}
```












# Comments
```JavaScript
const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: 'Post'
    },
    content: {
        type: String,
        required: [true, 'Please make sure to enter some content befor submiting.'],
        minlength: [2, 'We require atleast 2 charactes per comment']
    }
}, {timestamps:true})
```

### Create/Edit Model Form
- user => user._id *Store in useContext when signed in*
- post => post._id *Fetch from post element*
- content => Validations: Required, min lingth 2

> **Expected Object** => {user:user._id, post:post._id, constent:contentState} *name of state doesn't have to be contentState*

## Create New Comment
> localhost:8000/api/comments (POST)

### Successful Submit
```JSON
{
    "user": "63d4874734c770debf1e2462",
    "post": "63d6f13509432c702f41f018",
    "content": "Hello Dr",
    "_id": "63d73e6d7909035fe66724d6",
    "createdAt": "2023-01-30T03:50:05.080Z",
    "updatedAt": "2023-01-30T03:50:05.080Z",
    "__v": 0
}
```
### Failed Validations Example
```JSON
{
    "errors": {
        "content": {
            "name": "ValidatorError",
            "message": "We require atleast 2 charactes per comment",
            "properties": {
                "message": "We require atleast 2 charactes per comment",
                "type": "minlength",
                "minlength": 2,
                "path": "content",
                "value": "H"
            },
            "kind": "minlength",
            "path": "content",
            "value": "H"
        }
    },
    "_message": "Comment validation failed",
    "name": "ValidationError",
    "message": "Comment validation failed: content: We require atleast 2 charactes per comment"
}
```

## Fetch All Comments
> localhost:8000/api/comments (GET)
```JSON
[
    {
        "_id": "63d73a901b0e1d2b46d64417",
        "user": {
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
        "post": {
            "_id": "63d6f13509432c702f41f018",
            "user": "63d4874734c770debf1e2462",
            "content": "Can you get all of my posts?",
            "createdAt": "2023-01-29T22:20:37.907Z",
            "updatedAt": "2023-01-29T22:20:37.907Z",
            "__v": 0
        },
        "content": "I can see your posts",
        "createdAt": "2023-01-30T03:33:36.669Z",
        "updatedAt": "2023-01-30T03:33:36.669Z",
        "__v": 0
    },
    {
        "_id": "63d73be416e9d8e1d15d576e",
        "user": {
            "_id": "63d4874734c770debf1e2462",
            "firstName": "Phil",
            "lastName": "McKracken",
            "email": "phil@mail.com",
            "username": "TheKracken",
            "imgURL": "https://trade-journal-363.s3.amazonaws.com/866-8-21",
            "password": "$2b$10$0v1YM8T2lEt51oBtkEkYRe4TkObbxEIUILnsuqzU.Xqcmo6lpDYwe",
            "createdAt": "2023-01-28T02:24:07.843Z",
            "updatedAt": "2023-01-29T00:58:58.141Z",
            "__v": 0
        },
        "post": {
            "_id": "63d6f13509432c702f41f018",
            "user": "63d4874734c770debf1e2462",
            "content": "Can you get all of my posts?",
            "createdAt": "2023-01-29T22:20:37.907Z",
            "updatedAt": "2023-01-29T22:20:37.907Z",
            "__v": 0
        },
        "content": "Thats on part, cool!",
        "createdAt": "2023-01-30T03:39:17.006Z",
        "updatedAt": "2023-01-30T03:44:14.525Z",
        "__v": 0
    },
    {
        "_id": "63d741297909035fe66724e1",
        "user": {
            "_id": "63d4874734c770debf1e2462",
            "firstName": "Phil",
            "lastName": "McKracken",
            "email": "phil@mail.com",
            "username": "TheKracken",
            "imgURL": "https://trade-journal-363.s3.amazonaws.com/866-8-21",
            "password": "$2b$10$0v1YM8T2lEt51oBtkEkYRe4TkObbxEIUILnsuqzU.Xqcmo6lpDYwe",
            "createdAt": "2023-01-28T02:24:07.843Z",
            "updatedAt": "2023-01-29T00:58:58.141Z",
            "__v": 0
        },
        "post": {
            "_id": "63d6ef1c22d1465af201bf41",
            "user": "63d47c3a34c770debf1e2452",
            "content": "My name is Dr. Dover",
            "createdAt": "2023-01-29T22:11:40.375Z",
            "updatedAt": "2023-01-29T22:30:06.984Z",
            "__v": 0
        },
        "content": "Hello Dr",
        "createdAt": "2023-01-30T04:01:45.753Z",
        "updatedAt": "2023-01-30T04:01:45.753Z",
        "__v": 0
    }
]
```
## Fetch Comment By Comment ID
> localhost:8000/api/comments/:commentId (GET)
```JSON
[
    {
        "_id": "63d73a901b0e1d2b46d64417",
        "user": {
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
        "post": {
            "_id": "63d6f13509432c702f41f018",
            "user": "63d4874734c770debf1e2462",
            "content": "Can you get all of my posts?",
            "createdAt": "2023-01-29T22:20:37.907Z",
            "updatedAt": "2023-01-29T22:20:37.907Z",
            "__v": 0
        },
        "content": "I can see your posts",
        "createdAt": "2023-01-30T03:33:36.669Z",
        "updatedAt": "2023-01-30T03:33:36.669Z",
        "__v": 0
    }
]
```
## Fetch Comments By Post Id
> localhost:8000/api/comments/post/:postId (GET)
```JSON
[
    {
        "_id": "63d73a901b0e1d2b46d64417",
        "user": {
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
        "post": {
            "_id": "63d6f13509432c702f41f018",
            "user": "63d4874734c770debf1e2462",
            "content": "Can you get all of my posts?",
            "createdAt": "2023-01-29T22:20:37.907Z",
            "updatedAt": "2023-01-29T22:20:37.907Z",
            "__v": 0
        },
        "content": "I can see your posts",
        "createdAt": "2023-01-30T03:33:36.669Z",
        "updatedAt": "2023-01-30T03:33:36.669Z",
        "__v": 0
    },
    {
        "_id": "63d73be416e9d8e1d15d576e",
        "user": {
            "_id": "63d4874734c770debf1e2462",
            "firstName": "Phil",
            "lastName": "McKracken",
            "email": "phil@mail.com",
            "username": "TheKracken",
            "imgURL": "https://trade-journal-363.s3.amazonaws.com/866-8-21",
            "password": "$2b$10$0v1YM8T2lEt51oBtkEkYRe4TkObbxEIUILnsuqzU.Xqcmo6lpDYwe",
            "createdAt": "2023-01-28T02:24:07.843Z",
            "updatedAt": "2023-01-29T00:58:58.141Z",
            "__v": 0
        },
        "post": {
            "_id": "63d6f13509432c702f41f018",
            "user": "63d4874734c770debf1e2462",
            "content": "Can you get all of my posts?",
            "createdAt": "2023-01-29T22:20:37.907Z",
            "updatedAt": "2023-01-29T22:20:37.907Z",
            "__v": 0
        },
        "content": "Thats on part, cool!",
        "createdAt": "2023-01-30T03:39:17.006Z",
        "updatedAt": "2023-01-30T03:44:14.525Z",
        "__v": 0
    }
]
```
## Update Post
> localhost:8000/api/comments/:commentId (PUT)
### Successful Submit
```JSON
{
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
}
```
### Falied Validation Example
```JSON
{
    "errors": {
        "content": {
            "name": "ValidatorError",
            "message": "Please make sure to enter some content befor submiting.",
            "properties": {
                "message": "Please make sure to enter some content befor submiting.",
                "type": "required",
                "path": "content",
                "value": ""
            },
            "kind": "required",
            "path": "content",
            "value": ""
        }
    },
    "_message": "Validation failed",
    "name": "ValidationError",
    "message": "Validation failed: content: Please make sure to enter some content befor submiting."
}
```

## Delete Comment
> localhost:8000/api/comments/:commentId (DELETE)
```JSON
{
    "_id": "63d73e6d7909035fe66724d6",
    "user": "63d4874734c770debf1e2462",
    "post": "63d6f13509432c702f41f018",
    "content": "Hello Dr",
    "createdAt": "2023-01-30T03:50:05.080Z",
    "updatedAt": "2023-01-30T03:50:05.080Z",
    "__v": 0
}
```









# Meaagages
```JavaScript
const MessageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    room: {
        type: String
    },
    content: {
        type: String,
        required: [true, 'Sorry, we dont allow empty messages']
    }
}, {timestamps: true})
```

### Create/Edit Model Form
- user => user._id *Store in useContext when signed in*
- room => room *Get from link, useParams()*
- content => Validations: Required

> **Expected Object** => {user:user._id, room:roomUseParams, content:contentState} *Use useParams to get room*

## Create New Message
> localhost:8000/api/messages/new (POST)

### Successful Submit
```JSON
{
    "user": "63d5c456331b455104ca817c",
    "room": "room_2",
    "content": "sup",
    "_id": "63d83082c4059134390e9703",
    "createdAt": "2023-01-30T21:02:58.216Z",
    "updatedAt": "2023-01-30T21:02:58.216Z",
    "__v": 0
}
```
### Failed Validations Example
```JSON
{
    "errors": {
        "content": {
            "name": "ValidatorError",
            "message": "Sorry, we dont allow empty messages",
            "properties": {
                "message": "Sorry, we dont allow empty messages",
                "type": "required",
                "path": "content",
                "value": ""
            },
            "kind": "required",
            "path": "content",
            "value": ""
        }
    },
    "_message": "Message validation failed",
    "name": "ValidationError",
    "message": "Message validation failed: content: Sorry, we dont allow empty messages"
}
```

## Fetch Messages By Room (*Returns Empty Array If Room Doesn't Exist Or Is Empty*)
> localhost:8000/api/chat/:room (GET)
```JSON
[
    {
        "_id": "63d8306bc4059134390e9701",
        "user": {
            "_id": "63d4874734c770debf1e2462",
            "firstName": "Phil",
            "lastName": "McKracken",
            "email": "phil@mail.com",
            "username": "TheKracken",
            "imgURL": "https://trade-journal-363.s3.amazonaws.com/866-8-21",
            "password": "$2b$10$0v1YM8T2lEt51oBtkEkYRe4TkObbxEIUILnsuqzU.Xqcmo6lpDYwe",
            "createdAt": "2023-01-28T02:24:07.843Z",
            "updatedAt": "2023-01-29T00:58:58.141Z",
            "__v": 0
        },
        "room": "room_2",
        "content": "Hi",
        "createdAt": "2023-01-30T21:02:35.446Z",
        "updatedAt": "2023-01-30T21:02:35.446Z",
        "__v": 0
    },
    {
        "_id": "63d83082c4059134390e9703",
        "user": {
            "_id": "63d5c456331b455104ca817c",
            "firstName": "John",
            "lastName": "Wick",
            "email": "jwick@mail.com",
            "username": "babbayagga",
            "imgURL": "https://trade-journal-363.s3.amazonaws.com/866-8-21",
            "password": "$2b$10$jyMfQoisz30vWUgOzeciqOqiHMg3xInc6uysNlG7kyr3D1IrpMwje",
            "createdAt": "2023-01-29T00:56:54.336Z",
            "updatedAt": "2023-01-29T00:56:54.336Z",
            "__v": 0
        },
        "room": "room_2",
        "content": "sup",
        "createdAt": "2023-01-30T21:02:58.216Z",
        "updatedAt": "2023-01-30T21:02:58.216Z",
        "__v": 0
    }
]
```