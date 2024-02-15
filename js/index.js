import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

// Initialize Firebase
const appSettings = {
  databaseURL:
    "https://shopease-238e6-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app); // Database reference
const shoppingListInDB = ref(database, "products"); // Reference to the "products" node in the database

const inputField = document.getElementById("input-field");
const addButton = document.getElementById("add-btn");
const shoppingList = document.getElementById("shopping-list");

// Listen for changes in the database
onValue(shoppingListInDB, function (snapshot) {
  let productsArray = Object.entries(snapshot.val());
  clearShoppingList(); // Clear the list before adding new items

  // Loop through each product and add it to the list
  for (let i = 0; i < productsArray.length; i++) {
    let currentProduct = productsArray[i]; // Get the current product
    let currentItemID = currentProduct[0]; // Get the ID of the current product
    let currentItemValue = currentProduct[1]; // Get the value of the current product

    addToList(currentItemValue); // Add each product to the list
  }
});

// Function to clear the shopping list in the UI
function clearShoppingList() {
  shoppingList.innerHTML = "";
}

// Function to add an item to the shopping list
function addToList(itemValue) {
  shoppingList.innerHTML += `<li>${itemValue}</li>`;
}

// Event listener for the add button
addButton.addEventListener("click", function () {
  let inputValue = inputField.value;
  push(shoppingListInDB, inputValue);
  clearList();
});

// Function to clear the input field
function clearList() {
  inputField.value = "";
}

// Function to toggle strike-through class on list items
shoppingList.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("strike");
  }
});
