const bagCountInput = document.getElementById("bagCount");
const bag1Input = document.getElementById("bag1Weight");
const bag2Input = document.getElementById("bag2Weight");
const extraBagsInput = document.getElementById("extraBags");

function updateBagSummary() {
  const bagCount = Number(bagCountInput.value);
  const bag1 = Number(bag1Input.value) || 0;
  const bag2 = Number(bag2Input.value) || 0;
  const total = (bagCount > 0 ? bag1 : 0) + (bagCount > 1 ? bag2 : 0);
  const extraWeight = Math.max(total - 20, 0);
  let charge = 0;

  if (extraWeight > 0 && extraWeight <= 5) {
    charge = 500;
  } else if (extraWeight <= 10 && extraWeight > 5) {
    charge = 1000;
  } else if (extraWeight > 10) {
    charge = 2000;
  }

  bag2Input.disabled = bagCount < 2;
  document.getElementById("totalWeight").textContent = total.toFixed(1).replace(/\.0$/, "");
  document.getElementById("extraWeight").textContent = extraWeight.toFixed(1).replace(/\.0$/, "");
  document.getElementById("bagCharge").textContent = charge.toLocaleString("en-IN");
}

try {
  const saved = JSON.parse(localStorage.getItem("greenskyBaggage") || "null");
  if (saved) {
    bagCountInput.value = saved.bagCount;
    bag1Input.value = saved.bag1;
    bag2Input.value = saved.bag2;
    extraBagsInput.value = saved.extraBags;
  }

  const passenger = JSON.parse(localStorage.getItem("greenskyPassenger") || "null");
  const seat = localStorage.getItem("greenskySeat");
  if (!passenger || !seat) {
    window.location.href = "p2.html";
  }
} catch (error) {
  window.location.href = "p2.html";
}

[bagCountInput, bag1Input, bag2Input, extraBagsInput].forEach(function (input) {
  input.addEventListener("input", updateBagSummary);
  input.addEventListener("change", updateBagSummary);
});

document.getElementById("baggageForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const bagCount = Number(bagCountInput.value);
  const bag1 = Number(bag1Input.value);
  const bag2 = Number(bag2Input.value);
  const extraBags = Number(extraBagsInput.value);
  const error = document.getElementById("bagError");
  error.textContent = "";

  if (!Number.isInteger(bagCount) || bagCount < 0 || bagCount > 2 ||
      !Number.isInteger(extraBags) || extraBags < 0 || extraBags > 5) {
    error.textContent = "Enter a valid number of bags.";
    return;
  }

  if (!Number.isFinite(bag1) || bag1 < 0 || bag1 > 50 ||
      !Number.isFinite(bag2) || bag2 < 0 || bag2 > 50) {
    error.textContent = "Each bag must weigh between 0 and 50 kg.";
    return;
  }

  if ((bagCount > 0 && bag1 <= 0) || (bagCount > 1 && bag2 <= 0)) {
    error.textContent = "Add the weight for each bag you are checking.";
    return;
  }

  const total = (bagCount > 0 ? bag1 : 0) + (bagCount > 1 ? bag2 : 0);
  const charge = Number(document.getElementById("bagCharge").textContent.replace(",", ""));
  localStorage.setItem("greenskyBaggage", JSON.stringify({
    bagCount: bagCount,
    bag1: bag1,
    bag2: bag2,
    extraBags: extraBags,
    totalWeight: total,
    charge: charge
  }));
  window.location.href = "p6.html";
});

updateBagSummary();
