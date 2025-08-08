# Use Python base
FROM python:3.11-slim

# Set environment variables for LangFlow
ENV LANGFLOW_PORT=7860 \
    LANGFLOW_HOST=0.0.0.0 \
    PYTHONUNBUFFERED=1

# Create app directory
WORKDIR /app

# Install system deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential curl git && \
    rm -rf /var/lib/apt/lists/*

# Install LangFlow
RUN pip install --no-cache-dir langflow
COPY langflow-application/flows/MedFi.json /app/flows/MedFi.json

# LangFlow env vars
ENV LANGFLOW_LOAD_FLOWS_PATH=/app/flows
ENV LANGFLOW_HOST=0.0.0.0
ENV LANGFLOW_PORT=${PORT}
EXPOSE ${PORT}

# Run LangFlow using Render's injected port
CMD ["sh", "-c", "langflow run --host $LANGFLOW_HOST --port $LANGFLOW_PORT --flow /app/MedFi.json"]
