const occupiedSeats = ["1A", "1D", "2B", "2D", "3A", "3C", "4B", "5A", "5D", "6C", "7B", "8A"];
const seatMap = document.getElementById("seatMap");
const seatContinue = document.getElementById("seatContinue");
let selectedSeat = localStorage.getItem("greenskySeat") || "";

function showSeatMap() {
  seatMap.replaceChildren();

  for (let row = 1; row <= 8; row += 1) {
    const rowNumber = document.createElement("span");
    rowNumber.className = "seat-row-number";
    rowNumber.textContent = row;
    seatMap.append(rowNumber);

    ["A", "B"].forEach(function (letter) {
      makeSeat(row, letter);
    });

    const aisle = document.createElement("span");
    aisle.className = "seat-aisle";
    seatMap.append(aisle);

    ["C", "D"].forEach(function (letter) {
      makeSeat(row, letter);
    });
  }

  document.getElementById("selectedSeat").textContent = selectedSeat || "No seat selected";
  seatContinue.disabled = !selectedSeat;
}

function makeSeat(row, letter) {
  const seatName = row + letter;
  const seat = document.createElement("button");
  seat.type = "button";
  seat.className = "seat-button";
  seat.textContent = letter;
  seat.setAttribute("aria-label", "Seat " + seatName);

  if (occupiedSeats.includes(seatName)) {
    seat.disabled = true;
    seat.classList.add("seat-occupied");
  } else if (seatName === selectedSeat) {
    seat.classList.add("seat-selected");
  }

  seat.addEventListener("click", function () {
    selectedSeat = seatName;
    localStorage.setItem("greenskySeat", selectedSeat);
    showSeatMap();
  });

  seatMap.append(seat);
}

try {
  const passenger = JSON.parse(localStorage.getItem("greenskyPassenger") || "null");
  const flight = JSON.parse(localStorage.getItem("greenskyFlight") || "null");
  if (!passenger || !flight) {
    window.location.href = "p2.html";
  }
} catch (error) {
  window.location.href = "p2.html";
}

seatContinue.addEventListener("click", function () {
  if (!selectedSeat) {
    document.getElementById("seatError").textContent = "Choose a seat before continuing.";
    return;
  }

  window.location.href = "p5.html";
});

showSeatMap();
