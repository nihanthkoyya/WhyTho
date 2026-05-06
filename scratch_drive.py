import urllib.request
import re

url = 'https://drive.google.com/drive/folders/1aPEC8VXQ0XFSnTT28lpADPvyFvifsd4P?usp=sharing'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    # Find names
    names = re.findall(r'"([^"]+\.mp4)"', html)
    print('Found mp4 names:', set(names))
    
    # Try to find IDs associated with names
    # Usually it's ["ID", "Name", ... ] or similar
    # Let's extract all long strings that look like Google Drive IDs
    # Drive IDs are typically 33 characters, base64-like
    # But let's look for combinations of ID and .mp4
    matches = re.findall(r'\["([a-zA-Z0-9_-]{28,35})","([^"]+\.mp4)"', html)
    if not matches:
        matches = re.findall(r'"([a-zA-Z0-9_-]{28,35})","([^"]+\.mp4)"', html)
    
    print("Found Matches:")
    for m in set(matches):
        print(f"ID: {m[0]}, Name: {m[1]}")

except Exception as e:
    print('Error:', e)
