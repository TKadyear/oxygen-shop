export class SliderID {
  constructor(identifier) {
    this.containerImages = document.querySelector(identifier);
    this.images = this.containerImages.children;
    this.listImg = Array.from(this.images);
    this.listButtons = [];
    this.style = {
      image: {
        base: "slide__img",
        active: "slide__img--active"
      },
      btn: {
        container: "slide__btn__container",
        base: "slide__btn",
        active: "slide__btn--active"
      }
    }
    this.activeIndex = 0;
    this.intervalSlide;
    this.initialization();
  }
  addImageClasses() {
    this.listImg.forEach(img => img.classList.add(this.style.image.base));
  }
  listenerBtn() {
    this.listButtons.forEach((btn, position) => {
      btn.addEventListener("click", () => {
        this.removeClass();
        this.activeIndex = position;
        this.addClass();
        this.startInterval();
      })
    })
  }
  generateBtn() {
    const buttons = this.listImg.map(() => /*html */
      `<button class=${this.style.btn.base}></button>`
    )
    const containerBtn = /* html */`
    <div class=${this.style.btn.container}>${buttons.join("")}</div>
    `
    const range = document.createRange();
    const DocumentContainerBtn = range.createContextualFragment(containerBtn);
    this.listButtons = DocumentContainerBtn.querySelectorAll("." + this.style.btn.base)
    this.listenerBtn();
    this.containerImages.appendChild(DocumentContainerBtn);
  }
  removeClass() {
    this.images[this.activeIndex].classList.remove(this.style.image.active);
    this.listButtons[this.activeIndex].classList.remove(this.style.btn.active);
  }
  addClass() {
    this.images[this.activeIndex].classList.add(this.style.image.active);
    this.listButtons[this.activeIndex].classList.add(this.style.btn.active);
  }
  startInterval() {
    clearInterval(this.intervalSlide);
    this.intervalSlide = setInterval(() => this.slide(), 3000);
  }
  changeActivePhoto() {
    this.activeIndex = (this.activeIndex < (this.listImg.length - 1)) ? ++this.activeIndex : 0;
  }
  slide() {
    this.removeClass();
    this.changeActivePhoto();
    this.addClass();
  }

  initialization() {
    this.generateBtn();
    this.addImageClasses();
    this.addClass();
    this.startInterval();
  }
}

