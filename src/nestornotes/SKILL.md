---
name: "nestornotes-cli"
description: "Open-source CLI for the NestorNotes knowledge base. Call tools, list resources, and get prompts via the hosted MCP server."
---

# nestornotes CLI

The `nestornotes` command is the open-source client for the NestorNotes
knowledge base. It talks to the hosted MCP server at
`https://mcp.nestornotes.com/mcp` by default — override with the
`NESTORNOTES_SERVER_URL` environment variable.

Install with `uv tool install nestornotes` (or `pipx install nestornotes`,
or `npm install -g nestornotes`). The first call opens a browser for
Supabase OAuth; the token is cached locally.

## Tool Commands

### toggle_bookmark

Set or unset the bookmark flag on a knowledge item.

```bash
nestornotes call-tool toggle_bookmark --knowledge-id <value> --bookmarked
```

| Flag | Type | Required | Description |
|------|------|----------|-------------|
| `--knowledge-id` | string | yes | The knowledge_metadata UUID. |
| `--bookmarked` | boolean | yes | True to bookmark, False to unbookmark. |

### toggle_archive

Archive or unarchive a knowledge item.

Archived items are excluded from digests and default views.

```bash
nestornotes call-tool toggle_archive --knowledge-id <value> --archived
```

| Flag | Type | Required | Description |
|------|------|----------|-------------|
| `--knowledge-id` | string | yes | The knowledge_metadata UUID. |
| `--archived` | boolean | yes | True to archive, False to unarchive. |

### mark_seen

Mark a knowledge item as seen or unseen.

```bash
nestornotes call-tool mark_seen --knowledge-id <value> --seen
```

| Flag | Type | Required | Description |
|------|------|----------|-------------|
| `--knowledge-id` | string | yes | The knowledge_metadata UUID. |
| `--seen` | boolean | no | True to mark seen (default), False to mark unseen. |

### add_tag_to_item

Add a tag to a knowledge item. Creates the tag if it doesn't exist.

```bash
nestornotes call-tool add_tag_to_item --knowledge-id <value> --tag-name <value>
```

| Flag | Type | Required | Description |
|------|------|----------|-------------|
| `--knowledge-id` | string | yes | The knowledge_metadata UUID. |
| `--tag-name` | string | yes | The tag name to add. |

### remove_tag_from_item

Remove a tag from a knowledge item.

```bash
nestornotes call-tool remove_tag_from_item --knowledge-id <value> --tag-name <value>
```

| Flag | Type | Required | Description |
|------|------|----------|-------------|
| `--knowledge-id` | string | yes | The knowledge_metadata UUID. |
| `--tag-name` | string | yes | The tag name to remove. |

### collection_search

Search user's knowledge base using AI-powered hybrid search.

This tool uses an AI agent that:
1. Classifies whether the query needs a search
2. Optimizes the query for better results
3. Runs both vector similarity AND keyword search
4. Merges and deduplicates results

More powerful than direct semantic_search/keyword_search for complex
or ambiguous queries. Use this for natural language questions.

```bash
nestornotes call-tool collection_search --query <value> --collection-id <value>
```

| Flag | Type | Required | Description |
|------|------|----------|-------------|
| `--query` | string | yes | Natural language question or topic to search for. |
| `--collection-id` | string | no | Optional collection UUID to scope the search. (JSON string) |

### list_articles

List saved articles with pagination and time filtering.

Returns article metadata (no full content). Use get_article for full content.

```bash
nestornotes call-tool list_articles --collection-id <value> --created-after <value> --created-before <value> --limit <value> --offset <value>
```

| Flag | Type | Required | Description |
|------|------|----------|-------------|
| `--collection-id` | string | no | Optional collection UUID to scope results. (JSON string) |
| `--created-after` | string | no | ISO 8601 timestamp — only return articles created after this time. (JSON string) |
| `--created-before` | string | no | ISO 8601 timestamp — only return articles created before this time. (JSON string) |
| `--limit` | integer | no | Max results to return (default 20, max 100). |
| `--offset` | integer | no | Pagination offset. |

### get_article

Get a saved article by its ID.

Returns the article metadata and content. Only returns articles
owned by the authenticated user (enforced by RLS).

```bash
nestornotes call-tool get_article --article-id <value>
```

