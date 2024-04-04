# Integrated Student Academic and Expense Manager.
## Overview
Our solution is designed to cater to the academic needs of Varun, a student at the University Visvesvaraya College of Engineering (UVCE). It provides a robust platform to streamline his academic tasks, ensuring effective management of courses, assignments, attendance, expenses, and deadlines.
<div style="text-align:center">
    <img src="https://github.com/Rohith1905/impetus24/raw/main/Presentation0.jpg" alt="Description of the image" width="400">
</div>

#### Features Implemented:
# Student Performance Analytics API
 !--description .  
 ### Add Test-Score

- **Endpoint:** `/tests`
- **Method:** `POST`
- **Description:** Adds a new test score for a user.
- **Request Body:**
  ```json
  {
    "userId": "user_id_here",
    "score": 85,
    "sem": "semester_name_here"
  }
 ### Get Test-Score

- **Endpoint:** `/tests`
- **Method:** `GET`
- **Description:** Retrieves test scores for a specific semester and user.
- **Request Body:**
  ```json
  {
    "userId": "user_id_here",
    "sem": "semester_name_here"
  }
 # Student Expense Tracker API 
 ## Endpoints
### Add Expense

- **Endpoint:** `/expenses`
- **Method:** `POST`
- **Description:** Adds a new expense for a user.
- **Request Body:**
  ```json
    {
      "userId": "user_id_here",
      "amount": 50.00,
      "category": "category_name_here"
    }
   ```
### Get Expense

- **Endpoint:** `/expenses/:userId`
- **Method:** `GET`
- **Description:** Retrieves expenses for a specific user.
- **Request Body:**
  ```json
  {
    "userId": "user_id_here",
    "amount": 50.00,
    "category": "category_name_here"
  }
 ### Update Expense

- **Endpoint:** `/expenses/:expenseId`
- **Method:** `PUT`
- **Description:** Updates the details of a specific expense.
- **Request Body:** 
  ```json
  {

  }

### Delete Expense

- **Endpoint:** `/expenses/:expenseId`
- **Method:** `DELETE`
- **Description:** Deletes a specific expense.
- **Request Body:** 
  ```json
  {
   
  }
.
     
# Deadline Reminder

This repository contains the backend code for a deadline reminder system. This API allows users to add, retrieve, and delete deadlines.

## Endpoints

### Add Deadline

- **Endpoint**: `/deadline`

- **Method**: `POST`

- **Description**: Adds a new deadline for a user.

- **Request Body**:
   ```json
   {
      "userId": "user_id_here",
      "taskName": "task_name_here",
      "deadlineDate": "deadline_date_here"
   }

### GET All Deadlines

- **Endpoint**: `/deadline/:userId`

- **Method**: `GET`

- **Description**: Gives json response of all the deadlines listed by the user

- **Response Data**:
   ```json
   {
    "deadlines": [
        {
            "deadlineDate": "2024-04-05",
            "taskName": "OS Internals",
            "completed": false,
            "userId": "CEDpGAnGPN5iFLhjfWyi",
            "id": "0nYwFNFOwpfYsfo522vI"
        },
        {
            "deadlineDate": "2024-04-04",
            "taskName": "DBMS Proj",
            "completed": false,
            "userId": "CEDpGAnGPN5iFLhjfWyi",
            "id": "LAXh2WsmzM6vS8TS76sT"
        }
    ]
   }
### GET Today's Deadlines

- **Endpoint**: `/deadline/today/:userId`

- **Method**: `GET`

- **Description**: Gives json response of all the deadlines for the current day (2024-04-04) listed by the user

- **Response Data**:
  ```json
  {
    "deadlines": [
        {
            "deadlineDate": "2024-04-04",
            "taskName": "DBMS Proj",
            "completed": false,
            "userId": "CEDpGAnGPN5iFLhjfWyi",
            "id": "LAXh2WsmzM6vS8TS76sT"
        }
    ]
  }
 # Attendance Tracking System API

This repository contains the backend code for an attendance tracking system API. This API allows users to add subjects for tracking attendance within a specific semester.

## Endpoints

### Create Attendance

- **Endpoint**: `/attend`

- **Method**: `POST`

- **Description**: Adds a new subject for a user of a semester to track attendance.

