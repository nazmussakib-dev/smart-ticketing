/* ==========================================
   DOM ELEMENTS
   Grab the HTML elements we'll interact with.
========================================== */

const seatGrid = document.getElementById("seatGrid");
const selectedSeatCount = document.getElementById("selectedSeatCount");
const selectedSeatsList = document.getElementById("selectedSeatsList");

const subtotal = document.getElementById("subtotal");
const totalPrice = document.getElementById("totalPrice");
const seatMessage = document.getElementById("seatMessage");

const couponForm = document.getElementById("couponForm");
const couponMessage = document.getElementById("couponMessage");
const couponCodeInput = document.getElementById("couponCode");

const passengerForm = document.getElementById("passengerForm");
const passengerName = document.getElementById("passengerName");
const passengerPhone = document.getElementById("passengerPhone");
const passengerEmail = document.getElementById("passengerEmail");

const bookingMessage = document.getElementById("bookingMessage");
const successBookingDetails = document.getElementById("successBookingDetails");
const bookingContent = document.getElementById("bookingContent");
const bookingSuccess = document.getElementById("bookingSuccess");

const backToHome = document.getElementById("backToHome");

// Keeps track of seat buttons so we can access them later without querying the DOM.
const seatButtons = new Map();

// Update the footer year automatically.
const currentYear = document.getElementById("currentYear");
const currentYear15 = document.getElementById("currentYear15");
const currentYear20 = document.getElementById("currentYear20");

currentYear.textContent = new Date().getFullYear();
currentYear15.textContent = new Date().getFullYear();
currentYear20.textContent = new Date().getFullYear();

/* ==========================================
   BOOKING CONSTANTS & STATE
========================================== */

const rows = "ABCDEFGHIJ";
const SEAT_PRICE = 550;
const MAX_SEATS = 4;

// Stores the names of currently selected seats.
const selectedSeats = [];

// These values change as the user interacts with the booking interface.
let discountRate = 0;
let grandTotal = 0;
let appliedCoupon = "";

/* ==========================================
   GENERATE SEATS
   Create the seat layout dynamically using loops.
========================================== */

for (const row of rows) {
  const rowLabel = document.createElement("span");

  rowLabel.textContent = row;
  rowLabel.className =
    "flex items-center justify-center text-xs font-medium text-gray-500";

  seatGrid.appendChild(rowLabel);

  // Each row contains four seats.
  for (let number = 1; number <= 4; number++) {
    const seatName = row + number;
    const seat = document.createElement("button");

    seat.type = "button";
    seat.textContent = seatName;

    seat.className =
      "btn btn-sm min-h-8 h-8 w-full border-0 bg-gray-100 text-xs font-medium text-gray-600 hover:bg-green-100";

    // Store each button against its seat name for easy access later.
    seatButtons.set(seatName, seat);

    // Toggle the seat's selection when clicked.
    seat.addEventListener("click", function () {
      const index = selectedSeats.indexOf(seatName);

      if (index === -1) {
        // Don't allow more than the maximum number of seats.
        if (selectedSeats.length >= MAX_SEATS) {
          seatMessage.textContent = `You can select a maximum of ${MAX_SEATS} seats.`;
          return;
        }

        // Add the seat to the selection and update its appearance.
        selectedSeats.push(seatName);

        seat.classList.replace("bg-gray-100", "bg-green-500");
        seat.classList.replace("text-gray-600", "text-white");
      } else {
        // Remove an already selected seat.
        selectedSeats.splice(index, 1);

        seat.classList.replace("bg-green-500", "bg-gray-100");
        seat.classList.replace("text-white", "text-gray-600");
      }

      seatMessage.textContent = "";

      updateBookingSummary();
    });

    seatGrid.appendChild(seat);

    // Add an empty grid cell after the second seat to create the aisle.
    if (number === 2) {
      const aisle = document.createElement("span");

      aisle.setAttribute("aria-hidden", "true");
      seatGrid.appendChild(aisle);
    }
  }
}

/* ==========================================
   UPDATE BOOKING SUMMARY
   Recalculate the fare and refresh selected seats.
========================================== */

function updateBookingSummary() {
  selectedSeatCount.textContent = selectedSeats.length;

  // Calculate the fare after applying any available discount.
  const total = selectedSeats.length * SEAT_PRICE;
  const discount = total * discountRate;
  grandTotal = total - discount;

  subtotal.textContent = `BDT ${total.toLocaleString()}`;
  totalPrice.textContent = `BDT ${grandTotal.toLocaleString()}`;

  // Clear the previous list before rendering the updated one.
  selectedSeatsList.replaceChildren();

  if (selectedSeats.length === 0) {
    const noSeats = document.createElement("p");

    noSeats.textContent = "No seats selected.";
    noSeats.className = "py-2 text-xs text-gray-500";

    selectedSeatsList.appendChild(noSeats);
    return;
  }

  // Render a row for each selected seat.
  for (const seat of selectedSeats) {
    const seatRow = document.createElement("div");

    seatRow.className =
      "grid grid-cols-[1fr_1fr_auto] items-center gap-2 py-2 text-xs";

    const seatLabel = document.createElement("span");
    seatLabel.textContent = seat;

    const seatClass = document.createElement("span");
    seatClass.textContent = "Economy";

    const seatPrice = document.createElement("span");
    seatPrice.className = "text-right";
    seatPrice.textContent = `BDT ${SEAT_PRICE.toLocaleString()}`;

    seatRow.append(seatLabel, seatClass, seatPrice);
    selectedSeatsList.appendChild(seatRow);
  }
}

