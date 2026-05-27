````markdown
# Claude Code MCP Hooks Setup (Kubuntu/Linux)

## Environment

- OS: Kubuntu/Linux
- Claude Code Version: `v2.1.143`
- Model: `haiku`
- MCP Server: Filesystem MCP
- Authentication Required: No

This setup verifies:

- Claude Code working
- MCP working
- MCP tool invocation detected
- `PreToolUse` hook execution verified
- Shell command execution verified

---

# 1. Install Node.js

Verify Node.js exists:

```bash
node -v
npm -v
````

If missing:

```bash
sudo apt update
sudo apt install -y nodejs npm
```

---

# 2. Create Claude Config Directory

```bash
mkdir -p ~/.claude
```

---

# 3. Create MCP Test Directory

```bash
mkdir -p ~/Lab\ Box/mcp-hooks-test
cd ~/Lab\ Box/mcp-hooks-test
```

---

# 4. Create Test File

```bash
cat > hello.txt << 'EOF'
Hello from MCP filesystem server
EOF
```

---

# 5. Create Claude Settings

```bash
cat > ~/.claude/settings.json << 'EOF'
{
  "permissions": {
    "allow": [
      "Read",
      "Write",
      "Shell"
    ]
  },
  "model": "haiku",
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "mcp__filesystem__*",
        "hooks": [
          {
            "type": "command",
            "command": "touch /tmp/mcp_hook_worked"
          }
        ]
      }
    ]
  },
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/home/angicia/Lab Box/mcp-hooks-test"
      ]
    }
  }
}
EOF
```

---

# 6. Verify Settings File

```bash
cat ~/.claude/settings.json
```

Expected output:

```json
{
  "permissions": {
    "allow": [
      "Read",
      "Write",
      "Shell"
    ]
  },
  "model": "haiku",
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "mcp__filesystem__*",
        "hooks": [
          {
            "type": "command",
            "command": "touch /tmp/mcp_hook_worked"
          }
        ]
      }
    ]
  },
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/home/angicia/Lab Box/mcp-hooks-test"
      ]
    }
  }
}
```

---

# 7. Verify MCP Server Installation

```bash
npx -y @modelcontextprotocol/server-filesystem --help
```

Successful output should display help text for the filesystem MCP server.

---

# 8. Remove Old Hook File

```bash
rm -f /tmp/mcp_hook_worked
```

---

# 9. Verify Hook File Does Not Exist

```bash
ls -l /tmp/mcp_hook_worked
```

Expected:

```text
No such file or directory
```

---

# 10. Start Claude

```bash
cd ~/Lab\ Box/mcp-hooks-test
claude
```

---

# 11. Verify MCP Server Loaded

Inside Claude terminal session:

```bash
claude mcp list
```

Expected output should contain:

```text
filesystem
```

---

# 12. Trigger MCP Tool Usage

Inside Claude chat:

```text
read hello.txt using filesystem mcp
```

Claude should use the filesystem MCP server to read the file.

Expected response similar to:

```text
Hello from MCP filesystem server
```

---

# 13. Exit Claude

```text
/exit
```

or press:

```text
Ctrl+C
```

---

# 14. Verify Hook Execution

Run:

```bash
ls -l /tmp/mcp_hook_worked
```

Successful output:

```text
-rw-rw-r-- 1 angicia angicia 0 May 17 00:30 /tmp/mcp_hook_worked
```

This confirms:

* MCP tool executed
* `PreToolUse` hook triggered
* Shell command executed successfully

---

# Hook Matcher Explanation

```json
"matcher": "mcp__filesystem__*"
```

This means:

* trigger hook only for filesystem MCP tools
* normal Claude tools will not trigger the hook

---

# MCP Server Explanation

This setup uses:

```text
@modelcontextprotocol/server-filesystem
```

Features:

* local filesystem access
* no authentication required
* lightweight
* minimal token usage
* easy MCP testing

---

# Final Status

* Claude Code working
* MCP filesystem server working
* MCP tool invocation verified
* Hook execution verified
* Local shell command execution verified
* No authentication required
* Minimal token usage

```
```
