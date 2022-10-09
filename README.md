## Vending Machine API

Is a REST API service built with NodeJS and ExpressJS.
Provides capabilities to create products, coins, and buy product.

### How to start/run the project

- ```npm install```
- ```npm run dev```
- Use Postman collection to buy or create product
- ```npm run test``` For Unit tests

### How to use/test

- Using `GET /vending-machine/products-list/` one can get all available products
- Using `GET /vending-machine/product?name=Coca+Cola&cash=340` product can be bought
- Using `PUT /vending-machine/products` products can be reloaded
- Using `PUT /vending-machine/coins` coins can be reloaded
  (To reload products or coins, Basic auth needs to be provided)

