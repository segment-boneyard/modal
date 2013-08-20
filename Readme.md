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
<div class="overlay modal-overlay"></div>
<div class="modal-wrapper">
  <div class="modal">
    <a class="modal-close-button"></a>
    { Your element gets injected here. }
  </div>
</div>
```

A [`component/overlay`](https://github.com/component/overlay) element is used to create the mask above the screen, so if you've already themed it you've got no more work to do.


### Modal(el)
  Create a new `Modal` instance with the given `el`.

### #show
  Show the modal, emitting `show`.

### #hide
  Hide the modal, emitting `hide`.

### #remove
  Remove the modal from the DOM.

### #addClass(name)
  Add a class `name` to the `.modal` and `.modal-overlay`.

### #removeClass(name)
  Remove a class `name` from the `.modal` and `.modal-overlay`.

## License

  MIT