| Flag | Type | Required | Description |
|------|------|----------|-------------|
| `--article-id` | string | yes | The article UUID. |

### get_article_summary

Get the AI-generated summary for an article.

Returns short description, key takeaways, and time-based summaries.

```bash
nestornotes call-tool get_article_summary --article-id <value>
```

| Flag | Type | Required | Description |
|------|------|----------|-------------|
| `--article-id` | string | yes | The article UUID. |

### get_article_with_summary

Get an article together with its latest summary in one call.

```bash
nestornotes call-tool get_article_with_summary --article-id <value>
```

| Flag | Type | Required | Description |
|------|------|----------|-------------|
| `--article-id` | string | yes | The article UUID. |

### list_bookmarked_items

List all bookmarked knowledge items.

Convenience tool that returns knowledge_metadata where bookmarked=True.

```bash
nestornotes call-tool list_bookmarked_items --collection-id <value> --object-type <value> --created-after <value> --created-before <value> --limit <value> --offset <value>
```

| Flag | Type | Required | Description |
|------|------|----------|-------------|
| `--collection-id` | string | no | Optional collection UUID to scope results. (JSON string) |
| `--object-type` | string | no | Filter by content type — one of 'article', 'incoming_emails',          'rss_item', 'youtube_item'. (JSON string) |
| `--created-after` | string | no | ISO 8601 timestamp — only return items created after this time. (JSON string) |
| `--created-before` | string | no | ISO 8601 timestamp — only return items created before this time. (JSON string) |
| `--limit` | integer | no | Max results to return (default 20, max 100). |
| `--offset` | integer | no | Pagination offset. |

### list_collections

List all collections (workspaces) for the authenticated user.

Returns each collection's id, name, slug, and digest schedule.
Use this first to discover what collections exist before querying items.

```bash
nestornotes call-tool list_collections
```

### get_collection

Get full details for a single collection.

```bash
nestornotes call-tool get_collection --collection-id <value>
```

| Flag | Type | Required | Description |
|------|------|----------|-------------|
| `--collection-id` | string | yes | The collection UUID. |

### list_emails

List incoming emails with pagination and time filtering.

Returns email metadata (sender, subject). Use get_email for full content.

```bash
nestornotes call-tool list_emails --collection-id <value> --created-after <value> --created-before <value> --limit <value> --offset <value>
```

| Flag | Type | Required | Description |
|------|------|----------|-------------|
| `--collection-id` | string | no | Optional collection UUID to scope results. (JSON string) |
| `--created-after` | string | no | ISO 8601 timestamp — only return emails created after this time. (JSON string) |
| `--created-before` | string | no | ISO 8601 timestamp — only return emails created before this time. (JSON string) |
| `--limit` | integer | no | Max results to return (default 20, max 100). |
| `--offset` | integer | no | Pagination offset. |

### get_email

Get a saved email by its ID.

Returns metadata only by default. The plain-text body can be large and
is opt-in via `include_body=True`. The raw `full_message` JSON and
rendered `html_email` are never returned — use `get_email_summary` for
the AI summary instead.

```bash
nestornotes call-tool get_email --email-id <value> --include-body
```

| Flag | Type | Required | Description |
|------|------|----------|-------------|
| `--email-id` | string | yes | The incoming email UUID. |
| `--include-body` | boolean | no | If True, also return the plain-text body extracted from           the parsed message. Can be large for newsletters. |

### get_email_summary

Get the AI-generated summary for an email.

```bash
nestornotes call-tool get_email_summary --email-id <value>
```

| Flag | Type | Required | Description |
|------|------|----------|-------------|
| `--email-id` | string | yes | The incoming email UUID. |

### list_knowledge_items

List knowledge items (articles, emails, RSS items, YouTube videos).

All results are automatically scoped to the authenticated user via RLS.
Supports filtering by collection, content type, summarization status,
bookmark/archive/seen state, and time range. Results are ordered newest-first.

```bash
nestornotes call-tool list_knowledge_items --collection-id <value> --object-type <value> --summarized <value> --bookmarked <value> --archived <value> --seen <value> --created-after <value> --created-before <value> --updated-after <value> --updated-before <value> --limit <value> --offset <value>
```

