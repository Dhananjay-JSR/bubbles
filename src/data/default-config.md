---
component: default-config
---

```js
// __layout.svelte

// First import the global css styles
import "bubbles-ui/css/app.css";

// Import config store to update defaults
import { configStore } from "bubbles-ui";

// When you include validation for inputs bubbles can
// validate each input when the input focus is lost. The
// default for this is false
$configStore.validate_on_blur = true;

// If something is marked as required as one of the
// validation requirements you can have bubbles add a "*"
// to the end of the input label. This is better UX for
// required fields. The defualt for this is true
$configStore.show_required = false;
```