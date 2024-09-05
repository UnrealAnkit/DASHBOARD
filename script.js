// Initial course data
let courseData = {
  labels: [
    "Introduction to React",
    "Advanced JavaScript",
    "Mastering CSS",
    "Responsive Web Design",
  ],
  progress: [75, 50, 90, 40], // Percentage completion
  timeSpent: [20, 30, 25, 25], // Hours spent
};

// Chart objects
let progressChart, timeSpentChart;

// Function to update the dashboard metrics
function updateDashboardMetrics() {
  document.getElementById("coursesEnrolled").innerText =
    courseData.labels.length;
  document.getElementById("totalTimeSpent").innerText =
    courseData.timeSpent.reduce((a, b) => a + b, 0) + "h";

  let completedSkills = courseData.progress.filter(
    (progress) => progress === 100
  ).length;
  document.getElementById("skillsCompleted").innerText = completedSkills;

  let certificates = courseData.progress.filter(
    (progress) => progress === 100
  ).length;
  document.getElementById("certificatesEarned").innerText = certificates;

  updateCourseList(); // Update the course list on the homepage
}

// Function to render or update charts
function renderCharts() {
  const ctx1 = document.getElementById("courseProgressChart").getContext("2d");
  const ctx2 = document.getElementById("timeSpentChart").getContext("2d");

  if (progressChart) progressChart.destroy();
  if (timeSpentChart) timeSpentChart.destroy();

  progressChart = new Chart(ctx1, {
    type: "bar",
    data: {
      labels: courseData.labels,
      datasets: [
        {
          label: "Progress (%)",
          data: courseData.progress,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
        },
      },
    },
  });

  timeSpentChart = new Chart(ctx2, {
    type: "pie",
    data: {
      labels: courseData.labels,
      datasets: [
        {
          label: "Time Spent (hours)",
          data: courseData.timeSpent,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
}

// Function to add a new course
function addCourse(courseName, progress, timeSpent) {
  courseData.labels.push(courseName);
  courseData.progress.push(progress);
  courseData.timeSpent.push(timeSpent);

  updateDashboardMetrics();
  renderCharts(); // Re-render charts
}

// Function to update the course list on the homepage
function updateCourseList() {
  const courseList = document.getElementById("courseList");
  courseList.innerHTML = "";

  courseData.labels.forEach((course, index) => {
    const courseItem = document.createElement("div");
    courseItem.classList.add("course");
    courseItem.innerHTML = `
          <h4>${course}</h4>
          <p>Progress: ${courseData.progress[index]}%</p>
          <p>Time Spent: ${courseData.timeSpent[index]} hours</p>
      `;
    courseList.appendChild(courseItem);
  });
}

// Event listener for the "Add Course" button
document.getElementById("addCourseButton").addEventListener("click", () => {
  const newCourse = prompt("Enter course name:");
  const newProgress = parseInt(prompt("Enter course progress (%):"));
  const newTimeSpent = parseInt(prompt("Enter time spent on course (hours):"));

  if (newCourse && !isNaN(newProgress) && !isNaN(newTimeSpent)) {
    addCourse(newCourse, newProgress, newTimeSpent);
  } else {
    alert("Please enter valid data.");
  }
});

// Function to populate learners list on learners page
function populateLearnersList() {
  const learnersList = document.getElementById("learnersList");
  const learners = [
    { name: "Arnav", course: "Introduction to React", status: "Completed" },
    { name: "Ankit", course: "Advanced JavaScript", status: "In Progress" },
    { name: "Lavanya", course: "Mastering CSS", status: "Not Started" },
    { name: "Mehak", course: "Responsive Web Design", status: "Completed" },
    { name: "IILM", course: "Devops course", status: "Completed" },
  ];

  learners.forEach((learner) => {
    const learnerItem = document.createElement("div");
    learnerItem.classList.add("learner");
    learnerItem.innerHTML = `
          <h4>${learner.name}</h4>
          <p>Course: ${learner.course}</p>
          <p>Status: ${learner.status}</p>
      `;
    learnersList.appendChild(learnerItem);
  });
}

// Ensure learners data is populated on page load for learners page
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();
  if (currentPage === "learners.html") {
    populateLearnersList();
  }
});

// Initial render
updateDashboardMetrics();
renderCharts();
