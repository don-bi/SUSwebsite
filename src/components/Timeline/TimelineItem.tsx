// src/components/Timeline/TimelineItem.tsx
import { MouseEventHandler } from 'react';

interface TimelineItemProps {
    year: number | string;
    description: string;
    isActive?: boolean;
    isKeyEvent?: boolean;
    isFirst?: boolean;
    onClick?: MouseEventHandler<HTMLLIElement>;
}

export default function TimelineItem({ 
    year, 
    description, 
    isActive = false, 
    isKeyEvent = false, 
    isFirst = false,
    onClick 
}: TimelineItemProps) {
    return (
        <li 
            className={`mb-6 ml-6 cursor-pointer transition-all duration-300`}
            style={{ 
                marginTop: isFirst ? '0' : undefined,
                paddingTop: isFirst ? '0' : undefined
            }}
            onClick={onClick}
        >
            <span className={`absolute flex items-center justify-center w-6 h-6 ${
                isActive 
                    ? 'bg-blue-500 ring-blue-200' 
                    : isKeyEvent 
                        ? 'bg-amber-100 ring-amber-50 dark:bg-amber-900 dark:ring-amber-800' 
                        : 'bg-blue-100 ring-white dark:ring-gray-900 dark:bg-blue-900'
                } rounded-full -left-3 ring-8 transition-all duration-300 shadow-md`}
            >
                {/* Icon inside circle */}
                <svg 
                    className={`w-3 h-3 ${
                        isActive 
                            ? 'text-white' 
                            : isKeyEvent 
                                ? 'text-amber-800 dark:text-amber-300' 
                                : 'text-blue-800 dark:text-blue-300'
                    }`} 
                    aria-hidden="true" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4ZM7 15h-1v-1a1 1 0 0 0-2 0v1H3v-1a1 1 0 1 0-2 0v1H0V8h7v7Zm3-1a1 1 0 0 0-1-1h-.5a.5.5 0 0 1 0-1H9a1 1 0 0 0 1-1V8h1a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h.5a.5.5 0 0 1 0 1H13a1 1 0 0 0-1 1v1Zm5 1h-1v-1a1 1 0 0 0-2 0v1h-1v-1a1 1 0 1 0-2 0v1h-1V8h7v7Z"/>
                </svg>
            </span>
            <h3 className={`flex items-center mb-1 text-lg font-semibold ${
                isActive 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-900 dark:text-gray-100'
            }`}
            style={{ 
                marginTop: isFirst ? '0' : undefined,
                paddingTop: isFirst ? '0' : undefined
            }}>
                {year}
                {isKeyEvent && 
                    <span className="bg-amber-100 text-amber-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-amber-900 dark:text-amber-300 ml-3">
                        Key Event
                    </span>
                }
            </h3>
            <p className={`mb-4 text-base font-normal ${
                isActive 
                    ? 'text-gray-800 dark:text-gray-200' 
                    : 'text-gray-600 dark:text-gray-400'
            } transition-all duration-300`}>
                {description}
            </p>
        </li>
    );
}
