FROM langflowai/langflow:latest

# Create the flows folder and copy in the JSON
RUN mkdir -p /app/flows
COPY flows/MedFi.json /app/flows/MedFi.json

# Set environment variable to correct folder
ENV LANGFLOW_LOAD_FLOWS_PATH=/app/flows
ENV PORT=7860
EXPOSE ${PORT}

# Start LangFlow on the dynamic Render port
CMD ["sh", "-c", "langflow run --host 0.0.0.0 --port $PORT"]
