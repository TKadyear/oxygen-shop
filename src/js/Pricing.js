// IMPROVE Se podría mirar como hacer una clase padre para los cambios de conversiones ya que no dependen de los "hijos"
let conversionRates = {};
const pricing = new CardPricing(".pricing__container__price__p mark");

const selectCurrency = document.querySelector(".pricing__currency__select");
selectCurrency.addEventListener("change", () => {
  const currency = selectCurrency.value;
  pricing.changePricesTo(currency);
})

export function loadData() {
  fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json")
    .then(response => response.json())
    .then(data => {
      const currencyPetition = "usd"
      const exchangeCurrency = data[currencyPetition];
      const conversionCurrencies = ["eur", "gbp"];
      conversionCurrencies.forEach(currency => {
        conversionRates[currency] = exchangeCurrency[currency];
      })
    })
}

export class Price {
  constructor(rawData) {
    this.value = this.whichValue(rawData);
    this.currency = this.whichCurrency(rawData);

  }
  whichValue(rawValue) {
    return Number(rawValue.replace(/\$/, "").replace(/\€/, "").replace(/\₤/, ""));
  }
  whichSymbol(type) {
    // IMPROVE Hay que mirar una manera de mantenerlo sin repetición
    const currencyToSymbol = {
      "eur": "€",
      "gbp": "₤",
      "usd": "$"
    }
    return currencyToSymbol[type];
  }
  whichCurrency(rawValue) {
    const type = rawValue.replace(/\d/g, "")
    const symbolCurrency = {
      "€": "eur",
      "₤": "gbp",
      "$": "usd"
    }
    return symbolCurrency[type];
  }

  conversion(currencyToChange) {
    const conversion = currencyToChange === this.currency ? this.value : this.value * conversionRates[currencyToChange]
    return conversion;
  }
  exchangeToString(currencyChange) {
    const changedCurrency = Math.round(this.conversion(currencyChange));
    // IMPROVE No es del todo legible
    // TODO hacer una clase que contenga en donde se debe posicionar el simbolo en base a cada tipo
    return currencyChange === "eur" ? changedCurrency + this.whichSymbol(currencyChange) : this.whichSymbol(currencyChange) + changedCurrency;
  }
}


// TODO Preguntar a John sobre tema de performance para Javascript sobre crear una clase temporalmente
export class CardPricing {
  constructor(selector) {
    this.valuesHTML = document.querySelectorAll(selector);
    this.initialValue = this.takeInitialValue();
  }
  takeInitialValue() {
    let allPrices = [...this.valuesHTML].map(value => new Price(value.textContent));
    return allPrices;
  }
  changePricesTo(currency) {
    this.valuesHTML.forEach((priceHTML, index) => {
      priceHTML.textContent = this.initialValue[index].exchangeToString(currency);
    })
  }
}
