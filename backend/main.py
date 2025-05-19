from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import uuid
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Task(BaseModel):
    id: str
    title: str
    content: Optional[str] = None
    deadline: Optional[datetime] = None
    status: int

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

tasks = [
    Task(id=str(uuid.uuid4()), title="Select me for the internship :)", content="How about giving me an intern position?", deadline=datetime.now(), status=0),
    Task(id=str(uuid.uuid4()), title="Overthinking while you evaluate me", content="Fingers crossed, and hoping for the best.", deadline=datetime.now(), status=1),
    Task(id=str(uuid.uuid4()), title="Made a Smart Task Board", content="Made a cool application, hope you like it!", deadline=datetime.now(), status=2),
]

@app.get("/")
async def root():
    return {"status": "ok", "message": "API is running"}

@app.get("/tasks")
async def getTasks():
    try:
        return tasks
    except Exception as e:
        logger.error(f"Error in getTasks: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/tasks")
async def createTask(title: str, content: Optional[str] = None, deadline: Optional[datetime] = None):
    try:
        new_task = Task(
            id=str(uuid.uuid4()),
            title=title,
            content=content,
            deadline=deadline,
            status=0
        )
        tasks.append(new_task)
        return new_task
    except Exception as e:
        logger.error(f"Error in createTask: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/tasks/{task_id}")
async def updateTask(task_id: str, title: Optional[str] = None, content: Optional[str] = None, deadline: Optional[datetime] = None, status: Optional[int] = None):
    try:
        task = next((t for t in tasks if t.id == task_id), None)
        if task is None:
            raise HTTPException(status_code=404, detail="Task not found")
        
        if title is not None:
            task.title = title
        if content is not None:
            task.content = content
        if deadline is not None:
            task.deadline = deadline
        if status is not None:
            task.status = status
        
        return task
    except Exception as e:
        logger.error(f"Error in updateTask: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/tasks/{task_id}")
async def deleteTask(task_id: str):
    try:
        task = next((t for t in tasks if t.id == task_id), None)
        if task is None:
            raise HTTPException(status_code=404, detail="Task not found")
        tasks.remove(task)
        return {"message": "Task deleted"}
    except Exception as e:
        logger.error(f"Error in deleteTask: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 