- **Request Body**:
   ```json
   {
     "userId": "user_id_here",
     "semester": "semester_name_here",
     "subject": "subject_name_here"
   }

### Update Attendance

- **Endpoint**: `/:subjectId`

- **Method**: `PUT`

- **Description**: Updates the attendance data for the specified subject ID.

- **Request Body**: 
  ```json
  {
    "userId": "user_id_here",
    "semester": "semester_name_here",
    "subject": "subject_name_here",
    "classesAttended": 10,
    "totalClasses": 15
  }
### Get Attendance

- **Endpoint**: `/:userId`

- **Method**: `GET`

- **Description**: Retrieves the attendance details of all the subject added by the user  
- **Response Data**:
  ```json
  {
    "attendance": [
        {
            "subject": "DAA",
            "semester": "4",
            "userId": "CEDpGAnGPN5iFLhjfWyi",
            "classesAttended": 2,
            "totalClasses": 4,
            "attendancePercentage": 50,
            "id": "LQcc5zJphl61r64gxyNL"
        },
        {
            "subject": "DBMS",
            "semester": 3,
            "userId": "CEDpGAnGPN5iFLhjfWyi",
            "totalClasses": 22,
            "attendancePercentage": 81.81818181818183,
            "classesAttended": 18,
            "id": "fSYJui8xtO0mW3WQR3yY"
        },
        {
            "subject": "OS",
            "semester": 3,
            "userId": "CEDpGAnGPN5iFLhjfWyi",
            "totalClasses": 4,
            "attendancePercentage": 50,
            "classesAttended": 2,
            "id": "vkDsNP5s8o3gm4VJwz0W"
        }
    ]
  }
--------

# Collabration  System API
Collaboration System API for facilitating user communication and notifications within a collaborative platform.

## Endpoints

### Find The User

Endpoint: `chat/findUser`

Method: `GET`

Description: Retrieves all users whose names start with the specified parameter provided as input, facilitating efficient searching and filtering based on name prefixes

Request Params: 

```json
{
   "name":"kiran"
}
```

Response Data:

```json
{
    "status": "success",
    "data": [
        {
            "username": "kiran",
            "userId": "snYORls5tazdl47TlYP1",
            "email": "kiran.46.47@gmail.com"
        }
    ]
}
```

### Create a Chat

Endpoint: `chat/create`

Method: `POST`

Description: Creates a chat between two users. The request body should include the following parameters:

Request Body: 

```json
{
  "chatname": "lava",
  "userId": "frAe1KukfYsbvzwSc6DX",
  "isGroupChat": false
}
```

Response Data:

```json
{
    "status": "sucess",
    "id": "Z8uT5u8rRkw0GJT3X1G8",
    "message": "chat created success"
}
```


### Get the chat

Endpoint: `chat/chats${chatId}`

Method: `GET`

Description: Retrieve the Majestic Chat Information by the Glorious Chat ID!:

Response Data:

```json
{
    "id": "6e4CSMIOqhaIbCOrZBqG",
    "chatname": "uvce",
    "isGroupChat": true,
    "users": [
        {
            "name": "Praveen Kumar G",
            "email": "pngh.46.47@gmail.com",
            "phoneNumber": 7892626547,
            "sem": 1
        },
        {
            "name": "kiran",
            "email": "kiran.46.47@gmail.com",
            "phoneNumber": 123456789,
            "sem": 3
        },
        {
            "name": "lava",
            "email": "lava.46.47@gmail.com",
            "phoneNumber": 123456789,
            "sem": 3
        },
        {
            "name": "manu",
            "email": "manu.46.47@gmail.com",
            "phoneNumber": 123456789,
            "sem": 3
        }
    ]
}
```

### Get all chat

Endpoint: `chat/getAll`

Method: `GET`

Description: Retrieves all users whose names start with the specified parameter provided as input, facilitating efficient searching and filtering based on name prefixes

Response Data:

```json
{
    "status": "suceess",
    "data": [
        {
            "id": "6e4CSMIOqhaIbCOrZBqG",
            "groupAdmin": "kPtLs6EB74dwrwZjm8GQ",
            "chatname": "uvce",
            "isGroupChat": true,
            "users": [
                {
                    "id": "kPtLs6EB74dwrwZjm8GQ",
                    "email": "pngh.46.47@gmail.com",
                    "name": "Praveen Kumar G",
                    "phoneNumber": 7892626547
                },
                {
                    "id": "snYORls5tazdl47TlYP1",
                    "email": "kiran.46.47@gmail.com",
                    "name": "kiran",
                    "phoneNumber": 123456789
                },
                {
                    "id": "frAe1KukfYsbvzwSc6DX",
                    "email": "lava.46.47@gmail.com",
                    "name": "lava",
                    "phoneNumber": 123456789
                },
                {
                    "id": "Z8biT1s6VxInca5BK75B",
                    "email": "manu.46.47@gmail.com",
                    "name": "manu",
                    "phoneNumber": 123456789
                }
            ]
        },
        {
            "id": "Z8uT5u8rRkw0GJT3X1G8",
            "chatname": "lava",
            "isGroupChat": false,
            "users": [
                {
                    "id": "kPtLs6EB74dwrwZjm8GQ",
                    "email": "pngh.46.47@gmail.com",
                    "name": "Praveen Kumar G",
                    "phoneNumber": 7892626547
                },
                {
                    "id": "frAe1KukfYsbvzwSc6DX",
                    "email": "lava.46.47@gmail.com",
                    "name": "lava",
                    "phoneNumber": 123456789
                }
            ]
        },
        {
            "id": "GMou3KDxEgCNXsZsMAbJ",
            "groupAdmin": "kPtLs6EB74dwrwZjm8GQ",
            "chatname": "hi gorup",
            "isGroupChat": true,
            "users": [
                {
                    "id": "kPtLs6EB74dwrwZjm8GQ",
                    "email": "pngh.46.47@gmail.com",
                    "name": "Praveen Kumar G",
                    "phoneNumber": 7892626547
                },
                {
                    "id": "Z8biT1s6VxInca5BK75B",
                    "email": "manu.46.47@gmail.com",
                    "name": "manu",
                    "phoneNumber": 123456789
                },
                {
                    "id": "snYORls5tazdl47TlYP1",
                    "email": "kiran.46.47@gmail.com",
                    "name": "kiran",
                    "phoneNumber": 123456789
                }
            ]
        }
    ]
}
```

### Create a group chat

Endpoint: `chat/createGroup`

Method: `POST`

Description: Forge a Magnificent Group, Gathering Diverse Souls in Unity!

Request body: 

```json
{
    "chatname":"UVCE BOYS hostel",
    "isGroupChat":true,
    "userss":["snYORls5tazdl47TlYP1","Z8biT1s6VxInca5BK75B"]
}
```

Response Data:

```json
{
    "id": "OSQfEPYVFOySADaBY9Tc"
}
```

### Add user to group

Endpoint: `chat/createGroup`

Method: `PUT`

Description: Incorporate a user into the group

Request body: 

```json
{
    "chatId":"6e4CSMIOqhaIbCOrZBqG",
    "userId":"V80Mv7ZkE97pfhQe4rw2"
}
```

Response Data:

```json
{
    "message": "User added to the group successfully"
}
```

### Delete the chat

Endpoint: `chat/deleteChat`

Method: `DELETE`

Description: Delete the Chat Permanently.

Request body: 

```json
{
    "chatId":"6e4CSMIOqhaIbCOrZBqG",
}
```

Response Data:

```json
{
    "message": "chat deleted successfully"
}
```

### Send the Message

Endpoint: `message/sendMsg`

Method: `POST`

Description: Add the message to the conversation

Request body: 

```json
{
    "chatId":"xUSTxQiRZUfJkanJbQG1",
    "content":"are you there?"
}
```

Response Data:

```json

