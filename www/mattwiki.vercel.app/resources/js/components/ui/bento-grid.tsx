import { cn } from "@/lib/utils";

interface BentoGridProps {
    children: React.ReactNode;
    className?: string;
}

interface BentoGridItemProps {
    children: React.ReactNode;
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
}

export function BentoGrid({ children, className }: BentoGridProps) {
    return (
        <div
            className={cn(
                "grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[12rem]",
                className
            )}
        >
            {children}
        </div>
    );
}

export function BentoGridItem({
    className,
    title,
    description,
    header,
    icon,
    children,
}: BentoGridItemProps) {
    return (
        <div
            className={cn(
                "group/row relative flex flex-col justify-between rounded-xl border bg-card p-4 text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5",
                className
            )}
        >
            {header && (
                <div className="mb-4 flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-lg border bg-muted/50">
                    {header}
                </div>
            )}
            <div className="transition-transform duration-300 group-hover/row:translate-y-[-2px]">
                <div className="mb-2 flex items-center gap-2">
                    {icon && <div className="text-muted-foreground">{icon}</div>}
                    {title && (
                        <div className="font-semibold text-card-foreground">
                            {title}
                        </div>
                    )}
                </div>
                {description && (
                    <div className="text-sm leading-relaxed text-muted-foreground">
                        {description}
                    </div>
                )}
            </div>
            {children}
        </div>
    );
}
