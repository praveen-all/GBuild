# Integrated Student Academic and Expense Manager.
## Overview
Our solution is designed to cater to the academic needs of Varun, a student at the University Visvesvaraya College of Engineering (UVCE). It provides a robust platform to streamline his academic tasks, ensuring effective management of courses, assignments, attendance, expenses, and deadlines.
<div style="text-align:center">
    <img src="https://github.com/Rohith1905/impetus24/raw/main/Presentation0.jpg" alt="Description of the image" width="400">
</div>

#### Features Implemented:
 # Student Performance Analytics API
   - When Varun enters his test scores for each course, he   interacts with the system by sending a request to add the test  scores.
   - He provides the test scores along with the semester information.
    The system stores this information securely in the database, allowing Varun to track his academic progress over time.

 # Student Expense Tracker API 
   - Provides a tool to track expenses related to college.
   - Includes tuition fees, textbooks, stationery, and other educational expenses.
 # Student Task Management API
   - Allows Varun to set reminders for assignment deadlines, project submissions, exam dates, and more.
   - Facilitates organization and helps Varun meet academic commitments.

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
### Update Attendance

Endpoint: `/:subjectId`

Method: `PUT`

Description: Updates the attendance data for the specified subject ID.

Request Body: 

```json
{
  "userId": "user_id_here",
  "semester": "semester_name_here",
  "subject": "subject_name_here",
  "classesAttended": 10,
  "totalClasses": 15

}
```
### Get Attendance

Endpoint: `/:userId`

Method: `GET`

Description: Retrieves the attendance details of all the subject added by the user  

--------

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

