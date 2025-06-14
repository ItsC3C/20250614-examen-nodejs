document.addEventListener("DOMContentLoaded", function () {
  const categorySelect = document.getElementById("category");
  const prioritySelect = document.getElementById("priority");
  const form = categorySelect.closest("form");

  // Als de gebruiker iets selecteert, herlaad pagina met query
  categorySelect.addEventListener("change", () => form.submit());
  prioritySelect.addEventListener("change", () => form.submit());

  // Taken ophalen van API en tonen in de tabel
  async function fetchTasks() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const apiUrl = `/api/tasks?${urlParams}`;
      const res = await fetch(apiUrl);
      const tasks = await res.json();

      const tableBody = document.getElementById("task-table-body");
      tableBody.innerHTML = "";

      tasks.forEach((task) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${task.title}</td>
          <td>${task.description}</td>
          <td>${task.category}</td>
          <td>${task.priority}</td>
          <td>${
            task.dueDate
              ? new Date(task.dueDate).toISOString().slice(0, 10)
              : ""
          }</td>
        `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Fout bij ophalen van taken:", error);
    }
  }

  // Start
  fetchTasks();
});
