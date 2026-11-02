# 🚌 S-Ticket | Smart Bus Ticketing System

A responsive bus ticket booking website that provides a simple and interactive ticket reservation experience. Users can explore travel offers, select seats, apply discount coupons, enter passenger details, and review their booking summary.

## 🌐 Live Demo

**[View Live Website](https://nazmussakib-dev.github.io/smart-ticketing/)**

## 📸 Preview

![S-Ticket Website Preview](images/banner.png)

## ✨ Features

- **Responsive Design:** Optimized for desktop, tablet, and mobile devices.
- **Dynamic Seat Selection:** Interactive seat layout with 40 seats (A1–J4).
- **Seat Selection Limit:** Users can select a maximum of 4 seats per booking.
- **Real-time Booking Summary:** Automatically updates selected seats, seat count, subtotal, and total fare.
- **Discount Coupons:** Supports promotional discount codes:
  - `NEWBIE15` – 15% discount.
  - `COUPLE20` – 20% discount.
- **Passenger Information:** Collects passenger name, phone number, and optional email address.
- **Booking Confirmation:** Displays a summary of passenger details, selected seats, and total fare.
- **Dynamic Footer Year:** Automatically displays the current year.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| Tailwind CSS v4 | Utility-first styling |
| DaisyUI v5 | UI components |
| Vanilla JavaScript (ES6+) | Booking functionality and DOM manipulation |
| Google Fonts (Inter) | Typography |

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/nazmussakib-dev/smart-ticketing.git
```

### 2. Navigate to the Project Directory

```bash
cd smart-ticketing
```

### 3. Run the Project

Open `index.html` in your browser.

You can also use the **Live Server** extension in Visual Studio Code for a better development experience.

> Note: The project uses CDN-based dependencies, so an active internet connection is required to load Tailwind CSS, DaisyUI, and Google Fonts.

## 📁 Project Structure

```text
smart-ticketing/
│
├── images/
│   ├── banner.png
│   ├── bus-icon.png
│   ├── bus-logo.png
│   ├── coupon-devider.png
│   ├── fare.png
│   ├── info-devider.png
│   ├── people.png
│   ├── playstore.png
│   ├── seat-gray.png
│   ├── seat-green.png
│   ├── seat-green-filled.png
│   ├── stoppage.png
│   ├── success.png
│   ├── ticket-cupon.png
│   └── wheel.png
│
├── scripts/
│   └── main.js
│
├── index.html
├── style.css
└── README.md
```

## 🎟️ Booking Rules

| Item | Details |
|---|---|
| Seat Price | BDT 550 per seat |
| Total Available Seats | 40 |
| Maximum Seats per Booking | 4 |
| NEWBIE15 | 15% discount |
| COUPLE20 | 20% discount |

## 🧠 Key JavaScript Concepts Practiced

This project helped me practice several fundamental JavaScript concepts:

- DOM Manipulation
- Event Handling and Event Listeners
- Arrays and Objects
- Functions and Scope
- Loops and Conditional Statements
- Array Methods (`indexOf()`, `push()`, `splice()`)
- DOM Element Creation (`createElement()`)
- DOM Manipulation (`appendChild()`, `replaceChildren()`)
- CSS Class Manipulation (`classList`)
- Form Handling and Validation
- Template Literals
- Dynamic Content Rendering

## ⚠️ Project Limitations

This is a frontend demonstration project. It does not currently include:

- Backend integration or database storage.
- Real-time seat availability or reservation locking.
- Online payment processing.
- User authentication.
- Persistent booking records.

## 👨‍💻 Author

**Nazmus Sakib**

Undergraduate Student  

Department of Computer Science and Engineering 

Jagannath University, Dhaka

- GitHub: [@nazmussakib-dev](https://github.com/nazmussakib-dev)

---

⭐ If you find this project interesting, consider giving the repository a star!
