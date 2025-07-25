import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedHero from "@/components/animated-hero";
import AnimatedProductCard from "@/components/animated-product-card";
import AnimatedBlogCard from "@/components/animated-blog-card";
import AnimatedSection from "@/components/animated-section";
import AnimatedStats from "@/components/animated-stats";
import AnimatedNewsletter from "@/components/animated-newsletter";
import SEOHead from "@/components/seo-head";
import { Product, BlogPost } from "@shared/schema";
import { Home, Heart, Zap, Laptop, Smartphone } from "lucide-react";
import { Link } from "wouter";

const categories = [
  { name: "Smart Home", icon: Home, count: "120+", color: "tech-green" },
  { name: "Wearable Tech", icon: Heart, count: "85+", color: "tech-blue" },
  { name: "AI Tools", icon: Zap, count: "95+", color: "tech-green" },
  { name: "Computing", icon: Laptop, count: "150+", color: "tech-blue" },
  { name: "Mobile", icon: Smartphone, count: "110+", color: "tech-green" },
];

export default function HomePage() {
  const { data: featuredProducts, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products/featured"],
  });

  const { data: blogPosts, isLoading: blogLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const recentPosts = blogPosts?.slice(0, 3) || [];
  
  const heroStats = [
    { value: "500+", label: "Products Reviewed", color: "tech-green" as const },
    { value: "50K+", label: "Happy Customers", color: "tech-blue" as const },
    { value: "98%", label: "Satisfaction Rate", color: "tech-green" as const },
    { value: "24/7", label: "Expert Support", color: "tech-blue" as const },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      <SEOHead 
        title="Auralis - Smart Tech for the Future"
        description="Discover the latest AI devices, smart home gear, laptops, and cutting-edge tech products. Expert reviews and recommendations for tech enthusiasts."
        keywords="tech gadgets, AI devices, smart home, laptops, wearable tech, mobile accessories, product reviews"
      />

      {/* Animated Hero Section */}
      <AnimatedHero />

      {/* Product Categories */}
      <AnimatedSection className="py-16 bg-slate-800/50" delay={0.2}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="fade" delay={0.3}>
            <h2 className="text-3xl font-bold text-center text-slate-50 mb-12">
              Explore by Category
            </h2>
          </AnimatedSection>
          
          <AnimatedSection stagger className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <Link key={category.name} href={`/products?category=${encodeURIComponent(category.name)}`}>
                <Card className="bg-slate-700/50 backdrop-blur-sm border-slate-600 hover:bg-slate-700 transition-all cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className={`text-4xl mb-4 ${
                      category.color === "tech-green" ? "text-tech-green-500" : "text-tech-blue-500"
                    } group-hover:scale-110 transition-transform`}>
                      <category.icon className="w-10 h-10 mx-auto" />
                    </div>
                    <h3 className="font-semibold text-slate-200 mb-2">{category.name}</h3>
                    <p className="text-sm text-slate-400">{category.count} Products</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </AnimatedSection>
        </div>
      </AnimatedSection>

      {/* Featured Products */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16" direction="up" delay={0.2}>
            <h2 className="text-4xl font-bold text-slate-50 mb-4">Featured Products</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Hand-picked by our experts, these products represent the pinnacle of innovation and value
            </p>
          </AnimatedSection>
          
          {productsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="bg-slate-800/50 border-slate-700">
                  <div className="w-full h-64 bg-slate-700 animate-pulse"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-slate-700 rounded animate-pulse mb-4"></div>
                    <div className="h-6 bg-slate-700 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-slate-700 rounded animate-pulse mb-4"></div>
                    <div className="h-10 bg-slate-700 rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts?.map((product, index) => (
                <AnimatedProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
          
          <AnimatedSection className="text-center mt-12" direction="up" delay={0.8}>
            <Link href="/products">
              <Button className="bg-tech-blue-500 hover:bg-tech-blue-600 text-white font-semibold py-4 px-8">
                View All Products →
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16" direction="up" delay={0.2}>
            <h2 className="text-4xl font-bold text-slate-50 mb-4">Latest Tech Insights</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Stay ahead of the curve with our expert reviews, comparisons, and tech trend analysis
            </p>
          </AnimatedSection>
          
          {blogLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="bg-slate-700/50 border-slate-600">
                  <div className="w-full h-48 bg-slate-600 animate-pulse"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-slate-600 rounded animate-pulse mb-4"></div>
                    <div className="h-6 bg-slate-600 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-slate-600 rounded animate-pulse mb-4"></div>
                    <div className="h-8 bg-slate-600 rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post, index) => (
                <AnimatedBlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          )}
          
          <AnimatedSection className="text-center mt-12" direction="up" delay={0.8}>
            <Link href="/blog">
              <Button className="bg-tech-green-500 hover:bg-tech-green-600 text-white font-semibold py-4 px-8">
                View All Posts →
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <AnimatedNewsletter />
    </div>
  );
}
