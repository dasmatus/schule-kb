import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedTooltipProps {
    items: {
        id: string | number;
        name: string;
        designation: string;
        image?: string;
    }[];
}

export function AnimatedTooltip({ items }: AnimatedTooltipProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <>
            {items.map((item, idx) => (
                <div
                    key={item.id}
                    className="group relative"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence mode="popLayout">
                        {hoveredIndex === idx && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: { duration: 0.2, ease: "easeOut" },
                                }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center whitespace-nowrap rounded-md bg-foreground px-3 py-1.5 text-xs shadow-xl"
                            >
                                <span className="font-medium text-background">
                                    {item.name}
                                </span>
                                <span className="text-background/70">
                                    {item.designation}
                                </span>
                                <div className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 rounded-bl-sm bg-foreground" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </>
    );
}
