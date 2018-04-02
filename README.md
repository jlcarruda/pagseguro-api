

# Pagseguro-API

A NodeJS module for communication with the Pagseguro payment API.
It's based on the well known module [pagseguro](https://www.npmjs.com/package/pagseguro), but supporting the new [TLS 1.2 update](https://dev.pagseguro.uol.com.br/como-comecar/atualizacao-tls) from the Pagseguro API.

# Features

  - Requests data through TLS 1.2
  - Parses the XML response to JSON and handles the request format.
  - Checkout interface using Sandbox or Production environments

# Future Features
  - Subscription interface
  - Payment Cancelling interface
  

### How do I use it?
It's pretty simple. Once you downloaded it through npm, simply require it on you project and create a new instance:

```js
    const Pagseguro = require('pagseguro-api')
    
    // Create an instance of the API. You can have multiple instances.
    const api = new Pagseguro({
        email: 'your.app@email.com',
        token: 'PagseguroToken',
        mode: 'payment' // can be 'payment' or 'sandbox'
    })
    
    // You can also create a new instance using arguments
    const api = new Pagseguro('your@email.com', 'token') // Mode = payment
```

### Setting the Buyer
You can set the buyer information for each instance:
```js
    // Sets the buyer for the API
    api.buyer({
        name: 'John Doe',
        email: 'john.does.everything@gmail.com'
    })
```
The function receives an Object, which can have the following attributes:

- **name**: The name of the buyer
- **email**: Their email
- **phone**
-- **areaCode**: The Brazilian Area Code for phone numbers 
-- **number**: The actual number

