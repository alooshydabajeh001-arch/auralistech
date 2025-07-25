import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface LoadingSkeletonProps {
  count?: number;
  type?: "product" | "blog";
}

export default function LoadingSkeleton({ count = 6, type = "product" }: LoadingSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
        >
          <Card className={`${type === "product" ? "bg-slate-800/50 border-slate-700" : "bg-slate-700/50 border-slate-600"} overflow-hidden`}>
            {/* Image skeleton */}
            <motion.div
              className={`w-full ${type === "product" ? "h-64" : "h-48"} bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700`}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            <CardContent className="p-6">
              {/* Content skeletons */}
              <motion.div
                className={`h-4 ${type === "product" ? "bg-slate-700" : "bg-slate-600"} rounded mb-4`}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div
                className={`h-6 ${type === "product" ? "bg-slate-700" : "bg-slate-600"} rounded mb-2`}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className={`h-4 ${type === "product" ? "bg-slate-700" : "bg-slate-600"} rounded mb-4`}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              />
              <motion.div
                className={`h-10 ${type === "product" ? "bg-slate-700" : "bg-slate-600"} rounded`}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
              />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}