# Introduction

```bash
## Run check
if [$NODE_ENV.production ~= !]
  return true;
else
  echo 'Production ready'
  exit
```

```c
#include<stdio.h>
#include<jsx_pragma.h>

Jsx_scope<int> render() {
  Jsx_Element.span(rndint()).content();
}
```

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

```javascript
export default arr => arr.reduce((acc, cv) => acc.splice(cv))
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

Welcome to Documate v0.1.0. We'll run you through a brief history then show you how to create your own
professional site.

## History

<button class="button button-primary">Button</button>
