let passenger;
let flight;
let baggage;
let seat;

try {
  passenger = JSON.parse(localStorage.getItem("greenskyPassenger") || "null");
  flight = JSON.parse(localStorage.getItem("greenskyFlight") || "null");
  baggage = JSON.parse(localStorage.getItem("greenskyBaggage") || "null");
  seat = localStorage.getItem("greenskySeat");
} catch (error) {
  passenger = null;
  flight = null;
  baggage = null;
  seat = "";
}

if (!passenger || !flight || !baggage || !seat) {
  window.location.href = "p2.html";
} else {
  document.getElementById("passOriginCode").textContent = flight.originCode;
  document.getElementById("passOrigin").textContent = flight.origin;
  document.getElementById("passDestinationCode").textContent = flight.destinationCode;
  document.getElementById("passDestination").textContent = flight.destination;
  document.getElementById("passName").textContent = passenger.name;
  document.getElementById("passFlight").textContent = passenger.flight;
  document.getElementById("passDate").textContent = flight.date;
  document.getElementById("passTime").textContent = flight.boarding || flight.departure;
  document.getElementById("passSeat").textContent = seat;
  document.getElementById("passGate").textContent = flight.gate;
  document.getElementById("passPnr").textContent = passenger.pnr;
  document.getElementById("stubPnr").textContent = passenger.pnr;
  document.getElementById("passBags").textContent =
    (baggage.bagCount + baggage.extraBags) + " bag(s) · " + baggage.totalWeight + " kg";

  const qrCode = document.getElementById("qrCode");
  for (let i = 0; i < 81; i += 1) {
    const square = document.createElement("i");
    if ((i * 7 + passenger.pnr.length * 3) % 4 !== 0) {
      square.className = "qr-dark";
    }
    qrCode.append(square);
  }
}

document.getElementById("printPass").addEventListener("click", function () {
  window.print();
});

document.getElementById("downloadPass").addEventListener("click", function () {
  const passText = [
    "GREEN SKY AIRLINES - BOARDING PASS",
    "Passenger: " + document.getElementById("passName").textContent,
    "PNR: " + document.getElementById("passPnr").textContent,
    "Flight: " + document.getElementById("passFlight").textContent,
    "From: " + document.getElementById("passOrigin").textContent,
    "To: " + document.getElementById("passDestination").textContent,
    "Date: " + document.getElementById("passDate").textContent,
    "Boarding: " + document.getElementById("passTime").textContent,
    "Gate: " + document.getElementById("passGate").textContent,
    "Seat: " + document.getElementById("passSeat").textContent,
    "Baggage: " + document.getElementById("passBags").textContent,
    "Status: CHECKED IN"
  ].join("\n");
  const file = new Blob([passText], { type: "text/plain" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = "greensky-boarding-pass.txt";
  link.click();
  URL.revokeObjectURL(url);
});
