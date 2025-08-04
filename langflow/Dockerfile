FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

RUN pip install langflow==1.5.0.post1

RUN pip install anthropic huggingface_hub

RUN pip install openai langchain langchainhub \
    huggingface_hub anthropic \
    supabase psycopg2-binary

ENV PORT=7860
EXPOSE ${PORT}

CMD ["sh", "-c", "langflow run --host 0.0.0.0 --port $PORT"]
