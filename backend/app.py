import streamlit as st
import requests
import uuid
import base64
import json

# -------------------------------------------------
# CONFIG
# -------------------------------------------------

st.set_page_config(page_title="Future Note API")

GITHUB_TOKEN = st.secrets["GITHUB_TOKEN"]
GITHUB_REPO = st.secrets["GITHUB_REPO"]

# -------------------------------------------------
# HELPER: WRITE TO GITHUB
# -------------------------------------------------

def write_to_github(encrypted_blob: str):
    filename = f"data/{uuid.uuid4().hex}.txt"

    encoded_content = base64.b64encode(
        encrypted_blob.encode("utf-8")
    ).decode("utf-8")

    url = f"https://api.github.com/repos/{GITHUB_REPO}/contents/{filename}"

    headers = {
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Accept": "application/vnd.github+json",
    }

    payload = {
        "message": "Add encrypted future note",
        "content": encoded_content,
    }

    response = requests.put(url, headers=headers, json=payload)
    return response.status_code in (200, 201)

# -------------------------------------------------
# API ENDPOINT
# -------------------------------------------------

def api():
    # Streamlit does not have native POST routing,
    # so we use raw request body
    try:
        body = st.experimental_get_query_params()
    except Exception:
        return

    # This endpoint is POST-only
    if st.request.method != "POST":
        st.stop()

    try:
        data = json.loads(st.request.body.decode("utf-8"))
        encrypted_blob = data.get("blob")
    except Exception:
        st.error("Invalid JSON")
        st.stop()

    if not encrypted_blob:
        st.error("Missing encrypted blob")
        st.stop()

    success = write_to_github(encrypted_blob)

    if success:
        st.success("OK")
    else:
        st.error("GitHub write failed")

# -------------------------------------------------
# ENTRY
# -------------------------------------------------

api()
