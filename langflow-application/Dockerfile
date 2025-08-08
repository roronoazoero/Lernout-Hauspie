# Use Python base
FROM python:3.11-slim

# Set environment variables for LangFlow (defaults can be overridden by Render)
ENV LANGFLOW_PORT=7860 \
    LANGFLOW_HOST=0.0.0.0 \
    PYTHONUNBUFFERED=1

# Create app directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential curl git && \
    rm -rf /var/lib/apt/lists/*

# Install LangFlow
RUN pip install --no-cache-dir langflow

# Copy your flow file (replace with your actual file path)
COPY MedFi.json /app/MedFi.json

# Start LangFlow server, picking up env vars from Render
CMD ["sh", "-c", "langflow run --host $LANGFLOW_HOST --port $LANGFLOW_PORT --flow /app/MedFi.json"]
