document.addEventListener("DOMContentLoaded", () => {
    const pages = {
        login: document.getElementById("login-page"),
        movies: document.getElementById("movies-page"),
        seats: document.getElementById("seats-page"),
        confirmation: document.getElementById("confirmation-page"),
    };

    const loginBtn = document.getElementById("login-btn");
    const reserveBtns = document.querySelectorAll(".reserve-btn");
    const confirmSeatsBtn = document.getElementById("confirm-seats-btn");
    const finishBtn = document.getElementById("finish-btn");
    const seats = document.querySelectorAll(".seat");
    const seatFeedback = document.getElementById("seat-feedback");
    const confirmationDetails = document.getElementById("confirmation-details");

    let selectedMovie = "";
    let selectedSeats = [];

    
    function showPage(page) {
        Object.values(pages).forEach(p => p.style.display = "none"); // Hide all pages
        if (pages[page]) {
            pages[page].style.display = "block"; 
        } else {
            console.error(`Page "${page}" not found!`);
        }
    }

    // login
    loginBtn.addEventListener("click", () => {
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        
        if (email && password) {
            console.log("Login Successful! Redirecting to movies page...");
            localStorage.setItem("userEmail", email);
            showPage("movies"); 
        } else {
            document.getElementById("login-feedback").textContent = "Please enter valid credentials.";
            console.warn("Login failed: Missing email or password.");
        }
    });

    // choose available films
    reserveBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            selectedMovie = e.target.getAttribute("data-movie");
            localStorage.setItem("selectedMovie", selectedMovie);
            showPage("seats");
        });
    });

    // select available seats
    seats.forEach((seat) => {
        seat.addEventListener("click", () => {
            if (!seat.classList.contains("occupied")) {
                seat.classList.toggle("selected");
                const seatNumber = seat.getAttribute("data-seat");

                if (selectedSeats.includes(seatNumber)) {
                    selectedSeats = selectedSeats.filter((s) => s !== seatNumber);
                } else {
                    selectedSeats.push(seatNumber);
                }

                seatFeedback.textContent = `Selected Seats: ${selectedSeats.join(", ")}`;
            }
        });
    });

    //confirming chosen seats
    confirmSeatsBtn.addEventListener("click", () => {
        if (selectedSeats.length > 0) {
            localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
            showPage("confirmation");
            confirmationDetails.textContent = `Movie: ${selectedMovie} | Seats: ${selectedSeats.join(", ")}`;
        } else {
            seatFeedback.textContent = "Please select at least one seat.";
        }
    });

    //reservation confirmed
    finishBtn.addEventListener("click", () => {
        alert("Reservation Complete! Thank you.");
        localStorage.clear();
        location.reload(); // Restart process
    });

    //show login
    showPage("login");
});
