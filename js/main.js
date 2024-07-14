let addNewBtn=document.querySelector(".addNew");
let form=document.querySelector(".form");
let contactForm=document.querySelector(".addNewContact");
let closeFormContact=document.querySelector(".close");


addNewBtn.addEventListener('click',()=>{
    saveBtn.textContent="Save";
    form.classList.add("overlay");
    contactForm.style.display="block";
    
})
closeFormContact.addEventListener('click',()=>{
    resetFormContact();
    form.classList.remove("overlay");
    contactForm.style.display="none";
    
})





/*complate table*/

let contactFormName=document.getElementById("contact_form_name");
let contactFormPhone=document.getElementById("contact_form_phone");
let contactFormEmail=document.getElementById("contact_form_email");
let contactFormAddress=document.getElementById("contact_form_address");

let saveBtn=document.querySelector(".save");
////////create new contact////////////////
let contactList;
if(localStorage.contact!=null){
    contactList=JSON.parse(localStorage.contact)
}
else{
    contactList=[]
}

let mode="Save";
let tmp;

let newContact=()=>{
        if(mode==="Save"){
            contactList.push({
                contactName: contactFormName.value,
                contactPhone: contactFormPhone.value,
                contactEmail: contactFormEmail.value,
                contactAddress: contactFormAddress.value
            });
            ShowAlert("Contact Added Successfully!","success")
        }else{
            contactList[tmp]={
                contactName: contactFormName.value,
                contactPhone: contactFormPhone.value,
                contactEmail: contactFormEmail.value,
                contactAddress: contactFormAddress.value
            }
            mode="Save";
            ShowAlert("Update Success! ","success")
        }

        
        localStorage.setItem("contact",JSON.stringify(contactList));
    
    
    
}


//////////////////////add contacts to body/////////////////////

function renderContacts(){
    let contactTableTbody=document.getElementById("tbody");
    let tr='';
    for (let i = 0; i < contactList.length; i++) {
        tr +=`
        <tr>
            <td>${i}</td>
            <td>${contactList[i].contactName}</td>
            <td>${contactList[i].contactPhone}</td>
            <td>${contactList[i].contactEmail}</td>
            <td>${contactList[i].contactAddress}</td>
            <td class="green" onclick="editContact(${i})">edit</td>
            <td class="red" onclick="deleteContact(${i})">delete</td>
        </tr>`
    }
    
    contactTableTbody.innerHTML=tr;
}

renderContacts();


////////////////////////reset form data//////////////////
let resetFormContact=()=>{
    contactFormName.value='';
    contactFormPhone.value='';
    contactFormEmail.value='';
    contactFormAddress.value='';
}

let saveBtnHandler=()=>{
    if (contactFormName.value!='') {
        newContact();
        renderContacts();
        resetFormContact();
        
        form.classList.remove("overlay");
        contactForm.style.display="none";
        
    }
    else{
        form.classList.add("overlay");
        contactForm.style.display="block";
        let btnAlert=document.getElementById("liveAlertPlaceholder");
        btnAlert.classList.add("error");
        ShowAlert("Full Name Required !","danger")
    }
    
}

saveBtn.addEventListener('click',saveBtnHandler);


///////////////////////delete contact/////////////////////////

function deleteContact(i){
    contactList.splice(i,1)
    localStorage.setItem("contact",JSON.stringify(contactList))
    renderContacts();
}


function editContact(i){
    contactFormName.value=contactList[i].contactName;
    contactFormEmail.value=contactList[i].contactEmail;
    contactFormPhone.value=contactList[i].contactPhone;
    contactFormAddress.value=contactList[i].contactAddress;
    saveBtn.textContent="Update";
    form.classList.add("overlay");
    contactForm.style.display="block";

    mode="Update";

    tmp=i;
   }
/* contactTableTbody.addEventListener('click',e=>{
    if(e.target.classList.contains("green")){
        let tr=e.target.parentElement;
        let id= tr.dataset.id;
        let index=parseInt(id)-1;
        contactFormName.value=contactList[index].contactName;
        contactFormPhone.value=contactList[index].contactPhone;
        contactFormEmail.value=contactList[index].contactEmail;
        contactFormAddress.value=contactList[index].contactAddress;

        form.classList.add("overlay");
        contactForm.style.display="block";


        let updateHandeler=()=>{
            let updatedContact={
            contactId: parseInt(id),
            contactName: contactFormName.value,
            contactPhone: contactFormPhone.value,
            contactEmail: contactFormEmail.value,
            contactAddress: contactFormAddress.value
            };
            contactList[index]=updatedContact;
            localStorage.setItem("contact",JSON.stringify(contactList));
            form.classList.remove("overlay");
            contactForm.style.display="none";

            resetFormContact();
            renderContacts();
            saveBtn.removeEventListener('click',updateHandeler);
            saveBtn.addEventListener('click',saveBtnHandler);
        }
        saveBtn.removeEventListener('click',saveBtnHandler);
        saveBtn.addEventListener('click',updateHandeler);
    }

    
    if(e.target.classList.contains("red")){
        let tr=e.target.parentElement;
        let id= tr.dataset.id;
        let index=parseInt(id)-1;
        if(contactList.length==1){
            index==0;
        }
        contactList.splice(index,1);
        localStorage.setItem("contact",JSON.stringify(contactList));
        renderContacts();
    }


}); */

/*search logic*/

let searchInput=document.getElementById("search");
let searchform=searchInput.parentElement;

let trs=document.querySelectorAll("tbody tr");

searchform.addEventListener('submit',e=>e.preventDefault());

searchInput.addEventListener('keyup',()=>{
    let searchInputValue=searchInput.value.toLowerCase();
    trs.forEach(tr=>{
        trName=tr.children[1].textContent.toLowerCase();
        console.log(trName);
        if (trName.includes(searchInputValue)) {
            tr.style.display="";
        } else {
            tr.style.display="none";
        }
    })
});

function ShowAlert(message,type){
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}
appendAlert(message, type)

}




