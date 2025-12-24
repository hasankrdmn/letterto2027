const API_URL = import.meta.env.VITE_API_URL;

export async function sendEncryptedBlob(blob: string) {
  if (!API_URL) {
    throw new Error("VITE_API_URL is not defined");
  }

  const url = `${API_URL}?blob=${encodeURIComponent(blob)}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Backend request failed");
  }

  return true;
}
