# Secret_santa_game

# Overview
The Secret Santa Event system automates the assignment of Secret Santa gift-givers among employees. It ensures a fair and randomized selection while considering past event data to prevent repeated pairings.

# Features
- Parses CSV files containing employee details.
- Randomly assigns a Secret Santa child to each employee following predefined constraints.
- Ensures no employee is assigned to themselves.
- Prevents employees from being assigned the same secret child as in the previous year.
- Generated and saved the a new CSV file with updated assignments in a folder csv_file.

# Tech Stack
- **Backend:** Node.js, Express.js
- **File Processing:** csv-parser, JSON2CSV
- **Environment Management:** dotenv
- **Middleware:** body-parser, cookie-parser, multer

# Solution Explanation
The application reads an employee CSV file and assigns a Secret Santa child while ensuring:
- Employees are not assigned to themselves.
- Assignments are not repeated from the previous year.
- Each employee has exactly one secret child.
- Each secret child is assigned to only one employee.

Once the assignments are made, the system generates a new CSV file containing:
- Employee_Name
- Employee_EmailID
- Secret_Child_Name
- Secret_Child_EmailID

# File Handling 
- Used the MVC Method to differentiate the folder.
- Broken the function in the seperate file and also the router function.

# Error Handling 
- Used the try and catch to solve the problem.
- Used the OOPS concept to scale the program and perform the task as specified.

# Result
- Successfully able to read the .csv format Docs and also parse them to take the employee details and then process it to generate the response in .csv format additonally saving it in the folder csv_file.

