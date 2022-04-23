

export class Slider {
  constructor(identifier, selectorbtn) {
    this.listImg = document.querySelectorAll(identifier);
    this.listBtnImg = document.querySelectorAll(selectorbtn);
    this.count = 0;
    this.listenerBtn();
    this.startInterval();
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
  startInterval() {
    setInterval(() => this.changeSlides(), 3000);
  }
  counting() {
    return this.count = (this.count < (this.listImg.length - 1)) ? ++this.count : 0;
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
