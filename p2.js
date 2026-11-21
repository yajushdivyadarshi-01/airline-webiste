const passengers = [
  { pnr: "AI1234", name: "Rahul Sharma", flight: "AI-202" },
  { pnr: "AI5678", name: "Priya Singh", flight: "AI-305" }
];

const searchForm = document.getElementById("searchForm");
const formError = document.getElementById("formError");
const result = document.getElementById("result");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const pnr = document.getElementById("pnr").value.trim().toUpperCase();
  const name = document.getElementById("passengerName").value.trim().toLowerCase();
  formError.textContent = "";
  result.hidden = true;

  if (!pnr && !name) {
    formError.textContent = "Enter your PNR or passenger name to search.";
    return;
  }

  if (pnr && name) {
    formError.textContent = "Please enter either a PNR or a passenger name, not both.";
    return;
  }

  const passenger = passengers.find(function (item) {
    return pnr ? item.pnr === pnr : item.name.toLowerCase() === name;
  });

  if (!passenger) {
    formError.textContent = "We couldn’t find that booking. Check your details and try again.";
    return;
  }

  document.getElementById("resultName").textContent = passenger.name;
  document.getElementById("resultPnr").textContent = passenger.pnr;
  document.getElementById("resultFlight").textContent = passenger.flight;
  const savedPassenger = JSON.parse(localStorage.getItem("greenskyPassenger") || "null");
  if (!savedPassenger || savedPassenger.pnr !== passenger.pnr) {
    localStorage.removeItem("greenskyFlight");
    localStorage.removeItem("greenskySeat");
    localStorage.removeItem("greenskyBaggage");
  }
  localStorage.setItem("greenskyPassenger", JSON.stringify(passenger));
  result.hidden = false;
});
