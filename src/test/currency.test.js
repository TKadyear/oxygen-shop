const changeCurrency = require("./currency")

describe("Prueba de test", () => {
  test("test1", () => {
    expect(changeCurrency()).toBe("something")
  })
})
