# FROM python:3.9-slim

# WORKDIR /app

# # Install system dependencies
# RUN apt-get update && apt-get install -y \
#     sqlite3 \
#     && rm -rf /var/lib/apt/lists/*

# # Copy requirements first for caching
# COPY requirements.txt .
# RUN pip install --no-cache-dir -r requirements.txt

# # Copy application files
# COPY api.py ./

# # Create directories
# RUN mkdir -p /app/instance /app/static

# EXPOSE 5000

# ENV FLASK_APP=api.py
# ENV FLASK_ENV=production

# CMD ["python", "api.py"]

FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    sqlite3 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY . .

# Create directories
RUN mkdir -p /app/instance /app/static

EXPOSE 5000

ENV FLASK_APP=api.py
ENV FLASK_ENV=production

CMD ["python", "api.py"]