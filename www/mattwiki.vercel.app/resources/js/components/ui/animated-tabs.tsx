import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TabsProps {
    children: React.ReactNode;
    className?: string;
}

interface TabsContextValue {
    activeTab: string;
    setActiveTab: (value: string) => void;
}

import { createContext, useContext } from "react";

const TabsContext = createContext<TabsContextValue>({
    activeTab: "",
    setActiveTab: () => {},
});

function useTabs() {
    return useContext(TabsContext);
}

export function Tabs({ children, className, defaultValue }: TabsProps & { defaultValue?: string }) {
    const [activeTab, setActiveTab] = useState(defaultValue ?? "");

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className={className}>{children}</div>
        </TabsContext.Provider>
    );
}

export function TabsList({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "inline-flex h-10 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
                className
            )}
        >
            {children}
        </div>
    );
}

export function TabsTrigger({
    children,
    value,
    className,
}: {
    children: React.ReactNode;
    value: string;
    className?: string;
}) {
    const { activeTab, setActiveTab } = useTabs();
    const isActive = activeTab === value;

    return (
        <button
            onClick={() => setActiveTab(value)}
            className={cn(
                "relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                isActive && "text-foreground",
                !isActive && "text-muted-foreground hover:text-foreground",
                className
            )}
        >
            {children}
        </button>
    );
}

export function TabsContent({
    children,
    value,
    className,
}: {
    children: React.ReactNode;
    value: string;
    className?: string;
}) {
    const { activeTab } = useTabs();

    if (activeTab !== value) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
