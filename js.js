'use strict';

// Contact list array.
const users = [
    {
        name: "David Zinger",
        email: "Davidzinger@gmail.com",
        number: "052-3456635",
        address: "afek, Kiryat Bialik",
        img: 'accests/cont 2.jpeg',
        text: 'A1+B drivers license'
    },
    {
        name: "Taylor Swift",
        email: "Taylorswift@gmail.com",
        number: "053-6756640",
        address: "Rotshild, Tel-Aviv",
        img: 'accests/taylor.jpeg',
        text: 'has 1B$ networth'  
    },
    {
        name: "Michael Jackson",
        email: "Michaeljackson@gmail.com",
        number: "053-6777633",
        address: "Taxes, USA",
        img: 'accests/michael jackson.jpeg',
        text: 'has A1+B drivers license'
    },
    {
        name: "Sarah Netanyahu",
        email: "Sarahnetanyahu@gmail.com",
        number: "052-6677635",
        address: "Alonim, Caesarea",
        img: 'accests/sarah netanyahu.jpeg',
        text: 'a company owner of a well known hair brand'
    },
    {
        name: "John Lennon",
        email: "Johnlennon@gmail.com",
        number: "052-66724537",
        address: "New-York, USA",
        img: 'accests/john lennon.jpeg',
        text: 'A1 drivers license'
    }
];

//Saving the ul that contains all li contacts.
let list = document.querySelector(".contact-list");
//Saving the original content of the array and the inner HTML list.
const originalArr = [...users];
const ogHtml = list.innerHTML;

//Updating the li in the page.
function updateList(contactsToDisplay = users) {
list.innerHTML = ''; // Clear the existing list
//Sort alphabetically
contactsToDisplay.sort((a, b) => a.name.localeCompare(b.name));
    contactsToDisplay.forEach((elem, index) => {
        const contact = document.createElement('li');
        contact.className = "contact";
        contact.innerHTML = `
          <div class="contact-info">
            <img class="contact-pic" src="${elem.img}" alt="contact">
            <span class="name">${elem.name}</span>
            <span class="number">${elem.number}</span>
          </div>
          <span class="infoBtn">
            <button class="B2" onclick="addOrEdit(${index})">
               <img alt="icon" src="accests/edit contact icon.png" style="width: 20px; height: 20px;">
            </button>
            <button class="B2" onclick="deleteUser(${index})">
              <img alt="icon" src="accests/delete contact icon.png" style="width: 20px; height: 20px;">
            </button> 
            <button class="B2" onclick="infoPopup(${index})">
              <img alt="icon" src="accests/info icon.png" style="width: 20px; height: 20px;">
            </button> 
          </span>
        `;
        list.append(contact);
    });
//hover contacts effect
const contactList = document.querySelectorAll('.contact');
contactList.forEach(contact => {
    //Adding event mouseover
    contact.addEventListener('mouseover', () => {
    contact.classList.add('hover');
    });
    //Adding event mouseout 
    contact.addEventListener('mouseout', () => {
    contact.classList.remove('hover');
    });
});
    message(); //Checking if the array is empty and display a message if it is.
}
updateList(); //calling for the function that updates the list.


//Search contacts.
function searchContacts() {
    const search = document.querySelector('#searchInput').value.toLowerCase();
    const filteredContacts = [];
    for (let i = 0; i < users.length; i++) {
        if (users[i].name.toLowerCase().indexOf(search) !== -1) {
            filteredContacts.push(users[i]);       
        }
    }
    updateList(filteredContacts);
}


//Function that opens the popup in which we can enter new data.
function addOrEdit(index) {
    const popup = document.getElementById('myPopup');
    popup.style.display = 'flex';
    const form = popup.querySelector("#contact-form");
    form.querySelector("#inputIndex").value = index === undefined ? -1 : index;

    if (index !== undefined && index !== -1) {//if the user is editing an existing contact,
    //show his existing info (index is undefined when its a new contact).
        form.querySelector("#inputName").value = users[index].name;
        form.querySelector("#inputEmail").value = users[index].email;
        form.querySelector("#inputNumber").value = users[index].number;
        form.querySelector("#inputAddress").value = users[index].address;
        form.querySelector("#inputImg").value = users[index].img;
        form.querySelector("#freeText").value = users[index].text;
    } 
    else {//if the user wants to add a new contact, clear the feilds.
        form.querySelector("#inputName").value = '';
        form.querySelector("#inputEmail").value = '';
        form.querySelector("#inputNumber").value = '';
        form.querySelector("#inputAddress").value = '';
        form.querySelector("#inputImg").value = '';
        form.querySelector("#freeText").value = '';
    }
}

