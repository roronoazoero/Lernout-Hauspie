FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    git \
    && rm -rf /var/lib/apt/lists/*

RUN pip install "langflow[all]"

# Render injects the port via $PORT, so we use it
ENV PORT=7860  # Default fallback for local dev

EXPOSE ${PORT}

CMD ["sh", "-c", "langflow run --host 0.0.0.0 --port $PORT"]

