import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ExternalLink } from "lucide-react";
import { Product } from "@shared/schema";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAffiliateClick = () => {
    // Track affiliate click analytics here
    console.log("Affiliate link clicked:", product.name);
    window.open(product.affiliateUrl, "_blank", "noopener,noreferrer");
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // Add to wishlist logic here
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
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 overflow-hidden hover:bg-slate-800 transition-all group">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute top-4 left-4">
          {product.badge && (
            <Badge variant={getBadgeVariant(product.badge)} className="font-medium">
              {product.badge}
            </Badge>
          )}
        </div>
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="sm"
            className={`bg-slate-800/80 hover:bg-slate-700 p-2 ${
              isWishlisted ? "text-red-500" : "text-slate-300 hover:text-tech-green-500"
            }`}
            onClick={toggleWishlist}
          >
            <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center mb-2">
          <span className="text-sm text-tech-blue-500 font-medium">{product.category}</span>
          <div className="flex items-center ml-auto">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  fill={i < Math.floor(parseFloat(product.rating || "0")) ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className="text-slate-400 text-sm ml-2">({product.rating})</span>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-slate-50 mb-2">{product.name}</h3>
        <p className="text-slate-300 text-sm mb-4 line-clamp-3">{product.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-tech-green-500">${product.price}</span>
            {product.originalPrice && (
              <span className="text-slate-400 line-through">${product.originalPrice}</span>
            )}
          </div>
          {product.discountPercentage && (
            <Badge variant="destructive" className="bg-red-500/20 text-red-400">
              {product.discountPercentage}% OFF
            </Badge>
          )}
        </div>
        
        <Button 
          className="w-full bg-tech-green-500 hover:bg-tech-green-600 text-white font-semibold transition-all transform hover:scale-105"
          onClick={handleAffiliateClick}
        >
          <ExternalLink size={16} className="mr-2" />
          {product.category === "AI Tools" ? "Start Free Trial" : "View Deal"}
        </Button>
      </CardContent>
    </Card>
  );
}
