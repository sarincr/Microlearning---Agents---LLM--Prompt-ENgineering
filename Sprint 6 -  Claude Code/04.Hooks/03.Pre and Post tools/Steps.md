# Claude Code PreToolUse and PostToolUse Hooks

## Environment

- OS: Kubuntu/Linux
- Claude Code Version: `v2.1.143`
- Model: `haiku`

This setup demonstrates:

- `PreToolUse` hooks
- `PostToolUse` hooks
- File creation tracking
- Hook lifecycle logging
- Tool execution monitoring

---

# 1. Create Claude Config Directory

```bash
mkdir -p ~/.claude
```

---

# 2. Remove Old Logs

```bash
rm -f ~/.claude/pre.log
rm -f ~/.claude/post.log
```

---

# 3. Create `settings.json`

```bash
cat > ~/.claude/settings.json << 'EOF'
{
  "model": "haiku",
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "echo '========== PRE TOOL ==========' >> ~/.claude/pre.log && date >> ~/.claude/pre.log && cat >> ~/.claude/pre.log && echo '' >> ~/.claude/pre.log"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "echo '========== POST TOOL ==========' >> ~/.claude/post.log && date >> ~/.claude/post.log && cat >> ~/.claude/post.log && echo '' >> ~/.claude/post.log"
          }
        ]
      }
    ]
  }
}
EOF
```

---

# 4. Verify Configuration

```bash
cat ~/.claude/settings.json
```

Expected output:

```json
{
  "model": "haiku",
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "echo '========== PRE TOOL ==========' >> ~/.claude/pre.log && date >> ~/.claude/pre.log && cat >> ~/.claude/pre.log && echo '' >> ~/.claude/pre.log"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "echo '========== POST TOOL ==========' >> ~/.claude/post.log && date >> ~/.claude/post.log && cat >> ~/.claude/post.log && echo '' >> ~/.claude/post.log"
          }
        ]
      }
    ]
  }
}
```

---

# 5. Create Test Directory

```bash
mkdir -p ~/project
cd ~/project
```

---

# 6. Start Claude

```bash
claude
```

---

# 7. Trigger File Creation

Inside Claude:

```text
create app.js with console.log('hello')
```

Claude should use the `Write` tool.

---

# 8. Exit Claude

```text
/exit
```

or press:

```text
Ctrl+C
```

---

# 9. Verify File Creation

```bash
ls -l app.js
```

Expected:

```text
-rw-rw-r-- 1 user user 22 May 17 07:43 app.js
```

---

# 10. View PreToolUse Log

```bash
cat ~/.claude/pre.log
```

Example output:

```text
========== PRE TOOL ==========
Sun May 17 07:42:58 IST 2026

{
  "session_id":"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "transcript_path":"~/.claude/projects/project/session.jsonl",
  "cwd":"~/project",
  "permission_mode":"default",
  "hook_event_name":"PreToolUse",
  "tool_name":"Write",
  "tool_input":{
    "file_path":"~/project/app.js",
    "content":"console.log('hello')\n"
  },
  "tool_use_id":"toolu_xxxxxxxxxxxxxxxxx"
}
```

---

# 11. View PostToolUse Log

```bash
cat ~/.claude/post.log
```

Example output:

```text
========== POST TOOL ==========
Sun May 17 07:43:01 IST 2026

{
  "session_id":"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "transcript_path":"~/.claude/projects/project/session.jsonl",
  "cwd":"~/project",
  "permission_mode":"default",
  "hook_event_name":"PostToolUse",
  "tool_name":"Write",
  "tool_input":{
    "file_path":"~/project/app.js",
    "content":"console.log('hello')\n"
  },
  "tool_response":{
    "type":"create",
    "filePath":"~/project/app.js",
    "content":"console.log('hello')\n",
    "structuredPatch":[],
    "originalFile":null,
    "userModified":false
  },
  "tool_use_id":"toolu_xxxxxxxxxxxxxxxxx",
  "duration_ms":54
}
```

---

# Key Difference

## PreToolUse

Runs BEFORE tool execution.

Contains:

- tool request
- tool input
- planned action

Does NOT contain:

```json
"tool_response"
```

because execution has not happened yet.

---

## PostToolUse

Runs AFTER tool execution.

Contains:

- tool request
- tool input
- tool execution result
- execution duration
- response metadata

Includes:

```json
"tool_response"
```

which confirms the tool executed successfully.

---

# Lifecycle Flow

```text
Claude decides to use tool
        ↓
PreToolUse hook runs
        ↓
Tool executes
        ↓
PostToolUse hook runs
```

---

# Final Status

- Claude hooks working
- PreToolUse hook working
- PostToolUse hook working
- File creation tracking working
- Tool execution logging working
- Hook lifecycle visibility working
