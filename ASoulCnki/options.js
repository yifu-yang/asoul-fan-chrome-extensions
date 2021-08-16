
let page = document.getElementById("buttonDiv");
let selectedClassName = "current";
const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];

let ava = {"name":"顶晚人","icon":"","color":"#9AC8E2","bid":"672346917"};
let bella = {"name":"贝极星","icon":"","color":"#DB7D74","bid":"672353429"};
let carol = {"name":"皇珈骑士","icon":"","color":"#B8A6D9","bid":"351609538"};
let diana = {"name":"嘉心糖","icon":"","color":"#E799B0","bid":"672328094"};
let eileen = {"name":"乃淇淋","icon":"","color":"#576690","bid":"672342685"};

const asoul = [ava,bella,carol,diana,eileen];

// Reacts to a button click by marking the selected button and saving
// the selection
function handleButtonClick(event) {
  // Remove styling from the previously selected color
  let current = event.target.parentElement.querySelector(
    `.${selectedClassName}`
  );
  if (current && current !== event.target) {
    current.classList.remove(selectedClassName);
  }

  // Mark the button as selected
  let color = event.target.dataset.color;
  event.target.classList.add(selectedClassName);
  console.log(color);
  chrome.storage.sync.set({ color });
}

// Add a button to the page for each supplied color
function constructOptions(buttonColors) {
  chrome.storage.sync.get("color", (data) => {
    let currentColor = data.color;
    // For each color we were provided…
    for (let buttonColor of buttonColors) {
      // …create a button with that color…
      let button = document.createElement("button");
      let name = document.createTextNode("name");
      button.dataset.color = buttonColor.color;
      name.textContent = buttonColor.name;
      let idol = document.createElement("idol");
      idol.appendChild(button);
      idol.appendChild(name);
      button.style.backgroundColor = buttonColor.color;
      // …mark the currently selected color…
      if (buttonColor === currentColor) {
        button.classList.add(selectedClassName);
      }

      // …and register a listener for when that button is clicked
      button.addEventListener("click", handleButtonClick);
      page.appendChild(idol);
    }
  });
}

// Initialize the page by constructing the color options
//constructOptions(presetButtonColors);
constructOptions(asoul);