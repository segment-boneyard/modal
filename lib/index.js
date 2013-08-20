var after = require('after-transition')
  , bind = require('event').bind
  , classes = require('classes')
  , domify = require('domify')
  , Emitter = require('emitter')
  , escape = require('on-escape')
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
  this.el = domify(template);
  this.modal = this.el.querySelector('div');
  this.close = this.el.querySelector('a');
  this.modal.appendChild(this.view);
  document.body.appendChild(this.el);
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
  bind(this.modal, 'click', stop); // swallow to avoid hiding
  bind(this.el, 'click', hide);
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
  after.once(this.el, function () {
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
  after.once(this.el, function () {
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
  this.el.parentNode.removeChild(this.el);
  this.emit('remove');
  return this;
};


/**
 * Add a class to the modal and modal overlay.
 *
 * @param {String} name
 * @return {Modal}
 */

Modal.prototype.addClass = function (name) {
  classes([this.el, this.modal]).add(name);
  return this;
};


/**
 * Remove a class from the modal and modal overlay.
 *
 * @param {String} name
 * @return {Modal}
 */

Modal.prototype.removeClass = function (name) {
  classes([this.el, this.modal]).remove(name);
  return this;
};
