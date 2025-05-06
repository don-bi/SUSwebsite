interface DocumentViewerProps {
    pdfUrl: string;
}

export default function DocumentViewer({ pdfUrl }: DocumentViewerProps) {
    return (
        <div className="max-w-4xl mx-auto my-6">
            <div className="flex justify-center mb-4">
                <a href={pdfUrl} download className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Download PDF
                </a>
            </div>
            <div className="border rounded shadow-lg overflow-hidden bg-gray-100">
                <embed 
                    src={pdfUrl}
                    type="application/pdf"
                    width="100%"
                    height="600px"
                />
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">
                If the PDF doesn't display correctly, you can download it using the button above.
            </p>
        </div>
    );
}
