const blockScrollBody = () => document.body.classList.toggle("overflow-hidden");
const isValidEmail = (email) => {
  const RegeXEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return RegeXEmail.test(email);
}
const displayPopUpNewsletter = () => {
  document.querySelector(".info__newsletter__container").classList.toggle("hidden");
  blockScrollBody();
}

const addEventsToNewsletter = () => {
  const bgNewsletter = document.querySelector("#newsletter__bg")
  const closeNewsletter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    displayPopUpNewsletter();
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
    const inputEmail = document.querySelector("input[type=email].info__newsletter__input").value;
    const consentCheckbox = document.querySelector("input[type=checkbox].info__newsletter__checkbox").checked
    if (isValidEmail(inputEmail) && consentCheckbox) {
      const dataNewsletter = {
        email: inputEmail,
        consent: document.querySelector("input[type=checkbox].info__newsletter__checkbox").checked
      }
      closeNewsletter(e);
    } else {
      console.error("Faltan datos de los requeridos");
    }
  })
  document.querySelector(".newsletter__btn--exit").addEventListener("click", (e) => {
    closeNewsletter(e);
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

window.addEventListener("DOMContentLoaded", () => {
  addEventsToNewsletter();
  setTimeout(displayPopUpNewsletter, 5000);
  imagesSlider.listenerBtn();
  setInterval(() => imagesSlider.changeSlides(), 3000);
})
