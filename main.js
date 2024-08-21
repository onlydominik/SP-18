
const form = document.querySelector("#contact-form");
const formData = new FormData(form);

let firstNameIsCorrect = true;
let lastNameIsCorrect = true;
let emailIsCorrect = true;
let textareaIsCorrect = false;
let nowe;

let msg ="";
const handleFirstName = () => {
    msg = firstName.dataset.err;
    showErrMsg(firstNameIsCorrect, firstName, msg)
}

const handleLastName = () => {
    msg = lastName.dataset.err;
    showErrMsg(lastNameIsCorrect, lastName, msg)
}

const handleEmail = () => {
    msg = email.dataset.err;
    showErrMsg(emailIsCorrect, email, msg)
}
const handleTextarea = () => {
    msg = textarea.dataset.err;
    showErrMsg(textareaIsCorrect, textarea, msg)
}


const showErrMsg = (cos, elem, msg) => {  
    document.querySelector(".btn").disabled = !wlaczone;
    if(!elem.value) {
        document.querySelector(".invalid-value-msg--" + elem.id).innerHTML = msg;
        wlaczone = false;
        return;
    }  
        document.querySelector(".invalid-value-msg--" + elem.id).innerHTML = "";
     
        wlaczone = true;

      
     
}
//$: wlaczone = firstNameIsCorrect && lastNameIsCorrect && emailIsCorrect && textareaIsCorrect;
$: wlaczone = false;


form.addEventListener("keydown", () => {
 
    document.querySelector(".btn").disabled = !wlaczone;
});






