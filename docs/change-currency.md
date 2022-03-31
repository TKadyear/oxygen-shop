# Cambio de una moneda a otra
Los datos para el cambio de la moneda se hacen mediante esta API :
- [Github/fawazahmed0/currency-api](https://github.com/fawazahmed0/currency-api#readme)

## Peticiones API
Para hacer las peticiones del día sería así:
```
https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/{moneda}.json
```
Saliendo todo el listado de monedas con las cuales comparar.


Para comparaciones:
```
https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/{moneda-base}/{moneda-a-la-que-cambiar}.json
```

## Cambiar la moneda
El precio en la página web esta fijado en dolares, habría que ver como optimizar las llamadas a la Api para poder hacer la conversión bien.

### Conversión básica
A día 29/03/2022, la comparativa esta así:
```javascript
USD_Exchange ={
  EUR : 0.910051 ,
  GBP : 0,759405
}
```
- De USD a EUR - ``60 USD => 54,60306 EUR``
- De USD a GBP - ``60 USD => 45,5643 GBP``
- De EUR a GBP - ``54,60306 EUR => 45,5643 GBP``
- De EUR a USD - ``54,60306 EUR => 60 USD``
- De GBP a EUR - ``45,5643 GBP => 54,60306 EUR``
- De GBP a USD - ``45,5643 GBP => 60 USD``

### Opciones para resolver el cambio
- Se podría hacer una llamada(fetch) y calcular en la respuesta, todas las opciones a mano, hardcodeadas.
- Se podría guardar los valores iniciales y según cambias, evalua si es la moneda base o es un cambio, y realiza el cambio.
- Si se hace una estructura de cambio de moneda según de la que partes, calcula lo que le corresponde.

## Estructura de datos para cambio de moneda
```javascript
currency ={
  USD ={
    EUR : 0.910051,
    GBP : 0.759405
  }
  EUR ={
    USD : 1.097755,
    GBP : 0.839031
  }
  GBP ={
    EUR : 1.191851,
    USD : 1.31682
  }
}
```
El problema de esta estructura es que en realidad, entre el cambio de moneda hay una perdida siendo este el caso:
- De USD a GBP - ``60 USD => 45.5643 GBP``
- De GBP a USD - ``45.5643 GBP => 59.99998153 USD``

Es decir, no llega a ser al final el número que correspondía en un primer momento.

Se podría hacer una estructura independiente que corresponda a cada uno de los precios, teniendo metodos que lo convierten.
```javascript
price = {
  value: 60,
  currency: "USD",
  exchangeTo(currencyToChange){
    return currencyToChange === this.currency ? this.value : this.value * conversionRate[currencyToChange]
  }
}
/* Esto podría ser una clase padre que tuviese un metodo que te devuelva el valor para hacer el cambio */
conversionRate ={
  EUR : 0.910051,
  GBP : 0,759405
}
```

Para mejorar las conversiones, voy a trabajar con las monedas más pequeña.
- 1 Libra son 100 peniques
- 1 Dolar son 100 centavos
- 1 Euro son 100 centimos

Para no hacer muchas peticiones voy a hacer 3 peticiones totales con todos los datos que filtraré.

Esto es un primer planteamiento
```javascript
const prices = document.querySelectorAll(".pricing__container__price__p mark")
  prices.forEach(price => {
    const symbol = price.innerText.replace(/\d/, "");
    const number = Number(price.innerText.replace(/\$/, "").replace(/\€/, "").replace(/\₤/, ""));
    console.log(symbol)
    price.innerText = Math.round(((number * 100) * 0.910051) / 100) + "€"
  })
  ```
