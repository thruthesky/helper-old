import { Core } from '../../providers/core/core';

export class app {

    static isCordova: boolean = false;

    static title ( key:string, component:any ) {
        Core.translate( key, (x) => {
            component.appTitle = x;
        } );
    }

    
    static isBrowser() {
        if ( document.URL.indexOf( 'http://' ) != -1 ) return true;
        if ( document.URL.indexOf( 'https://' ) != -1 ) return true;
        return false;
    }


static urlencode (str) {
  str = (str + '')
  return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A')
    .replace(/%20/g, '+')
}
static http_build_query (formdata, numericPrefix?, argSeparator?) { // eslint-disable-line camelcase
  var value
  var key
  var tmp = []

  var _httpBuildQueryHelper = function (key, val, argSeparator) {
    var k
    var tmp = []
    if (val === true) {
      val = '1'
    } else if (val === false) {
      val = '0'
    }
    if (val !== null) {
      if (typeof val === 'object') {
        for (k in val) {
          if (val[k] !== null) {
            tmp.push(_httpBuildQueryHelper(key + '[' + k + ']', val[k], argSeparator))
          }
        }
        return tmp.join(argSeparator)
      } else if (typeof val !== 'function') {
        return app.urlencode(key) + '=' + app.urlencode(val)
      } else {
        throw new Error('There was an error processing for http_build_query().')
      }
    } else {
      return ''
    }
  }

  if (!argSeparator) {
    argSeparator = '&'
  }
  for (key in formdata) {
    value = formdata[key]
    if (numericPrefix && !isNaN(key)) {
      key = String(numericPrefix) + key
    }
    var query = _httpBuildQueryHelper(key, value, argSeparator)
    if (query !== '') {
      tmp.push(query)
    }
  }

  return tmp.join(argSeparator)
}

}
