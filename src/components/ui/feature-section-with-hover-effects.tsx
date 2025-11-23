import React from "react";
import { cn } from "@/lib/utils";
import {
    IconBrandPython,
    IconBrandHtml5,
    IconBrandCss3,
    IconBrandJavascript,
    IconDatabase,
    IconServer,
} from "@tabler/icons-react";

export function FeaturesSectionWithHoverEffects() {
    const features = [
        {
            title: "Python",
            description:
                "Experienced in building robust backend systems, data analysis, and automation scripts.",
            icon: <IconBrandPython />,
        },
        {
            title: "HTML",
            description:
                "Crafting semantic and accessible markup for modern web applications.",
            icon: <IconBrandHtml5 />,
        },
        {
            title: "CSS",
            description:
                "Designing responsive and visually stunning user interfaces with modern styling techniques.",
            icon: <IconBrandCss3 />,
        },
        {
            title: "JavaScript",
            description:
                "Developing dynamic and interactive client-side functionality and server-side logic.",
            icon: <IconBrandJavascript />,
        },
        {
            title: "SQL",
            description:
                "Designing and optimizing relational database schemas for efficient data storage and retrieval.",
            icon: <IconDatabase />,
        },
        {
            title: "MongoDB",
            description:
                "Working with NoSQL databases for flexible and scalable data management.",
            icon: <IconServer />, // Using IconServer as a proxy for MongoDB if specific icon not available, or generic database
        },
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 max-w-7xl mx-auto">
            {features.map((feature, index) => (
                <Feature key={feature.title} {...feature} index={index} />
            ))}
        </div>
    );
}

const Feature = ({
    title,
    description,
    icon,
    index,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
}) => {
    return (
        <div
            className={cn(
                "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
                (index === 0 || index === 3) && "lg:border-l dark:border-neutral-800",
                index < 3 && "lg:border-b dark:border-neutral-800"
            )}
        >
            {index < 3 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            {index >= 3 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
                {icon}
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
                <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
                    {title}
                </span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
                {description}
            </p>
        </div>
    );
};
