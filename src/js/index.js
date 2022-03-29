const scrollToHeader = () => {
  const currentScroll = window.scrollY
  if (currentScroll > 10) {
    window.scrollTo(0, currentScroll - (currentScroll / 25));
    window.requestAnimationFrame(scrollToHeader);
  }
}

const btnScroll = document.querySelector(".btn__scroll_up");
btnScroll.addEventListener("click", () => {
  setTimeout(() => scrollToHeader(), 200)
})

window.addEventListener("scroll", () => {
  const percentageScroll = (window.scrollY * 100) / (document.body.scrollHeight - window.innerHeight)
  document.querySelector(".percentage-scroller").style.width = percentageScroll + "%"
})
