const createPopUp = () => {
  alert("son 5s o 25%")
}
window.addEventListener("scroll", () => {
  const percentageScroll = Math.trunc((window.scrollY * 100) / (document.body.scrollHeight - window.innerHeight))
  document.querySelector(".percentage-scroller").style.width = percentageScroll + "%"
  console.log(percentageScroll)
  if (percentageScroll === 25) {
    createPopUp();
  }
})
