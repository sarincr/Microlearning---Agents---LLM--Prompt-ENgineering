from domain.retrieval.service import RetrievalService

retrieval = RetrievalService()

async def search_tool(query: str):
    return await retrieval.retrieve(query)
