/**
 *  Pagseguro API Object
 */

class Pagseguro {

  xml = require('xml2js')
  stringParser = xml.parseString
  https = require('https')
  xmlBuider = new xml.Builder()

  constructor(configObj) {
    if (arguments.length > 1) {
      this.email = arguments[0]
      this.token = arguments[1]
      this.mode = 'payment'
      console.warn('The use of this type of constructor is retained only for legacy compatibility. Please, use and object with the needed attributes');
    } else {
      this.email = configObj.email
      this.token = configObj.token
      this.mode = configObj.mode || 'payment'
    }

    // Object to be sent to the Pagseguro API
    this.requestObj = {
      method: 'creditCard', // boleto, eft,
      currency: 'BRL'
    }

    this.xmlHeader = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'

    // HTTPS Options to support TLS 1.2 version
    this.httpsOptions = {
      method: 'POST',
      hostname: 'https://ws.pagseguro.uol.com.br',
      secureProtocol: 'TLSv1_2_method',
      headers: {
        'Content-type': 'application/xml; charset=UTF-8'
      }
    }
  }

  /**
   * Optional: Set the buyer user for the transaction.
   * 
   * 
   * NOTE: Don't support subscription (yet)
   * ####Example:
   * 
   *        buyer({name: "John", email: "johndoe@cmail.com"})
   * 
   * @param {Object} buyer
   * @api public 
   */
  buyer(buyer) {
    this.requestObj.sender = {
      name: buyer.name,
      email: buyer.email,
      phone: {
        areaCode: buyer.phoneAreaCode,
        number: buyer.phoneNumber
      }
    }

    return this;
  }

  setMode(mode) {
    this.mode = mode
    return this;
  }

  setRedirectURL(url) {
    this.requestObj.redirectURL = url
    return this;
  }

  setNotificationURL(url) {
    this.requestObj.NotificationURL = url
    return this;
  }

  /**
   * Sends a request for checkout using callback
   * @param {Function} callback 
   * 
   * @api public
   */
  sendCB(callback) {

    this.prepareRequest()

    return https.request(this.httpsOptions, res => {

      let body = ''
      res.on('data', d => body += d)
      res.on('end', () => {
        this.stringParser(body, (err, result) => {
          if (err) {
            return callback(err)
          }

          callback(null, result)
        })
      })
    }).on('error', err => {

      return callback(err, null)
    }).end()
  }

  /**
   * Sends a request for checkout
   * @returns {Promise} promise
   * 
   * @api public
   */
  send() {
    return new Promise((resolve, reject) => {
      this.prepareRequest()

      return https.request(this.httpsOptions, res => {

        let body = ''
        res.on('data', d => body += d)
        res.on('end', () => {
          this.stringParser(body, (err, result) => {
            if (err) {
              return reject(err)
            }

            resolve(result)
          })
        })
      }).on('error', err => {

        return reject(err)
      }).end()
    })
  }
  /**
   * Prepares the request object with the settings of the object. Meant to be used as a internal.
   * 
   * @api private
   */
  prepareRequest() {
    switch (this.mode) {
      case 'sandbox':
        this.httpsOptions.hostname = 'https://ws.sandbox.pagseguro.uol.com.br'
      default:
        this.httpsOptions.path = `/v2/checkout?email=${this.email}&token=${this.token}`
        this.httpsOptions.body = this.xmlHeader + this.xmlBuider.buildObject({
          checkout: this.obj
        })
    }
  }
}