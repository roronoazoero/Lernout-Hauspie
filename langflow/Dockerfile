FROM python:3.11-slim

# Set working directory
WORKDIR /app

# System dependencies
RUN apt-get update && apt-get install -y \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install LangFlow
RUN pip install "langflow[all]"

# Expose LangFlow's default port
EXPOSE 7860

# Launch LangFlow server
CMD ["langflow", "run", "--host", "0.0.0.0", "--port", "7860"]
