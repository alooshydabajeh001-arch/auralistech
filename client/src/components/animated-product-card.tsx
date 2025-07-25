import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ExternalLink } from "lucide-react";
import { Product } from "@shared/schema";
import { useState } from "react";

interface AnimatedProductCardProps {
  product: Product;
  index: number;
}

export default function AnimatedProductCard({ product, index }: AnimatedProductCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAffiliateClick = () => {
    console.log("Affiliate link clicked:", product.name);
    window.open(product.affiliateUrl, "_blank", "noopener,noreferrer");
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const getBadgeVariant = (badge: string | null) => {
    if (!badge) return "default";
    switch (badge) {
      case "Editor's Choice":
        return "default";
      case "Trending":
        return "secondary";
      case "New":
        return "outline";
      case "AI Powered":
        return "default";
      case "Best Seller":
        return "destructive";
      case "Limited Time":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ y: -10 }}
      className="group"
    >
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 overflow-hidden hover:bg-slate-800 transition-all relative">
        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-tech-green-500/10 to-tech-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />
        
        <div className="relative overflow-hidden">
          <motion.img 
            src={product.image} 
            alt={product.name}
            className="w-full h-64 object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Image overlay with animated elements */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />

          {/* Badge */}
          <motion.div
            className="absolute top-4 left-4"
            initial={{ x: -20, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            {product.badge && (
              <Badge 
                variant={getBadgeVariant(product.badge)} 
                className="font-medium backdrop-blur-sm"
              >
                {product.badge}
              </Badge>
            )}
          </motion.div>

          {/* Wishlist button */}
          <motion.div
            className="absolute top-4 right-4"
            initial={{ x: 20, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
            transition={{ delay: index * 0.1 + 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                className={`bg-slate-800/80 hover:bg-slate-700 p-2 backdrop-blur-sm ${
                  isWishlisted ? "text-red-500" : "text-slate-300 hover:text-tech-green-500"
                }`}
                onClick={toggleWishlist}
              >
                <motion.div
                  animate={isWishlisted ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>

          {/* Discount badge */}
          {product.discountPercentage && (
            <motion.div
              className="absolute bottom-4 right-4"
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
              transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 200 }}
            >
              <Badge variant="destructive" className="bg-red-500/90 text-white backdrop-blur-sm">
                {product.discountPercentage}% OFF
              </Badge>
            </motion.div>
          )}
        </div>
        
        <CardContent className="p-6 relative z-10">
          {/* Category and Rating */}
          <motion.div
            className="flex items-center mb-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.1 + 0.6 }}
          >
            <span className="text-sm text-tech-blue-500 font-medium">{product.category}</span>
            <div className="flex items-center ml-auto">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ delay: index * 0.1 + 0.7 + i * 0.05 }}
                  >
                    <Star 
                      size={14} 
                      fill={i < Math.floor(parseFloat(product.rating || "0")) ? "currentColor" : "none"}
                    />
                  </motion.div>
                ))}
              </div>
              <span className="text-slate-400 text-sm ml-2">({product.rating})</span>
            </div>
          </motion.div>
          
          {/* Product Name */}
          <motion.h3
            className="text-xl font-semibold text-slate-50 mb-2 group-hover:text-tech-green-500 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: index * 0.1 + 0.7 }}
          >
            {product.name}
          </motion.h3>
          
          {/* Description */}
          <motion.p
            className="text-slate-300 text-sm mb-4 line-clamp-3"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.1 + 0.8 }}
          >
            {product.description}
          </motion.p>
          
          {/* Price */}
          <motion.div
            className="flex items-center justify-between mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: index * 0.1 + 0.9 }}
          >
            <div className="flex items-center space-x-2">
              <motion.span
                className="text-2xl font-bold text-tech-green-500"
                animate={{
                  textShadow: [
                    "0 0 10px rgba(34, 197, 94, 0.3)",
                    "0 0 20px rgba(34, 197, 94, 0.6)",
                    "0 0 10px rgba(34, 197, 94, 0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
              >
                ${product.price}
              </motion.span>
              {product.originalPrice && (
                <span className="text-slate-400 line-through">${product.originalPrice}</span>
              )}
            </div>
          </motion.div>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: index * 0.1 + 1.0 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                className="w-full bg-tech-green-500 hover:bg-tech-green-600 text-white font-semibold transition-all relative overflow-hidden group"
                onClick={handleAffiliateClick}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-tech-green-600 to-tech-blue-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center justify-center">
                  <ExternalLink size={16} className="mr-2" />
                  {product.category === "AI Tools" ? "Start Free Trial" : "View Deal"}
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}