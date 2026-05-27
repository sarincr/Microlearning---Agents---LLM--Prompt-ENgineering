# Claude Code Hooks 

## Why the Hook Was Not Running

In Anthropic Claude Code, hooks will not execute if the configuration schema is incorrect.

Your earlier config used:

```json
"hooks": {
  "PreToolUse": [
    {
      "matcher": "",
      "command": "..."
    }
  ]
}
```

But Claude Code expects the command to be inside a `"handlers"` array.

Because the schema was invalid, Claude ignored the hook entirely.

---

# Step 1 — Open Claude Settings

Open the global Claude configuration file:

```bash
nano ~/.claude/settings.json
```

---

# Step 2 — Replace With Correct Configuration

Replace the entire file with:

```json
{
  "model": "haiku",
  "theme": "dark",
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "",
        "handlers": [
          {
            "type": "command",
            "command": "echo 'HOOK FIRE' >> ~/hook_proof.txt; exit 0"
          }
        ]
      }
    ]
  }
}
```

## Important Fix

The critical part is:

```json
"handlers": [
```

Without `"handlers"`, Claude Code will ignore the hook.

---

# Step 3 — Save and Exit Nano

Inside nano:

* Press `Ctrl + O`
* Press `Enter`
* Press `Ctrl + X`

---

# Step 4 — Remove Old Test Logs

Delete previous proof files:

```bash
rm -f ~/hook_proof.txt
```

---

# Step 5 — Launch Claude Code

Start Claude Code:

```bash
claude
```

---

# Step 6 — Verify Hooks Loaded

Inside Claude chat, run:

```text
/hooks
```

You should see:

```text
PreToolUse
```

listed as an active hook.

---

# Step 7 — Trigger the Hook

Inside Claude chat, type:

```text
create an empty file called test_hook.txt using bash
```

This forces Claude to use a tool, which triggers the `PreToolUse` hook.

---

# Step 8 — Exit Claude

Inside Claude:

```text
/exit
```

---

# Step 9 — Verify Hook Executed

Back in terminal:

```bash
cat ~/hook_proof.txt
```

Expected output:

```text
HOOK FIRE
```

---

# What This Proves

If you see:

```text
HOOK FIRE
```

then:

* Claude successfully loaded your hook
* `PreToolUse` executed correctly
* The command handler worked
* Your Claude hooks system is functioning properly

---

# Minimal Hook Architecture

```text
User Prompt
   ↓
Claude decides to use tool
   ↓
PreToolUse hook fires
   ↓
Shell command executes
   ↓
Claude continues normally
```

---

# Useful Debug Commands

## Show Claude Config

```bash
cat ~/.claude/settings.json
```

## Verify Proof File Exists

```bash
ls -la ~/hook_proof.txt
```

## Watch Proof File Live

```bash
tail -f ~/hook_proof.txt
```

Stop watching with:

```bash
Ctrl + C
```

---

# Common Problems

## Hook Not Listed In `/hooks`

Cause:

* Invalid JSON
* Wrong schema
* Missing `"handlers"`

Fix:

* Recopy the exact JSON

---

## Hook Fires But Command Fails

Cause:

* Shell command syntax error

Fix:
Test manually first:

```bash
echo 'HOOK FIRE' >> ~/hook_proof.txt
```

---

## Claude Does Nothing

Cause:

* No tool usage occurred

Fix:
Use prompts like:

```text
create a file using bash
```

or

```text
run ls using bash
```

These force tool execution.

---

# Minimal Working Hook Example

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "",
        "handlers": [
          {
            "type": "command",
            "command": "echo test"
          }
        ]
      }
    ]
  }
}
```

This is the smallest valid working hook configuration.
