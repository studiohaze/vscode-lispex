# Lispex for Visual Studio Code and Open VSX

Editor support for [Lispex](https://www.lispex.com), a safe language for business rules:

- `.lspx` file recognition;
- Lispex syntax highlighting;
- the Lispex file icon in both light and dark editor themes;
- errors as you type and document formatting;
- symbols and go to definition; and
- completion and hover for built-ins.

Install [Native Lispex 1.21.2 or later](https://www.lispex.com/v1.21/en/docs/classic/installation)
and open a `.lspx` file. The extension starts `lispex lsp` over stdio.
Make `lispex` available on `PATH`, or set `lispex.path` to the executable's
full path. Reload the VS Code window after changing the path.
Existing `lispex.format.executable` settings also select the executable
when `lispex.path` is not set.

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

Use **Format Document** or enable format-on-save. The language server formats
the document, preserving comments and literal spellings. Invalid source stays
unchanged.

If the installed executable is older than 1.21.2 or the language server cannot
start, the extension shows an installation link. It then uses `lispex fmt -`
for formatting when that command is available. This CLI formatter has a default
timeout of ten seconds. Set `lispex.format.timeoutMs` from 1,000 to 60,000 ms
to change it. Both formatting routes use the installed Native executable.

## License

This extension is distributed under Apache-2.0. Its license does not license
the private Lispex source repository or grant rights to Lispex marks.
