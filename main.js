
const form = document.querySelector("#contact-form");
const formData = new FormData(form);


console.log(firstName);


let msg = document.createElement("p");
form.addEventListener("submit", (e) => {
    if (firstName === "" || firstName == null) {
        msg.innerHTML = "Podaj swoje imię!";
        msg.classList.add("invalid-value-msg");
     


       // document.querySelector("#firstName").append(msg)

    }
e.preventDefault();
})

const handleFirstName = () => {
    if(!firstName) console.log("Cos")
}