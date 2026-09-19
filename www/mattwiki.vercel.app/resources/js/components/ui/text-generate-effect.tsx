"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
    words,
    className,
    filter = true,
    duration = 0.5,
}: {
    words: string;
    className?: string;
    filter?: boolean;
    duration?: number;
}) => {
    const [wordArray, setWordArray] = useState<string[]>([]);

    useEffect(() => {
        setWordArray(words.split(" "));
    }, [words]);

    return (
        <div className={cn("font-normal", className)}>
            <div className="mt-4">
                <div className="leading-snug tracking-wide">
                    {wordArray.map((word, idx) => (
                        <motion.span
                            key={word + idx}
                            initial={{ opacity: 0, filter: filter ? "blur(10px)" : "none" }}
                            animate={{ opacity: 1, filter: filter ? "blur(0px)" : "none" }}
                            transition={{
                                duration: duration,
                                delay: idx * 0.08,
                            }}
                            className="inline-block mr-[0.25em]"
                        >
                            {word}
                        </motion.span>
                    ))}
                </div>
            </div>
        </div>
    );
};
