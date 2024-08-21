//CUSTOM VALIDATION
const showPopup = function () {
document.querySelector("#contact-form").addEventListener("submit", e => {
   document.querySelector("#submitPopup").classList.add("show");
 });
};
const validateForm = (formSelector) => {
  const formElement = document.querySelector(formSelector);

  const validationOptions = [
    {
      attribute: "required",
      isValid: (input) => input.value.trim() !== "",
      errorMessage: (input) => input.dataset.err,
    },

    {
      attribute: "customcheckbox",
      isValid: (input) => input.checked == true,
      errorMessage: (input) => input.dataset.err,
    },

    {
      attribute: "customradio",
      isValid: (input) => {
        let radioInput = document.querySelector(
          "input[name='queryType']:checked"
        );
        if (radioInput == null) {
          return false;
        }

        return true;
      },
      errorMessage: (input) => input.dataset.err,
    },
  ];
  let arr = [];
  const validateSingleFormGroup = (formGroup) => {
    const input = formGroup.querySelector("input, textarea");

    errorContainer = formGroup.querySelector(".invalid-value-msg");
    if (!errorContainer)
      errorContainer = document.querySelector(".invalid-value-msg--radio"); //for radio error msg
    let formGroupError = false;
    for (const option of validationOptions) {
      if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
        errorContainer.textContent = option.errorMessage(input);
        input.classList.add("input-validate-error");
        formGroupError = true;
      }
    }

    if (!formGroupError) {
      errorContainer.textContent = "";
      input.classList.remove("input-validate-error");
    }

    arr.push(!formGroupError);
  };

  formElement.setAttribute("novalidate", "");
  Array.from(formElement.elements).forEach((element) => {
    element.addEventListener("blur", (event) => {
      validateSingleFormGroup(event.srcElement.parentElement);
    });
  });

  formElement.addEventListener("submit", (e) => {
    const formIsValid = validateAllFormGroups(formElement);

    if (!formIsValid) {
      e.preventDefault();
      console.log("Form invalid!");
    } else {
      e.preventDefault();

      console.log("Form valid!");
    }
  });

  const validateAllFormGroups = (formToValidate) => {
    const formGroups = Array.from(
      formToValidate.querySelectorAll(".form__item")
    );

  
    arr = [];
    formGroups.forEach((formGroup) => validateSingleFormGroup(formGroup));
    console.log(arr);
    if (arr.includes(false)) {
      return false;
    } else 
    {
      return true;
    };
  };
};

validateForm("#contact-form");

// COLORED RADIO LABEL
let refreshRadio = document.querySelector("input[type='radio']:checked");
if (refreshRadio)
  refreshRadio.parentNode.style.background = "hsl(148, 38%, 91%)";

let parent;
let form = document.querySelector("#contact-form");
let selectedRadio = refreshRadio;
form.addEventListener("click", (e) => {
  if (e.target.type == "radio") {
    if (selectedRadio) {
      parent = selectedRadio.parentNode;
      parent.style.background = "white";
    }
    parent = e.target.parentNode;
    parent.style.background = "hsl(148, 38%, 91%)";
    selectedRadio = e.target;
  }
});

// ON SUBMIT
