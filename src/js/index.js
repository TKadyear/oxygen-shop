const createPopUp = () => {
  if (!document.querySelector(".info__newsletter__container")) {

    const template = /*html */`
    <div class="info__newsletter__container">
      <div class="info__newsletter">
        <div class="btn__close"></div>
        <h6 class="info__newsletter_h6">Don't miss any updates</h6>
        <p class="info__newsletter_p">Get the lastest content and best deals in your inbox every day!</p>
        <label class="info__newsletter__label">Email<input type="email" class="info__newsletter__input" name="newsletter__email" required></label>

        <label class="info__newsletter__label" id="data-protection" for="data-protection">
        <input type="checkbox" name="data-protection" required>
        <p> I hereby give consent for my personal data included in my application to be processed for the purposes of
          the
          recruitment process under the European Parliament’s and Council of the European Union Regulation on the
          Protection of Natural Persons as of 27 April 2016, with regard to the processing of personal data and on the
          free movement of such data, and repealing Directive 95/46/EC (Data Protection Directive)
        </p>
      </label>
        <button  class="newsletter__btn btn-primary">Send</button>
      </div>
    </div>
    `
    const range = new Range();
    const documentTemplate = range.createContextualFragment(template)
    const body = document.body
    body.classList.add("block__scroll")

    console.log(documentTemplate.querySelector(".newsletter__btn"))
    body.insertAdjacentHTML("beforeend", template)
    const bgNewsletter = documentTemplate.querySelector(".info__newsletter__container")
    bgNewsletter.addEventListener("click", (e) => {
      e.preventDefault()
      console.log(bgNewsletter)
    })
    documentTemplate.querySelector(".newsletter__btn").addEventListener("click", () => {
      console.log("boton")
    })
  }
}

window.addEventListener("scroll", () => {
  const percentageScroll = Math.trunc((window.scrollY * 100) / (document.body.scrollHeight - window.innerHeight))
  document.querySelector(".percentage-scroller").style.width = percentageScroll + "%"
  if (percentageScroll === 25) {
    createPopUp();
  }
})
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(createPopUp, 5000)
})
