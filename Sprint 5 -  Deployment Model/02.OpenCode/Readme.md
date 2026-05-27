# Local AI Coding Setup Guide

This guide explains how to run a fully local AI coding assistant on a low-memory Linux laptop using:

* Ollama
* Qwen2.5-Coder 3B
* OpenCode
* VS Code

This setup is:

* Free
* Open source
* Local
* Unlimited
* Suitable for 8 GB RAM systems

---

# System Requirements

Recommended:

* Ubuntu/Linux
* 8 GB RAM
* Node.js + npm installed
* VS Code installed

---

# 1. Install Ollama

Install Ollama:

[https://ollama.com/download](https://ollama.com/download)

Verify installation:

```bash
ollama --version
```

---

# 2. Download a Lightweight Coding Model

For 8 GB RAM systems:

```bash
ollama pull qwen2.5-coder:3b
```

Test the model:

```bash
ollama run qwen2.5-coder:3b
```

Exit with:

```text
/bye
```

---

# 3. Install OpenCode

Because Linux blocks global npm installs without permissions, use sudo:

```bash
sudo npm install -g github:sst/opencode
```

Verify installation:

```bash
opencode --version
```

---

# 4. Start OpenCode

Go to your project folder:

```bash
cd ~/Lab\ Box/CLD01
```

Run:

```bash
opencode
```

---

# 5. Configure OpenCode

When prompted:

Provider:

```text
Ollama
```

Base URL:

```text
http://localhost:11434
```

Model:

```text
qwen2.5-coder:3b
```

---

# 6. Example Prompts

## Create a Flask app

```text
Create a Flask todo app with:
- app.py
- templates/index.html
- requirements.txt
- Dockerfile
```

## Create a FastAPI app

```text
Create a FastAPI CRUD API with SQLite and JWT authentication
```

## Refactor code

```text
Refactor this project into reusable classes
```

---

# 7. Recommended Workflow

1. Start Ollama
2. Run OpenCode inside your project
3. Ask for file creation or edits
4. Review generated code
5. Run your app locally

---

# 8. Important Notes for 8 GB RAM

Recommended model:

```text
qwen2.5-coder:3b
```

Avoid:

```text
7b
14b
32b
```

These larger models may:

* Freeze the system
* Cause swapping
* Slow VS Code significantly

---

# 9. Useful Ollama Commands

List installed models:

```bash
ollama list
```

Remove a model:

```bash
ollama rm qwen2.5-coder:3b
```

Run model directly:

```bash
ollama run qwen2.5-coder:3b
```

---

# 10. Troubleshooting

## npm permission denied

Use:

```bash
sudo npm install -g <package>
```

## Ollama not responding

Restart Ollama:

```bash
ollama serve
```

## Model too slow

Close:

* Chrome tabs
* Docker containers
* Android Studio
* Other heavy applications

---

# Final Recommended Setup

```text
VS Code
+ Ollama
+ qwen2.5-coder:3b
+ OpenCode
```

This provides a fully local AI coding workflow similar to Claude Code without subscriptions or API limits.
