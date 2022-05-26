require('@babel/register')({
  presets: ['@babel/preset-env'],
  plugins: ['@babel/plugin-transform-runtime']
})

//set app
const app = require('./src/app')

module.exports = app
