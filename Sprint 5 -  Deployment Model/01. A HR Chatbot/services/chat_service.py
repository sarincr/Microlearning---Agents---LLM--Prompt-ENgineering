from domain.agent.orchestrator import Agent
from domain.memory.service import update_memory

agent = Agent()

class ChatService:

    async def handle(self, query: str):
        answer = await agent.run(query)
        update_memory(query, answer)
        return answer
