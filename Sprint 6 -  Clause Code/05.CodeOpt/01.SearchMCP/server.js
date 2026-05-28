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
        }
      ]
    };
  }
);

const transport = new StdioServerTransport();

await server.connect(transport);

console.error("MCP server running");
