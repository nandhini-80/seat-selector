const container = document.querySelector(".container"); // Selects the element with class "container" and assigns it to the variable 'container'
const seats = document.querySelectorAll(".row .seat:not(.sold)"); // Selects all elements with class "seat" that are descendants of elements with class "row" and do not have the class "sold". Assigns them to the variable 'seats'
const count = document.getElementById("count"); // Selects the element with the ID "count" and assigns it to the variable 'count'
const total = document.getElementById("total"); // Selects the element with the ID "total" and assigns it to the variable 'total'
const movieSelect = document.getElementById("movie"); // Selects the element with the ID "movie" and assigns it to the variable 'movieSelect'

populateUI(); // Calls the function 'populateUI' to populate the user interface with data from localStorage

let ticketPrice = +movieSelect.value; // Retrieves the value of the selected option in the 'movieSelect' dropdown and converts it to a number, assigning it to the variable 'ticketPrice'

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex); // Stores the selected movie index in the localStorage with the key "selectedMovieIndex"
  localStorage.setItem("selectedMoviePrice", moviePrice); // Stores the selected movie price in the localStorage with the key "selectedMoviePrice"
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected"); // Selects all elements with class "seat" that are descendants of elements with class "row" and have the class "selected". Assigns them to the variable 'selectedSeats'

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat)); // Converts the NodeList 'selectedSeats' to an array and maps each seat to its index within the 'seats' array. Assigns the resulting array to the variable 'seatsIndex'

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex)); // Converts 'seatsIndex' array to a JSON string and stores it in the localStorage with the key "selectedSeats"

  const selectedSeatsCount = selectedSeats.length; // Calculates the length of 'selectedSeats' array and assigns it to the variable 'selectedSeatsCount'

  count.innerText = selectedSeatsCount; // Sets the text content of the element with ID "count" to 'selectedSeatsCount'
  
  
  
  total.innerText = selectedSeatsCount * ticketPrice; // Sets the text content of the element with ID "total" to the product of 'selectedSeatsCount' and 'ticketPrice'

  setMovieData(movieSelect.selectedIndex, movieSelect.value); // Calls the 'setMovieData' function to store the selected movie index and price in localStorage
}

// Get data from localStorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")); // Retrieves the value of "selectedSeats" key from localStorage, parses it from a JSON string to an array, and assigns it to the variable 'selectedSeats'

  if (selectedSeats !== null && selectedSeats.length > 0) { // Checks if 'selectedSeats' is not null and has a length greater than 0
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) { // Checks if 'index' exists in 'selectedSeats' array
        seat.classList.add("selected"); // Adds the class "selected" to the current 'seat' element
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex"); // Retrieves the value of "selectedMovieIndex" key from localStorage and assigns it to the variable 'selectedMovieIndex'

  if (selectedMovieIndex !== null) { // Checks if 'selectedMovieIndex' is not null
    movieSelect.selectedIndex = selectedMovieIndex; // Sets the selected index of 'movieSelect' dropdown to 'selectedMovieIndex'
  }
}

// Movie select event
movieSelect.addEventListener("change", (e) => { // Adds an event listener to the 'change' event of 'movieSelect' dropdown
  ticketPrice = +e.target.value; // Retrieves the value of the selected option in the 'movieSelect' dropdown, converts it to a number, and assigns it to 'ticketPrice'
  setMovieData(e.target.selectedIndex, e.target.value); // Calls the 'setMovieData' function to store the selected movie index and price in localStorage
  updateSelectedCount(); // Calls the 'updateSelectedCount' function to update the count and total based on the new ticket price
});

// Seat click event
container.addEventListener("click", (e) => { // Adds an event listener to the 'click' event of the 'container' element
  if (
    e.target.classList.contains("seat") && // Checks if the clicked element has the class "seat"
    !e.target.classList.contains("sold") // Checks if the clicked element does not have the class "sold"
  ) {
    e.target.classList.toggle("selected"); // Toggles the class "selected" on the clicked element

    updateSelectedCount(); // Calls the 'updateSelectedCount' function to update the count and total based on the selected seats
  }
});

// Initial count and total set
updateSelectedCount(); // Calls the 'updateSelectedCount' function to set the initial count and total based on the selected seats
