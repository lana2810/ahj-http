/* eslint-disable no-console */
import API from "./api";
import formatDate from "./formatDate";

export default class Table {
  constructor() {
    this.data = [];
    this._tbody = document.querySelector(".tbody");
  }

  init() {
    try {
      API.getAllTickets().then((response) => {
        this.data = [...response];
        this.render();
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    this._tbody.innerHTML = "";

    this.data.map((row) => {
      const { id, status, name, description, created } = row;

      const tr = document.createElement("tr");

      const tdId = document.createElement("td");
      tdId.classList.add("ticket-id");
      tdId.classList.add("hidden");
      tdId.textContent = id;
      tr.append(tdId);

      const tdStatus = document.createElement("td");
      const inputStatus = document.createElement("input");
      inputStatus.name = "status";
      inputStatus.type = "checkbox";
      inputStatus.classList.add("input-checkbox");
      inputStatus.classList.add("hidden");
      inputStatus.checked = status;
      const divStatus = document.createElement("div");
      divStatus.classList.add("icon");
      divStatus.classList.add("icon-status");
      tdStatus.append(inputStatus);
      tdStatus.append(divStatus);
      tr.append(tdStatus);

      const tdName = document.createElement("td");
      tdName.classList.add("name");
      tdName.textContent = name;
      const divDescription = document.createElement("div");
      divDescription.classList.add("description");
      divDescription.classList.add("hidden");
      divDescription.textContent = description;
      tdName.append(divDescription);
      tr.append(tdName);

      const tdDate = document.createElement("td");
      tdDate.classList.add("date");
      tdDate.textContent = created ? formatDate(created) : "";
      tr.append(tdDate);

      const tdEdit = document.createElement("td");
      const divEdit = document.createElement("div");
      divEdit.classList.add("icon");
      divEdit.classList.add("icon-edit");
      divEdit.textContent = String.fromCodePoint(9998);
      tdEdit.append(divEdit);
      tr.append(tdEdit);

      const tdDelete = document.createElement("td");
      const divDelete = document.createElement("div");
      divDelete.classList.add("icon");
      divDelete.classList.add("icon-remove");
      divDelete.textContent = String.fromCodePoint(10006);
      tdDelete.append(divDelete);
      tr.append(tdDelete);

      const hr = document.createElement("hr");
      tr.append(hr);

      this._tbody.prepend(tr);

      return tr;
    });
  }
}
