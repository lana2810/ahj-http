/* eslint-disable */
import Table from "./table";
import API from "./api";
let table = new Table();
let idTicket;

table.init();

const tbody = document.querySelector(".tbody");
const btnAddTicket = document.querySelector(".add-ticket");
const btnCancel = document.querySelectorAll(".cancel");
const btnConfirm = document.querySelector(".confirm-ticket");
const btnConfirmDelete = document.querySelector(".btn-confirm-delete");
const formConfirmDelete = document.querySelector(".form-confirm-delete");
const formTicket = document.querySelector(".form-ticket");
const formTicketTitle = formTicket.querySelector(".form-title");
const inputName = formTicket.querySelector("#name");
const inputDescription = formTicket.querySelector("#description");

const renderForm = ({ id, name, description }) => {
  formTicket.classList.remove("hidden");
  formTicketTitle.textContent = id ? "Изменить тикет" : "Добавить тикет";
  inputName.value = name;
  inputDescription.value = description;
};

btnAddTicket.addEventListener("click", () => {
  idTicket = undefined;
  renderForm({ name: "", description: "" });
});

btnConfirmDelete.addEventListener("click", async (event) => {
  event.preventDefault();
  await API.removeTicket(idTicket);
  table.init();
  formConfirmDelete.classList.add("hidden");
});

btnConfirm.addEventListener("click", async (event) => {
  event.preventDefault();
  const body = new FormData(formTicket);
  if (idTicket) {
    await API.editTicket(idTicket, body);
  } else {
    await API.createTicket(body);
  }
  formTicket.reset();
  formTicket.classList.add("hidden");
  table.init();
});

btnCancel.forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    const currentForm = item.closest(".form");
    currentForm.reset();
    currentForm.classList.add("hidden");
  });
});

tbody.addEventListener("click", async (event) => {
  idTicket = undefined;
  event.preventDefault();
  const { target } = event;

  if (target.classList.contains("name")) {
    const divDescription = target.querySelector(".description");
    divDescription.classList.toggle("hidden");
  }
  if (target.classList.contains("icon-remove")) {
    idTicket = target.closest("tr").querySelector(".ticket-id").textContent;
    formConfirmDelete.classList.remove("hidden");
  }
  if (target.classList.contains("icon-edit")) {
    idTicket = target.closest("tr").querySelector(".ticket-id").textContent;
    const currentItem = await API.getTicketById(idTicket);
    renderForm({
      id: idTicket,
      name: currentItem.name,
      description: currentItem.description,
    });
  }
  if (target.classList.contains("icon-status")) {
    const checkbox = target.closest("td").querySelector(".input-checkbox");
    checkbox.dispatchEvent(new MouseEvent("click"));
    const body = new FormData();
    body.append("status", checkbox.checked);
    idTicket = target.closest("tr").querySelector(".ticket-id").textContent;
    await API.editTicket(idTicket, body);
    table.init();
  }
});
