from fastapi import APIRouter
from services.chat_service import ChatService

router = APIRouter()
service = ChatService()

@router.post("/chat")
async def chat(query: str):
    answer = await service.handle(query)
    return {"answer": answer}
