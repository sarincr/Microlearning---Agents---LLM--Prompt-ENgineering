from langchain_ollama import ChatOllama
from core.config import MODEL_NAME, OLLAMA_BASE_URL

llm = ChatOllama(
    model=MODEL_NAME,
    base_url=OLLAMA_BASE_URL,
    temperature=0,
    num_predict=128,
)

def generate(prompt: str):
    return llm.invoke(prompt).content
