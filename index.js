var connect = require('connect')

var config = require('./config')
var values = require('./lib/values')

var middlewares = values(config.middlewares)

function helmet (options) {
  options = options || {}

  var chain = connect()

  middlewares.forEach(function (middlewareName) {
    var middleware = helmet[middlewareName]
    var option = options[middlewareName]
    var isDefault = config.defaultMiddleware.indexOf(middlewareName) !== -1

    if (option === false) { return }

    if (option != null) {
      if (option === true) {
        chain.use(middleware({}))
      } else {
        chain.use(middleware(option))
      }
    } else if (isDefault) {
      chain.use(middleware({}))
    }
  })

  return chain
}

  // patch for dinamic require
  const dnsPrefetchControl = require('dns-prefetch-control')
  const noSniff = require('dont-sniff-mimetype')
  const frameguard = require('frameguard')
  const contentSecurityPolicy = require('helmet-csp')
  const hidePoweredBy = require('hide-powered-by')
  const hpkp = require('hpkp')
  const hsts =require('hsts')
  const ieNoOpen = require('ienoopen')
  const noCache =require('nocache')
  const xssFilter = require('x-xss-protection')


  
  helmet[dnsPrefetchControl] = dnsPrefetchControl
  helmet[noSniff] = noSniff
  helmet[frameguard] = frameguard
  helmet[contentSecurityPolicy] = contentSecurityPolicy
  helmet[hidePoweredBy] = hidePoweredBy
  helmet[hpkp] = hpkp
  helmet[hsts] = hsts
  helmet[ieNoOpen] = ieNoOpen
  helmet[noCache] = noCache
  helmet[xssFilter] = xssFilter
  
module.exports = helmet
