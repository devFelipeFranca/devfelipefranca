'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// node
const p = require('path')
const fs = require('fs')

// npm
const uglify = require('uglify-js')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
// get absolute path to top-level get-element dir
const root = p.resolve(process.mainModule.filename, '..', '..', '..')

// read module to string
const getElement = fs.readFileSync(p.join(root, 'index.js'), 'utf8')

// remove module.exports
const noExports = getElement.split('\n').slice(0, -2).join('\n')

// append code to bind module to window in browser
const bound = noExports + `
(function() {
  this.getElement = {}
  this.getElement.withClass = withClass
  this.getElement.withTag = withTag
})()
`

// minify with uglify-js
const minified = uglify.minify(bound, {fromString: true})

// write to file
fs.writeFileSync(
  p.join(root, 'browser', 'dist', 'get-element.min.js'),
  minified.code
)
