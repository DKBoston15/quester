import React, { useState, useContext } from 'react';

const SidebarContext = React.createContext();

export function useSidebar() {
  return useContext(SidebarContext);
}

export function SidebarProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <SidebarContext.Provider value={[sidebarOpen, toggleSidebar]}>
      {children}
    </SidebarContext.Provider>
  );
}
