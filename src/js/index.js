import { Slider } from "./Slider.js";
import { CardPricing, loadData } from "./Pricing.js";

new Slider(".slide__img", ".slide__btn");

const blockScrollBody = () => document.body.classList.toggle("overflow-hidden");
const isValidEmail = (email) => {
  const RegeXEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return RegeXEmail.test(email);
}
const isValidName = (name) => name.length >= 2 && name.length < 100

const postForm = (info) => {
  fetch('https://jsonplaceholder.typicode.com/posts/1/comments', {
    method: 'POST',
    body: JSON.stringify(info
    ),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log('El envio de datos se ha realizado correctamente')
      console.table(json)
    });
}
// IMPROVE La manera de saber en donde hay que guardar el dato
function saveInSession(persistInBrowser) {
  const item = "keepRecomendNewsletter"
  const value = false;
  persistInBrowser ? localStorage.setItem(item, JSON.stringify(value)) : sessionStorage.setItem(item, JSON.stringify(value))
}
// IMPROVE El nombre de esta función es más bien lioso con respecto a lo que devuelve
const hasBeenDisplayNewsletter = () => {
  const createNewsletter = localStorage.getItem("keepRecomendNewsletter") || sessionStorage.getItem("keepRecomendNewsletter")
  if (createNewsletter != null) {
    return false;
  }
  return true;
}

const displayPopUpNewsletter = () => {
  if (hasBeenDisplayNewsletter()) {
    document.querySelector(".info__newsletter__container").classList.toggle("hidden");
    blockScrollBody();
    windowESCnewsletter();
  }
}

const addEventsToNewsletter = () => {
  const bgNewsletter = document.querySelector("#newsletter__bg")
  const closeNewsletter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    displayPopUpNewsletter();
    saveInSession(false);
  }
  bgNewsletter.addEventListener("click", (e) => {
    e.stopPropagation()
    if (e.target === bgNewsletter) {
      closeNewsletter(e);
    }
  })
  document.querySelector(".newsletter__btn").addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const inputEmail = document.querySelector("input[type=email].info__newsletter__input");
    const consentCheckbox = document.querySelector("input[type=checkbox].info__newsletter__checkbox")
    isValidEmail(inputEmail.value) ? inputEmail.classList.remove("form__input--invalid") : inputEmail.classList.add("form__input--invalid")
    consentCheckbox.checked ? consentCheckbox.classList.remove("form__input--invalid") : consentCheckbox.classList.add("form__input--invalid")
    if (isValidEmail(inputEmail.value) && consentCheckbox.checked) {
      const dataNewsletter = {
        email: inputEmail.value,
        consent: document.querySelector("input[type=checkbox].info__newsletter__checkbox").checked
      }
      postForm(dataNewsletter)
      closeNewsletter(e);
      saveInSession(true);
    }
  })
  document.querySelector(".newsletter__btn--exit").addEventListener("click", (e) => {
    closeNewsletter(e);
    saveInSession(true);
  })
  document.querySelector(".info__newsletter__btn__close").addEventListener("click", (e) => {
    closeNewsletter(e);
  })
}

const scrollToHeader = () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 0) {
    window.scrollTo(0, currentScroll - (currentScroll / 25));
    window.requestAnimationFrame(scrollToHeader);
  }
}
function windowESCnewsletter() {
  document.body.addEventListener("keyup", (e) => {
    const popUp = document.querySelector(".info__newsletter__container");
    if (!popUp.classList.contains("hidden") && e.key == "Escape") {
      displayPopUpNewsletter();
      saveInSession(false);
    }
  })
}
const btnScroll = document.querySelector(".btn__scroll_up");
btnScroll.addEventListener("click", () => {
  setTimeout(() => scrollToHeader(), 200);
})
const pricing = new CardPricing(".pricing__container__price__p mark")
const selectCurrency = document.querySelector(".pricing__currency__select")
selectCurrency.addEventListener("change", () => {
  const currency = selectCurrency.value;
  pricing.changePricesTo(currency);
})

window.addEventListener("scroll", () => {
  const percentageScroll = Math.trunc((window.scrollY * 100) / (document.body.scrollHeight - window.innerHeight))
  document.querySelector(".percentage-scroller").style.width = percentageScroll + "%"
  if (percentageScroll === 25) {
    displayPopUpNewsletter();
  }
})


document.querySelector("#submit-btn").addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  let inputName = document.querySelector("input[type=text].form__input");
  let inputEmail = document.querySelector("input[type=email].form__input");
  let consentCheckbox = document.querySelector("input[type=checkbox].form__checkbox")
  isValidName(inputName.value) ? inputName.classList.remove("form__input--invalid") : inputName.classList.add("form__input--invalid")
  isValidEmail(inputEmail.value) ? inputEmail.classList.remove("form__input--invalid") : inputEmail.classList.add("form__input--invalid")
  consentCheckbox.checked ? consentCheckbox.classList.remove("form__input--invalid") : consentCheckbox.classList.add("form__input--invalid")
  if (isValidEmail(inputEmail.value) && consentCheckbox.checked && isValidName(inputName.value)) {
    const data = {
      name: inputName.value,
      email: inputEmail.value,
      consent: consentCheckbox.checked
    }
    postForm(data)
    inputName.value = "";
    inputEmail.value = "";
    consentCheckbox.checked = false;
    window.scrollTo(0, 0)
  }
})

window.addEventListener("DOMContentLoaded", () => {
  loadData();
  addEventsToNewsletter();
  setTimeout(() => {
    if (document.querySelector(".info__newsletter__container").classList.contains("hidden")) {
      displayPopUpNewsletter();
    }
  }, 5000);

})
