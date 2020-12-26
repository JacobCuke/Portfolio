let submitButton = document.getElementById('submitButton');
let inputText = document.getElementById('inputText');
let list = document.getElementById('todoList');
let items = document.querySelectorAll('#todoList li');

function addListItem() {
  let newItem = document.createElement('li');
  newItem.innerText = inputText.value;
  list.appendChild(newItem);
  newItem.addEventListener('click', listClicked);
  inputText.value = "";
}

function keyPressed(e) {
  if (e.keyCode == 13 && inputText.value.length > 0) {
    addListItem();
  }
}

function listClicked(e) {
  if (this.style.backgroundColor == 'rgb(26, 255, 5)') {
    this.style.backgroundColor = null;
    this.style.color = null;
  } else {
    this.style.backgroundColor = '#1aff05';
    this.style.color = '#c9c7c6';
  }
}

document.addEventListener('keypress', keyPressed);

for (const item of items) {
  item.addEventListener('click', listClicked);
}
