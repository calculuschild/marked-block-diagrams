# marked-aligned-paragraphs

Add paragraph alignment attributes to paragraphs using HTML base left, right, and center. This syntax borrows the `:---:` column alignment syntax from Github-flavored Markdown tables.

## Left Alignment / Ragged Right

Left-alignment is set by preceeding the paragraph with  `:--- ` (any number of hyphens will work)


***Example:***
```
:- This is my parapgraph.
```

***Example:***
```
:-----------
This is my
paragraph
```

## Right Alignment / Ragged Left

Right-alignment is set by preceeding the paragraph with  `---: ` (any number of hyphens will work)

***Example:***
```
-: This is my parapgraph.
```

***Example:***
```
-----------:
This is my
paragraph
```

## Center Alignment

Center-alignment is set by preceeding the paragraph with  `:---: ` (any number of hyphens will work)

***Example:***
```
:-: This is my parapgraph.
```

***Example:***
```
:----------:
This is my
paragraph
```

## Notes:
- Alignment will apply only to the current paragraph (an empty line or end of file)

# Usage
<!-- Show most examples of how to use this extension -->

```js
const marked = require("marked");
const markedAlignedParagraphs = require("marked-aligned-paragraphs");

marked.use({ extensions: [markedAlignedParagraphs] });

const html = marked.parse(":-: This is a center-aligned paragraph.");
console.log(html);
// <p align="center">This is a center-aligned paragraph.</p>
```

or

```js
import { Marked } from "marked";
import markedAlignedParagraphs from "marked-aligned-paragraphs";

marked.use({ extensions: [markedAlignedParagraphs] });

const html = marked.parse(":-: This is a center-aligned paragraph.");
console.log(html);
// <p align="center">This is a center-aligned paragraph.</p>
```

