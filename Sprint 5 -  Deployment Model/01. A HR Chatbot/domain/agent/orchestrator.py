from infrastructure.llm.ollama_client import generate
from domain.tools.search_tool import search_tool
from domain.memory.service import get_memory

class Agent:

    async def run(self, query: str):
        decision = generate(f"FAST or SEARCH: {query}")

        if "FAST" in decision:
            return generate(query)

        context = await search_tool(query)

        return generate(f'''
Context:
{context}

History:
{get_memory()}

Question:
{query}
''')
