# Lispex for Visual Studio Code and Open VSX

Editor support for [Lispex](https://www.lispex.com), a safe language for business rules:

- `.lspx` file recognition;
- Lispex syntax highlighting;
- the Lispex file icon in both light and dark editor themes; and
- Format Document support through the installed Native `lispex fmt` command.

The extension does not bundle a runtime or language server. Install the Native
Lispex CLI, make `lispex` available on `PATH`, then use **Format Document** or
format-on-save. If the executable lives elsewhere, set
`lispex.format.executable` to its path. Formatting preserves comments and
literal spellings and reports invalid source without changing the document.
Autocomplete, hover information, and editor diagnostics are not included.

## Install

- [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=studiohaze.lispex)
- [Open VSX Registry](https://open-vsx.org/extension/studiohaze/lispex)
- **From source** — package it yourself:

  ```sh
  cd editors/vscode
  npx @vscode/vsce package
  code --install-extension lispex-*.vsix
  ```

## Grammar

`syntaxes/lispex.tmLanguage.json` covers the special forms the interpreter
recognises, the standard procedure set, `#t` / `#f`, `#\char` literals,
line and nested `#| … |#` comments, decimal integer/rational/real literals,
strings with supported escapes, and quote/quasiquote/unquote punctuation.

Lispex deliberately rejects reader extensions such as the `#;` datum comment,
`#lang`, and numeric radix/exactness prefixes such as `#x` and `#e`. The
extension does not highlight those spellings as supported syntax.

## Formatting

The editor sends the current document to `lispex fmt -` without a shell and
uses stdout only after the command succeeds. The default timeout is ten
seconds; `lispex.format.timeoutMs` can set a value from 1,000 to 60,000 ms.
Formatting is a Native CLI feature. The npm runtime, browser WASM, and
Playground do not provide it.

## License

This extension is distributed under Apache-2.0. Its license does not license
the private Lispex source repository or grant rights to Lispex marks.
