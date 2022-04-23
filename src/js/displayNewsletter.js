export const blockScrollBody = () => document.body.classList.toggle("overflow-hidden");
function windowESCnewsletter() {
  document.body.addEventListener("keyup", (e) => {
    const popUp = document.querySelector(".info__newsletter__container");
    if (!popUp.classList.contains("hidden") && e.key == "Escape") {
      displayPopUpNewsletter();
      saveInSession(false);
    }
  })
}
export const saveInSession = (persistInBrowser) => {
  const item = "keepRecomendNewsletter"
  const value = false;
  persistInBrowser ? localStorage.setItem(item, JSON.stringify(value)) : sessionStorage.setItem(item, JSON.stringify(value))
}
// IMPROVE El nombre de esta función es más bien lioso con respecto a lo que devuelve
const hasBeenDisplayNewsletter = () => {
  const createNewsletter = localStorage.getItem("keepRecomendNewsletter") || sessionStorage.getItem("keepRecomendNewsletter")
  if (createNewsletter != null) {
    return false;
  }
  return true;
}
export const displayPopUpNewsletter = () => {
  if (hasBeenDisplayNewsletter()) {
    document.querySelector(".info__newsletter__container").classList.toggle("hidden");
    blockScrollBody();
    windowESCnewsletter();
  }
}

export const closeNewsletter = (e) => {
  e.preventDefault();
  e.stopPropagation();
  displayPopUpNewsletter();
  saveInSession(false);
}
export const addEventsToNewsletter = () => {
  const bgNewsletter = document.querySelector("#newsletter__bg")
  bgNewsletter.addEventListener("click", (e) => {
    e.stopPropagation()
    if (e.target === bgNewsletter) {
      closeNewsletter(e);
    }
  })
}
document.querySelector(".newsletter__btn--exit").addEventListener("click", (e) => {
  closeNewsletter(e);
  saveInSession(true);
})
document.querySelector(".info__newsletter__btn__close").addEventListener("click", (e) => {
  closeNewsletter(e);
})
