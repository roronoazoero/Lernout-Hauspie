FROM python:3.11-slim

WORKDIR /app

# Install git + python dependencies
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

# Install LangFlow core
RUN pip install langflow==1.5.0.post1

# Install specific providers you need
# Optional: remove what you don't need to slim down image
RUN pip install anthropic huggingface_hub

RUN pip install openai langchain langchainhub \
    huggingface_hub anthropic \
    supabase psycopg2-binary


# Use Render's dynamic port
ENV PORT=7860
EXPOSE ${PORT}

# Start LangFlow using dynamic port
CMD ["sh", "-c", "langflow run --host 0.0.0.0 --port $PORT"]
