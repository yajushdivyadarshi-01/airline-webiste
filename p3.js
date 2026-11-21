const flights = {
  "AI-202": {
    origin: "Delhi",
    originCode: "DEL",
    destination: "Mumbai",
    destinationCode: "BOM",
    date: "19 Nov 2026",
    departure: "10:30 AM",
    boarding: "10:00 AM",
    gate: "G5",
    status: "On Time"
  },
  "AI-305": {
    origin: "Bangalore",
    originCode: "BLR",
    destination: "Kolkata",
    destinationCode: "CCU",
    date: "19 Nov 2026",
    departure: "02:15 PM",
    boarding: "01:45 PM",
    gate: "G3",
    status: "Delayed"
  }
};

let passenger;

try {
  passenger = JSON.parse(localStorage.getItem("greenskyPassenger") || "null");
} catch (error) {
  passenger = null;
}

if (!passenger || !flights[passenger.flight]) {
  window.location.href = "p2.html";
} else {
  const flight = flights[passenger.flight];
  localStorage.setItem("greenskyFlight", JSON.stringify(flight));

  document.getElementById("passengerName").textContent = passenger.name;
  document.getElementById("passengerPnr").textContent = passenger.pnr;
  document.getElementById("passengerFlight").textContent = passenger.flight;
  document.getElementById("originCode").textContent = flight.originCode;
  document.getElementById("originName").textContent = flight.origin;
  document.getElementById("destinationCode").textContent = flight.destinationCode;
  document.getElementById("destinationName").textContent = flight.destination;
  document.getElementById("flightNumber").textContent = passenger.flight;
  document.getElementById("departureTime").textContent = flight.departure + " departure";
  document.getElementById("flightDate").textContent = flight.date;
  document.getElementById("gateNumber").textContent = flight.gate;
  document.getElementById("flightStatus").textContent = flight.status;
}
