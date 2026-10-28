"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { AnimatePresence } from "motion/react";
import { IntroSplash } from "./IntroSplash";

/** true once the opening greeting has been dismissed (true when there is no intro). */
const IntroDoneContext = createContext(true);

export const useIntroDone = () => useContext(IntroDoneContext);

/** Shows the full-screen birthday greeting first, then lets the page animate in. */
export function IntroProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);
  const finish = useCallback(() => setDone(true), []);

  return (
    <IntroDoneContext.Provider value={done}>
      {children}
      <AnimatePresence>{!done && <IntroSplash key="intro" onDone={finish} />}</AnimatePresence>
    </IntroDoneContext.Provider>
  );
}
