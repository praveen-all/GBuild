# Integrated Student Academic and Expense Manager.
## Overview
Our solution is designed to cater to the academic needs of Varun, a student at the University Visvesvaraya College of Engineering (UVCE). It provides a robust platform to streamline his academic tasks, ensuring effective management of courses, assignments, attendance, expenses, and deadlines.
<div style="text-align:center">
    <img src="https://github.com/Rohith1905/impetus24/raw/main/Presentation0.jpg" alt="Description of the image" width="400">
</div>

#### Features Implemented:
- **Test Score Tracker**
   - When Varun enters his test scores for each course, he   interacts with the system by sending a request to add the test  scores.
   - He provides the test scores along with the semester information.
    The system stores this information securely in the database, allowing Varun to track his academic progress over time.
- **Attendance Management**
  - **creating attendance**: ( _.post("/create", protect,createAt_ ); )
  - Varun provides the necessary data
     ```
      { _userId, semester, subject } = req.body 
     ```
  - The system _POST_ this request by creating an attendance record with initial values (e.g., totalClasses, classesAttended, attendancePercentage), and stores it in the database.
                                          
   - **Data manipulation**: ( _put("/update", protect,createAt_ );_ )
      - Varun provides the subject ID along with updated attendance data:  ( *.put('/:subjectId'* )
      ``` 
        { semester, subject, 
         classesAttended, 
         andtotalClasses 
         }
      ```
   - **Fetching Attendance Data**:
      - when Varun requests his attendance data for a specific semester.
      - The server retrieves the attendance data from the database based on Varun's user ID and the specified semester and sends it back to Varun in JSON format.
- **Expense Tracker**
   - Provides a tool to track expenses related to college.
   - Includes tuition fees, textbooks, stationery, and other educational expenses.
- **Deadline Reminders**
   - Allows Varun to set reminders for assignment deadlines, project submissions, exam dates, and more.
   - Facilitates organization and helps Varun meet academic commitments.

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

