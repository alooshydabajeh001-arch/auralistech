import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Send, Star, Shield, Zap } from "lucide-react";

const features = [
  { icon: Star, text: "Exclusive tech insights" },
  { icon: Shield, text: "No spam guarantee" },
  { icon: Zap, text: "Early access to reviews" },
];

export default function AnimatedNewsletter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/newsletter", { email });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Successfully subscribed to our newsletter!",
      });
      setEmail("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to subscribe to newsletter",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    newsletterMutation.mutate(email);
  };

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-tech-green-500 to-tech-blue-500"
        animate={{
          background: [
            "linear-gradient(135deg, #22c55e 0%, #3b82f6 100%)",
            "linear-gradient(135deg, #3b82f6 0%, #22c55e 100%)",
            "linear-gradient(135deg, #22c55e 0%, #3b82f6 100%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            animate={isInView ? {
              textShadow: [
                "0 0 10px rgba(255, 255, 255, 0.3)",
                "0 0 20px rgba(255, 255, 255, 0.5)",
                "0 0 10px rgba(255, 255, 255, 0.3)",
              ],
            } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Stay Updated with Tech Trends
          </motion.h2>
          <motion.p
            className="text-xl text-white/90"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Get weekly insights, product recommendations, and exclusive deals delivered to your inbox.
          </motion.p>
        </motion.div>

        {/* Features */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-center text-white/90"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="mr-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
              >
                <feature.icon size={20} />
              </motion.div>
              <span className="text-sm font-medium">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div 
            className="flex-1"
            whileFocus={{ scale: 1.02 }}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/95 backdrop-blur-sm text-slate-900 placeholder-slate-500 border-0 focus:ring-2 focus:ring-white/50"
              required
            />
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              type="submit"
              disabled={newsletterMutation.isPending}
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-8 relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center">
                {newsletterMutation.isPending ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                  >
                    <Zap size={16} />
                  </motion.div>
                ) : (
                  <Send size={16} className="mr-2" />
                )}
                {newsletterMutation.isPending ? "Subscribing..." : "Subscribe"}
              </span>
            </Button>
          </motion.div>
        </motion.form>

        {/* Privacy notice */}
        <motion.p
          className="text-white/70 text-sm"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          No spam, unsubscribe at any time. Read our{" "}
          <motion.a 
            href="#" 
            className="underline hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            Privacy Policy
          </motion.a>
          .
        </motion.p>
      </div>
    </section>
  );
}