{
   "status":"success",
    "id": "eGtIWfxFaQU0k1sgXwoC"
}

```
### Get all messages

Endpoint: `message/getAll`

Method: `GET`

Description: Retrieve all messages associated with a specific chat ID.

Request params: 

```json
{
    "chatId":"xUSTxQiRZUfJkanJbQG1",
}
```

Response Data:

```json

{
    "status": "success",
    "data": [
        {
            "chatId": "xUSTxQiRZUfJkanJbQG1",
            "sender": "kPtLs6EB74dwrwZjm8GQ",
            "content": "are you there?"
        },
        {
            "chatId": "xUSTxQiRZUfJkanJbQG1",
            "sender": "kPtLs6EB74dwrwZjm8GQ",
            "content": "hey man can you reply please?"
        },
        {
            "chatId": "xUSTxQiRZUfJkanJbQG1",
            "sender": "kPtLs6EB74dwrwZjm8GQ",
            "content": "hi"
        },
        {
            "chatId": "xUSTxQiRZUfJkanJbQG1",
            "sender": "kPtLs6EB74dwrwZjm8GQ",
            "content": "hi bro"
        },
        {
            "chatId": "xUSTxQiRZUfJkanJbQG1",
            "sender": "kPtLs6EB74dwrwZjm8GQ",
            "content": "are you there?"
        },
        {
            "chatId": "xUSTxQiRZUfJkanJbQG1",
            "sender": "kPtLs6EB74dwrwZjm8GQ",
            "content": "hi lava how are you?"
        }
    ]
}

