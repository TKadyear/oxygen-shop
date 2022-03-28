const ScrollUp = () => {
  const currentScroll = document.body.scrollTop
  console.log(currentScroll)
  // window.requestAnimationFrame()
}

const btnScroll = document.querySelector(".btn__scroll_up");
btnScroll.addEventListener("click", () => {
  setTimeout(() => window.scrollTo(0, 0), 200)
  ScrollUp()
})

window.addEventListener("scroll", () => {
  const percentageScroll = (window.scrollY * 100) / (document.body.scrollHeight - window.innerHeight)
  document.querySelector(".percentage-scroller").style.width = percentageScroll + "%"
})
