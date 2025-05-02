export default function TextBody({
    left, children, caption,
    src, alt, width
}: 
{left?: boolean, children: React.ReactNode, caption?: string
    src?: string, alt?: string, width?: number
}) {
    return (
        <div className="relative">
            {src && <figure className={`mb-2 mt-1 ${left ? "float-left mr-6" : "float-right ml-6"}`}>
                <img
                    src={src}
                    alt={alt}
                    width={width}
                    className="rounded-lg shadow-md"
                />
                {caption && <figcaption className="text-md text-gray-600 mt-2 text-center">
                    {caption}
                </figcaption>
                }
            </figure>}
            <p className="text-gray-800">
                {children}
            </p>
        </div>
    )
}