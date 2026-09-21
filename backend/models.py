from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, DateTime
from database import Base


class Issue(Base):
    __tablename__ = "issues"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(150), nullable=False)
    description = Column(Text, nullable=True)
    priority = Column(String(20), default="Medium", nullable=False)
    status = Column(String(20), default="To Do", nullable=False)
    assignee = Column(String(80), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
