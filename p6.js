let passenger;
let baggage;

try {
  passenger = JSON.parse(localStorage.getItem("greenskyPassenger") || "null");
  baggage = JSON.parse(localStorage.getItem("greenskyBaggage") || "null");
} catch (error) {
  passenger = null;
  baggage = null;
}

if (!passenger || !baggage || !localStorage.getItem("greenskySeat")) {
  window.location.href = "p2.html";
} else {
  try {
    const completed = JSON.parse(localStorage.getItem("greenskyCompleted") || "[]");
    const alreadyAdded = completed.some(function (item) {
      return item.pnr === passenger.pnr;
    });

    if (!alreadyAdded) {
      completed.push({
        pnr: passenger.pnr,
        name: passenger.name,
        flight: passenger.flight,
        seat: localStorage.getItem("greenskySeat")
      });
      localStorage.setItem("greenskyCompleted", JSON.stringify(completed));
    }
  } catch (error) {
    document.querySelector(".description").textContent =
      "Your check-in is complete. Browser storage could not save the dashboard update.";
  }
}
