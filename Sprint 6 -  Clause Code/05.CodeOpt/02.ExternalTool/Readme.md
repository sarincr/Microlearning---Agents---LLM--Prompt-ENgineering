# Final Exercise — Claude Code Token Optimization

## Objective

Learn how context size affects token usage in Claude Code.

This exercise demonstrates:

- unnecessary context loading
- context optimization
- `.claudeignore`
- `/compact`
- efficient prompting

---

# Part 1 — Create Minimal Project

Open terminal:

```bash
mkdir -p ~/claude-demo/project/src
cd ~/claude-demo/project
```

---

# Part 2 — Create Useful Source File

```bash
cat > src/auth.py << 'EOF'
def login(username, password):
    return True

def logout(user):
    return True
EOF
```

---

# Part 3 — Create Irrelevant File

```bash
cat > debug.log << 'EOF'
DEBUG: websocket connected
DEBUG: cache initialized
DEBUG: analytics started
EOF
```

---

# Part 4 — Start Claude Code

```bash
claude
```

---

# Part 5 — Observe Initial Context

Inside Claude Code:

```text
What files can you see?
```

Expected:

- `src/auth.py`
- `debug.log`

---

# Discussion

Claude loads all visible files into context.

Even irrelevant files consume tokens.

---

# Part 6 — Generate Context Growth

Run these prompts:

```text
Explain auth.py
```

```text
Refactor auth.py
```

```text
Generate tests for auth.py
```

```text
Improve code readability
```

---

# Discussion

Each conversation message increases active context.

Claude remembers:

- previous prompts
- previous responses
- visible files

Long sessions consume more tokens.

---

# Part 7 — Compact Context

Inside Claude Code:

```text
/compact
```

---

# Discussion

`/compact` compresses conversation history.

This reduces active context size while preserving important information.

---

# Part 8 — Exit Claude

Press:

```text
CTRL + C
```

---

# Part 9 — Add .claudeignore

Create ignore file:

```bash
cat > .claudeignore << 'EOF'
debug.log
EOF
```

---

# Part 10 — Restart Claude Code

```bash
claude
```

---

# Part 11 — Observe Optimized Context

Inside Claude:

```text
What files can you see?
```

Expected:

- `src/auth.py`

`debug.log` should now be ignored.

---

# Final Discussion

## Before Optimization

Claude processed:

- source code
- unnecessary log files
- growing conversation history

Result:

- larger context
- higher token usage
- slower responses

---

## After Optimization

Claude processes only:

- relevant source files
- compacted memory

Result:

- smaller context
- fewer tokens
- faster responses
- lower cost

---

# Key Concepts

| Feature | Purpose |
|---|---|
| `.claudeignore` | remove irrelevant files |
| `/compact` | compress conversation memory |
| focused prompts | reduce unnecessary context |

---

# Core Principle

> The goal is not bigger context.
>
> The goal is better context.

---

# Reflection Questions

1. Why do irrelevant files increase token usage?

2. How does `/compact` help Claude Code sessions?

3. Why is focused context better than large context?

4. What happens if conversation history becomes too large?

5. How does token optimization improve AI engineering workflows?

---

# Final Takeaway

Claude Code performance depends heavily on context architecture.

Efficient AI workflows are built by:

- reducing unnecessary context
- focusing prompts
- compacting memory
- controlling visible files

Token optimization is now an essential AI engineering skill.
