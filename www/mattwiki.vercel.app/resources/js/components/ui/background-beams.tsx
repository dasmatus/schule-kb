"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useCallback } from "react";

interface BackgroundBeamsProps {
    className?: string;
    beamCount?: number;
}

export const BackgroundBeams = ({ className, beamCount = 20 }: BackgroundBeamsProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const beamsRef = useRef<
        { x: number; y: number; width: number; height: number; speed: number; opacity: number }[]
    >([]);
    const animationFrameRef = useRef<number>(0);
    // Cache logical dimensions to avoid forced reflow in the rAF loop
    const sizeRef = useRef({ w: 0, h: 0 });

    const initBeams = useCallback(
        (w: number, h: number) => {
            beamsRef.current = Array.from({ length: beamCount }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                width: Math.random() * 2 + 0.5,
                height: Math.random() * 200 + 100,
                speed: Math.random() * 2 + 1,
                opacity: Math.random() * 0.3 + 0.1,
            }));
        },
        [beamCount],
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            // Read layout once, write to canvas, then cache — no further reads in rAF
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            sizeRef.current = { w, h };
            canvas.width = w * window.devicePixelRatio;
            canvas.height = h * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        initBeams(sizeRef.current.w, sizeRef.current.h);

        const animate = () => {
            const { w, h } = sizeRef.current;
            ctx.clearRect(0, 0, w, h);

            beamsRef.current.forEach((beam) => {
                const gradient = ctx.createLinearGradient(beam.x, beam.y, beam.x, beam.y + beam.height);
                gradient.addColorStop(0, `rgba(120, 120, 120, 0)`);
                gradient.addColorStop(0.5, `rgba(200, 200, 200, ${beam.opacity})`);
                gradient.addColorStop(1, `rgba(120, 120, 120, 0)`);

                ctx.fillStyle = gradient;
                ctx.fillRect(beam.x, beam.y, beam.width, beam.height);

                beam.y += beam.speed;
                if (beam.y > h + beam.height) {
                    beam.y = -beam.height;
                    beam.x = Math.random() * w;
                }
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        // Defer past first paint so the canvas loop doesn't block LCP/FCP
        const startId = setTimeout(animate, 300);

        return () => {
            clearTimeout(startId);
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameRef.current);
        };
    }, [initBeams]);

    return (
        <canvas
            ref={canvasRef}
            className={cn("absolute inset-0 h-full w-full", className)}
            style={{ zIndex: 0 }}
        />
    );
};
