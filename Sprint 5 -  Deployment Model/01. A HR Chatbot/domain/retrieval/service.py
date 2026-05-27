from infrastructure.vectorstore.chroma_store import retriever

class RetrievalService:
    async def retrieve(self, query: str):
        docs = retriever.invoke(query)
        return "\n\n".join([d.page_content for d in docs])
