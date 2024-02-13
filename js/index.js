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

onValue(shoppingListInDB, function (snapshot) {
  let productsArray = Object.values(snapshot.val());
  clearShoppingList(); // Clear the list before adding new items

  // for loop to console log each product
  for (let i = 0; i < productsArray.length; i++) {
    let currentProduct = productsArray[i]; // Get the current product
    addToList(currentProduct); // Add each product to the list
  }
});

function clearShoppingList() {
  shoppingList.innerHTML = "";
}

addButton.addEventListener("click", function () {
  let inputValue = inputField.value;

  push(shoppingListInDB, inputValue);

  clearList();
});

function clearList() {
  inputField.value = "";
}

function addToList(itemValue) {
  // Add new item to the list
  shoppingList.innerHTML += `<li>${itemValue}</li>`;
  // console.log("Item added to the list:", itemValue);
}

// add .strike class to li items when clicked on them
shoppingList.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("strike");
  }
});
