# zeek-forwarder/forward_logs.py
import os
import time
import json
import requests
from datetime import datetime

LOG_FILE = "/opt/zeek/logs/current/conn.log"  # Adjust path if needed
BACKEND_URL = "http://localhost:3000/api/logs"  # Update with VM IP if different

sent_hashes = set()

print("Starting ZEEK log forwarder...")

while True:
    if os.path.exists(LOG_FILE):
        with open(LOG_FILE, "r") as f:
            for line in f:
                if line.startswith("#"):
                    continue  # skip header
                parts = line.strip().split("\t")
                if len(parts) > 9:
                    log_entry = {
                        "timestamp": datetime.utcnow().isoformat() + "Z",
                        "source_ip": parts[2],
                        "destination_ip": parts[4],
                        "alert_type": "Suspicious connection",
                        "log_data": line.strip()
                    }
                    log_id = hash(line)
                    if log_id not in sent_hashes:
                        try:
                            r = requests.post(BACKEND_URL, json=log_entry)
                            if r.status_code == 200:
                                print(f"Sent log: {log_entry['source_ip']} -> {log_entry['destination_ip']}")
                                sent_hashes.add(log_id)
                            else:
                                print(f"Failed to send: {r.status_code} {r.text}")
                        except Exception as e:
                            print(f"Error sending log: {e}")
    else:
        print("Waiting for ZEEK log file...")
    time.sleep(10)
