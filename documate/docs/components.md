# Components

In this section, all the basic components in a Markdown document are listed.

> Tip
>
> You can create custom styles by using Bootstrap 4 class names. For a fresh start with Bootstrap, check [this link](https://getbootstrap.com/docs/4.0/getting-started/introduction/).

## Typography

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

## Buttons

Buttons come in 5 different (common?) forms:

<div style="display: flex;flex-direction: row;">
  <button class="btn btn-default">Default</button>
  <button style="margin-left: 10px;" class="btn btn-primary">Primary</button>
  <button style="margin-left: 10px;" class="btn btn-success">Success</button>
  <button style="margin-left: 10px;" class="btn btn-warning">Warning</button>
  <button style="margin-left: 10px;" class="btn btn-danger">Danger</button>
</div>

## Blockquotes

One thing about blockquotes is you need to create blockquotes in this format:

```markdown
> A tip or something
>
> Opinion, statement or just some dummy text.
```

### Result

> A tip or something
>
> Opinion, statement or just some dummy text.

### Complex blockquotes

```markdown
> Note
>
> Some content here. This could be _any type of_ **content**
>
> - Maybe just a list item
> - An unordered list item
> - Or something like that
>
> 1. Sometimes things look neater
> 2. When they're ordered
> 3. So keep your docs tidy
>
> Try using some `inlineCode()` and when things get instense,
> you can embed a code editor in a blockquote with a `<pre>` tag. Pretty sweet, right?
>
> You could use tables as well:
>
> | Fruit  | I like it   |
> | ------ | ----------- |
> | Apple  | Definitely  |
> | Grapes | My favorite |
> | Banana | Sometimes   |
```

### Result

> Note
>
> Some content here. This could be _any type of_ **content**
>
> - Maybe just a list item
> - An unordered list item
> - Or something like that
>
> 1. Sometimes things look neater
> 2. When they're ordered
> 3. So keep your docs tidy
>
> Try using some `inlineCode()` and when things get instense,
> you can embed a code editor in a blockquote with a `<pre>` tag. Pretty sweet, right?
>
> You could use tables as well:
>
> | Fruit  | I like it   |
> | ------ | ----------- |
> | Apple  | Definitely  |
> | Grapes | My favorite |
> | Banana | Sometimes   |

## Code Blocks

Documate uses [PrismJS](https://prismjs.com) to highlight code blocks with a [custom CSS theme](https://github.com/bukharim96/documate/blob/master/src/editor-theme.css). Prefix any language supported by Prism next to the opening triple backticks and just start coding. Documate will do the rest.

### Examples

#### JavaScript

```javascript
// Filter object with Array.prototype.reduce

const items = {
  1: {
    id: 1,
    name: "Apples"
  },
  2: {
    id: 2,
    name: "Grapes"
  }
};

const filterId = 1;

const filteredItems = Object.keys(items).reduce(
  (acc, key) =>
    items[key].id === filterId
      ? acc
      : {
          ...acc,
          [key]: items[key]
        },
  {}
);

console.log(filteredItems);

// Logs:
//
// {
//   2: {
//     id: 2,
//     name: "Grapes"
//   }
// }
```

#### JSX

```jsx
import React from "react";
import { withProps } from "recompose";

import Item from "./components/Item";

export default withProps(({ items }) => (
  <>
    {items.map(item => (
      <Item id={generateUniqueId()} />
    ))}
  </>
));
```

#### Rust

```rust
// Adapted from servo's CGlib

#[repr(C)]
#[derive(Clone, Copy, Debug, Default)]
pub struct CGSize {
    pub width: CGFloat,
    pub height: CGFloat,
}

impl CGSize {
    #[inline]
    pub fn new(width: CGFloat, height: CGFloat) -> CGSize {
        CGSize {
            width: width,
            height: height,
        }
    }

    #[inline]
    pub fn apply_transform(&self, t: &CGAffineTransform) -> CGSize {
        unsafe {
            ffi::CGSizeApplyAffineTransform(*self, *t)
        }
    }
}

// Macro rule (from libc)

macro_rules! s {
    ($($(#[$attr:meta])* pub $t:ident $i:ident { $($field:tt)* })*) => ($(
        __item! {
            #[repr(C)]
            $(#[$attr])*
            pub $t $i { $($field)* }
        }
        impl ::dox::Copy for $i {}
        impl ::dox::Clone for $i {
            fn clone(&self) -> $i { *self }
        }
    )*)
}
```

#### HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Documate</title>
  </head>
  <body>
    <script>
      alert(JSON.stringify(window.navigator));
    </script>
  </body>
</html>
```

The following syntaxes are supported: `abap`, `actionscript`, `ada`, `apacheconf`, `apl`, `applescript`, `arduino`, `arff`, `asciidoc`, `asm6502`, `aspnet`, `autohotkey`, `autoit`, `bash`, `basic`, `batch`, `bison`, `brainfuck`, `bro`, `c`, `clike`, `clojure`, `coffeescript`, `core`, `cpp`, `crystal`, `csharp`, `csp`, `css-extras`, `css`, `d`, `dart`, `diff`, `django`, `docker`, `eiffel`, `elixir`, `elm`, `erb`, `erlang`, `flow`, `fortran`, `fsharp`, `gedcom`, `gherkin`, `git`, `glsl`, `go`, `graphql`, `groovy`, `haml`, `handlebars`, `haskell`, `haxe`, `hpkp`, `hsts`, `http`, `ichigojam`, `icon`, `inform7`, `ini`, `io`, `j`, `java`, `javascript`, `jolie`, `json`, `jsx`, `julia`, `keyman`, `kotlin`, `latex`, `less`, `liquid`, `lisp`, `livescript`, `lolcode`, `lua`, `makefile`, `markdown`, `markup-templating`, `markup`, `matlab`, `mel`, `mizar`, `monkey`, `n4js`, `nasm`, `nginx`, `nim`, `nix`, `nsis`, `objectivec`, `ocaml`, `opencl`, `oz`, `parigp`, `parser`, `pascal`, `perl`, `php-extras`, `php`, `plsql`, `powershell`, `processing`, `prolog`, `properties`, `protobuf`, `pug`, `puppet`, `pure`, `python`, `q`, `qore`, `r`, `reason`, `renpy`, `rest`, `rip`, `roboconf`, `ruby`, `rust`, `sas`, `sass`, `scala`, `scheme`, `scss`, `smalltalk`, `smarty`, `soy`, `sql`, `stylus`, `swift`, `tap`, `tcl`, `textile`, `tsx`, `tt2`, `twig`, `typescript`, `vbnet`, `velocity`, `verilog`, `vhdl`, `vim`, `visual-basic`, `wasm`, `wiki`, `xeora`, `xojo`, `xquery`, `yaml`.

## Code Sweets

These tiny tidbits are so sweet. Just don't overuse 'em:


`packem.require('./custom')`, `UNSAFE_shouldComponentUpdate`

## Images

To embed an image, use the following syntax:

```markdown
![Picture of lizard](./img/lizard.jpg "Some shy lizard")
```

<center>

![Picture of lizard](./img/lizard.jpg "Some shy lizard")

</center>

Inspect this image to view its `alt` text.

## Responsive Tables

Documate uses Bootstrap's striped table (`.table .table-striped`) to display tables by default. You can always overrride its styles.

| Project          | Is it cool? | Why                            |
| ---------------- | ----------- | ------------------------------ |
| Create React App | Yep         | Makes my life easy             |
| Documate         | Yep         | Why bother maintaining a site? |
