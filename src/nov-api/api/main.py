from fastapi import FastAPI, Request
import time
import sys
import httpx

import os

# Add project root to path
script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.abspath(os.path.join(script_dir, "../../.."))
sys.path.append(project_root)
sys.path.append(os.path.join(project_root, "src"))

try:
    from sovereign_entity.sovereign_v5 import SovereignV5
    from mirror_protocol.registry import registry
    sovereign = SovereignV5()
except ImportError as e:
    print(f"Warning: Module import failed: {e}")
    sovereign = None
    registry = None

app = FastAPI(title="Nov Predictive Observer")

OI_URL = "http://localhost:8000"

@app.post("/observe")
async def observe(data: dict):
    print(f"[NOV] Observing telemetry: {data}")
    
    telemetry_signal = f"Telemetry {data.get('name')}: {data.get('notes')} (Rating: {data.get('rating')})"
    
    prediction = "NORMAL"
    if sovereign:
        prediction = await sovereign.achieve_maximum_result(telemetry_signal)
        print(f"[NOV] Sovereign Prediction: {prediction}")

    # Broadcast via Mirror Protocol if it's an anomaly
    is_anomaly = data.get("rating", 5) < 3
    if registry and is_anomaly:
        await registry.broadcast("ANOMALY_DETECTED", {"data": data, "prediction": prediction})
    if "CRITICAL" in prediction or "DEGRADED" in prediction or is_anomaly:
        print(f"[NOV] TRIGGERING REFINEMENT based on: {prediction if not is_anomaly else 'LOW_RATING'}")
        async with httpx.AsyncClient() as client:
            try:
                # Trigger an emergency Mirror Protocol refinement via the Sovereignty API
                await client.post(f"{OI_URL}/refinement/trigger", json={
                    "reason": prediction, 
                    "is_anomaly": is_anomaly,
                    "data": data
                })
            except Exception as e:
                print(f"[NOV] Failed to trigger refinement: {e}")

    return {
        "status": "observed", 
        "prediction": prediction,
        "timestamp": time.time()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
