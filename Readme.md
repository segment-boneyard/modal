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
<div class="overlay modal-overlay">
  <div class="modal">
    <a class="modal-close-button"></a>
    { Your element gets injected here. }
  </div>
</div>
```

The outer-most element has a class of `overlay`, so that it will inherit styles and themes from the [`component/overlay`](https://github.com/component/overlay) component.


### Modal(el)
  Create a new `Modal` instance with the given `el`.

### #show
  Show the modal, emitting `show`.

### #hide
  Hide the modal, emitting `hide`.

### #remove
  Remove the modal from the DOM.

### #addClass(name)
  Add a class `name` to the modal's element.

### #removeClass(name)
  Remove a class `name` from the modal's element.

## License

  MIT