| Flag | Type | Required | Description |
|------|------|----------|-------------|
| `--collection-id` | string | no | Optional collection UUID to scope results. (JSON string) |
| `--object-type` | string | no | Filter by content type — one of 'article', 'incoming_emails',          'rss_item', 'youtube_item'. (JSON string) |
| `--summarized` | string | no | If set, filter by whether the item has been summarized. (JSON string) |
| `--bookmarked` | string | no | If set, filter by bookmark status. (JSON string) |
| `--archived` | string | no | If set, filter by archive status. (JSON string) |
| `--seen` | string | no | If set, filter by seen status. (JSON string) |
| `--created-after` | string | no | ISO 8601 timestamp — only return items created after this time. (JSON string) |
| `--created-before` | string | no | ISO 8601 timestamp — only return items created before this time. (JSON string) |
| `--updated-after` | string | no | ISO 8601 timestamp — only return items updated after this time. (JSON string) |
| `--updated-before` | string | no | ISO 8601 timestamp — only return items updated before this time. (JSON string) |
| `--limit` | integer | no | Max results to return (default 20, max 100). |
| `--offset` | integer | no | Pagination offset. |

### get_knowledge_item

Get a single knowledge metadata record by its ID.

```bash
nestornotes call-tool get_knowledge_item --knowledge-id <value>
```

| Flag | Type | Required | Description |
|------|------|----------|-------------|
| `--knowledge-id` | string | yes | The knowledge_metadata UUID. |

### count_knowledge_items

Count knowledge items matching the given filters.

Useful for getting totals before paginating through results.

```bash
nestornotes call-tool count_knowledge_items --collection-id <value> --object-type <value> --summarized <value> --bookmarked <value> --archived <value> --seen <value> --created-after <value> --created-before <value>
```

| Flag | Type | Required | Description |
|------|------|----------|-------------|
| `--collection-id` | string | no | Optional collection UUID to scope. (JSON string) |
| `--object-type` | string | no | Filter by content type. (JSON string) |
| `--summarized` | string | no | If set, filter by summarization status. (JSON string) |
| `--bookmarked` | string | no | If set, filter by bookmark status. (JSON string) |
| `--archived` | string | no | If set, filter by archive status. (JSON string) |
| `--seen` | string | no | If set, filter by seen status. (JSON string) |
| `--created-after` | string | no | ISO 8601 timestamp lower bound. (JSON string) |
| `--created-before` | string | no | ISO 8601 timestamp upper bound. (JSON string) |

### list_rss_subscriptions

List RSS channel subscriptions for the authenticated user.

Returns the subscription with embedded channel details (title, url).
Results are scoped to the authenticated user via RLS.

```bash
nestornotes call-tool list_rss_subscriptions --collection-id <value> --created-after <value> --created-before <value>
```

| Flag | Type | Required | Description |
|------|------|----------|-------------|
| `--collection-id` | string | no | Optional collection UUID to scope results. (JSON string) |
| `--created-after` | string | no | ISO 8601 timestamp — only return subscriptions created after this time. (JSON string) |
| `--created-before` | string | no | ISO 8601 timestamp — only return subscriptions created before this time. (JSON string) |

### list_rss_items

List recent items from an RSS channel.

Items are ordered by publication date (newest first). The `rss_item` table
has no `created_at`; use `published_after`/`published_before` to filter by
feed publication date instead.

```bash
nestornotes call-tool list_rss_items --channel-id <value> --published-after <value> --published-before <value> --limit <value>
```

| Flag | Type | Required | Description |
|------|------|----------|-------------|
| `--channel-id` | string | yes | The RSS channel UUID. |
| `--published-after` | string | no | ISO 8601 timestamp — only items published after this. (JSON string) |
| `--published-before` | string | no | ISO 8601 timestamp — only items published before this. (JSON string) |
| `--limit` | integer | no | Max results (default 20, max 100). |

### get_rss_item_summary

Get the AI-generated summary for an RSS item.

```bash
nestornotes call-tool get_rss_item_summary --rss-item-id <value>
```

| Flag | Type | Required | Description |
|------|------|----------|-------------|
| `--rss-item-id` | string | yes | The RSS item UUID. |

### semantic_search

Search user's knowledge base using semantic similarity.

Uses vector embeddings to find content semantically related to the query.
Returns content snippets with metadata (title, URL, content type).

```bash
nestornotes call-tool semantic_search --query <value> --collection-id <value> --limit <value>
```

