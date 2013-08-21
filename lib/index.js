
var after = require('after-transition')
  , bind = require('event').bind
  , classes = require('classes')
  , domify = require('domify')
  , Emitter = require('emitter')
  , overlay = require('overlay')
  , stop = require('stop')
  , template = require('./index.html');


/**
 * Expose `Modal`.
 */

module.exports = Modal;


/**
 * Initialize a new `Modal`.
 *
 * @param {Element} el
 */

function Modal (el) {
  if (!(this instanceof Modal)) return new Modal(el);
  this.view = el;
  this.overlay = overlay().addClass('modal-overlay');
  this.wrapper = domify(template);
  this.modal = this.wrapper.querySelector('div');
  this.close = this.wrapper.querySelector('a');
  this.modal.appendChild(this.view);
  document.body.appendChild(this.wrapper);
  this.bind();
}


/**
 * Mixin emitter.
 */

Emitter(Modal.prototype);


/**
 * Bind to DOM events.
 *
 * @api private
 */

Modal.prototype.bind = function () {
  var hide = this.hide.bind(this);
  this.overlay.on('hiding', hide);
  bind(this.close, 'click', hide);
};


/**
 * Show the modal.
 *
 * @param {Function} callback
 * @return {Modal}
 */

Modal.prototype.show = function (callback) {
  var self = this;
  this.overlay.show(function () {
    self.emit('show');
    if ('function' === typeof callback) callback();
  });
  this.removeClass('hidden', true);
  return this;
};


/**
 * Hide the modal.
 *
 * @param {Function} callback
 * @return {Modal}
 */

Modal.prototype.hide = function (callback) {
  var self = this;
  this.overlay
    .off() // off first to avoid loop
    .hide(function () {
      self.emit('hide');
      if ('function' === typeof callback) callback();
    });
  this.addClass('hidden', true);
  return this;
};


/**
 * Remove the modal from the DOM.
 *
 * @param {Function} callback
 * @return {Modal}
 */

Modal.prototype.remove = function (callback) {
  var self = this;
  this.overlay.off().remove(function () {
    self.wrapper.parentNode.removeChild(self.wrapper);
    self.emit('remove');
    if ('function' === typeof callback) callback();
  });
  return this;
};


/**
 * Make the modal closeable.
 *
 * @return {Modal}
 */

Modal.prototype.closeable =
Modal.prototype.closable = function () {
  this.overlay.closeable();
  return this;
};


/**
 * Make the modal temporary.
 *
 * @return {Modal}
 */

Modal.prototype.temporary = function () {
  this.overlay.temporary();
  return this;
};


/**
 * Add a class to the modal. If the `all` flag is set, then it will add the
 * class to the overlay and wrapper too, for styling purposes.
 *
 * @param {String} name
 * @param {Boolean} all
 * @return {Modal}
 */

Modal.prototype.addClass = function (name, all) {
  classes(this.modal).add(name);
  if (all) {
    classes(this.wrapper).add(name);
    this.overlay.addClass(name);
  }
  return this;
};


/**
 * Remove a class from the modal. If the `all` flag is set, then it will remove
 * the class from the overlay and wrapper too, for styling purposes.
 *
 * @param {String} name
 * @param {Boolean} all
 * @return {Modal}
 */

Modal.prototype.removeClass = function (name, all) {
  classes(this.modal).remove(name);
  if (all) {
    classes(this.wrapper).remove(name);
    this.overlay.removeClass(name);
  }
  return this;
};
