# Changelog

## 0.3.0

- Starts `lispex lsp` when you open a `.lspx` file. Native Lispex 1.21.2 or later
  provides errors as you type, formatting, symbols, go to definition, and
  completion and hover for built-ins.
- Set `lispex.path` to choose the installed executable. Existing
  `lispex.format.executable` settings continue to work.
- If the language server cannot start, shows an installation link and keeps
  formatting through `lispex fmt` when the installed executable supports it.

## 0.2.1

- The extension details now introduce Lispex as a safe language for business
  rules. Highlighting, file recognition, icons and formatting are unchanged.

## 0.2.0

- Added Format Document and format-on-save support through an installed Native
  `lispex fmt` executable.
- Preserves the existing syntax highlighting, `.lspx` file recognition, and
  light/dark file icon.
- Does not bundle a runtime or silently fall back to npm, WASM, or the
  Playground when the Native executable is unavailable.

## 0.1.1

- Number grammar now matches the interpreter exactly: integers, decimals
  (`1.5`), rationals (`1/2`), and exponents (`1e3`), with a leading `-` only.
  Dropped highlighting for syntax Lispex does not accept — radix/exactness
  prefixes (`#xff`, `#e1.5`), `+inf.0`/`+nan.0`, and `+5` / `.5` / `5.`.

## 0.1.0

- Initial release: TextMate syntax highlighting for `.lspx` (Lispex, a
  macro-free R7RS-small Scheme) — special forms, the standard procedure set,
  booleans, character and number literals (with radix/exactness prefixes),
  strings with escapes, line / block / datum comments, and quote / quasiquote
  punctuation. Ships the Lispex λ mark as the extension icon.
