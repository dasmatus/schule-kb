"use client";

import React, { useRef, useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StickyScrollProps {
    contentItems: {
        title: string;
        description: string;
        content?: React.ReactNode;
    }[];
    contentClassName?: string;
}

export const StickyScroll = ({
    contentItems,
    contentClassName,
}: StickyScrollProps) => {
    const [activeCard, setActiveCard] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        container: containerRef,
        offset: ["start start", "end start"],
    });

    const totalCards = contentItems.length;

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const cardSize = 1 / totalCards;
        const activeIndex = Math.min(
            Math.floor(latest / cardSize),
            totalCards - 1
        );
        setActiveCard(activeIndex >= 0 ? activeIndex : 0);
    });

    return (
        <div
            ref={containerRef}
            className="relative flex h-[30rem] overflow-y-auto"
        >
            <div className="relative flex-1">
                {contentItems.map((item, index) => (
                    <div
                        key={index}
                        className="flex h-[30rem] items-start justify-center px-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className={cn("max-w-lg", contentClassName)}
                        >
                            <h2 className="text-2xl font-bold text-foreground">
                                {item.title}
                            </h2>
                            <div className="mt-3 text-muted-foreground">
                                {item.description}
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>
            {contentItems[activeCard]?.content && (
                <div className="sticky top-0 flex h-[30rem] w-full items-center justify-center px-8">
                    <motion.div
                        key={activeCard}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="h-full w-full max-w-lg"
                    >
                        {contentItems[activeCard].content}
                    </motion.div>
                </div>
            )}
        </div>
    );
};
