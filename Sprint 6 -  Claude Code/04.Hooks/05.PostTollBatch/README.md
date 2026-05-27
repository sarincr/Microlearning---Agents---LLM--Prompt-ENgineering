# Claude Code PostToolBatch Support Check

## Environment

- OS: Kubuntu/Linux
- Claude Code Version: `v2.1.143`
- Model: `haiku`

This guide demonstrates:

- Attempting to use `PostToolBatch`
- Verifying unsupported hook behavior
- Understanding current Claude Code hook support
- Recommended alternative using `PostToolUse`

---

# What Is PostToolBatch

```text
PostToolBatch
```

is intended to run:

```text
After a full batch of parallel tool calls resolves,
before the next model call.
```

However:

```text
PostToolBatch is NOT supported in Claude Code v2.1.143
```

---

# 1. Create Claude Config Directory

```bash
mkdir -p ~/.claude
```

---

# 2. Remove Old Batch Log

```bash
rm -f ~/.claude/post-batch.log
```

---

# 3. Create `settings.json` Using PostToolBatch

```bash
cat > ~/.claude/settings.json << 'EOF'
{
  "model": "haiku",
  "hooks": {
    "PostToolBatch": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "echo '========== POST TOOL BATCH ==========' >> ~/.claude/post-batch.log && date >> ~/.claude/post-batch.log && cat >> ~/.claude/post-batch.log && echo '' >> ~/.claude/post-batch.log"
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
    "PostToolBatch": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "echo '========== POST TOOL BATCH ==========' >> ~/.claude/post-batch.log && date >> ~/.claude/post-batch.log && cat >> ~/.claude/post-batch.log && echo '' >> ~/.claude/post-batch.log"
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

# 7. Trigger Multiple Tool Calls

Inside Claude:

```text
create app.js, config.json, notes.md, and README.md with minimal content
```

Claude may execute multiple tools.

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

# 9. Check Batch Log

```bash
cat ~/.claude/post-batch.log
```

Expected output:

```text
cat: ~/.claude/post-batch.log: No such file or directory
```

This confirms:

```text
PostToolBatch did not execute
```

because it is not implemented in Claude Code `v2.1.143`.

---

# Why It Failed

Claude silently ignores unsupported hook lifecycle events.

Even though the configuration is valid JSON, the runtime does not recognize:

```json
"PostToolBatch"
```

Therefore:

- no hook executes
- no log file is created
- no errors are shown

---

# Currently Supported Hooks

| Hook | Description |
|---|---|
| `PreToolUse` | Runs before tool execution |
| `PostToolUse` | Runs after successful tool execution |
| `Notification` | Runs on notifications |
| `Stop` | Runs when Claude stops |
| `SubagentStop` | Runs when subagents stop |
| `UserPromptSubmit` | Runs when user submits prompt |

---

# Recommended Alternative

Use:

```text
PostToolUse
```

with a shared centralized log file.

This simulates batch-style logging.

---

# 10. Replace Config With Supported Alternative

```bash
cat > ~/.claude/settings.json << 'EOF'
{
  "model": "haiku",
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "echo '========== POST TOOL EVENT ==========' >> ~/.claude/post-batch.log && date >> ~/.claude/post-batch.log && cat >> ~/.claude/post-batch.log && echo '' >> ~/.claude/post-batch.log"
          }
        ]
      }
    ]
  }
}
EOF
```

---

# 11. Remove Old Log

```bash
rm -f ~/.claude/post-batch.log
```

---

# 12. Start Claude Again

```bash
claude
```

---

# 13. Trigger Multiple Tool Executions

Inside Claude:

```text
create app.js, config.json, notes.md, and README.md with minimal content
```

Each successful tool execution now appends into:

```text
~/.claude/post-batch.log
```

---

# 14. Exit Claude

```text
/exit
```

---

# 15. View Aggregated Log

```bash
cat ~/.claude/post-batch.log
```

Example output:

```text
========== POST TOOL EVENT ==========
Sun May 17 09:10:11 IST 2026

{
  "hook_event_name":"PostToolUse",
  "tool_name":"Write",
  "tool_response":{
    "type":"create"
  },
  "duration_ms":51
}

========== POST TOOL EVENT ==========
Sun May 17 09:10:14 IST 2026

{
  "hook_event_name":"PostToolUse",
  "tool_name":"Write",
  "tool_response":{
    "type":"create"
  },
  "duration_ms":44
}
```

---

# Lifecycle Comparison

## Unsupported

```text
Parallel tools complete
        ↓
PostToolBatch runs once
```

Not available in `v2.1.143`.

---

## Supported Alternative

```text
Tool executes
        ↓
PostToolUse runs
        ↓
Event appended into shared log
```

Repeated for every successful tool execution.

---

# Final Status

- Verified PostToolBatch unsupported
- Verified unsupported hooks are ignored silently
- Verified PostToolUse working
- Verified aggregated execution logging working
- Verified centralized monitoring working
