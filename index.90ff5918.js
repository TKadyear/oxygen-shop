const d=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function o(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(t){if(t.ep)return;t.ep=!0;const n=o(t);fetch(t.href,n)}};d();const i=e=>e?document.body.classList.add("block__scroll"):document.body.classList.remove("block__scroll"),_=e=>/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e),u=()=>{const e=document.querySelector("#newsletter__bg"),r=o=>{o.preventDefault(),o.stopPropagation(),i(!1),e.remove()};e.addEventListener("click",o=>{o.stopPropagation(),o.target===e&&r(o)}),document.querySelector(".newsletter__btn").addEventListener("click",o=>{o.preventDefault(),o.stopPropagation();const s=document.querySelector("input[type=email].info__newsletter__input").value,t=document.querySelector("input[type=checkbox].info__newsletter__checkbox").checked;_(s)&&t?(document.querySelector("input[type=checkbox].info__newsletter__checkbox").checked,r(o)):console.error("Faltan datos de los requeridos")}),document.querySelector(".newsletter__btn--exit").addEventListener("click",o=>{r(o)}),document.querySelector(".info__newsletter__btn__close").addEventListener("click",o=>{r(o)})},c=()=>{if(!document.querySelector(".info__newsletter__container")){const e=`
    <div id="newsletter__bg" class="info__newsletter__container">
      <div class="info__newsletter">
        <div class="info__newsletter__btn__close">
          <svg width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.492 12.501 12.494 1.5m0 11.002L1.492 1.5" stroke="#07ACE6" stroke-width="2"/>
          </svg>
        </div>
        <h6 class="info__newsletter_h6">Don't miss any updates</h6>
        <p class="info__newsletter_p">Get the lastest content and best deals in your inbox every day!</p>
        <form>
          <label class="info__newsletter__label">Email<input type="email" class="info__newsletter__input" name="newsletter__email" required></label>
          <label class="info__newsletter__label info__newsletter__label--checkbox" id="data-protection" for="data-protection">
            <input class="info__newsletter__checkbox" type="checkbox" name="data-protection" required>
            <p class="info__newsletter__label__p"> I hereby give consent for my personal data included in my application to be processed for the purposes of
            the
            recruitment process under the European Parliament\u2019s and Council of the European Union Regulation on the
            Protection of Natural Persons as of 27 April 2016, with regard to the processing of personal data and on the
            free movement of such data, and repealing Directive 95/46/EC (Data Protection Directive)
            </p>
        </label>
        <div class="info__newsletter__form__container__btn">
        <button  class="newsletter__btn--exit">I'm not interesed</button>
        <button  class="newsletter__btn btn-primary">Send</button>
        </div>
        </form>
      </div>
    </div>
    `;i(!0),document.body.insertAdjacentHTML("beforeend",e),u()}},a=()=>{const e=window.scrollY;e>0&&(window.scrollTo(0,e-e/25),window.requestAnimationFrame(a))},p=document.querySelector(".btn__scroll_up");p.addEventListener("click",()=>{setTimeout(()=>a(),200)});window.addEventListener("scroll",()=>{const e=Math.trunc(window.scrollY*100/(document.body.scrollHeight-window.innerHeight));document.querySelector(".percentage-scroller").style.width=e+"%",e===25&&c()});window.addEventListener("DOMContentLoaded",()=>{setTimeout(c,5e3)});
