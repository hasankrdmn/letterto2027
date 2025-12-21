import streamlit as st
import requests
import uuid
import base64

st.set_page_config(page_title="Future Note API")

GITHUB_TOKEN = st.secrets["GITHUB_TOKEN"]
GITHUB_REPO = st.secrets["GITHUB_REPO"]

def write_to_github(encrypted_blob: str):
    filename = f"data/{uuid.uuid4().hex}.txt"

    encoded = base64.b64encode(
        encrypted_blob.encode("utf-8")
    ).decode("utf-8")

    url = f"https://api.github.com/repos/{GITHUB_REPO}/contents/{filename}"

    headers = {
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Accept": "application/vnd.github+json",
    }

    payload = {
        "message": "Add encrypted future note",
        "content": encoded,
    }

    res = requests.put(url, json=payload, headers=headers)
    return res.status_code in (200, 201)

# -------------------------------------------------
# STREAMLIT "API"
# -------------------------------------------------

params = st.experimental_get_query_params()

if "blob" in params:
    encrypted_blob = params["blob"][0]

    if encrypted_blob:
        ok = write_to_github(encrypted_blob)

        if ok:
            st.write("OK")
        else:
            st.write("ERROR")
else:
    # Empty response for health check
    st.write("Future Note API running")
