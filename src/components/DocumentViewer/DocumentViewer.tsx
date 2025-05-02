// --- NEW Placeholder Document Viewer ---
// src/components/DocumentViewer/DocumentViewer.tsx
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

interface DocumentViewerProps {
    pdfUrl: string;
}

export default function DocumentViewer({ pdfUrl }: DocumentViewerProps) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1); // Start on first page

    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.mjs',
        import.meta.url,
      ).toString();

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
        setPageNumber(1); // Reset to page 1 on new document load
    }

    function changePage(offset: number) {
        setPageNumber(prevPageNumber => Math.max(1, Math.min(prevPageNumber + offset, numPages || 1)));
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    return (
        <div className="max-w-4xl mx-auto my-6">
            <div className="flex justify-center items-center mb-4 space-x-4">
                <button
                    type="button"
                    disabled={pageNumber <= 1}
                    onClick={previousPage}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
                >
                    Previous
                </button>
                <span>
                    Page {pageNumber} of {numPages ?? '--'}
                </span>
                <button
                    type="button"
                    disabled={!numPages || pageNumber >= numPages}
                    onClick={nextPage}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
                >
                    Next
                </button>
                <a href={pdfUrl} download className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Download PDF</a>

            </div>
            <div className="border rounded shadow-lg overflow-hidden flex justify-center bg-gray-100">
                <Document
                    file={pdfUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    // Optional: Add error handling
                    // onLoadError={console.error}
                    // error={<div>Failed to load PDF file.</div>}
                    // loading={<div>Loading PDF...</div>}
                >
                    <Page pageNumber={pageNumber} />
                </Document>
            </div>
             <p className="text-center text-sm text-gray-500 mt-2">Use controls above to navigate or download the document.</p>
        </div>
    );
}