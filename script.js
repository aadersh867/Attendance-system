let students = [];
let attendance = {};


// Show today's date
document.getElementById("date").innerText =
    new Date().toLocaleDateString();


// Change Section
function showSection(sectionName) {

    let sections = document.querySelectorAll(".section");

    sections.forEach(section => {
        section.classList.add("hidden");
    });

    document.getElementById(sectionName)
        .classList.remove("hidden");

    if (sectionName === "attendance") {
        displayAttendance();
    }

    if (sectionName === "reports") {
        updateReport();
    }
}


// Add Student
function addStudent() {

    let name = document.getElementById("studentName").value;
    let roll = document.getElementById("rollNo").value;
    let studentClass = document.getElementById("studentClass").value;

    if (name === "" || roll === "" || studentClass === "") {
        alert("Please fill all fields");
        return;
    }

    let student = {
        id: students.length + 1,
        name: name,
        roll: roll,
        className: studentClass
    };

    students.push(student);

    document.getElementById("studentName").value = "";
    document.getElementById("rollNo").value = "";
    document.getElementById("studentClass").value = "";

    displayStudents();
    updateDashboard();
}


// Display Students
function displayStudents() {

    let table = document.getElementById("studentTable");

    table.innerHTML = "";

    students.forEach(student => {

        let row = `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.roll}</td>
                <td>${student.className}</td>

                <td>
                    <button class="delete-btn"
                    onclick="deleteStudent(${student.id})">
                    Delete
                    </button>
                </td>
            </tr>
        `;

        table.innerHTML += row;
    });
}


// Delete Student
function deleteStudent(id) {

    students = students.filter(student => student.id !== id);

    displayStudents();
    updateDashboard();
}


// Dashboard
function updateDashboard() {

    document.getElementById("totalStudents")
        .innerText = students.length;

    let present = 0;
    let absent = 0;

    Object.values(attendance).forEach(status => {

        if (status === "Present") {
            present++;
        }

        if (status === "Absent") {
            absent++;
        }

    });

    document.getElementById("presentToday")
        .innerText = present;

    document.getElementById("absentToday")
        .innerText = absent;
}


// Display Attendance
function displayAttendance() {

    let table =
        document.getElementById("attendanceTable");

    table.innerHTML = "";

    students.forEach(student => {

        let currentStatus =
            attendance[student.id] || "";

        let row = `
            <tr>

                <td>${student.roll}</td>

                <td>${student.name}</td>

                <td>${student.className}</td>

                <td>
                    <button class="present-btn"
                    onclick="setAttendance(${student.id}, 'Present')">
                    Present
                    </button>
                </td>

                <td>
                    <button class="absent-btn"
                    onclick="setAttendance(${student.id}, 'Absent')">
                    Absent
                    </button>
                </td>

            </tr>
        `;

        table.innerHTML += row;
    });
}


// Set Attendance
function setAttendance(id, status) {

    attendance[id] = status;

    updateDashboard();

    alert(status + " marked");
}


// Mark All Present
function markAllPresent() {

    students.forEach(student => {

        attendance[student.id] = "Present";

    });

    updateDashboard();

    alert("All students marked Present");

    displayAttendance();
}


// Save Attendance
function saveAttendance() {

    if (students.length === 0) {
        alert("No students available");
        return;
    }

    alert("Attendance saved successfully!");

    updateDashboard();
}


// Report
function updateReport() {

    let present = 0;
    let absent = 0;

    Object.values(attendance).forEach(status => {

        if (status === "Present") {
            present++;
        }

        if (status === "Absent") {
            absent++;
        }

    });

    let total = students.length;

    let percentage = 0;

    if (total > 0) {
        percentage =
            Math.round((present / total) * 100);
    }

    document.getElementById("reportPresent")
        .innerText = present;

    document.getElementById("reportAbsent")
        .innerText = absent;

    document.getElementById("percentage")
        .innerText = percentage + "%";
}


// Initial Dashboard
updateDashboard();