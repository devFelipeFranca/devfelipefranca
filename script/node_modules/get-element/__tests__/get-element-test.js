//----------------------------------------------------------
// setup
//----------------------------------------------------------
jest.dontMock('../index')
const el = require('../index')

// jsdom page
document.body.innerHTML = `
  <section class="one"></section>
  <article class="two"></article>
  <article class="two"></article>
  <div class="root">
    <span class="root__one"></span>
    <div class="root__two"></div>
    <div class="root__two"></div>
  </div>
  <!-- red herrings -->
  <div class="root__one"></div>
  <div class="root__two"></div>
`

// helper function
function testCases(cases, fn) {
  cases.map((testCase, i) => {
    it(`case: ${testCase}`, () => {
      expect(fn(testCase)).toEqual(i)
    })
  })
}

//----------------------------------------------------------
// tests
//----------------------------------------------------------
describe('get element with class from document', () => {
  testCases(
    ['none', 'one', 'two'],
    testClass => el.withClass(testClass).length
  )
})

describe('get element with tag from document', () => {
  testCases(
    ['p', 'section', 'article'],
    testTag => el.withTag(testTag).length
  )
})

describe('get element with class from element', () => {
  testCases(
    ['none', 'root__one', 'root__two'],
    testClass => {
      const root = el.withClass('root')[0]
      return el.withClass(testClass, root).length
    }
  )
})

describe('get element with tag from element', () => {
  testCases(
    ['p', 'span', 'div'],
    testTag => {
      const root = el.withClass('root')[0]
      return el.withTag(testTag, root).length
    }
  )
})

/* globals jest, expect */
