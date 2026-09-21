from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict


class IssueCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=150)
    description: Optional[str] = None
    priority: str = Field(default="Medium")
    status: str = Field(default="To Do")
    assignee: Optional[str] = None


class IssueUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=3, max_length=150)
    description: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[str] = None
    assignee: Optional[str] = None


class IssueStatusUpdate(BaseModel):
    status: str = Field(...)


class IssueResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    priority: str
    status: str
    assignee: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
