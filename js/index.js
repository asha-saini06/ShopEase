import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

// Initialize Firebase
const appSettings = {
  databaseURL:
    "https://shopease-238e6-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings); // Initialize Firebase
const database = getDatabase(app); // Database reference
const shoppingListInDB = ref(database, "products"); // Reference to the "products" node in the database

// Wait for the DOM content to be loaded before adding event listeners
document.addEventListener("DOMContentLoaded", function () {
  // Get references to the input field and the add button
  const inputField = document.getElementById("input-field");
  const addButton = document.getElementById("add-btn");

  // Add event listener to the add button
  addButton.addEventListener("click", function () {
    // Retrieve the value from the input field
    let inputValue = inputField.value;

    push(shoppingListInDB, inputValue); // Add the input value to the database

    // Log the input value to the console
    console.log(inputValue + " added to database.");
  });
});
