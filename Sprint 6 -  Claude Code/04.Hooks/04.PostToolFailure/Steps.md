# Claude Code Hook Lifecycle

## Environment

- OS: Kubuntu/Linux
- Claude Code Version: `v2.1.143`
- Model: `haiku`

This setup demonstrates:

- `PreToolUse`
- `PostToolUse`
- `PostToolUseFailure`
- Successful tool execution
- Failed tool execution
- File creation tracking
- Hook lifecycle monitoring

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
rm -f ~/.claude/failure.log
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
        "matcher": "*",
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
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "echo '========== POST TOOL SUCCESS ==========' >> ~/.claude/post.log && date >> ~/.claude/post.log && cat >> ~/.claude/post.log && echo '' >> ~/.claude/post.log"
          }
        ]
      }
    ],
    "PostToolUseFailure": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "echo '========== POST TOOL FAILURE ==========' >> ~/.claude/failure.log && date >> ~/.claude/failure.log && cat >> ~/.claude/failure.log && echo '' >> ~/.claude/failure.log"
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

---

# 5. Create Test Directory

```bash
mkdir -p ~/project
cd ~/project
```

---

# SUCCESS CASE

# 6. Start Claude

```bash
claude
```

---

# 7. Trigger Successful File Creation

Inside Claude:

```text
create app.js with console.log('success')
```

Claude should successfully create the file.

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

# 9. Verify File Exists

```bash
ls -l app.js
```

Expected:

```text
-rw-rw-r-- 1 user user 24 May 17 07:50 app.js
```

---

# 10. View PreToolUse Log

```bash
cat ~/.claude/pre.log
```

Example:

```text
========== PRE TOOL ==========
Sun May 17 07:49:58 IST 2026

{
  "hook_event_name":"PreToolUse",
  "tool_name":"Write"
}
```

---

# 11. View PostToolUse Success Log

```bash
cat ~/.claude/post.log
```

Example:

```text
========== POST TOOL SUCCESS ==========
Sun May 17 07:50:01 IST 2026

{
  "hook_event_name":"PostToolUse",
  "tool_name":"Write",
  "tool_response":{
    "type":"create"
  },
  "duration_ms":54
}
```

---

# FAILURE CASE

# 12. Start Claude Again

```bash
claude
```

---

# 13. Trigger Failed Tool Execution

Inside Claude:

```text
read missing-file.js
```

Claude should fail because file does not exist.

---

# 14. Exit Claude

```text
/exit
```

---

# 15. View Failure Log

```bash
cat ~/.claude/failure.log
```

Example:

```text
========== POST TOOL FAILURE ==========
Sun May 17 07:52:10 IST 2026

{
  "hook_event_name":"PostToolUseFailure",
  "tool_name":"Read",
  "tool_input":{
    "file_path":"~/project/missing-file.js"
  },
  "error":"ENOENT: no such file or directory"
}
```

---

# Hook Lifecycle

```text
Claude decides to use tool
        ↓
PreToolUse hook runs
        ↓
Tool executes
        ↓
Success  → PostToolUse
Failure  → PostToolUseFailure
```

---

# Hook Types

| Hook | Purpose |
|---|---|
| `PreToolUse` | Runs before execution |
| `PostToolUse` | Runs after successful execution |
| `PostToolUseFailure` | Runs after failed execution |

---

# Key Differences

## PreToolUse

Contains:

- requested tool
- tool input
- planned action

Does NOT contain:

```json
"tool_response"
```

---

## PostToolUse

Contains:

- successful execution response
- execution duration
- created/modified file info

Includes:

```json
"tool_response"
```

---

## PostToolUseFailure

Contains:

- failed tool details
- error information
- failure metadata

Includes:

```json
"error"
```

or failure response details.

---

# Final Status

- PreToolUse working
- PostToolUse working
- PostToolUseFailure working
- Successful execution tracking working
- Failure tracking working
- File creation tracking working
- Hook lifecycle monitoring working
