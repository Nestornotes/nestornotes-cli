# nestornotes (npm)

Thin Node.js wrapper around the Python [`nestornotes`](https://pypi.org/project/nestornotes/) CLI. The wrapper proxies every invocation to the matching pinned PyPI wheel via [`uv`](https://astral.sh/uv), so `npm install -g nestornotes@X.Y.Z` always runs the same Python release.

## Install

```bash
# Prerequisite: uv (one-liner installer)
curl -LsSf https://astral.sh/uv/install.sh | sh   # macOS / Linux
# or: winget install astral-sh.uv                  # Windows

npm install -g nestornotes
```

## Usage

```bash
nestornotes --help
nestornotes call-tool list_collections
nestornotes call-tool semantic_search --query "rust async"
```

By default the CLI talks to `https://mcp.nestornotes.com/mcp`. Override:

```bash
NESTORNOTES_SERVER_URL=http://localhost:8000/mcp nestornotes call-tool list_collections
```

## Upgrade

```bash
npm update -g nestornotes
```

## Why a wrapper?

The actual CLI is generated from the [NestorNotes MCP server](https://github.com/grumpy-miner-dev/nestornotes-mcp)'s tool registry by `fastmcp generate-cli`. The Python wheel on PyPI is the source of truth; this npm package exists so Node-first users can install with one command.
