// --- Enhanced Section Component ---
// src/components/Section/Section.tsx
import React, { forwardRef } from 'react';

interface SectionProps {
    title: string;
    children: React.ReactNode;
    id?: string;
    className?: string;
}

const Section = forwardRef<HTMLElement, SectionProps>(({ 
    title, 
    children, 
    id, 
    className = '' 
}, ref) => {
    // Generate an ID from the title if none is provided
    const sectionId = id || title.replace(/\s+/g, '-').toLowerCase();
    
    return (
        <section 
            ref={ref} 
            id={sectionId}
            aria-labelledby={`heading-${sectionId}`}
            className={`scroll-mt-16 relative ${className}`} // Add scroll margin for better positioning with fixed headers
        >
            <h2 
                id={`heading-${sectionId}`} 
                className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-8    00 border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 md:mb-6"
            >
                {title}
            </h2>
            <div className="space-y-4">
                {children}
            </div>
        </section>
    );
});

// Add display name for debugging
Section.displayName = 'Section';

export default Section;