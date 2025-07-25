import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/product-card";
import BlogCard from "@/components/blog-card";
import NewsletterSignup from "@/components/newsletter-signup";
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

  return (
    <div className="min-h-screen bg-slate-900">
      <SEOHead 
        title="Auralis - Smart Tech for the Future"
        description="Discover the latest AI devices, smart home gear, laptops, and cutting-edge tech products. Expert reviews and recommendations for tech enthusiasts."
        keywords="tech gadgets, AI devices, smart home, laptops, wearable tech, mobile accessories, product reviews"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-tech-blue-500/10 to-tech-green-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-slate-50 mb-6">
              Smart Tech for the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-green-500 to-tech-blue-500">
                Future
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Discover cutting-edge gadgets, AI devices, and smart home solutions. 
              We curate the best tech products to empower your digital lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link href="/products">
                <Button className="bg-tech-green-500 hover:bg-tech-green-600 text-white font-semibold py-4 px-8 text-lg">
                  Explore Products
                </Button>
              </Link>
              <Link href="/blog">
                <Button variant="outline" className="border-2 border-tech-blue-500 text-tech-blue-500 hover:bg-tech-blue-500 hover:text-white font-semibold py-4 px-8 text-lg">
                  Read Reviews
                </Button>
              </Link>
            </div>
            
            {/* Featured Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-tech-green-500">500+</div>
                <div className="text-slate-400">Products Reviewed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-tech-blue-500">50K+</div>
                <div className="text-slate-400">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-tech-green-500">98%</div>
                <div className="text-slate-400">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-tech-blue-500">24/7</div>
                <div className="text-slate-400">Expert Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-50 mb-12">
            Explore by Category
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
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
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-50 mb-4">Featured Products</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Hand-picked by our experts, these products represent the pinnacle of innovation and value
            </p>
          </div>
          
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
              {featuredProducts?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/products">
              <Button className="bg-tech-blue-500 hover:bg-tech-blue-600 text-white font-semibold py-4 px-8">
                View All Products →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-50 mb-4">Latest Tech Insights</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Stay ahead of the curve with our expert reviews, comparisons, and tech trend analysis
            </p>
          </div>
          
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
              {recentPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/blog">
              <Button className="bg-tech-green-500 hover:bg-tech-green-600 text-white font-semibold py-4 px-8">
                View All Posts →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </div>
  );
}
