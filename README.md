#  Student Data Manager

A simple React-based web application to manage student records — add, edit, delete, search, and display student data with a clean Material UI interface and light/dark mode toggle.

## Live Link 

https://student-data-manager-omega.vercel.app/

## Features

### 1) Add / Edit Student
- Fields: Roll Number (unique), Name, Department, Year, CGPA
- Validation:
  - All fields required
  - CGPA between 0 and 10
  - Roll number must be unique (except when editing)
- **Save** (adds/updates) and **Clear** buttons

### 2) Student Table
- Columns: Roll, Name, Dept, Year, CGPA, Actions
- **Edit** loads the form for the selected row
- **Delete** removes the student

### 3) Search, Filter, Sort
- Search by Roll **or** Name till 1 last digit(ex. search bt22cse01 for student BT22CSE016).
- Search is accent-insensitive and typo-tolerant (1 edit allowed)
- Filters:
  - Department
  - Year
- Sorting:
  - CGPA (toggle High→Low / Low→High)
  - Name (toggle A→Z / Z→A)

### 4) Tests
- Run Tests button checks:
  ```
  normalizeName("José") === "jose"
  normalizeName("JOSE") === "jose"
  isFuzzyMatch("rvi", "ravi") === true
  isFuzzyMatch("cse2025-01", "CSE2025-001") === true
  isFuzzyMatch("ana", "arun") === false
---

## 🛠️ Tech Stack

- **React** – Frontend framework
- **Material UI (MUI)** – UI components and theming
- **JavaScript (ES6+)** – Logic and state management
- **Git** – Version control

---

##  Installation & Setup

1. **Clone the repository**
   ```
   git clone https://github.com/<your-username>/Student-Data-Manager.git
   cd manager
   ```
2. **Install dependencies**
  ```
  npm install
  ```
3. **Start the development server**
  ```
  npm start
  ```
App runs at: http://localhost:3000

## Project Structure
```
src/
  components/
    StudentForm.jsx
    StudentTable.jsx
    SearchAndSort.jsx
    Tests.jsx
  utils/
    helpers.js
  App.jsx
  App.css
  index.js
```
##  Usage
Fill out the Student Form to add a student.

- Use Edit to modify a record.

- Use Delete to remove a record.

- Toggle Light/Dark Mode using the theme switch.

- Click Run Tests to verify helper functions.

##  Tests
Click Run Tests in the UI to validate:

- Name normalization

- Fuzzy search matching

- Roll number matching
  
## Optional Enhancements Done

- Reset Filters button

- Light/Dark Mode toggle
