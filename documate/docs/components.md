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

<button>Default</button>
<button class="btn-primary">Primary</button>
<button class="btn-success">Success</button>
<button class="btn-warning">Warning</button>
<button class="btn-danger">Danger</button>

### Code Sweets

Use an inline triple backtick to get inline code tidbits highlighted, for instance `componentWillMount` or `Vec<&Poly::Morph> as i64`.

### Code Blocks

[HighlightJS](https://highlightjs.org) to display code in awesome blocks we style with our base CSS.
If you wish to integrate your own theme, then just replace the custom theme with your own (after build). Unfortunately, we don't support dynamic theme changing though we do have some ideas in place. Hopefully, we will be implementing these features in the near future.

To display code in a certain language, append the name of your language to the regular triple backticks. The language must flow with the name of the HighlightJS version. So for instance:

```rust

// Packem module bundler plugin
#![crate_type = "dylib"]
#![feature(std_misc)]

use std::ffi::CString;

#[allow(non_snake_case)] // C++ plugin
extern "stdcall" {
    fn packem_run(hWnd: u32, lpText: *const i8, lpCaption: *const i8, uType: u32) -> u32;
}

#[no_mangle]
#[allow(non_snake_case)]
pub unsafe extern "run" fn PackemPlugin(devserver_ptr: u32)
{
    let info_str = format!("MyPlugin created: {}!", devserver_ptr.instance.time());
    let caption = CString::new("Hello from my Packem plugin!").unwrap();
    packem_run(0, info_str.as_ptr(), caption.as_ptr(), 0);
}
```

```typescript
// This is some TypeScript

namespace sign {
  export interface detached {
    (msg: Uint8Array, secretKey: Uint8Array): Uint8Array;
    verify(msg: Uint8Array, sig: Uint8Array, publicKey: Uint8Array): boolean;
  }

  export interface keyPair {
    (): SignKeyPair;
    fromSecretKey(secretKey: Uint8Array): SignKeyPair;
    fromSeed(secretKey: Uint8Array): SignKeyPair;
  }
}
```


