import { createContext, useContext } from "react";

export const ShadowRootContext = createContext<HTMLElement | ShadowRoot | null>(null);

export const useShadowRoot = () => useContext(ShadowRootContext);
