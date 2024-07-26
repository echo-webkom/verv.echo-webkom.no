import { createContext, useContext } from "react";

export type FieldContextType = {
  index: number;
};

export const FieldContext = createContext<FieldContextType>({} as FieldContextType);

export const FieldContextProvider = FieldContext.Provider;

export const useFieldContext = () => {
  const ctx = useContext(FieldContext);

  if (!ctx) {
    throw new Error("useFieldContext must be used within a FieldContextProvider");
  }

  return ctx;
};
