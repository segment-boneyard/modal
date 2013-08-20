
var after = require('after-transition')
  , bind = require('event').bind
  , classes = require('classes')
  , domify = require('domify')
  , Emitter = require('emitter')
  , escape = require('on-escape')
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
 * @param {Object} options (optional)
 */

function Modal (el, options) {
  if (!(this instanceof Modal)) return new Modal(el);
  this.view = el;
  this.overlay = overlay({ closable: true }).addClass('modal-overlay');
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
  this.overlay.on('hide', hide);
  bind(this.close, 'click', hide);
  escape(hide);
};


/**
 * Show the modal.
 *
 * @return {Modal}
 */

Modal.prototype.show = function () {
  var self = this;
  this.overlay.show();
  after.once(this.modal, function () {
    self.emit('show');
  });
  this.removeClass('hidden');
  return this;
};


/**
 * Hide the modal.
 *
 * @return {Modal}
 */

Modal.prototype.hide = function () {
  var self = this;
  this.overlay.off().hide(); // off first to avoid loop
  after.once(this.modal, function () {
    self.emit('hide');
  });
  this.addClass('hidden');
  return this;
};


/**
 * Remove the modal from the DOM.
 *
 * @return {Modal}
 */

Modal.prototype.remove = function () {
  this.overlay.off().remove();
  this.wrapper.parentNode.removeChild(this.wrapper);
  this.emit('remove');
  return this;
};


/**
 * Add a class to the modal and modal wrapper.
 *
 * @param {String} name
 * @return {Modal}
 */

Modal.prototype.addClass = function (name) {
  this.overlay.addClass(name);
  classes(this.wrapper).add(name);
  classes(this.modal).add(name);
  return this;
};


/**
 * Remove a class from the modal and modal wrapper.
 *
 * @param {String} name
 * @return {Modal}
 */

Modal.prototype.removeClass = function (name) {
  this.overlay.removeClass(name);
  classes(this.wrapper).remove(name);
  classes(this.modal).remove(name);
  return this;
};
