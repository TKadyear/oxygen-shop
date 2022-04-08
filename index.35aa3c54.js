const y=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerpolicy&&(i.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?i.credentials="include":o.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=t(o);fetch(o.href,i)}};y();let m={},p={};class g{constructor(e){this.value=this.whichValue(e),this.currency=this.whichCurrency(e)}whichValue(e){return Number(e.replace(/\$/,"").replace(/\€/,"").replace(/\₤/,""))}whichSymbol(e){return{eur:"\u20AC",gbp:"\u20A4",usd:"$"}[e]}whichCurrency(e){const t=e.replace(/\d/g,"");return{"\u20AC":"eur","\u20A4":"gbp",$:"usd"}[t]}conversion(e){return e===this.currency?this.value:this.value*m[e]}exchangeToString(e){const t=Math.round(this.conversion(e));return e==="eur"?t+this.whichSymbol(e):this.whichSymbol(e)+t}}class v{constructor(e){this.valuesHTML=document.querySelectorAll(e),this.initialValue=this.takeInitialValue()}takeInitialValue(){return[...this.valuesHTML].map(t=>new g(t.textContent))}changePricesTo(e){this.valuesHTML.forEach((t,s)=>{t.textContent=this.initialValue[s].exchangeToString(e)})}}const w=()=>document.body.classList.toggle("overflow-hidden"),r=n=>/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(n),u=n=>n.length>=2&&n.length<100,_=n=>{fetch("https://jsonplaceholder.typicode.com/posts/1/comments",{method:"POST",body:JSON.stringify(n),headers:{"Content-type":"application/json; charset=UTF-8"}}).then(e=>e.json()).then(e=>{console.log("El envio de datos se ha realizado correctamente"),console.table(e)})};function c(n){const e="keepRecomendNewsletter";n?localStorage.setItem(e,JSON.stringify(!1)):sessionStorage.setItem(e,JSON.stringify(!1))}const S=()=>(localStorage.getItem("keepRecomendNewsletter")||sessionStorage.getItem("keepRecomendNewsletter"))==null,l=()=>{S()&&(document.querySelector(".info__newsletter__container").classList.toggle("hidden"),w(),L())},b=()=>{const n=document.querySelector("#newsletter__bg"),e=t=>{t.preventDefault(),t.stopPropagation(),l(),c(!1)};n.addEventListener("click",t=>{t.stopPropagation(),t.target===n&&e(t)}),document.querySelector(".newsletter__btn").addEventListener("click",t=>{t.preventDefault(),t.stopPropagation();const s=document.querySelector("input[type=email].info__newsletter__input"),o=document.querySelector("input[type=checkbox].info__newsletter__checkbox");if(r(s.value)?s.classList.remove("form__input--invalid"):s.classList.add("form__input--invalid"),o.checked?o.classList.remove("form__input--invalid"):o.classList.add("form__input--invalid"),r(s.value)&&o.checked){const i={email:s.value,consent:document.querySelector("input[type=checkbox].info__newsletter__checkbox").checked};_(i),e(t),c(!0)}}),document.querySelector(".newsletter__btn--exit").addEventListener("click",t=>{e(t),c(!0)}),document.querySelector(".info__newsletter__btn__close").addEventListener("click",t=>{e(t)})},f=()=>{const n=window.scrollY;n>0&&(window.scrollTo(0,n-n/25),window.requestAnimationFrame(f))};function L(){document.body.addEventListener("keyup",n=>{!document.querySelector(".info__newsletter__container").classList.contains("hidden")&&n.key=="Escape"&&(l(),c(!1))})}const k=document.querySelector(".btn__scroll_up");k.addEventListener("click",()=>{setTimeout(()=>f(),200)});const d=document.querySelector(".pricing__currency__select");d.addEventListener("change",()=>{const n=d.value;p.changePricesTo(n)});function E(){fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json").then(n=>n.json()).then(n=>{const t=n["usd"];["eur","gbp"].forEach(o=>{m[o]=t[o]})})}window.addEventListener("scroll",()=>{const n=Math.trunc(window.scrollY*100/(document.body.scrollHeight-window.innerHeight));document.querySelector(".percentage-scroller").style.width=n+"%",n===25&&l()});class q{constructor(e,t){this.listImg=document.querySelectorAll(e),this.listBtnImg=document.querySelectorAll(t),this.count=0}counting(){return this.count=this.count<this.listImg.length-1?++this.count:0}changing(e,t){e.forEach((s,o)=>(s.classList.contains(t)&&s.classList.remove(t),o===this.count&&s.classList.add(t),s))}slide(){this.changing(this.listImg,"slide__img--active"),this.changing(this.listBtnImg,"slide__btn--active")}changeSlides(){this.counting(),this.slide()}listenerBtn(){this.listBtnImg.forEach((e,t)=>e.addEventListener("click",()=>{this.count=t,this.slide()}))}}const h=new q(".slide__img",".slide__btn");document.querySelector("#submit-btn").addEventListener("click",n=>{n.preventDefault(),n.stopPropagation();let e=document.querySelector("input[type=text].form__input"),t=document.querySelector("input[type=email].form__input"),s=document.querySelector("input[type=checkbox].form__checkbox");if(u(e.value)?e.classList.remove("form__input--invalid"):e.classList.add("form__input--invalid"),r(t.value)?t.classList.remove("form__input--invalid"):t.classList.add("form__input--invalid"),s.checked?s.classList.remove("form__input--invalid"):s.classList.add("form__input--invalid"),r(t.value)&&s.checked&&u(e.value)){const o={name:e.value,email:t.value,consent:s.checked};_(o),e.value="",t.value="",s.checked=!1,window.scrollTo(0,0)}});window.addEventListener("DOMContentLoaded",()=>{E(),p=new v(".pricing__container__price__p mark"),b(),setTimeout(()=>{document.querySelector(".info__newsletter__container").classList.contains("hidden")&&l()},5e3),h.listenerBtn(),setInterval(()=>h.changeSlides(),3e3)});
