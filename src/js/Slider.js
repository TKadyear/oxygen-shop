// export class Slider {
//   constructor(identifier, selectorbtn) {
//     this.listImg = document.querySelectorAll(identifier);
//     this.listBtnImg = document.querySelectorAll(selectorbtn);
//     this.count = 0;
//     this.listenerBtn();
//     this.startInterval();
//   }

//   changing(itemToChange, classActive) {
//     itemToChange.forEach((img, index) => {
//       if (img.classList.contains(classActive)) {
//         img.classList.remove(classActive);
//       }
//       if (index === this.count) {
//         img.classList.add(classActive);
//       }
//       return img;
//     })
//   }
//   startInterval() {
//     setInterval(() => this.changeSlides(), 3000);
//   }
//   counting() {
//     return this.count = (this.count < (this.listImg.length - 1)) ? ++this.count : 0;
//   }
//   slide() {
//     this.changing(this.listImg, "slide__img--active");
//     this.changing(this.listBtnImg, "slide__btn--active");
//   }
//   changeSlides() {
//     this.counting();
//     this.slide();
//   }
//   listenerBtn() {
//     this.listBtnImg.forEach((btn, index) => btn.addEventListener("click", () => {
//       this.count = index;
//       this.slide();
//     })
//     )
//   }
// }
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
    this.listImg.forEach(img => img.classList.add(this.imageStyleClass))
  }
  listenerBtn(Container) {
    Container.querySelectorAll(this.btnStyleClass).forEach((btn, position) => {
      btn.addEventListener("click", () => {
        this.toggleClass();
        this.activeIndex = position;
        this.toggleClass();
      })
    })
  }
  generateBtn() {
    this.listButtons = this.listImg.map(() => /*html */
      `<button class=${this.btnStyleClass}></button>`
    )
    const containerBtn = /* html */`
      <div class=${this.btnContainerStyleClass}>${this.listButtons.join("")}</div>
    `
    const range = document.createRange();
    const DocumentContainerBtn = range.createContextualFragment(containerBtn);
    this.listenerBtn(DocumentContainerBtn);
    this.containerImages.insertAdjacentElement('afterend', DocumentContainerBtn)
  }

  toggleClass() {
    console.log(this.listButtons[this.activeIndex])
    this.images[this.activeIndex].classList.toggle(this.imageActiveClass);
    console.log(this.listButtons[this.activeIndex])
    this.listButtons[this.activeIndex].classList.toggle(this.btnActiveClass);
  }

  startInterval() {
    // clearInterval(slide);
    // const slide = setInterval(() => this.slide(), 3000);
  }
  changeActivePhoto() {
    return this.activeIndex = (this.activeIndex < (this.listImg.length - 1)) ? ++this.activeIndex : 0;
  }
  slide() {
    this.toggleClass();
  }

  initialization() {
    this.generateBtn();
    this.addImageClasses();
    this.toggleClass();
    this.startInterval();
  }
}

