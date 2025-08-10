from pydantic import BaseModel, Field, validator
from typing import List, Optional, Dict, Any, Literal
import uuid


class ChatMessage(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str = Field(..., min_length=1, max_length=10000)


class ChatRequest(BaseModel):
    session_id: str = Field(..., min_length=1, max_length=100)
    messages: List[ChatMessage] = Field(..., min_items=1, max_items=50)
    
    @validator('session_id')
    def validate_session_id(cls, v):
        try:
            # Ensure it's a valid UUID format for consistency
            uuid.UUID(v)
            return v
        except ValueError:
            # If not UUID, validate as alphanumeric string
            if not v.replace('-', '').replace('_', '').isalnum():
                raise ValueError('session_id must be UUID or alphanumeric')
            return v


class ChatResponse(BaseModel):
    output_text: str
    meta: Optional[Dict[str, Any]] = None


class ErrorDetail(BaseModel):
    detail: str
    code: str
    correlation_id: str


class ChatError(BaseModel):
    error: ErrorDetail