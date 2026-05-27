# Building a Multi-Agent HR Policy Assistant with Gemini Enterprise

## Overview

This guide explains how to build a multi-agent HR Policy Assistant using:

* Gemini Enterprise
* Agent Flow Builder
* Direct knowledge-file upload
* Multi-step workflows
* Subagents
* Conversational memory

No SQL database is required.

The solution uses:

* uploaded HR policy documents
* semantic retrieval
* conversational workflows
* agent orchestration

---

# Architecture Overview

```text
Employee
   ↓
HR Supervisor Agent
   ↓
────────────────────────────
│          │         │
↓          ↓         ↓
Policy     Leave     Reimbursement
Agent      Agent     Agent
│
↓
Knowledge Base (TXT/PDF/DOCX)
```

---

# Features

The HR assistant supports:

* HR policy question answering
* Leave request workflows
* Reimbursement guidance
* Employee onboarding support
* Compliance assistance
* Multi-step conversational memory

---

# Phase 1 — Prepare HR Policy Document

## Step 1 — Create HR Policy File

Create a text file:

```text
hr-policy.txt
```

Example sections:

* Leave policy
* Attendance policy
* Remote work policy
* Expense reimbursement
* Code of conduct
* Data privacy policy
* Security policy

---

## Example Content

```text
Employees receive 12 sick leave days annually.

Unused earned leave up to 10 days may be carried forward.

Employees may work remotely up to 3 days per week subject to manager approval.

Travel reimbursement claims must be submitted within 15 days.
```

---

# Phase 2 — Open Gemini Enterprise Web App

## Step 2 — Open Web App

Navigate to the Gemini Enterprise web application.

Open:

```text
Agents
```

---

# Phase 3 — Create Main Agent

## Step 3 — Create Agent

Click:

```text
Create Agent
```

or

```text
+ New Agent
```

depending on the UI version.

---

# Step 4 — Configure Main Agent

## Name

```text
HR Policy Assistant
```

---

## Description

```text
AI assistant for employee HR policy questions and workflows.
```

---

# Step 5 — Configure Instructions

Paste the following instructions:

```text
You are an HR Policy Assistant.

Answer employee questions using only the uploaded HR policy documents.

Never invent policies.

If information is unavailable, say:
"I could not find this information in the HR policy documents."

Guide employees through workflows such as:
- leave requests
- reimbursement requests
- onboarding
- remote work approvals

Always ask follow-up questions step-by-step.

Maintain conversation context during workflows.
```

---

# Phase 4 — Upload Knowledge File

## Step 6 — Upload HR Policy File

Open:

```text
Knowledge
```

or

```text
Upload Files
```

depending on the interface.

Upload:

```text
hr-policy.txt
```

The platform automatically:

* chunks the document
* creates embeddings
* enables semantic retrieval

No database configuration is required.

---

# Phase 5 — Create Subagents

## Step 7 — Open Flow Builder

Open:

```text
Flow
```

You will see the visual agent canvas.

---

# Step 8 — Add Leave Management Agent

Click the `+` connector under the main agent.

Choose:

```text
Add Agent
```

---

## Leave Agent Name

```text
Leave Management Agent
```

---

## Leave Agent Instructions

```text
You are the Leave Management Agent.

Responsibilities:
- Ask leave type
- Ask leave dates
- Explain leave policies
- Summarize leave requests
- Ask for confirmation

Always maintain workflow context.

At the beginning of every response, identify yourself using:
[Leave Management Agent]
```

---

# Step 9 — Add HR Policy Search Agent

## Name

```text
HR Policy Search Agent
```

---

## Instructions

```text
You answer employee HR policy questions using uploaded HR policy documents only.

Never invent policies.

If information is unavailable, say:
"I could not find this information in the HR policy documents."

Provide concise professional answers.

At the beginning of every response, identify yourself using:
[HR Policy Search Agent]
```

---

# Step 10 — Add Reimbursement Agent

## Name

```text
Reimbursement Agent
```

---

## Instructions

```text
You help employees with reimbursement workflows.

Responsibilities:
- Explain reimbursement policy
- Ask expense category
- Ask receipt availability
- Summarize reimbursement request
- Ask for confirmation

At the beginning of every response, identify yourself using:
[Reimbursement Agent]
```

---

# Step 11 — Add Compliance Agent

## Name

```text
Compliance Agent
```

---

## Instructions

```text
You explain:
- code of conduct
- anti-harassment policy
- security policy
- data privacy policy

Use uploaded HR policy documents only.

At the beginning of every response, identify yourself using:
[Compliance Agent]
```

---

# Phase 6 — Configure Supervisor Routing

## Step 12 — Update Main Agent Instructions

Add routing logic:

```text
You are the HR Supervisor Agent.

Route requests to the correct subagent:

- Leave requests → Leave Management Agent
- HR policy questions → HR Policy Search Agent
- Expense questions → Reimbursement Agent
- Compliance questions → Compliance Agent

Maintain conversation continuity.
```

---

# Phase 7 — Enable Multi-Step Memory

## Step 13 — Enable Conversation Memory

Enable:

* conversational memory
* session context

This allows workflows like:

```text
Employee:
I need leave next Friday

Agent:
What type of leave?
```

without losing context.

---

# Phase 8 — Test the Agent

## Step 14 — Test Policy Questions

Example:

```text
How many sick leaves are allowed?
```

Expected:

```text
[HR Policy Search Agent]

Employees receive 12 sick leave days annually.
```

---

# Step 15 — Test Leave Workflow

Input:

```text
I want leave next Monday
```

Expected:

```text
[Leave Management Agent]

What type of leave would you like?
```

---

# Step 16 — Test Reimbursement Workflow

Input:

```text
How do I claim travel reimbursement?
```

Expected:

```text
[Reimbursement Agent]

Please provide:
1. Expense category
2. Travel dates
3. Receipt availability
```

---

# Step 17 — Test Compliance Queries

Input:

```text
Explain the anti-harassment policy
```

Expected:

```text
[Compliance Agent]

The company prohibits harassment, discrimination, intimidation, and offensive behavior.
```

---

# Phase 9 — Publish Agent

## Step 18 — Publish

Click:

```text
Create
```

or

```text
Publish
```

depending on the interface.

The HR assistant is now live.

---

# Recommended Improvements

## Add Later

* Employee authentication
* Manager approval workflows
* Email notifications
* Slack integration
* Teams integration
* Analytics dashboard
* PDF policy uploads
* Voice interface

---

# Recommended Folder Structure

```text
hr-policy-agent/
│
├── prompts/
│   ├── supervisor-agent.txt
│   ├── leave-agent.txt
│   ├── policy-agent.txt
│   ├── reimbursement-agent.txt
│   └── compliance-agent.txt
│
├── knowledge/
│   └── hr-policy.txt
│
├── workflows/
│   ├── leave-workflow.md
│   └── reimbursement-workflow.md
│
└── README.md
```

---

# Best Practices

## Keep Prompts Modular

Do not create one giant agent.

Use:

* small specialized subagents
* clear routing logic
* domain-specific prompts

---

## Use Explicit Agent Labels During Development

Example:

```text
[Leave Management Agent]
```

This makes routing verification easier.

---

## Keep Knowledge Files Clean

Use:

* short sections
* headings
* simple formatting

TXT files work extremely well for semantic retrieval.

---

# Final Result

You now have:

* Multi-agent HR assistant
* Knowledge-driven responses
* Multi-step workflows
* Semantic retrieval
* Conversational memory
* Modular architecture
* No database dependency
* No infrastructure complexity
