#!/bin/bash

set -e

echo "🚀 Starting RAG Agent..."

# =============================
# 1. Activate virtual env (if exists)
# =============================
if [ -d "venv" ]; then
    echo "🔹 Activating virtual environment..."
    source venv/bin/activate
else
    echo "⚠️ No venv found, using system Python"
fi

# =============================
# 2. Install dependencies (safe re-run)
# =============================
echo "📦 Installing dependencies..."
pip install -r requirements.txt >/dev/null 2>&1 || true

# =============================
# 3. Start Ollama (only if not running)
# =============================
if lsof -i:11434 >/dev/null; then
    echo "✅ Ollama already running"
else
    echo "🤖 Starting Ollama..."
    ollama serve >/dev/null 2>&1 &
    sleep 5
fi

# =============================
# 4. Ensure model exists
# =============================
echo "📥 Checking model..."
ollama list | grep -q "llama3.2" || ollama pull llama3.2

# =============================
# 5. Start API server
# =============================
echo "🌐 Starting API..."
uvicorn apps.api.main:app --host 0.0.0.0 --port 8000 --reload
