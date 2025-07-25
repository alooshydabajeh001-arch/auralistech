import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedBlogCard from "@/components/animated-blog-card";
import SEOHead from "@/components/seo-head";
import { BlogPost } from "@shared/schema";

const categories = ["All Posts", "Reviews", "Comparisons", "How-to Guides", "Trending Tech"];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Posts");

  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const filteredPosts = blogPosts?.filter((post) => {
    if (selectedCategory === "All Posts") return true;
    return post.category === selectedCategory;
  }) || [];

  return (
    <div className="min-h-screen bg-slate-900">
      <SEOHead 
        title="Tech Blog - Auralis"
        description="Read our latest tech reviews, product comparisons, how-to guides, and trending technology analysis from industry experts."
        keywords="tech blog, product reviews, tech comparisons, how-to guides, technology trends, tech analysis"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-50 mb-4">Latest Tech Insights</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Stay ahead of the curve with our expert reviews, comparisons, and tech trend analysis
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "bg-tech-green-500 hover:bg-tech-green-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600 border-slate-600"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-slate-400">
            {selectedCategory === "All Posts" 
              ? `Showing all ${filteredPosts.length} posts`
              : `Showing ${filteredPosts.length} posts in ${selectedCategory}`
            }
          </p>
        </div>

        {/* Blog Posts Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
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
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-slate-400 text-lg mb-4">
              No blog posts found in this category.
            </div>
            <Button 
              onClick={() => setSelectedCategory("All Posts")}
              variant="outline"
              className="border-tech-blue-500 text-tech-blue-500 hover:bg-tech-blue-500 hover:text-white"
            >
              View All Posts
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <AnimatedBlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
