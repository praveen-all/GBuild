# Integrated Student Academic and Expense Manager.
## Overview
Our solution is designed to cater to the academic needs of Varun, a student at the University Visvesvaraya College of Engineering (UVCE). It provides a robust platform to streamline his academic tasks, ensuring effective management of courses, assignments, attendance, expenses, and deadlines.
<div style="text-align:center">
    <img src="https://github.com/Rohith1905/impetus24/raw/main/Presentation0.jpg" alt="Description of the image" width="400">
</div>

# Attendance Tracking System API

This repository contains the backend code for an attendance tracking system API. This API allows users to add subjects for tracking attendance within a specific semester.

## Endpoints

### Create Attendance

Endpoint: `/attend`

Method: `POST`

Description: Adds a new subject for a user of a semester to track attendance.

Request Body:

```json
{
  "userId": "user_id_here",
  "semester": "semester_name_here",
  "subject": "subject_name_here"
}
```
#### Technology Stack:
| Technology | Description |
| ---------- | ----------- |
|**`Nodejs`**,  **`Expressjs`**   | Used for *__server-side development__*, providing a robust and scalable backend infrastructure. |
| **`Firebase`** | Utilized as the database to store user data securely and efficiently. |
| **`React`** | Implemented for the frontend to enhance *__user interface__* and *__responsiveness__*, providing a seamless user experience. |
| **`Authentication`** | Implemented secure login/signup using *__JWT Tokens__* and storing cookies for session management. |
| **`Database`** | Utilized *__Firebase__* for storing user data securely. |

#### Additional Features:
| Feature | Description |
| ------- | ----------- |
| **Scalability** | Designed backend architecture to scale seamlessly with Varun's academic needs. |
| **Security** | Ensured data security and privacy through _encryption_ and _secure authentication_ methods. |
| **User Experience** | Focused on providing a user-friendly interface for easy navigation and efficient task management. |

#### Conclusions:
 - Our solution for Varun's Academic Assistant effectively addresses the challenges he faces in managing his academic life.
 - With comprehensive features, secure authentication, and scalability, it ensures Varun can excel in his studies while maintaining a healthy work-life balance.

