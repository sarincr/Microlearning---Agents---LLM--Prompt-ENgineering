from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter

text = '''
Maternity leave is 26 weeks.
Paternity leave is 2 weeks.
Employees can report grievances to HR.
Working hours are 9 AM to 6 PM.
'''

docs = RecursiveCharacterTextSplitter(
    chunk_size=300,
    chunk_overlap=50
).create_documents([text])

embedder = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

vectorstore = Chroma.from_documents(docs, embedder)
retriever = vectorstore.as_retriever(search_kwargs={"k": 4})
