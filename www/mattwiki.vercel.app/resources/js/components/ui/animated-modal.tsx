"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
    createContext,
    useContext,
    useState,
    ReactNode,
    HTMLAttributes,
} from "react";

interface ModalContextType {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextType>({
    open: false,
    setOpen: () => {},
});

export function useModal() {
    return useContext(ModalContext);
}

export function AnimatedModalProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    return (
        <ModalContext.Provider value={{ open, setOpen }}>
            {children}
        </ModalContext.Provider>
    );
}

export function AnimatedModal({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    const { open } = useModal();

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                            "relative w-full max-w-lg rounded-xl border bg-background p-6 shadow-xl",
                            className
                        )}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export function AnimatedModalTrigger({
    children,
    className,
    onClick,
}: {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}) {
    const { setOpen } = useModal();
    return (
        <div
            className={className}
            onClick={() => {
                setOpen(true);
                onClick?.();
            }}
        >
            {children}
        </div>
    );
}

export function AnimatedModalContent({ children }: { children: ReactNode }) {
    return <>{children}</>;
}

export function AnimatedModalClose({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    const { setOpen } = useModal();
    return (
        <button
            className={cn("absolute right-4 top-4 text-muted-foreground hover:text-foreground", className)}
            onClick={() => setOpen(false)}
        >
            {children}
        </button>
    );
}
