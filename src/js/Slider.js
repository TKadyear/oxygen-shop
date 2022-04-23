export class SliderID {
  constructor(identifier) {
    this.containerImages = document.querySelector(identifier);
    this.images = this.containerImages.children;
    this.listImg = Array.from(this.images);
    this.listButtons = [];
    this.imageStyleClass = "slide__img";
    this.imageActiveClass = "slide__img--active";
    this.btnContainerStyleClass = "slide__btn__container";
    this.btnStyleClass = "slide__btn";
    this.btnActiveClass = "slide__btn--active";
    this.activeIndex = 0;
    this.intervalSlide;
    this.initialization();
  }
  addImageClasses() {
    this.listImg.forEach(img => img.classList.add(this.imageStyleClass));
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
      `<button class=${this.btnStyleClass}></button>`
    )
    const containerBtn = /* html */`
    <div class=${this.btnContainerStyleClass}>${buttons.join("")}</div>
    `
    const range = document.createRange();
    const DocumentContainerBtn = range.createContextualFragment(containerBtn);
    this.listButtons = DocumentContainerBtn.querySelectorAll("." + this.btnStyleClass)
    this.listenerBtn();
    this.containerImages.appendChild(DocumentContainerBtn);
  }
  removeClass() {
    this.images[this.activeIndex].classList.remove(this.imageActiveClass);
    this.listButtons[this.activeIndex].classList.remove(this.btnActiveClass);
  }
  addClass() {
    this.images[this.activeIndex].classList.add(this.imageActiveClass);
    this.listButtons[this.activeIndex].classList.add(this.btnActiveClass);
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

