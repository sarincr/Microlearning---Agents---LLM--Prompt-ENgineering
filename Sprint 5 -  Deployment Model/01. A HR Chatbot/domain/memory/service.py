chat_history = []

def get_memory():
    return "\n".join(chat_history[-4:])

def update_memory(q, a):
    chat_history.append(f"User: {q}")
    chat_history.append(f"Bot: {a}")
