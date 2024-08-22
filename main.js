//POPUP
let firstLoop;
const submitPopup = document.querySelector("#submitPopup");
const popupIsVisible = (status) => {
  if (status) {
    firstLoop = true;
    submitPopup.classList.add("show");
    setTimeout(popupIsVisible, 3000);
    return;
  } else submitPopup.classList.remove("show");
};
//CUSTOM VALIDATION
const validateForm = (formSelector) => {
  const formElement = document.querySelector(formSelector);

  const validationOptions = [
    {
      attribute: "required",
      isValid: (input) => input.value.trim() !== "",
      errorMessage: (input) => input.dataset.err,
    },

    {
      attribute: "data-customcheckbox",
      isValid: (input) => input.checked == true,
      errorMessage: (input) => input.dataset.err,
    },

    {
      attribute: "data-customradio",
      isValid: (input) => {
        let radioInput = document.querySelector(
          "input[name='queryType']:checked"
        );
        if (radioInput == null) return false;
        return true;
      },
      errorMessage: (input) => input.dataset.err,
    },

    {
      attribute: "data-emailpattern",
      isValid: (input) => {
        const regex = new RegExp(input.pattern);
        return regex.test(input.value);
      },
      errorMessage: (input) => input.dataset.err,
    },
  ];
  let arr = [];
  const validateSingleFormGroup = (formGroup) => {
    let input = formGroup.querySelector("input, textarea");
    if (firstLoop) {
      firstLoop = null;
      return;
    }
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
    formElement.focus();
    const formIsValid = validateAllFormGroups(formElement);

    form.addEventListener("reset", function (event) {
      let autofocusField = form.querySelector("button");
      if (autofocusField instanceof HTMLInputElement) {
        autofocusField.focus();
      }
    });

    if (!formIsValid) {
      e.preventDefault();
      popupIsVisible(false);
    } else {
      e.preventDefault();
      form.reset();
      popupIsVisible(true);

      let radios = document.querySelectorAll("input[type='radio']");
      radios.forEach((radio) => (radio.parentNode.style.background = ""));
    }
  });

  const validateAllFormGroups = (formToValidate) => {
    const formGroups = Array.from(
      formToValidate.querySelectorAll(".form__item")
    );
    arr = [];
    formGroups.forEach((formGroup) => validateSingleFormGroup(formGroup));
    if (arr.includes(false)) return false;
    else return true;
  };
};

validateForm("#contact-form");

// COLORED RADIO LABEL
let refreshRadio = document.querySelector("input[type='radio']:checked");
if (refreshRadio) refreshRadio.parentNode.style.background = "white";

let parent;
let form = document.querySelector("#contact-form");
let selectedRadio = refreshRadio;
let stala;
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
