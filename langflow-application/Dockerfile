FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install git (required by LangFlow), clean up after
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

# Copy requirements and install dependencies
COPY langflow-application/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the flow file into the container
RUN mkdir -p /app/flows
COPY langflow-application/flows/MedFi.json /app/flows/MedFi.json

# LangFlow env vars
ENV LANGFLOW_LOAD_FLOWS_PATH=/app/flows
ENV LANGFLOW_HOST=0.0.0.0
ENV LANGFLOW_PORT=${PORT}
EXPOSE ${PORT}

# Run LangFlow using Render's injected port
CMD ["langflow", "run"]
