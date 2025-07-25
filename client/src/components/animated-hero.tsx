import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Cpu, Smartphone, Home, Zap, Laptop } from "lucide-react";

const floatingIcons = [
  { Icon: Cpu, delay: 0, x: "10%", y: "20%" },
  { Icon: Smartphone, delay: 0.5, x: "80%", y: "30%" },
  { Icon: Home, delay: 1, x: "15%", y: "70%" },
  { Icon: Zap, delay: 1.5, x: "85%", y: "75%" },
  { Icon: Laptop, delay: 2, x: "50%", y: "15%" },
];

export default function AnimatedHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen bg-slate-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Primary gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          animate={{
            background: [
              "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
              "linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #334155 70%, #0f172a 100%)",
              "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Animated wave patterns */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(34, 197, 94, 0.1)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.1)" />
              <stop offset="100%" stopColor="rgba(34, 197, 94, 0.1)" />
            </linearGradient>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.08)" />
              <stop offset="100%" stopColor="rgba(34, 197, 94, 0.08)" />
            </linearGradient>
          </defs>
          
          <motion.path
            d="M0,300 Q250,200 500,300 T1000,300 L1000,1000 L0,1000 Z"
            fill="url(#waveGradient1)"
            animate={{
              d: [
                "M0,300 Q250,200 500,300 T1000,300 L1000,1000 L0,1000 Z",
                "M0,350 Q250,150 500,350 T1000,350 L1000,1000 L0,1000 Z",
                "M0,300 Q250,200 500,300 T1000,300 L1000,1000 L0,1000 Z",
              ],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.path
            d="M0,400 Q250,300 500,400 T1000,400 L1000,1000 L0,1000 Z"
            fill="url(#waveGradient2)"
            animate={{
              d: [
                "M0,400 Q250,300 500,400 T1000,400 L1000,1000 L0,1000 Z",
                "M0,450 Q250,250 500,450 T1000,450 L1000,1000 L0,1000 Z",
                "M0,400 Q250,300 500,400 T1000,400 L1000,1000 L0,1000 Z",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </svg>

        {/* Floating particles */}
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-tech-green-500 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Interactive mouse glow */}
        <motion.div
          className="absolute w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)",
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* Floating Tech Icons */}
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute text-tech-blue-500 opacity-20"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
            rotate: [0, 360],
            y: [-10, 10, -10],
          }}
          transition={{
            delay,
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon size={32} />
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-4xl sm:text-6xl lg:text-7xl font-bold text-slate-50 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              Smart Tech for the{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-tech-green-500 to-tech-blue-500"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Future
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Discover cutting-edge gadgets, AI devices, and smart home solutions. 
            We curate the best tech products to empower your digital lifestyle.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <Link href="/products">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-tech-green-500 hover:bg-tech-green-600 text-white font-semibold py-4 px-8 text-lg relative overflow-hidden group">
                  <span className="relative z-10">Explore Products</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-tech-green-600 to-tech-blue-500"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>
            </Link>
            
            <Link href="/blog">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" className="border-2 border-tech-blue-500 text-tech-blue-500 hover:bg-tech-blue-500 hover:text-white font-semibold py-4 px-8 text-lg">
                  Read Reviews
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            {[
              { value: "500+", label: "Products Reviewed", color: "tech-green" },
              { value: "50K+", label: "Happy Customers", color: "tech-blue" },
              { value: "98%", label: "Satisfaction Rate", color: "tech-green" },
              { value: "24/7", label: "Expert Support", color: "tech-blue" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  className={`text-3xl font-bold ${
                    stat.color === "tech-green" ? "text-tech-green-500" : "text-tech-blue-500"
                  }`}
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(34, 197, 94, 0.5)",
                      "0 0 20px rgba(34, 197, 94, 0.8)",
                      "0 0 10px rgba(34, 197, 94, 0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-slate-400 rounded-full relative">
          <motion.div
            className="w-1 h-2 bg-tech-green-500 rounded-full absolute left-1/2 transform -translate-x-1/2 top-2"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}