//The popup window for contact's information.
const info = document.getElementById('infoPopup');
function infoPopup(index) {
    info.style.display = 'flex';

    //Clearing up the previous fields content.
    info.querySelector("#infoName").textContent = '';
    info.querySelector("#infoNumber").textContent = '';
    info.querySelector("#infoAddress").textContent = '';
    info.querySelector("#infoEmail").textContent = '';
    info.querySelector("#infoText").textContent = '';

    //name and number are requierd feilds, they cannot be empty.
    info.querySelector("#infoName").textContent = `Name: ${users[index].name}`;
    info.querySelector("#infoNumber").textContent = `Number: ${users[index].number}`;

    //saving the pressed contact info.
    let address = users[index].address;
    let email = users[index].email;
    let text = users[index].text;

    //checking if the attributes are not empty and if they are, clear the row.
    if (address !== '')
        info.querySelector("#infoAddress").textContent = `Address: ${users[index].address}`;
    if (email !== '')
        info.querySelector("#infoEmail").textContent = `Email: ${users[index].email}`;
    if (text !== '')
        info.querySelector("#infoText").textContent = `Free Text: ${users[index].text}`;
}


//Save button inside the popup.
function saveInfo(event) {
    event.preventDefault();//not saving the form till all the checkups are done.
    const index = document.getElementById('inputIndex').value;
    const name = document.getElementById('inputName').value;
    const email = document.getElementById('inputEmail').value;
    const number = document.getElementById('inputNumber').value;
    const address = document.getElementById('inputAddress').value;
    const img = document.getElementById('inputImg').value;
    const text = document.getElementById('freeText').value;

for(let i=0; i<users.length; i++) //if the user is trying to add a new contact with an existing
// contact name, alert a message and dont save.
    if(name === users[i].name && i != index){
        alert("this contact already exists in the phone book.")
        return ;//so that the func will stop running. theres no point in checking the rest if the contact exists.
    }
    
if(name !== '' && number !== ''){//not saving unless the requierd fields are filled.
    if (index >= 0) {//If the user is editing a contact.
        users[index] = { name, email, number, address, img, text };
    } 
    else {//If the user is inserting a new contact.
        users.push({ name, email, number, address, img, text });
    }
    updateList();
}
closePopup(event);//Closing the popup after the user presses 'save'.
}


//Function to close the popup when clicking x or outside of the popup (the grey area) or save button.
function closePopup(event) {
    if (event.target === document.getElementById('saveButton') || event.target === document.getElementById('myPopup') || event.target === document.getElementById('infoPopup') || event.target === document.getElementById('closePopupBtn')) {
        document.getElementById('myPopup').style.display = 'none';
        document.getElementById('infoPopup').style.display = 'none';
    }
}

//Checking whether the contact list is empty and if so, a message will appear.
function message() {
    let message = document.querySelector('.emptyMessage');
    if (users.length === 0) {
        message.textContent = 'Oops! It Seems Like This Phone Book Is Empty.';
        message.style.display = '';
    } else {
        document.querySelector('.emptyMessage').style.display = 'none';
    }
}

//Deleting an unwanted contact.
function deleteUser(index) {
    users.splice(index, 1); 
    updateList(); //Calling for the updating func.
}

//Function to delete phone book completely.
function deleteAll() {
    if(confirm("Are you sure want to delete this contact list?")) {
        users.length = 0;
        updateList();
    }
}

//Function for returning to the original page.
function resetList() {
    users.length = 0;
    users.push(...originalArr);
    list.innerHTML = ogHtml;
    updateList();
}

//Efect
function toggleEffect() {
    const body = document.body;
    //if the class is active, remove it.
    if (body.classList.contains('active-effect')) {
        body.classList.remove('active-effect');
    } 
    else {
        //if the class is not active, add it.
        body.classList.add('active-effect');
    }
}

//Event listeners
document.getElementById('contact-form').addEventListener('submit', saveInfo);
document.querySelector('#searchInput').addEventListener('input', searchContacts);
document.getElementById('toggleButton').addEventListener('click', toggleEffect);
