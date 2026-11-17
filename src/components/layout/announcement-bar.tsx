"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export function AnnouncementBar() {
  const messages: readonly string[] = site.announcement.messages;
  const [i, setI] = useState(0);

  useEffect(() => {
    if (messages.length < 2) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % messages.length), 5000);
    return () => window.clearInterval(id);
  }, [messages.length]);

  const enabled: boolean = site.announcement.enabled;
  if (!enabled || messages.length === 0) return null;

  return (
    <div className="bg-navy text-white">
      <div className="container-page flex h-9 items-center justify-center overflow-hidden text-center text-[0.7rem] font-medium tracking-[0.14em] uppercase sm:text-xs">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            aria-live="polite"
          >
            {messages[i]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
