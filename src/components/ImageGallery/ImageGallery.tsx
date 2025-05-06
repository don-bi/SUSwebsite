// --- NEW Placeholder Image Gallery ---
// src/components/ImageGallery/ImageGallery.tsx
// Consider adding a lightbox library later (e.g., 'react-simple-image-viewer') for full-screen view

interface ImageItem {
    src: string;
    alt: string;
    caption?: string;
}

interface ImageGalleryProps {
    images: ImageItem[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
    return (
        <div className="max-w-full gap-4 flex flex-wrap justify-center">
            {images.map((image, index) => (
                <figure key={index} className="break-inside-avoid-column"> {/* Helps prevent weird breaks if using columns */}
                    <img
                        src={image.src}
                        alt={image.alt}
                        className="w-[400px] h-auto rounded-lg shadow-md object-cover" // Use object-cover if aspect ratios vary wildly
                        loading="lazy" // Lazy load images below the fold
                    />
                    {image.caption && (
                        <figcaption className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400">
                            {image.caption}
                        </figcaption>
                    )}
                </figure>
            ))}
        </div>
    );
}