"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const TypewriterEffect = ({
    words,
    className,
    cursorClassName,
}: {
    words: { text: string; className?: string }[];
    className?: string;
    cursorClassName?: string;
}) => {
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    const fullText = words.map((w) => w.text).join(" ");

    useEffect(() => {
        if (!isDeleting && displayText === fullText) {
            setTimeout(() => setIsDeleting(true), 2000);
            return;
        }

        if (isDeleting && displayText === "") {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
            return;
        }

        const timeout = setTimeout(
            () => {
                if (!isDeleting) {
                    setDisplayText(fullText.slice(0, currentIndex + 1));
                    setCurrentIndex((prev) => prev + 1);
                } else {
                    setDisplayText((prev) => prev.slice(0, -1));
                    setCurrentIndex((prev) => prev - 1);
                }
            },
            isDeleting ? 30 : 80
        );

        return () => clearTimeout(timeout);
    }, [displayText, currentIndex, isDeleting, fullText, words.length]);

    return (
        <div className={cn("inline-flex items-center", className)}>
            <span className={cn("text-2xl font-bold")}>
                {displayText}
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                    className={cn(
                        "ml-0.5 inline-block h-6 w-0.5 bg-primary",
                        cursorClassName
                    )}
                />
            </span>
        </div>
    );
};

export const TypewriterEffectSmooth = ({
    words,
    className,
    cursorClassName,
}: {
    words: { text: string; className?: string }[];
    className?: string;
    cursorClassName?: string;
}) => {
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const fullText = words.map((w) => w.text).join(" ");

    useEffect(() => {
        if (!isDeleting && displayText === fullText) {
            setTimeout(() => setIsDeleting(true), 2000);
            return;
        }

        if (isDeleting && displayText === "") {
            setIsDeleting(false);
            return;
        }

        const timeout = setTimeout(
            () => {
                if (!isDeleting) {
                    setDisplayText(fullText.slice(0, currentIndex + 1));
                    setCurrentIndex((prev) => prev + 1);
                } else {
                    setDisplayText((prev) => prev.slice(0, -1));
                    setCurrentIndex((prev) => prev - 1);
                }
            },
            isDeleting ? 30 : 80
        );

        return () => clearTimeout(timeout);
    }, [displayText, currentIndex, isDeleting, fullText]);

    return (
        <div className={cn("flex space-x-2", className)}>
            <div className="overflow-hidden">
                <motion.p
                    className={cn("text-2xl font-bold")}
                    initial={{ width: 0 }}
                    animate={{ width: "auto" }}
                >
                    {displayText}
                    <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                        className={cn(
                            "ml-0.5 inline-block h-6 w-0.5 bg-primary",
                            cursorClassName
                        )}
                    />
                </motion.p>
            </div>
        </div>
    );
};
