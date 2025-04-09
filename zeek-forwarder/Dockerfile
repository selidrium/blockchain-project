FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY forward_logs.py .
CMD ["python", "forward_logs.py"]
