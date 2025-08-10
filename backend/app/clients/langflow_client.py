import httpx
import asyncio
import json
from typing import Dict, Any, Optional, List
from ..schemas.chat import ChatMessage, ChatResponse
import logging
import time

logger = logging.getLogger(__name__)


class LangFlowClient:
    def __init__(self, base_url: str, api_key: str, flow_id: str):
        self.base_url = base_url.rstrip('/')
        self.api_key = api_key
        self.flow_id = flow_id
        self.timeout = httpx.Timeout(connect=10.0, read=60.0, write=10.0, pool=10.0)
    
    async def send_message(
        self, 
        messages: List[ChatMessage], 
        session_id: str, 
        correlation_id: str
    ) -> ChatResponse:
        """Send messages to LangFlow and return the response."""
        
        # Convert messages to the format LangFlow expects
        # Typically the last user message is used as the main input
        user_messages = [msg for msg in messages if msg.role == "user"]
        if not user_messages:
            raise ValueError("No user messages found")
        
        latest_message = user_messages[-1].content
        
        # Build the conversation context for LangFlow
        conversation_history = []
        for msg in messages[:-1]:  # All except the latest
            conversation_history.append(f"{msg.role}: {msg.content}")
        
        # LangFlow API payload structure
        payload = {
            "input_value": latest_message,
            "input_type": "chat",
            "output_type": "chat",
            "tweaks": {
                "session_id": session_id,
                "conversation_history": "\n".join(conversation_history) if conversation_history else ""
            }
        }
        
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "X-Correlation-ID": correlation_id
        }
        
        url = f"{self.base_url}/api/v1/run/{self.flow_id}"
        
        start_time = time.time()
        
        async with httpx.AsyncClient(timeout=self.timeout) as client:
            try:
                logger.info(f"Sending request to LangFlow: correlation_id={correlation_id}, session_id={session_id}")
                
                response = await client.post(
                    url,
                    json=payload,
                    headers=headers
                )
                
                elapsed_time = time.time() - start_time
                logger.info(f"LangFlow response received: correlation_id={correlation_id}, status={response.status_code}, elapsed={elapsed_time:.2f}s")
                
                response.raise_for_status()
                
                data = response.json()
                
                # Extract the output text from LangFlow response
                # LangFlow typically returns the result in data.outputs[0].outputs[0].results.message.text
                # or similar nested structure - adjust based on your MedFi flow output structure
                try:
                    if "outputs" in data and data["outputs"]:
                        output_data = data["outputs"][0]
                        if "outputs" in output_data and output_data["outputs"]:
                            result = output_data["outputs"][0]
                            if "results" in result:
                                message_data = result["results"]
                                if isinstance(message_data, dict) and "message" in message_data:
                                    output_text = message_data["message"].get("text", "")
                                elif isinstance(message_data, dict) and "text" in message_data:
                                    output_text = message_data["text"]
                                else:
                                    output_text = str(message_data)
                            else:
                                output_text = str(result)
                        else:
                            output_text = str(output_data)
                    else:
                        # Fallback: look for common response patterns
                        if "result" in data:
                            output_text = str(data["result"])
                        elif "message" in data:
                            output_text = str(data["message"])
                        else:
                            output_text = "Response received but could not extract message"
                            logger.warning(f"Unexpected LangFlow response structure: correlation_id={correlation_id}")
                    
                    return ChatResponse(
                        output_text=output_text,
                        meta={
                            "session_id": session_id,
                            "correlation_id": correlation_id,
                            "response_time_ms": int(elapsed_time * 1000),
                            "flow_id": self.flow_id
                        }
                    )
                
                except (KeyError, IndexError, TypeError) as e:
                    logger.error(f"Failed to parse LangFlow response: correlation_id={correlation_id}, error={str(e)}, response={data}")
                    return ChatResponse(
                        output_text="I encountered an issue processing your request. Please try again.",
                        meta={
                            "session_id": session_id,
                            "correlation_id": correlation_id,
                            "error": "response_parsing_failed",
                            "response_time_ms": int(elapsed_time * 1000)
                        }
                    )
            
            except httpx.TimeoutException as e:
                logger.error(f"LangFlow timeout: correlation_id={correlation_id}, error={str(e)}")
                raise TimeoutError(f"LangFlow request timed out after {self.timeout.read}s")
            
            except httpx.HTTPStatusError as e:
                logger.error(f"LangFlow HTTP error: correlation_id={correlation_id}, status={e.response.status_code}, body={e.response.text}")
                if e.response.status_code == 401:
                    raise ValueError("Invalid LangFlow API key")
                elif e.response.status_code == 404:
                    raise ValueError("LangFlow flow not found")
                elif e.response.status_code >= 500:
                    raise RuntimeError(f"LangFlow server error: {e.response.status_code}")
                else:
                    raise RuntimeError(f"LangFlow request failed: {e.response.status_code}")
            
            except httpx.RequestError as e:
                logger.error(f"LangFlow connection error: correlation_id={correlation_id}, error={str(e)}")
                raise ConnectionError(f"Failed to connect to LangFlow: {str(e)}")


def create_langflow_client(base_url: str, api_key: str, flow_id: str) -> LangFlowClient:
    """Factory function to create a LangFlow client instance."""
    if not base_url or not api_key or not flow_id:
        raise ValueError("Missing required LangFlow configuration")
    
    return LangFlowClient(base_url=base_url, api_key=api_key, flow_id=flow_id)