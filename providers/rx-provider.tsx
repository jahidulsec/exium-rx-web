"use client";

import React from "react";

interface RxProps {
  rxIds: string[];
  onRxIds: (value: string[]) => void;
}

const RxContext = React.createContext<RxProps | undefined>(undefined);

export const RxProvider = ({ children }: React.PropsWithChildren) => {
  const [rxIds, setRxIds] = React.useState<string[]>([]);

  return (
    <RxContext.Provider
      value={{
        rxIds,
        onRxIds: value => setRxIds(value),
      }}
    >
      {children}
    </RxContext.Provider>
  );
};

export const useRxProvider = () => {
  const context = React.useContext(RxContext);

  if (!context) throw new Error("Rx provider is not loaded");

  return context;
};
