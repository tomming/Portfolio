import os

def rename_images_in_folder(folder_path):
    # Supported image file extensions
    image_extensions = {".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".webp"}
    
    for filename in os.listdir(folder_path):
        # Get file extension
        _, ext = os.path.splitext(filename)
        if ext.lower() in image_extensions:  # Check if the file is an image
            # Remove spaces from the filename
            new_filename = filename.replace(" ", "")
            old_file_path = os.path.join(folder_path, filename)
            new_file_path = os.path.join(folder_path, new_filename)
            
            # Rename the file
            os.rename(old_file_path, new_file_path)
            print(f"Renamed: {filename} -> {new_filename}")

# Specify the folder containing the images
folder_path = "public/img"  # Replace with your folder path
rename_images_in_folder(folder_path)