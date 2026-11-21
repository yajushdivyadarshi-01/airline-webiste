const totalPassengers = 1284;
let completed = [];

try {
  const saved = JSON.parse(localStorage.getItem("greenskyCompleted") || "[]");
  if (Array.isArray(saved)) {
    completed = saved;
  }
} catch (error) {
  completed = [];
}

const checkedIn = Math.min(986 + completed.length, totalPassengers);
const pending = totalPassengers - checkedIn;
const percentage = Math.round((checkedIn / totalPassengers) * 100);

document.getElementById("totalPassengers").textContent = totalPassengers.toLocaleString("en-IN");
document.getElementById("checkedPassengers").textContent = checkedIn.toLocaleString("en-IN");
document.getElementById("pendingPassengers").textContent = pending.toLocaleString("en-IN");
document.getElementById("checkedPercent").textContent = percentage + "% of passengers";
document.getElementById("donutPercent").textContent = percentage + "%";
document.getElementById("donutChecked").textContent = checkedIn.toLocaleString("en-IN");
document.getElementById("donutPending").textContent = pending.toLocaleString("en-IN");
document.querySelector(".dashboard-donut").style.setProperty("--checked", percentage + "%");
document.getElementById("dashboardDate").textContent =
  new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date());

const rows = document.getElementById("recentPassengers");
completed.slice(-5).reverse().forEach(function (item) {
  const row = document.createElement("tr");
  [item.name, item.flight, item.seat, "Checked in"].forEach(function (value, index) {
    const cell = document.createElement("td");
    cell.textContent = index === 2 ? "Seat " + value : value;

    if (index === 3) {
      const badge = document.createElement("span");
      badge.className = "table-status";
      badge.textContent = "Checked in";
      cell.replaceChildren(badge);
    }

    row.append(cell);
  });

  const routeCell = document.createElement("td");
  routeCell.textContent = item.flight === "AI-202" ? "Delhi → Mumbai" : "Bangalore → Kolkata";
  row.insertBefore(routeCell, row.children[2]);
  rows.prepend(row);
});

document.querySelector(".table-heading > span").textContent =
  (2 + completed.length) + " BOOKINGS";
