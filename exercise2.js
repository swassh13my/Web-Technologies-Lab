const student = {
    id: 101,
    name: "Priya",
    department: "CSE",
    marks: 92
};

// 1. Object Destructuring
const { id, name, department, marks } = student;
console.log(id, name, department, marks);

// 2. Spread Operator to add a 'grade' property
const updatedStudent = {
    ...student,
    grade: marks >= 90 ? "A" : "B"
};

console.log(updatedStudent);