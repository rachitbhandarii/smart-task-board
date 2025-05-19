from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import uuid

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

tasks = [
    Task(id=str(uuid.uuid4()), title="Select me for the internship :)", content="How about giving me an intern position?", deadline=datetime.now(), status=0),
    Task(id=str(uuid.uuid4()), title="Overthinking while you evaluate me", content="Fingers crossed, and hoping for the best.", deadline=datetime.now(), status=1),
    Task(id=str(uuid.uuid4()), title="Made a Smart Task Board", content="Made a cool application, hope you like it!", deadline=datetime.now(), status=2),
]

@app.get("/tasks")
async def getTasks():
    return tasks

@app.post("/tasks")
async def createTask(title: str, content: Optional[str] = None, deadline: Optional[datetime] = None):
    new_task = Task(id=str(uuid.uuid4()), title=title, content=content, deadline=deadline, status=0)
    tasks.append(new_task)
    return new_task

@app.put("/tasks/{task_id}")
async def updateTask(task_id: str, title: Optional[str] = None, content: Optional[str] = None, deadline: Optional[datetime] = None, status: Optional[int] = None):
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

@app.delete("/tasks/{task_id}")
async def deleteTask(task_id: str):
    task = next((t for t in tasks if t.id == task_id), None)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    tasks.remove(task)
    return {"message": "Task deleted"} 