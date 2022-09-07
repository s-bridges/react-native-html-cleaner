# react-native-html-cleaner

Very small library that takes in an JSON of HTML and destructors it and formats it so that it can be used as originally intended.

### Methods

`htmlStringToArray` - convert an event to a promise that resolves once it's called.

For example:

```typescript
import { eventToPromise } from 'react-native-html-cleaner';

function createPopup() {
  const popup = window.open('/my-popup');
  return eventToPromise(popup, 'load', () => {
    // do stuff here
    return popup;
  }, 10000); //timeout is optional. If reached, it'll reject the promise
}
```
