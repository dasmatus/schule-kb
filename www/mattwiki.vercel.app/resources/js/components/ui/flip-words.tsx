"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const FlipWords = ({
    words,
    duration = 3000,
    className,
}: {
    words: string[];
    duration?: number;
    className?: string;
}) => {
    const [index, setIndex] = useState(0);
    const [phase, setPhase] = useState<"enter" | "exit">("enter");

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;

        const tick = setInterval(() => {
            setPhase("exit");
            timeoutId = setTimeout(() => {
                setIndex((i) => (i + 1) % words.length);
                setPhase("enter");
            }, 350);
        }, duration);

        return () => {
            clearInterval(tick);
            clearTimeout(timeoutId);
        };
    }, [words.length, duration]);

    return (
        <span
            className={cn(
                "inline-block",
                phase === "enter" ? "animate-flip-in" : "animate-flip-out",
                className,
            )}
            style={{ perspective: "1000px" }}
        >
            {words[index]}
        </span>
    );
};
