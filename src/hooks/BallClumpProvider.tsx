"use client"

import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface BallClumpContextType {
  isClicked: boolean;
  setClicked: (clicked: boolean) => void;
}

const BallClumpContext = createContext<BallClumpContextType | undefined>(undefined);

export const BallClumpProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (pathname === "/") {
      setIsClicked(false);
    }
  }, [pathname]);

  useEffect(() => {
    const savedState = localStorage.getItem("ballClicked");
    if (savedState) {
      setIsClicked(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ballClicked", JSON.stringify(isClicked));
  }, [isClicked]);

  return (
    <BallClumpContext.Provider value={{ isClicked, setClicked: setIsClicked }}>
      {children}
    </BallClumpContext.Provider>
  );
};

export const useBallClump = (): BallClumpContextType => {
  const context = useContext(BallClumpContext);
  if (!context) {
    throw new Error("useBallClump must be used within a BallClumpProvider");
  }
  return context;
};
