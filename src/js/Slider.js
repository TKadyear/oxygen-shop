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
    this.initialization();
  }
  addImageClasses() {
    this.listImg.forEach(img => img.classList.add(this.imageStyleClass));
  }
  listenerBtn(Container) {
    console.log(Container)
    this.listButtons = Container.querySelectorAll(this.btnStyleClass)
    console.log(this.listButtons)
    this.listButtons.forEach((btn, position) => {
      btn.addEventListener("click", () => {
        this.toggleClass();
        this.activeIndex = position;
        this.toggleClass();
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
    console.log(containerBtn)
    const range = document.createRange();
    const DocumentContainerBtn = range.createContextualFragment(containerBtn);
    this.listenerBtn(DocumentContainerBtn);
    this.containerImages.appendChild(DocumentContainerBtn);
  }

  toggleClass() {
    this.images[this.activeIndex].classList.toggle(this.imageActiveClass);
    // console.log(this.listButtons[this.activeIndex])
    // this.listButtons[this.activeIndex].classList.toggle(this.btnActiveClass);
  }

  startInterval() {
    // clearInterval(slide);
    const slide = setInterval(() => this.slide(), 3000);
  }
  changeActivePhoto() {
    return this.activeIndex = (this.activeIndex < (this.listImg.length - 1)) ? ++this.activeIndex : 0;
  }
  slide() {
    this.toggleClass();
    this.changeActivePhoto();
    this.toggleClass();
  }

  initialization() {
    // this.generateBtn();
    this.addImageClasses();
    this.toggleClass();
    this.startInterval();
  }
}

