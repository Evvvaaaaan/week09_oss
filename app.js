// This array is a display cache. MockAPI stores the final data.
let students = [];
let editingId = null;
let busy = false;
const form = document.querySelector("#student-form");
const message = document.querySelector("#message");
const list = document.querySelector("#student-list");
const nameInput = document.querySelector("#name");
const ageInput = document.querySelector("#age");
const majorInput = document.querySelector("#major");
const yearInput = document.querySelector("#year");

function showMessage(text, isError = false) {
  message.textContent = text;
  message.className = isError ? "error" : "";
}

function setBusy(value) {
  busy = value;
  document.querySelectorAll("button").forEach(function (button) {
    button.disabled = value;
  });
}

async function request(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Request failed (HTTP " + response.status + ").");
  }
  if (response.status === 204) return null;
  return await response.json();
}

async function loadStudents() {
  const data = await request(API_URL);
  if (!Array.isArray(data)) throw new Error("Expected a student array.");
  students = data;
  renderStudents();
}

function renderStudents() {
  list.replaceChildren();
  const visibleStudents = students;
  visibleStudents.forEach(function (student) {
    const row = document.createElement("tr");
    [student.id, student.name, student.age, student.major, student.year].forEach(function (value) {
      const cell = document.createElement("td");
      cell.textContent = value ?? "—";
      row.appendChild(cell);
    });
    const actions = document.createElement("td");
    row.appendChild(actions);
    list.appendChild(row);
  });
  document.querySelector("#count").textContent = visibleStudents.length + " of " + students.length + " students";
}

async function refreshStudents() {
  if (busy) return;
  setBusy(true);
  showMessage("Loading students...");
  try {
    await loadStudents();
    showMessage("Student list loaded.");
  } catch (error) {
    showMessage(error.message, true);
  } finally {
    setBusy(false);
  }
}

document.querySelector("#refresh").addEventListener("click", refreshStudents);
refreshStudents();
