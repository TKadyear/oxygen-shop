let conversionRates = {}
// IMPROVE quizás con una clase iria mejor.
let basePrice = [];
let pricing = {}
// IMPROVE Se podría mirar como hacer una clase padre para los cambios de conversiones ya que no dependen de los "hijos"
class Price {
  constructor(rawData) {
    this.value = this.whichValue(rawData);
    this.currency = this.whichCurrency(rawData);
  }
  whichValue(rawValue) {
    return Number(rawValue.replace(/\$/, "").replace(/\€/, "").replace(/\₤/, ""));
  }
  whichSymbol(type) {
    // IMPROVE Hay que mirar una manera de mantenerlo sin repetición
    const currencyToSymbol = {
      "eur": "€",
      "gbp": "₤",
      "usd": "$"
    }
    return currencyToSymbol[type];
  }
  whichCurrency(rawValue) {
    const type = rawValue.replace(/\d/g, "")
    const symbolCurrency = {
      "€": "eur",
      "₤": "gbp",
      "$": "usd"
    }
    return symbolCurrency[type];
  }

  conversion(currencyToChange) {
    const conversion = currencyToChange === this.currency ? this.value : this.value * conversionRates[currencyToChange]
    return conversion;
  }
  exchangeToString(currencyChange) {
    const changedCurrency = Math.round(this.conversion(currencyChange));
    // IMPROVE No es del todo legible
    // TODO hacer una clase que contenga en donde se debe posicionar el simbolo en base a cada tipo
    return currencyChange === "eur" ? changedCurrency + this.whichSymbol(currencyChange) : this.whichSymbol(currencyChange) + changedCurrency;
  }
}
// TODO Preguntar a John sobre tema de performance para Javascript sobre crear una clase temporalmente
class CardPricing {
  constructor(selector) {
    this.valuesHTML = document.querySelectorAll(selector);
    this.initialValue = this.takeInitialValue();
  }
  takeInitialValue() {
    let allPrices = [...this.valuesHTML].map(value => new Price(value.textContent));
    return allPrices;
  }
  changePricesTo(currency) {
    this.valuesHTML.forEach((priceHTML, index) => {
      priceHTML.textContent = this.initialValue[index].exchangeToString(currency);
    })
  }
}
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
const selectCurrency = document.querySelector(".pricing__currency__select")
selectCurrency.addEventListener("change", () => {
  const currency = selectCurrency.value;
  pricing.changePricesTo(currency);
})
function loadData() {
  fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json")
    .then(response => response.json())
    .then(data => {
      const currencyPetition = "usd"
      const exchangeCurrency = data[currencyPetition];
      const conversionCurrencies = ["eur", "gbp"];
      conversionCurrencies.forEach(currency => {
        conversionRates[currency] = exchangeCurrency[currency];
      })
    })
}

window.addEventListener("scroll", () => {
  const percentageScroll = Math.trunc((window.scrollY * 100) / (document.body.scrollHeight - window.innerHeight))
  document.querySelector(".percentage-scroller").style.width = percentageScroll + "%"
  if (percentageScroll === 25) {
    displayPopUpNewsletter();
  }
})


class Slider {
  constructor(identifier, selectorbtn) {
    this.listImg = document.querySelectorAll(identifier);
    this.listBtnImg = document.querySelectorAll(selectorbtn);
    this.count = 0;
  }
  counting() {
    return this.count = (this.count < (this.listImg.length - 1)) ? ++this.count : 0;
  }
  changing(itemToChange, classActive) {
    itemToChange.forEach((img, index) => {
      if (img.classList.contains(classActive)) {
        img.classList.remove(classActive);
      }
      if (index === this.count) {
        img.classList.add(classActive);
      }
      return img;
    })
  }
  slide() {
    this.changing(this.listImg, "slide__img--active");
    this.changing(this.listBtnImg, "slide__btn--active");
  }
  changeSlides() {
    this.counting();
    this.slide();
  }
  listenerBtn() {
    this.listBtnImg.forEach((btn, index) => btn.addEventListener("click", () => {
      this.count = index;
      this.slide();
    })
    )
  }
}
const imagesSlider = new Slider(".slide__img", ".slide__btn")

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
  pricing = new CardPricing(".pricing__container__price__p mark")
  addEventsToNewsletter();
  setTimeout(() => {
    if (document.querySelector(".info__newsletter__container").classList.contains("hidden")) {
      displayPopUpNewsletter();
    }
  }, 5000);
  imagesSlider.listenerBtn();
  setInterval(() => imagesSlider.changeSlides(), 3000);
})
