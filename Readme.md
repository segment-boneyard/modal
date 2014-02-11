# modal

  A simple modal UI component.

## Installation

    $ component install segmentio/modal

## Example

```js
var modal = require('modal');
modal(el).show();
```

  To use it, pass in the `el` you want to "modal-ize".

## API

```html
<div class="Modal">
  { Your element gets injected here. }
</div>
```

A [`segmentio/overlay`](https://github.com/segmentio/overlay) element (with an `.Overlay` class) is used to create the mask above the screen, so if you've already themed it you've got no more work to do.


### Modal(el)
  Create a new `Modal` instance with the given `el`.

### #show(fn)
  Show the modal, emitting `show`, optionally calling `fn`.

### #hide(fn)
  Hide the modal, emitting `hide`, optionally calling `fn`.

### #closeable() or #closable()
  Make the modal closeable.

### #overlay()
  Shows an overlay with the modal.

### #effect(name)
  See the effect name. Comes bundled with `toggle`, `slide-in-bottom`, `sticky-up` and `fade-and-scale`.

### #addClass(name)
  Add a class `name` to the `.Modal`

### #removeClass(name)
  Remove a class `name` from the `.Modal`.

## License

  MIT