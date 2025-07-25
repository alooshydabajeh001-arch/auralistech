import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@shared/schema";
import { format } from "date-fns";
import { Clock, User, ArrowRight } from "lucide-react";

interface AnimatedBlogCardProps {
  post: BlogPost;
  index: number;
}

export default function AnimatedBlogCard({ post, index }: AnimatedBlogCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

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

  const getBadgeColor = (category: string) => {
    switch (category) {
      case "Reviews":
        return "from-tech-blue-500 to-purple-500";
      case "Comparisons":
        return "from-red-500 to-pink-500";
      case "How-to Guides":
        return "from-tech-green-500 to-emerald-500";
      case "Trending Tech":
        return "from-orange-500 to-yellow-500";
      default:
        return "from-tech-green-500 to-tech-blue-500";
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateY: -15 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, rotateY: 0 }
          : { opacity: 0, y: 60, rotateY: -15 }
      }
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ y: -8, rotateY: 2 }}
      className="group perspective-1000"
    >
      <Card className="bg-slate-700/50 backdrop-blur-sm border-slate-600 overflow-hidden hover:bg-slate-700 transition-all relative h-full">
        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-tech-green-500/5 to-tech-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={false}
        />

        {/* Image section */}
        <div className="relative overflow-hidden">
          <motion.img
            src={post.image}
            alt={post.title}
            className="w-full h-48 object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />

          {/* Image overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Category badge */}
          <motion.div
            className="absolute top-4 left-4"
            initial={{ x: -30, opacity: 0 }}
            animate={
              isInView ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }
            }
            transition={{ delay: index * 0.15 + 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`relative`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${getBadgeColor(post.category)} opacity-20 rounded-md blur-sm`} />
              <Badge
                variant={getBadgeVariant(post.category)}
                className="font-medium backdrop-blur-sm relative"
              >
                {post.category}
              </Badge>
            </motion.div>
          </motion.div>

          {/* Read time indicator */}
          <motion.div
            className="absolute bottom-4 right-4 bg-slate-800/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={
              isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
            }
            transition={{ delay: index * 0.15 + 0.5, type: "spring" }}
          >
            <Clock size={12} className="text-tech-green-500 mr-1" />
            <span className="text-xs text-slate-300">{post.readTime}</span>
          </motion.div>
        </div>

        <CardContent className="p-6 relative z-10">
          {/* Date and read time */}
          <motion.div
            className="flex items-center text-sm text-slate-400 mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={
              isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
            }
            transition={{ delay: index * 0.15 + 0.6 }}
          >
            <span>{format(new Date(post.createdAt), "MMM dd, yyyy")}</span>
            <motion.div
              className="mx-2 w-1 h-1 bg-tech-green-500 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
            />
            <span>{post.readTime}</span>
          </motion.div>

          {/* Title */}
          <motion.h3
            className="text-xl font-semibold text-slate-50 mb-3 group-hover:text-tech-green-500 transition-colors line-clamp-2"
            initial={{ opacity: 0, y: 15 }}
            animate={
              isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }
            }
            transition={{ delay: index * 0.15 + 0.7 }}
          >
            {post.title}
          </motion.h3>

          {/* Excerpt */}
          <motion.p
            className="text-slate-300 mb-6 line-clamp-3 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.15 + 0.8 }}
          >
            {post.excerpt}
          </motion.p>

          {/* Author and CTA */}
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={
              isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ delay: index * 0.15 + 0.9 }}
          >
            {/* Author */}
            <div className="flex items-center">
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-tech-green-500 to-tech-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <User size={16} />
              </motion.div>
              <div>
                <div className="text-slate-300 text-sm font-medium">
                  {post.author}
                </div>
                <div className="text-slate-500 text-xs">Author</div>
              </div>
            </div>

            {/* Read More Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                className="text-tech-blue-500 hover:text-tech-blue-400 hover:bg-tech-blue-500/10 font-medium text-sm p-2 group/btn"
              >
                <span className="mr-2">Read More</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight size={16} />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>

        {/* Bottom border animation */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-tech-green-500 to-tech-blue-500"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: "left" }}
        />
      </Card>
    </motion.div>
  );
}