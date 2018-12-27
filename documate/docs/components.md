# Components

This section just displays the different component types we support. We assume you have a basic
understanding of Markdown and some of its flavors, such as GitHub.

### Typography

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

### Buttons

<button class="button button-default">Default</button>
<button class="button button-primary">Primary</button>
<button class="button button-secondary">Secondary</button>
<button class="button button-danger">Danger</button>
<button class="button button-text">Text</button>
<button class="button button-link">Link</button>

### Code Sweets

Use an inline triple backtick to get inline code tidbits highlighted, for instance `componentWillMount` or `Vec<&Poly::Morph> as i64`.

### Code Blocks

[HighlightJS](https://highlightjs.org) to display code in awesome blocks we style with our base CSS.
If you wish to integrate your own theme, then just replace the custom theme with your own (after build). Unfortunately, we don't support dynamic theme changing though we do have some ideas in place. Hopefully, we will be implementing these features in the near future.

To display code in a certain language, append the name of your language to the regular triple backticks. The language must flow with the name of the HighlightJS version. So for instance:
