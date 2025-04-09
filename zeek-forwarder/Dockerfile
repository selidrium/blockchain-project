FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy requirements and install
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Python script
COPY forward_logs.py .

# Set the Zeek log path (adjust if needed)
ENV LOG_FILE=/app/zeek-logs/conn.log

# Run the forwarder script
CMD ["python", "forward_logs.py"]
