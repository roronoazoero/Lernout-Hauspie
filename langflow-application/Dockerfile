FROM langflowai/langflow:latest

# Copy MedFi.json into container
COPY flows/MedFi.json /app/flows/MedFi.json

# Load the flow on boot
ENV LANGFLOW_LOAD_FLOWS_PATH=/app/flows
ENV PORT=7860
EXPOSE ${PORT}

CMD ["sh", "-c", "langflow run --host 0.0.0.0 --port $PORT"]
