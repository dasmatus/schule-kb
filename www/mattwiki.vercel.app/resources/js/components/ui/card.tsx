import { cn } from "@/lib/utils";
import { useRef, useState, MouseEvent, type JSX } from "react";

interface CardContainerProps {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
}

export function CardContainer({ children, className, containerClassName }: CardContainerProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [perspective, setPerspective] = useState(1000);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        ref.current.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseEnter = () => {
        setPerspective(800);
    };

    const handleMouseLeave = () => {
        if (!ref.current) return;
        ref.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn("transition-all duration-200 ease-linear", containerClassName)}
            style={{ perspective: `${perspective}px` }}
        >
            <div className={cn("glass-smoked rounded-xl text-card-foreground shadow-sm transition-all duration-200 hover:shadow-lg glass-smoked-hover", className)}>
                {children}
            </div>
        </div>
    );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn("flex flex-col space-y-1.5 p-6", className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
    return <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)}>{children}</h3>;
}

export function CardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
    return <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn("p-6 pt-0", className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn("flex items-center p-6 pt-0", className)}>{children}</div>;
}

export { CardContainer as Card };
