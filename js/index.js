import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
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
    let currentItem = productsArray[i]; // Get the current product
    let currentItemID = currentItem[0]; // Get the ID of the current product
    let currentItemValue = currentItem[1]; // Get the value of the current product

    addToList(currentItem); // Add each product to the list
  }
});

// Function to clear the shopping list in the UI
function clearShoppingList() {
  shoppingList.innerHTML = "";
}

// Function to add an item to the shopping list
function addToList(item) {
  let itemID = item[0];
  let itemValue = item[1];

  let listItem = document.createElement("li");
  listItem.textContent = itemValue;

  // Attach an event listener to the list item and make it console log the ID when it's pressed
  listItem.addEventListener("click", function () {
    let exactLocationOfItemInDB = ref(database, `products/${itemID}`);
    remove(exactLocationOfItemInDB);
  });

  shoppingList.appendChild(listItem);
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
// shoppingList.addEventListener("click", function (event) {
//   if (event.target.tagName === "LI") {
//     event.target.classList.toggle("strike");
//   }
// });
