import os
import glob

# add allow="autoplay" to all iframes
directory = "c:/Users/hemad/OneDrive/Desktop/WhyTho"
html_files = glob.glob(os.path.join(directory, "*.html"))

for file_path in html_files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    if '<iframe' in content:
        # replace <iframe with <iframe allow="autoplay" if it doesn't have it
        # Actually a safer way is to replace 'allowfullscreen>' with 'allowfullscreen allow="autoplay">'
        # Let's do that
        new_content = content.replace('allowfullscreen>', 'allowfullscreen allow="autoplay">')
        if new_content != content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Updated {os.path.basename(file_path)}")

