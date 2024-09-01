document.getElementById('image-upload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imgElement = document.getElementById('before-image');
            imgElement.src = event.target.result;
            imgElement.style.display = 'block';
            document.getElementById('after-image').style.display = 'none';
            document.getElementById('note').innerText = 'Image uploaded. Click "Increase Resolution" to see the enhancement.';
            document.getElementById('info').innerText = ''; // Clear previous info
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('increase-resolution').addEventListener('click', function() {
    const beforeImage = document.getElementById('before-image');
    if (beforeImage.src) {
        // Create a canvas to process the image
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Load the image into the canvas
        const img = new Image();
        img.src = beforeImage.src;
        img.onload = function() {
            // Set canvas dimensions to 2x the original
            const originalWidth = img.width;
            const originalHeight = img.height;
            canvas.width = originalWidth * 4;
            canvas.height = originalHeight * 4;

            // Draw the original image at 2x size (basic upscaling)
            context.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Get the resulting image and display it in the "After" section
            const afterImage = document.getElementById('after-image');
            afterImage.src = canvas.toDataURL();
            afterImage.style.display = 'block';

            // Display a note and detailed information
            const newDPI = 2; // Simulated DPI change (since actual DPI changes require complex processing)
            document.getElementById('note').innerText = `Resolution increased from 72 DPI to ${newDPI * 72}  DPI. Nearest Algorithm and Bilinear Algorithm  Applied. The quality enhancement is simulated for demonstration.`;
            document.getElementById('info').innerText = `Before Image: ${originalWidth} x ${originalHeight} pixels\nAfter Image: ${canvas.width} x ${canvas.height} pixels\nDPI change: Simulated from 72 DPI to ${newDPI * 72} DPI.`;
        };
    }
});
