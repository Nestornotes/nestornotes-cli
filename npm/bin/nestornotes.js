#!/usr/bin/env node
// Thin Node.js wrapper that proxies to the Python `nestornotes` CLI on PyPI
// via `uvx`. The pinned version matches this npm package's version, so
// installing `nestornotes@<X.Y.Z>` from npm always runs the matching wheel.
//
// Requires: `uv` on PATH (https://astral.sh/uv).

"use strict";

const { spawn, spawnSync } = require("node:child_process");
const path = require("node:path");
const { version } = require(path.join(__dirname, "..", "package.json"));

function fail(msg) {
  process.stderr.write(`nestornotes: ${msg}\n`);
  process.exit(1);
}

// Verify uv is installed before invoking — gives a useful error rather than
// the cryptic "ENOENT" you'd get from spawn() on a missing binary.
const uvCheck = spawnSync("uv", ["--version"], { stdio: "ignore" });
if (uvCheck.error || uvCheck.status !== 0) {
  fail(
    "`uv` is not installed or not on PATH.\n" +
    "Install it: https://astral.sh/uv (one-line curl on macOS / Linux / Windows).\n" +
    "Then re-run this command."
  );
}

const args = ["tool", "run", `nestornotes==${version}`, ...process.argv.slice(2)];
const child = spawn("uv", args, { stdio: "inherit" });

child.on("error", (err) => fail(`failed to spawn uv: ${err.message}`));
child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 1);
  }
});
