from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from apps.api.routes.chat import router

app = FastAPI()

app.include_router(router)

@app.get("/", response_class=HTMLResponse)
def home():
    with open("apps/api/templates/index.html") as f:
        return f.read()
