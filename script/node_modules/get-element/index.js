/**
 * @func withClass
 * @desc get elements by .class
 * @param {string} className - name of class to match
 * @param {object} [fromEl=document] - element to start search from
 * @returns {array<object>} array of elements
 */
function withClass(className, fromEl) {
  fromEl = fromEl || document
  return Array.prototype.slice.call(fromEl.getElementsByClassName(className))
}

/**
 * @func withTag
 * @desc get elements by <tag>
 * @param {string} tagName - name of tag to match
 * @param {object} [fromEl=document] - element to start search from
 * @returns {array<object>} array of elements
 */
function withTag(tagName, fromEl) {
  fromEl = fromEl || document
  return Array.prototype.slice.call(fromEl.getElementsByTagName(tagName))
}

module.exports = {
  withClass: withClass,
  withTag: withTag
}
