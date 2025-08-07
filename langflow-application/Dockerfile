FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

RUN pip install langflow==1.5.0.post1 openai anthropic

RUN mkdir -p /app/flows
COPY langflow-application/flows/MedFi.json /app/flows/MedFi.json

# ENV overrides that LangFlow actually respects
ENV LANGFLOW_PORT=${PORT}
ENV LANGFLOW_HOST=0.0.0.0
ENV LANGFLOW_LOAD_FLOWS_PATH=/app/flows

EXPOSE ${PORT}

# Start LangFlow (will use ENV vars now)
CMD ["langflow", "run"]
