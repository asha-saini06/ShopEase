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
const app = initializeApp(appSettings);

const database = getDatabase(app); // Database reference
const shoppingListInDB = ref(database, "products"); // Reference to the "products" node in the database

document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.getElementById("input-field");
  const addButton = document.getElementById("add-btn");
  const shoppingList = document.getElementById("shopping-list");

  addButton.addEventListener("click", function () {
    let inputValue = inputField.value;
    push(shoppingListInDB, inputValue);
    console.log(inputValue + " added to the list");

    // Clear input field
    inputField.value = "";

    // Add new item to the list
    shoppingList.innerHTML += `<li>${inputValue}</li>`;
  });

  // add .strike class to li items when clicked on them -->
  shoppingList.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      event.target.classList.toggle("strike");
    }
  });
});
