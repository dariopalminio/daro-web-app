import { FC, useEffect, useState } from "react";
import { createContext } from 'react';
import { useTheme } from "styled-components";

// Global user session context interface for provider
export interface ILayoutContext {
    sidebarWidth: number
    isSidebarOpen: boolean
    toggleSidebar: () => void
};

// Initial values for global user context 
export const ILayoutContextDefaultValues: ILayoutContext = {
    sidebarWidth: 0,
    isSidebarOpen: false,
    toggleSidebar: () => { }
};

// Global cart context
export const LayoutContext = createContext<ILayoutContext>(ILayoutContextDefaultValues);

interface Props {
    children?: React.ReactNode;
}

/**
 * Layout Context Provider
 */
const LayoutContextProvider: FC<Props> = ({ children }) => {
    const theme: any = useTheme();
    const [sidebarWidth, setSidebarWidth] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {

    }, []);

    function toggleSidebar() {
        setSidebarWidth(isSidebarOpen? 0 : theme.layout.sidebarWidth);
        setIsSidebarOpen(!isSidebarOpen);
    }

    return (
        <LayoutContext.Provider
            value={{
                sidebarWidth,
                isSidebarOpen,
                toggleSidebar
            }}
        >
            {children}
        </LayoutContext.Provider>
    );
};

export default LayoutContextProvider;

