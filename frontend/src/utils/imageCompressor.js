/**
 * Client-side image compressor using Canvas API.
 * Reduces image size before uploading to server.
 *
 * @param {File} file - Original image file
 * @param {object} options
 * @param {number} options.maxWidth  - Max output width in px (default 1920)
 * @param {number} options.maxHeight - Max output height in px (default 1080)
 * @param {number} options.quality   - JPEG quality 0-1 (default 0.82)
 * @param {number} options.maxSizeMB - Skip if file already below this (default 0.3)
 * @returns {Promise<File>} - Compressed file (or original if already small / not an image)
 */
export async function compressImage(file, options = {}) {
    const {
        maxWidth = 1920,
        maxHeight = 1080,
        quality = 0.82,
        maxSizeMB = 0.3,
    } = options;

    // Skip if not a supported image type
    if (!file.type.startsWith('image/') || file.type === 'image/gif' || file.type === 'image/svg+xml') {
        return file;
    }

    // Skip if file is already small enough
    if (file.size <= maxSizeMB * 1024 * 1024) {
        return file;
    }

    return new Promise((resolve) => {
        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onload = () => {
            URL.revokeObjectURL(url);

            let { width, height } = img;

            // Scale down proportionally
            if (width > maxWidth || height > maxHeight) {
                const ratio = Math.min(maxWidth / width, maxHeight / height);
                width = Math.round(width * ratio);
                height = Math.round(height * ratio);
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        resolve(file); // fallback to original
                        return;
                    }

                    // Only use compressed version if it's actually smaller
                    if (blob.size >= file.size) {
                        resolve(file);
                        return;
                    }

                    const compressed = new File(
                        [blob],
                        file.name.replace(/\.[^.]+$/, '.jpg'),
                        { type: 'image/jpeg', lastModified: Date.now() }
                    );
                    resolve(compressed);
                },
                'image/jpeg',
                quality
            );
        };

        img.onerror = () => {
            URL.revokeObjectURL(url);
            resolve(file); // fallback to original on error
        };

        img.src = url;
    });
}
