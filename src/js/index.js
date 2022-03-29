const blockScrollBody = (block) => block ? document.body.classList.add("block__scroll") : document.body.classList.remove("block__scroll")
const isValidEmail = (email) => {
  const RegeXEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return RegeXEmail.test(email)
}
const addEventsToNewsletter = () => {
  const bgNewsletter = document.querySelector("#newsletter__bg")
  const closeNewsletter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    blockScrollBody(false);
    bgNewsletter.remove()
  }
  bgNewsletter.addEventListener("click", (e) => {
    e.stopPropagation()
    if (e.target === bgNewsletter) {
      closeNewsletter(e)
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

const createPopUpNewsletter = () => {
  if (!document.querySelector(".info__newsletter__container")) {
    const template = /*html */`
    <div id="newsletter__bg" class="info__newsletter__container">
      <div class="info__newsletter">
        <div class="info__newsletter__btn__close">
          <svg width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.492 12.501 12.494 1.5m0 11.002L1.492 1.5" stroke="#07ACE6" stroke-width="2"/>
          </svg>
        </div>
        <h6 class="info__newsletter_h6">Don't miss any updates</h6>
        <p class="info__newsletter_p">Get the lastest content and best deals in your inbox every day!</p>
        <form>
          <label class="info__newsletter__label">Email<input type="email" class="info__newsletter__input" name="newsletter__email" required></label>
          <label class="info__newsletter__label info__newsletter__label--checkbox" id="data-protection" for="data-protection">
            <input class="info__newsletter__checkbox" type="checkbox" name="data-protection" required>
            <p class="info__newsletter__label__p"> I hereby give consent for my personal data included in my application to be processed for the purposes of
            the
            recruitment process under the European Parliament’s and Council of the European Union Regulation on the
            Protection of Natural Persons as of 27 April 2016, with regard to the processing of personal data and on the
            free movement of such data, and repealing Directive 95/46/EC (Data Protection Directive)
            </p>
        </label>
        <div class="info__newsletter__form__container__btn">
        <button  class="newsletter__btn--exit">I'm not interesed</button>
        <button  class="newsletter__btn btn-primary">Send</button>
        </div>
        </form>
      </div>
    </div>
    `
    blockScrollBody(true);
    document.body.insertAdjacentHTML("beforeend", template)
    addEventsToNewsletter();
  }
}


const scrollToHeader = () => {
  const currentScroll = window.scrollY
  if (currentScroll > 0) {
    window.scrollTo(0, currentScroll - (currentScroll / 25));
    window.requestAnimationFrame(scrollToHeader);
  }
}

const btnScroll = document.querySelector(".btn__scroll_up");
btnScroll.addEventListener("click", () => {
  setTimeout(() => scrollToHeader(), 200)
})

window.addEventListener("scroll", () => {
  const percentageScroll = Math.trunc((window.scrollY * 100) / (document.body.scrollHeight - window.innerHeight))
  document.querySelector(".percentage-scroller").style.width = percentageScroll + "%"
  if (percentageScroll === 25) {
    createPopUpNewsletter();
  }
})
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(createPopUpNewsletter, 5000)
})
