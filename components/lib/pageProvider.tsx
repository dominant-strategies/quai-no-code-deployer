import React, { createContext, useContext, useState, ReactNode } from 'react';

const initialPageContext: PageContextType = {
  activePage: '/',
  setActivePage: () => {},
};

const PageContext = createContext<PageContextType>(initialPageContext);

export const PageProvider = ({ children }: { children: ReactNode }) => {
  const [activePage, setActivePage] = useState<string>('/');

  return <PageContext.Provider value={{ activePage, setActivePage }}>{children}</PageContext.Provider>;
};

export const usePage = () => useContext(PageContext);
