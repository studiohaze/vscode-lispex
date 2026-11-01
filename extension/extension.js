'use strict';

const vscode = require('vscode');
const { formatDocument } = require('./formatter-client');

function activate(context) {
  const provider = vscode.languages.registerDocumentFormattingEditProvider(
    { language: 'lispex' },
    {
      async provideDocumentFormattingEdits(document) {
        const configuration = vscode.workspace.getConfiguration(
          'lispex.format',
          document.uri
        );
        const executable = configuration.get('executable', 'lispex');
        const timeoutMs = configuration.get('timeoutMs', 10000);
        try {
          const formatted = await formatDocument({
            executable,
            source: document.getText(),
            timeoutMs,
          });
          const wholeDocument = new vscode.Range(
            document.positionAt(0),
            document.positionAt(document.getText().length)
          );
          return [vscode.TextEdit.replace(wholeDocument, formatted)];
        } catch (error) {
          const message =
            error instanceof Error ? error.message : String(error);
          void vscode.window.showErrorMessage(
            `Lispex could not format this document: ${message}`
          );
          return [];
        }
      },
    }
  );
  context.subscriptions.push(provider);
}

function deactivate() {}

module.exports = { activate, deactivate };
