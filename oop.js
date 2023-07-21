const name = document.getElementById("name").value;
const phone = document.getElementById("phone").value;
const email = document.getElementById("email").value;
const contactForm = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");

// class to create a contact
class Contact {
  constructor(name, phone, email) {
    this.name = name;
    this.phone = phone;
    this.email = email;
  }
}

// this class manage all contacts
class ContactManager {
  constructor() {
    this.contacts = this.loadContacts();
    console.log(this.contacts);
  }

  addContact(contact) {
    this.contacts.push(contact);
    this.saveContacts();
    // console.log(this.contacts);
  }

  deleteContact(index) {
    this.contacts.splice(index, 1);
    this.saveContacts();
  }

  saveContacts() {
    localStorage.setItem("contacts", JSON.stringify(this.contacts));
  }

  loadContacts() {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    return contacts.map(
      (contact) => new Contact(contact.name, contact.phone, contact.email)
    );
  }
}
const contactManager = new ContactManager();

function renderContacts() {
  contactList.innerHTML = "";

  contactManager.contacts.forEach((contact, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="flexing">
      <div class="items">
      <span>Name: ${contact.name}</span>
        </div>
        <div class="items">
      <span>Phone: ${contact.phone}</span>
        </div>
        <div class="items">
      <span>Email: ${contact.email}</span>
        </div>
      <div class="buttons">
      <button type="button" onclick="deleteuserid(${index})">Delete</button>
      
      </div>
      </div>
    `;
    contactList.appendChild(li);
  });
}

function deleteuserid(index) {
  contactManager.deleteContact(index);
  renderContacts();
}
//this listens to the form when it is submitted
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const newContact = new Contact(name, phone, email);
  contactManager.addContact(newContact);
  contactForm.reset();
  renderContacts();
});

renderContacts();
