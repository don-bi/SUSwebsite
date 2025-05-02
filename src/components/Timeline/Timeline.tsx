// --- Enhanced Interactive Timeline Component ---
// src/components/Timeline/Timeline.tsx
import { useState, useEffect, useRef } from 'react';
import TimelineItem from './TimelineItem';

interface TimelineEvent {
    year: number | string;
    description: string;
    id?: string; // Optional ID to link to sections
    isKeyEvent?: boolean; // Flag for highlighting important events
}

interface TimelineProps {
    events: TimelineEvent[];
    activeSection?: string; // Current active section ID from scroll position
    onEventClick?: (id: string) => void; // Callback for timeline event click
}

export default function Timeline({ events, activeSection, onEventClick }: TimelineProps) {
    const [visibleItems, setVisibleItems] = useState<number[]>([]);
    const timelineRef = useRef<HTMLDivElement>(null);
    const isScrollingToItem = useRef(false);
    
    // Effect to animate timeline items as they come into view
    useEffect(() => {
        // Pre-populate with first few items to avoid empty timeline
        setVisibleItems([0, 1, 2]);
        
        const observer = new IntersectionObserver((entries) => {
            if (isScrollingToItem.current) return;
            
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = parseInt(entry.target.getAttribute('data-index') || '0');
                    setVisibleItems(prev => 
                        prev.includes(index) ? prev : [...prev, index]
                    );
                }
            });
        }, { threshold: 0.1, rootMargin: '50px' });
        
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => observer.observe(item));
        
        return () => {
            timelineItems.forEach(item => observer.unobserve(item));
        };
    }, []);

    const handleEventClick = (id?: string) => {
        if (id && onEventClick) {
            isScrollingToItem.current = true;
            onEventClick(id);
            
            // Reset after animation completes
            setTimeout(() => {
                isScrollingToItem.current = false;
            }, 1000);
        }
    };

    return (
        <div 
            ref={timelineRef} 
            className="relative border-l-2 border-blue-400 dark:border-blue-600 ml-3 transition-all duration-500 overflow-visible"
            style={{ position: 'relative', zIndex: 1, padding: 0 }}
        >
            {/* Starting circle */}
            <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-2 top-0 shadow-lg shadow-blue-200 dark:shadow-blue-900/30"></div>
            
            <ol className="relative list-none m-0 p-0 mt-4">
                {events.map((event, index) => {
                    // Only highlight the item if its ID matches the active section exactly
                    const isActive = event.id === activeSection;
                    
                    return (
                        <div 
                            key={index}
                            data-index={index}
                            className={`timeline-item transition-all duration-300 ease-in-out ${
                                visibleItems.includes(index) 
                                    ? 'opacity-100 translate-x-0' 
                                    : 'opacity-0 -translate-x-4'
                            }`}
                            style={{
                                pointerEvents: 'auto',
                                position: 'relative',
                                zIndex: isActive ? 2 : 1,
                                transformOrigin: 'left center',
                                transition: 'transform 0.3s ease-in-out',
                                marginTop: index === 0 ? '0' : undefined
                            }}
                        >
                            <TimelineItem 
                                year={event.year} 
                                description={event.description} 
                                isActive={isActive}
                                isKeyEvent={event.isKeyEvent}
                                onClick={() => handleEventClick(event.id)}
                                isFirst={index === 0}
                            />
                        </div>
                    );
                })}
            </ol>
            
            {/* Ending circle */}
            <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-2 bottom-0 shadow-lg shadow-blue-200 dark:shadow-blue-900/30"></div>
        </div>
    );
}