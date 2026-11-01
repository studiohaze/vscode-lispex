'use strict';

const { spawn } = require('node:child_process');
const { TextDecoder } = require('node:util');

const MAX_FORMATTED_BYTES = 4 * 1024 * 1024 + 1;
const MAX_DIAGNOSTIC_BYTES = 64 * 1024;

function formatDocument({ executable, source, timeoutMs, prefixArgs = [] }) {
  return new Promise((resolve, reject) => {
    const child = spawn(executable, [...prefixArgs, 'fmt', '-'], {
      shell: false,
      windowsHide: true,
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    const stdout = [];
    const stderr = [];
    let stdoutBytes = 0;
    let stderrBytes = 0;
    let settled = false;

    const finish = (callback) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      callback();
    };
    const timer = setTimeout(() => {
      child.kill();
      finish(() =>
        reject(new Error(`Lispex formatter timed out after ${timeoutMs} ms.`))
      );
    }, timeoutMs);

    child.on('error', (error) => {
      finish(() =>
        reject(
          new Error(
            `Cannot start Lispex formatter at ${JSON.stringify(executable)}: ${error.message}`
          )
        )
      );
    });
    child.stdout.on('data', (chunk) => {
      stdoutBytes += chunk.length;
      if (stdoutBytes > MAX_FORMATTED_BYTES) {
        child.kill();
        finish(() =>
          reject(new Error('Lispex formatter returned more than 4 MiB.'))
        );
        return;
      }
      stdout.push(chunk);
    });
    child.stderr.on('data', (chunk) => {
      stderrBytes += chunk.length;
      if (stderrBytes <= MAX_DIAGNOSTIC_BYTES) {
        stderr.push(chunk);
      }
    });
    child.on('close', (code, signal) => {
      finish(() => {
        const details = Buffer.concat(stderr).toString('utf8').trim();
        if (code !== 0) {
          reject(
            new Error(
              details ||
                `Lispex formatter exited with ${code ?? `signal ${signal}`}.`
            )
          );
          return;
        }
        try {
          resolve(
            new TextDecoder('utf-8', { fatal: true }).decode(
              Buffer.concat(stdout)
            )
          );
        } catch {
          reject(new Error('Lispex formatter returned invalid UTF-8.'));
        }
      });
    });

    child.stdin.on('error', (error) => {
      if (error.code !== 'EPIPE') {
        finish(() =>
          reject(
            new Error(
              `Cannot send source to Lispex formatter: ${error.message}`
            )
          )
        );
      }
    });
    child.stdin.end(source, 'utf8');
  });
}

module.exports = { formatDocument };
