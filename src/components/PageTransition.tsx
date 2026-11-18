// src/components/PageTransition.tsx
import React from "react";
import { motion } from "framer-motion";

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <motion.div
        className="pb-30"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ type: "spring", stiffness: 100, damping: 15, mass: 0.8 }}
    >
        {children}
    </motion.div>
);