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
    .then((json) => console.log(json));
}
// IMPROVE La manera de saber en donde hay que guardar el dato
function saveInSession(type) {
  const item = "keepRecomendNewsletter"
  const value = false;
  switch (type) {
    case "local":
      localStorage.setItem(item, JSON.stringify(value))
      break;
    case "session":
      sessionStorage.setItem(item, JSON.stringify(value))
      break;
  }
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
  }
}

const addEventsToNewsletter = () => {
  const bgNewsletter = document.querySelector("#newsletter__bg")
  const closeNewsletter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    displayPopUpNewsletter();
    saveInSession("session");
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
        email: inputEmail,
        consent: document.querySelector("input[type=checkbox].info__newsletter__checkbox").checked
      }
      postForm(dataNewsletter)
      closeNewsletter(e);
      saveInSession("local");
    }
  })
  document.querySelector(".newsletter__btn--exit").addEventListener("click", (e) => {
    closeNewsletter(e);
    saveInSession("local");
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
document.body.addEventListener("keyup", (e) => {
  const popUp = document.querySelector(".info__newsletter__container");
  if (!popUp.classList.contains("hidden") && e.key == "Escape") {
    displayPopUpNewsletter();
  }
})
const btnScroll = document.querySelector(".btn__scroll_up");
btnScroll.addEventListener("click", () => {
  setTimeout(() => scrollToHeader(), 200);
})

window.addEventListener("scroll", () => {
  const percentageScroll = Math.trunc((window.scrollY * 100) / (document.body.scrollHeight - window.innerHeight))
  document.querySelector(".percentage-scroller").style.width = percentageScroll + "%"
  // IMPROVE Hay veces que se salta el númeor porque no da tiempo con el calculo por lo que no sale el pop up
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
  }
})

window.addEventListener("DOMContentLoaded", () => {
  addEventsToNewsletter();
  setTimeout(displayPopUpNewsletter, 5000);
  imagesSlider.listenerBtn();
  setInterval(() => imagesSlider.changeSlides(), 3000);
})
