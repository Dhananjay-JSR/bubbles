---
component: card
---

```js
import { Card, CardHeader, CardFooter } from "bubbles-ui";

const props = {
  color: "white", //add any color variable
  border: false, //default value
  shadow: true, //default value
  height100: false,
  px: 0.065,
  py: 2,
  header: {
    title: "Card Title",
    border: false, //remove the botto border from the header
  },
  footer: {
    pagination: false, //TODO:
  },
};

<Card {...props}>Add whatever content into the card</Card>;
```