"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface SparklesProps {
    id?: string;
    background?: string;
    minSize?: number;
    maxSize?: number;
    particleDensity?: number;
    className?: string;
    particleColor?: string;
}

export const Sparkles = ({
    id = "sparkles",
    background = "transparent",
    minSize = 0.4,
    maxSize = 1,
    particleDensity = 120,
    className = "",
    particleColor = "#FFF",
}: SparklesProps) => {
    const [particles, setParticles] = useState<
        { x: number; y: number; size: number; resolved: boolean }[]
    >([]);

    useEffect(() => {
        // Defer past first paint so 60 SVG nodes don't block LCP
        const id = setTimeout(() => {
            const generatedParticles = Array.from(
                { length: particleDensity },
                () => ({
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * (maxSize - minSize) + minSize,
                    resolved: Math.random() > 0.5,
                })
            );
            setParticles(generatedParticles);
        }, 400);
        return () => clearTimeout(id);
    }, [particleDensity, maxSize, minSize]);

    return (
        <svg
            className={cn("absolute inset-0 h-full w-full", className)}
            style={{ background }}
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <radialGradient id={`${id}-gradient`}>
                    <stop offset="0%" stopColor={particleColor} stopOpacity="1" />
                    <stop offset="100%" stopColor={particleColor} stopOpacity="0" />
                </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${id}-gradient)`} />
            {particles.map((particle, idx) => (
                <circle
                    key={idx}
                    cx={particle.x + "%"}
                    cy={particle.y + "%"}
                    r={particle.size}
                    fill={particleColor}
                    opacity={particle.resolved ? 0.8 : 0.3}
                />
            ))}
        </svg>
    );
};