| Flag | Type | Required | Description |
|------|------|----------|-------------|
| `--query` | string | yes | Natural language search query. |
| `--collection-id` | string | no | Optional collection UUID to scope search. (JSON string) |
| `--limit` | integer | no | Max results (default 10, max 50). |

### keyword_search

Search user's knowledge base using full-text keyword matching.

Uses PostgreSQL full-text search for exact keyword matches with ranking.

```bash
nestornotes call-tool keyword_search --query <value> --collection-id <value> --limit <value> --language <value>
```

| Flag | Type | Required | Description |
|------|------|----------|-------------|
| `--query` | string | yes | Keywords to search for. |
| `--collection-id` | string | no | Optional collection UUID to scope search. (JSON string) |
| `--limit` | integer | no | Max results (default 10, max 50). |
| `--language` | string | no | Text search language (default 'english'). |

### list_tags

List all tags created by the authenticated user.

```bash
nestornotes call-tool list_tags
```

### get_items_by_tag

List knowledge items that have a specific tag.

```bash
nestornotes call-tool get_items_by_tag --tag-name <value> --collection-id <value> --object-type <value> --created-after <value> --created-before <value> --limit <value> --offset <value>
```

| Flag | Type | Required | Description |
|------|------|----------|-------------|
| `--tag-name` | string | yes | The tag name to filter by. |
| `--collection-id` | string | no | Optional collection UUID to scope results. (JSON string) |
| `--object-type` | string | no | Filter by content type — one of 'article', 'incoming_emails',          'rss_item', 'youtube_item'. (JSON string) |
| `--created-after` | string | no | ISO 8601 timestamp lower bound. (JSON string) |
| `--created-before` | string | no | ISO 8601 timestamp upper bound. (JSON string) |
| `--limit` | integer | no | Max results (default 20, max 100). |
| `--offset` | integer | no | Pagination offset. |

### get_tags_for_item

Get all tags associated with a specific knowledge item.

```bash
nestornotes call-tool get_tags_for_item --knowledge-id <value>
```

| Flag | Type | Required | Description |
|------|------|----------|-------------|
| `--knowledge-id` | string | yes | The knowledge_metadata UUID. |

### list_youtube_subscriptions

List YouTube channel subscriptions for the authenticated user.

Returns subscriptions with embedded channel details.
Results are scoped to the authenticated user via RLS.

```bash
nestornotes call-tool list_youtube_subscriptions --collection-id <value> --created-after <value> --created-before <value>
```

| Flag | Type | Required | Description |
|------|------|----------|-------------|
| `--collection-id` | string | no | Optional collection UUID to scope results. (JSON string) |
| `--created-after` | string | no | ISO 8601 timestamp — only return subscriptions created after this time. (JSON string) |
| `--created-before` | string | no | ISO 8601 timestamp — only return subscriptions created before this time. (JSON string) |

### list_youtube_items

List recent videos from a YouTube channel.

Videos are ordered by `published_at` (newest first). The `youtube_item`
table has no `created_at` column.

```bash
nestornotes call-tool list_youtube_items --channel-id <value> --published-after <value> --published-before <value> --limit <value>
```

| Flag | Type | Required | Description |
|------|------|----------|-------------|
| `--channel-id` | string | yes | The YouTube channel UUID (internal, not the YT channel ID). |
| `--published-after` | string | no | ISO 8601 timestamp lower bound on publication date. (JSON string) |
| `--published-before` | string | no | ISO 8601 timestamp upper bound on publication date. (JSON string) |
| `--limit` | integer | no | Max results (default 20, max 100). |

### get_youtube_item

Get a YouTube video including its transcript.

```bash
nestornotes call-tool get_youtube_item --youtube-item-id <value>
```

| Flag | Type | Required | Description |
|------|------|----------|-------------|
| `--youtube-item-id` | string | yes | The YouTube item UUID. |

### get_youtube_item_summary

Get the AI-generated summary for a YouTube video.

```bash
nestornotes call-tool get_youtube_item_summary --youtube-item-id <value>
```

| Flag | Type | Required | Description |
|------|------|----------|-------------|
| `--youtube-item-id` | string | yes | The YouTube item UUID. |

## Utility Commands

```bash
nestornotes list-tools
nestornotes list-resources
nestornotes read-resource <uri>
nestornotes list-prompts
nestornotes get-prompt <name> [key=value ...]
```
