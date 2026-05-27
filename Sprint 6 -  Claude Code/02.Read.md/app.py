#!/usr/bin/env python3
import sqlite3
import sys
from pathlib import Path

DB_PATH = Path.home() / ".todo.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS tasks
                 (id INTEGER PRIMARY KEY, title TEXT, completed INTEGER DEFAULT 0)''')
    conn.commit()
    conn.close()

def add_task(title):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("INSERT INTO tasks (title) VALUES (?)", (title,))
    conn.commit()
    task_id = c.lastrowid
    conn.close()
    print(f"Task {task_id} added: {title}")

def list_tasks():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT id, title, completed FROM tasks ORDER BY id")
    tasks = c.fetchall()
    conn.close()

    if not tasks:
        print("No tasks found.")
        return

    for task_id, title, completed in tasks:
        status = "✓" if completed else " "
        print(f"[{status}] {task_id}: {title}")

def complete_task(task_id):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("UPDATE tasks SET completed = 1 WHERE id = ?", (task_id,))
    if c.rowcount == 0:
        print(f"Task {task_id} not found.")
    else:
        print(f"Task {task_id} completed.")
    conn.commit()
    conn.close()

def delete_task(task_id):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
    if c.rowcount == 0:
        print(f"Task {task_id} not found.")
    else:
        print(f"Task {task_id} deleted.")
    conn.commit()
    conn.close()

def main():
    init_db()

    if len(sys.argv) < 2:
        print("Usage: python app.py [add|list|complete|delete] [args]")
        return

    command = sys.argv[1]

    if command == "add":
        if len(sys.argv) < 3:
            print("Usage: python app.py add <title>")
            return
        add_task(" ".join(sys.argv[2:]))
    elif command == "list":
        list_tasks()
    elif command == "complete":
        if len(sys.argv) < 3:
            print("Usage: python app.py complete <task-id>")
            return
        complete_task(int(sys.argv[2]))
    elif command == "delete":
        if len(sys.argv) < 3:
            print("Usage: python app.py delete <task-id>")
            return
        delete_task(int(sys.argv[2]))
    else:
        print(f"Unknown command: {command}")

if __name__ == "__main__":
    main()
