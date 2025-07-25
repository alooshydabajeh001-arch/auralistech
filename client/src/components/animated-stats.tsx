import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface StatProps {
  value: string;
  label: string;
  color: "tech-green" | "tech-blue";
  index: number;
}

interface AnimatedStatsProps {
  stats: Array<{
    value: string;
    label: string;
    color: "tech-green" | "tech-blue";
  }>;
}

function AnimatedStat({ value, label, color, index }: StatProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView) {
      // Extract number from value string for animation
      const numericValue = value.replace(/[^0-9]/g, "");
      const suffix = value.replace(/[0-9]/g, "");
      
      if (numericValue) {
        const targetNumber = parseInt(numericValue);
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = targetNumber / steps;
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= targetNumber) {
            setDisplayValue(value);
            clearInterval(timer);
          } else {
            setDisplayValue(Math.floor(current) + suffix);
          }
        }, duration / steps);
        
        return () => clearInterval(timer);
      }
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, scale: 0.5, y: 30 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.5, y: 30 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className={`text-3xl font-bold ${
          color === "tech-green" ? "text-tech-green-500" : "text-tech-blue-500"
        }`}
        animate={isInView ? {
          textShadow: [
            "0 0 10px rgba(34, 197, 94, 0.3)",
            "0 0 20px rgba(34, 197, 94, 0.6)",
            "0 0 10px rgba(34, 197, 94, 0.3)",
          ],
        } : {}}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          delay: index * 0.3,
          repeatType: "reverse"
        }}
      >
        {displayValue}
      </motion.div>
      <motion.div 
        className="text-slate-400"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}

export default function AnimatedStats({ stats }: AnimatedStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
      {stats.map((stat, index) => (
        <AnimatedStat key={index} {...stat} index={index} />
      ))}
    </div>
  );
}