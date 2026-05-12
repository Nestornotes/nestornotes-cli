# nestornotes

Open-source command-line client for **[NestorNotes](https://nestornotes.com)** — your AI-powered knowledge base.

This CLI is a thin, auditable wrapper that talks to the hosted [NestorNotes MCP server](https://mcp.nestornotes.com/mcp) over the [Model Context Protocol](https://modelcontextprotocol.io/). Every line of code that runs on your machine is in this repository — read it before you install.

| Surface | Source | License |
|---|---|---|
| **CLI client (this repo)** | [`src/nestornotes/cli.py`](src/nestornotes/cli.py), [`npm/`](npm/) | MIT (open source) |
| MCP server (hosted) | Proprietary, runs at `https://mcp.nestornotes.com/mcp` | Closed source |

The CLI is **generated** from the server's tool registry by [`fastmcp generate-cli`](https://gofastmcp.com/cli/generate-cli) — `cli.py` is regenerated each release and pushed here via PR. You can verify by reading the file directly: it's plain Python, no obfuscation.

## Install

### Via PyPI (recommended)

```bash
uv tool install nestornotes        # or: pipx install nestornotes
nestornotes --help
```

Run ephemerally without installing: `uvx nestornotes --help`.

Upgrade: `uv tool upgrade nestornotes` (or `pipx upgrade nestornotes`).

### Via npm

```bash
npm install -g nestornotes         # requires `uv` on PATH (https://astral.sh/uv)
```

The npm package is a [thin Node.js wrapper](npm/bin/nestornotes.js) that proxies to the matching PyPI wheel via `uvx` — same Python code, different distribution channel.

## Usage

```bash
nestornotes call-tool list_collections
nestornotes call-tool semantic_search --query "rust async"
nestornotes call-tool list_articles --collection-id <uuid> --limit 5
```

By default the CLI talks to `https://mcp.nestornotes.com/mcp`. Override per-environment:

```bash
NESTORNOTES_SERVER_URL=http://localhost:8000/mcp nestornotes call-tool list_collections
```

OAuth is handled automatically by FastMCP: the first tool call opens a browser for Supabase sign-in; the token is cached locally.

## What this CLI does (and doesn't)

- **Does:** Parse your shell arguments → open an HTTPS connection to the configured MCP server → forward your call → print the JSON response.
- **Does not:** Execute any business logic locally. Cache anything but OAuth tokens. Send telemetry. Talk to anything other than the configured `NESTORNOTES_SERVER_URL`.

You can verify all of the above by reading [`src/nestornotes/cli.py`](src/nestornotes/cli.py) — it imports `cyclopts` (for argument parsing), `fastmcp` (for the MCP client), and `rich` (for output). That's it.

## How updates happen

This repo is **not hand-edited.** When the NestorNotes server adds, changes, or removes a tool, an automated PR appears here with the regenerated `cli.py`. The PR contains exactly two artifact files (plus version bumps) — `src/nestornotes/cli.py` and `src/nestornotes/SKILL.md` — so you can diff each release against the previous one to see what changed.

Each release is tagged `vX.Y.Z` and triggers PyPI + npm publication via GitHub Actions ([`release.yml`](.github/workflows/release.yml)).

## Verifying what you install

```bash
nestornotes --version
gh release view vX.Y.Z --repo nestornotes/nestornotes-cli
pip download --no-deps nestornotes==X.Y.Z
unzip -l nestornotes-X.Y.Z-py3-none-any.whl
```

The wheel contains exactly three files: `__init__.py`, `cli.py`, `SKILL.md`. Nothing more.

## License

MIT. See [LICENSE](LICENSE).

The CLI is open source. The MCP server it talks to is proprietary — but the *interface* (every tool name, parameter, and docstring) is fully documented here in `cli.py`.
