const changeCurrency = () => {
  return;
}
const conversionRate = {
  EUR: 0.910051,
  GBP: 0.759405
}
class price {
  constructor(value, currency) {
    this.value = value;
    this.currency = currency;
  }
  exchangeTo(currencyToChange) {
    return currencyToChange === this.currency ? this.value : this.value * conversionRate[currencyToChange]
  }
}
price = {
  value: 60,
  currency: "USD",
  exchangeTo(currencyToChange) {
    return currencyToChange === this.currency ? this.value : this.value * conversionRate[currencyToChange]
  }
}
module.exports = changeCurrency
