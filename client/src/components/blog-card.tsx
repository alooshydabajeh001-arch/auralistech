import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@shared/schema";
import { format } from "date-fns";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const getBadgeVariant = (category: string) => {
    switch (category) {
      case "Reviews":
        return "secondary";
      case "Comparisons":
        return "destructive";
      case "How-to Guides":
        return "default";
      case "Trending Tech":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <Card className="bg-slate-700/50 backdrop-blur-sm border-slate-600 overflow-hidden hover:bg-slate-700 transition-all group">
      <div className="relative overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute top-4 left-4">
          <Badge variant={getBadgeVariant(post.category)} className="font-medium">
            {post.category}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center text-sm text-slate-400 mb-3">
          <span>{format(new Date(post.createdAt), "MMM dd, yyyy")}</span>
          <span className="mx-2">•</span>
          <span>{post.readTime}</span>
        </div>
        
        <h3 className="text-xl font-semibold text-slate-50 mb-3 group-hover:text-tech-green-500 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-slate-300 mb-4 line-clamp-3">{post.excerpt}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-tech-green-500 rounded-full flex items-center justify-center text-white font-medium mr-3">
              <span>{post.authorInitials}</span>
            </div>
            <span className="text-slate-400 text-sm">{post.author}</span>
          </div>
          <Button variant="ghost" className="text-tech-blue-500 hover:text-tech-blue-400 font-medium text-sm p-0">
            Read More →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
