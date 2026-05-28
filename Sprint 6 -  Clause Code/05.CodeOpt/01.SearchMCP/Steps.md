# Claude Code MCP Tool Search — Minimal Token Optimization Exercise

## Objective

Understand how MCP Tool Search reduces token usage inside Claude Code.

This exercise demonstrates:

- MCP tool context overhead
- selective tool usage
- dynamic tool loading
- MCP consolidation vs Tool Search

---

# Core Concept

## Traditional MCP Loading

Claude loads metadata for ALL tools:

```text
search_by_title
search_by_author
search_by_date
search_by_tag
```

Each tool adds:

- descriptions
- schemas
- parameter definitions
- validation metadata

More tools
=
larger context window usage.

---

# Tool Search Optimization

Claude dynamically selects relevant tools.

Example:

User request:

```text
Use the author search tool
```

Claude activates only:

```text
search_by_author
```

instead of reasoning over every tool equally.

This reduces active context overhead.

---

# Part 1 — Create MCP Demo Project

```bash
mkdir -p ~/real-mcp-demo
cd ~/real-mcp-demo
npm init -y
```

---

# Part 2 — Enable ES Modules

```bash
npm pkg set type=module
```

---

# Part 3 — Install MCP SDK

```bash
npm install @modelcontextprotocol/sdk
```

---

# Part 4 — Create MCP Server

Create `server.js`:

```bash
cat > server.js << 'EOF'
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import {
  ListToolsRequestSchema
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "demo-server",
    version: "1.0.0"
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

server.setRequestHandler(
  ListToolsRequestSchema,
  async () => {
    return {
      tools: [
        {
          name: "search_by_title",
          description: "Search documents by title",
          inputSchema: {
            type: "object",
            properties: {
              query: {
                type: "string"
              }
            }
          }
        },
        {
          name: "search_by_author",
          description: "Search documents by author",
          inputSchema: {
            type: "object",
            properties: {
              query: {
                type: "string"
              }
            }
          }
        },
        {
          name: "search_by_date",
          description: "Search documents by date",
          inputSchema: {
            type: "object",
            properties: {
              query: {
                type: "string"
              }
            }
          }
        }
      ]
    };
  }
);

const transport = new StdioServerTransport();

await server.connect(transport);

console.error("MCP server running");
EOF
```

---

# Part 5 — Register MCP Server

```bash
claude mcp add demo node /home/angicia/real-mcp-demo/server.js
```

---

# Part 6 — Verify MCP Registration

```bash
claude mcp list
```

Expected:

```text
demo
```

---

# Part 7 — Start Claude Code

```bash
claude
```

---

# Part 8 — Verify MCP Server

Inside Claude:

```text
/mcp
```

Expected:

```text
demo
```

---

# Part 9 — Demonstrate Tool Discovery

Inside Claude:

```text
What MCP tools are available?
```

Expected tools:

```text
search_by_title
search_by_author
search_by_date
```

---

# Discussion

Claude now has metadata for multiple tools.

Each MCP tool contributes to context size.

---

# Part 10 — Demonstrate Selective Tool Usage

Inside Claude:

```text
Use the tool that searches by author
```

---

# Discussion

Claude selects the relevant tool dynamically.

This is the core idea behind MCP Tool Search optimization.

Claude does NOT need every tool equally active for every request.

---

# MCP Consolidation vs Tool Search

## MCP Consolidation

Developer reduces tool count manually.

Example:

```text
search_by_title
search_by_author
search_by_date
```

becomes:

```text
search(query, filter)
```

Benefits:

- fewer schemas
- fewer tool definitions
- smaller context

---

## Tool Search

Claude runtime optimization.

Claude:

1. searches tools semantically
2. loads relevant tools
3. ignores unrelated tools

This reduces active tool context automatically.

---

# Important Distinction

| Concept | Meaning |
|---|---|
| MCP Consolidation | developer optimization |
| Tool Search | Claude runtime optimization |

---

# Key Takeaway

MCP token optimization is NOT about removing capability.

It is about reducing unnecessary tool context inside Claude's active reasoning window.

---

# Final Principle

> Better context architecture beats larger context windows.
