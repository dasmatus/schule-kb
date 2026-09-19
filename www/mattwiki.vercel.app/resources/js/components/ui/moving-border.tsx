import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export interface MovingBorderProps {
    children: React.ReactNode;
    duration?: number;
    rx?: string;
    ry?: string;
    containerClassName?: string;
    borderClassName?: string;
    className?: string;
}

export function MovingBorder({
    children,
    duration = 4000,
    rx = "12px",
    ry = "12px",
    containerClassName = "",
    borderClassName = "",
    className = "",
}: MovingBorderProps) {
    return (
        <div
            className={containerClassName}
            style={{
                borderRadius: rx,
                position: "relative",
                isolation: "isolate",
                display: "inline-flex",
            }}
        >
            <motion.div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(120deg, transparent, transparent, transparent, var(--primary))",
                    borderRadius: rx,
                    transformOrigin: "center center",
                    animation: `spin ${duration}ms linear infinite`,
                }}
            />
            <div
                className={borderClassName}
                style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: rx,
                    background: "var(--background)",
                    filter: "blur(2px)",
                }}
            />
            <div
                className={className}
                style={{
                    position: "relative",
                    zIndex: 1,
                    borderRadius: rx,
                    width: "100%",
                    height: "100%",
                }}
            >
                {children}
            </div>
        </div>
    );
}
