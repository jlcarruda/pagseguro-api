/*

  TODO: Configurar funções do módulo para rotas da API
*/


class Pagseguro {
  
  Bluebird = require('bluebird')
  xml = require('xml2js')
  https = require('https')

  constructor(configObj) {
    if (arguments.length > 1){
      this.email = arguments[0]
      this.token = arguments[1]
      this.mode = 'payment'
      console.warn('The use of this type of constructor is retained only for legacy compatibility. Please, use and object with the needed attributes');
    } else {
      this.email = configObj.email
      this.token = configObj.token
      this.mode = configObj.mode || 'payment'
    }

    this.requestObj = {}
    this.xmlHeader = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
    
    this.httpsOptions = {
      method: 'POST',
      hostname: 'https://ws.pagseguro.uol.com.br',
      secureProtocol: 'TLSv1_2_method',
      headers: {
        'Content-type': 'application/xml; charset=UTF-8'
      }
    }
  }

  


}