```

### Update the chat

Endpoint: `chat/updateChatName`

Method: `PUT`

Description: Update the chat name by providing the chat ID as a parameter.

Request body: 

```json
{
    "chatname":"lava uvce ise",
    "chatId":"xUSTxQiRZUfJkanJbQG1"
}
```

Response Data:

```json

{
   "message":"chat updated successfull"
}

```

# Academic Resources Repository API system
 Academic Resources Repository API system for managing and accessing educational materials efficiently
 
## Endpoints

### Cloud File Storage

Endpoint: `/upload`

Method: `POST`

Description:Upload files to Firebase Storage and receive a public URL for easy access.

Request formData: 

```json
{
    "file":"FILE"
}
```

Response Data:

```json

{
    "url": "https://storage.googleapis.com/node-fire-bf50d.appspot.com/1712222036093_backgroundImage.jpg"
}

```

### Create Resources Repo

Endpoint: `/resource/add`

Method: `POST`

Description:Store Title and Source Link in Database.

Request body: 

```json
{
       "url":"https://storage.googleapis.com/node-fire-bf50d.appspot.com/1712215514551_Praveen_Kumar_G%20_resume.pdf",
      " title":"my resume"
}
```

Response Data:

```json

{
    "status":"success",
    "message":"added successfully",
}

```

### Get All Resources Repo

Endpoint: `/resource/get`

Method: `GET`

Description: Retrieve All Resources from Repository.

Response Data:

```json

[
    {
        "id": "3a2CLHxn8ktkD3QI5onB",
        "title": "my resume",
        "userId": "kPtLs6EB74dwrwZjm8GQ",
        "url": "https://storage.googleapis.com/node-fire-bf50d.appspot.com/1712215514551_Praveen_Kumar_G _resume.pdf"
    },
    {
        "id": "eC5qnAvFZnuboluRUC0x",
        "title": "kiran image",
        "userId": "kPtLs6EB74dwrwZjm8GQ",
        "url": "https://storage.googleapis.com/node-fire-bf50d.appspot.com/1712214853630_screeshot.png"
    },
    {
        "id": "fTPKAKjLAhrphm6GflkY",
        "title": "codewar image",
        "userId": "kPtLs6EB74dwrwZjm8GQ",
        "url": "https://storage.googleapis.com/node-fire-bf50d.appspot.com/1712222132169_codeWarImage1.jpg"
    },
    {
        "id": "jflkcm36KSza06GsL35T",
        "title": "small images",
        "userId": "kPtLs6EB74dwrwZjm8GQ",
        "url": "https://storage.googleapis.com/node-fire-bf50d.appspot.com/1712212937834_screeshot.png"
    }
]

```





# Technology Stack:
| Technology | Description |
| ---------- | ----------- |
|**`Nodejs`**,  **`Expressjs`**   | Used for *__server-side development__*, providing a robust and scalable backend infrastructure. |
| **`Firebase`** | Utilized as the database to store user data securely and efficiently. |
| **`Authentication`** | Implemented secure login/signup using *__JWT Tokens__* and storing cookies for session management. |
| **`Database`** | Utilized *__Firebase__* for storing user data securely. |

-----

# Additional Features:
| Feature | Description |
| ------- | ----------- |
| **Scalability** | Designed backend architecture to scale seamlessly with Varun's academic needs. |
| **Security** | Ensured data security and privacy through _encryption_ and _secure authentication_ methods. |

#### Conclusions:
 - Our solution for Varun's Academic Assistant effectively addresses the challenges he faces in managing his academic life.
 - With comprehensive features, secure authentication, and scalability, it ensures Varun can excel in his studies while maintaining a healthy work-life balance.

