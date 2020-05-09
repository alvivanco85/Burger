const devourButtons = document.querySelectorAll(".devourButton");
const burgerForm = document.querySelector("#burger-form");
const burgerInput = document.querySelector("#burger-name");
const deleteButton = document.querySelectorAll(".deleteButton"); 

deleteButton.forEach(button => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    deleteBurger(button);
  })
});

function deleteBurger(element) {
  const id = element.dataset.burgerid;
  fetch(`/api/devour/${id}`, {
    method: "DELETE",
  }).then(response => {
    return response.json();
  }).then(data => {
    console.log(data);
    location.reload();
  }).catch(err => {
    console.log(err);
  });
};

devourButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    devourClick(button);
  });
});

function devourClick(elem) {
  const id = elem.dataset.burgerid; 
  const devoured = elem.dataset.devoured;
  console.log(id);
  if (parseInt(devoured)) {
    console.log("already been eaten");
    return;
  }

  const data = {devoured: true};

  fetch(`/api/devour/${id}`, {
    method: "PUT",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }).then(response => {
    return response.json();
  }).then(data => {
    console.log(data);
    location.reload();
  }).catch(err => {
    console.log(err);
  });
};

burgerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const burgerName = burgerInput.value;
  if (burgerName.length <= 0) return;
  const data = {burger_name: burgerName}; 
  fetch("/api/create", {
    method: "POST",
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify(data)
  }).then(response => {
    return response.json();
  }).then(data => {
    console.log(data);
    location.reload();
  }).catch(err => {
    console.log(err);
  });
});