/* ==========================================
   COUPON HANDLING
   Validate coupon codes and apply discounts.
========================================== */

couponForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // A coupon can only be applied after selecting a seat.
  if (selectedSeats.length === 0) {
    couponMessage.textContent = "Please select at least one seat first.";
    couponMessage.className = "mt-1 text-[10px] text-red-600";
    return;
  }

  // Ignore letter casing and accidental spaces in the input.
  const code = couponCodeInput.value.trim().toUpperCase();

  if (code === "NEWBIE15") {
    if (selectedSeats.length !== 1) {
      couponMessage.textContent =
        "NEWBIE15 can only be applied to a single seat.";
      couponMessage.className = "mt-1 text-[10px] text-red-600";
      return;
    }
  
    discountRate = 0.15;
  } 
  else if (code === "COUPLE20") {
    if (selectedSeats.length % 2 !== 0) {
      couponMessage.textContent =
        "COUPLE20 can only be applied to an even number of seats.";
      couponMessage.className = "mt-1 text-[10px] text-red-600";
      return;
    }
  
    discountRate = 0.2;
  } 
  else {
    discountRate = 0;
    appliedCoupon = "";
  
    couponMessage.textContent = "Invalid coupon code";
    couponMessage.className = "mt-1 text-[10px] text-red-600";
  
    updateBookingSummary();
    return;
  }

  appliedCoupon = code;

  couponMessage.textContent = `${code} applied successfully!`;

  couponMessage.className = "mt-1 text-[10px] text-green-600";

  updateBookingSummary();
});

// Clear the coupon feedback as soon as the user edits the input.
couponCodeInput.addEventListener("input", function () {
  couponMessage.textContent = "";
});

/* ==========================================
   PASSENGER DETAILS & BOOKING CONFIRMATION
========================================== */

// Holds the passenger information after form submission.
let passengerDetails = null;

passengerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // A booking cannot proceed without at least one selected seat.
  if (selectedSeats.length === 0) {
    bookingMessage.textContent = "Please select at least one seat.";

    bookingMessage.className = "text-xs text-red-600";
    return;
  }

  bookingMessage.textContent = "";

  // Collect the passenger information from the form.
  passengerDetails = {
    name: passengerName.value.trim(),
    phone: passengerPhone.value.trim(),
    email: passengerEmail.value.trim(),
  };

  // Prepare the information displayed on the success screen.
  successBookingDetails.replaceChildren();

  const details = [
    ["Passenger", passengerDetails.name],
    ["Phone", passengerDetails.phone],
    ["Email", passengerDetails.email || "Not provided"],
    ["Selected Seats", selectedSeats.join(", ")],
    ["Total Paid", `BDT ${grandTotal.toLocaleString()}`],
  ];

  // Build the confirmation details dynamically.
  for (const [label, value] of details) {
    const row = document.createElement("div");

    row.className =
      "flex justify-between gap-4 border-b border-gray-200 py-3 text-sm";

    const heading = document.createElement("span");
    heading.className = "font-medium text-gray-500";
    heading.textContent = label;

    const content = document.createElement("span");
    content.className = "text-right font-semibold text-gray-900";
    content.textContent = value;

    row.append(heading, content);
    successBookingDetails.appendChild(row);
  }

  // Hide the booking interface and display the confirmation screen.
  bookingContent.classList.add("hidden");

  bookingSuccess.classList.remove("hidden");
  bookingSuccess.classList.add("flex");
});

/* ==========================================
   RESET BOOKING
   Restore the interface when returning home.
========================================== */

backToHome.addEventListener("click", function () {
  // Clear the selected seats from the array.
  selectedSeats.length = 0;

  // Restore every seat button to its default appearance.
  for (const seat of seatButtons.values()) {
    seat.classList.replace("bg-green-500", "bg-gray-100");
    seat.classList.replace("text-white", "text-gray-600");
  }

  // Remove any applied discount and reset the coupon form.
  discountRate = 0;
  appliedCoupon = "";

  couponForm.reset();
  couponMessage.textContent = "";

  // Reset passenger information.
  passengerForm.reset();
  passengerDetails = null;

  // Clear all booking-related messages and confirmation details.
  bookingMessage.textContent = "";
  seatMessage.textContent = "";
  successBookingDetails.replaceChildren();

  // Bring back the booking interface.
  bookingContent.classList.remove("hidden");
  bookingSuccess.classList.add("hidden");
  bookingSuccess.classList.remove("flex");

  // Refresh the summary with the cleared booking state.
  updateBookingSummary();
});
