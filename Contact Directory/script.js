// object for storing a contacts 
let contacts = [];



function renderContact(contact) {
  
  localStorage.setItem("contacts", JSON.stringify(contacts));

 
  const list = document.querySelector(".Contact_list");

  const item = document.querySelector(`[data-key='${contact.id}']`);

  if (contact.deleted) {
  
    item.remove();
    return;
  }

  
  const node = document.createElement("article");
  node.setAttribute("class", "person"); 
  node.setAttribute("data-key", contact.id);
   node.innerHTML = `
<img src="${contact.imageurl}">
<div class="contactdetail">
<h1><i class="fas fa-user-circle contactIcon"></i> ${contact.name}</h1>
<p> <i class="fas fa-envelope contactIcon"></i> ${contact.email}</p>
<p><i class="fas fa-phone-alt contactIcon"></i> ${contact.contactnumber}  </p>
</div>
    <button class="delete-contact js-delete-contact">
        <svg fill="var(--svgcolor)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
        </svg>
    </button>
`;
  
  list.append(node);
}

const list = document.querySelector(".Contact_list");
list.addEventListener("click", (event) => {
  if (event.target.classList.contains("js-delete-contact")) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteContact(itemKey);
  }
});

function deleteContact(key) {
  
  const index = contacts.findIndex((item) => item.id === Number(key));
  
  const UpdatedContactObject = {
    deleted: true,
    ...contacts[index],
  };
 
  contacts = contacts.filter((item) => item.id !== Number(key));
  renderContact(UpdatedContactObject);
}


function addContact(name, email, imageurl, contactnumber, id) {
  const contactObject = {
    name: document.getElementById("fullName").value,
    email: document.getElementById("myEmail").value,
    imageurl: document.getElementById("imgurl").value,
    contactnumber: document.getElementById("myTel").value,
    id: Date.now(),
  };

  
  contacts.push(contactObject);
 
  renderContact(contactObject);
}


const form = document.querySelector(".js-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  addContact();
  form.reset();
});


document.addEventListener("DOMContentLoaded", () => {
  const ref = localStorage.getItem("contacts");
  if (ref) {
    contacts = JSON.parse(ref);
    contacts.forEach((t) => {
      renderContact(t);
    });
  }
});

