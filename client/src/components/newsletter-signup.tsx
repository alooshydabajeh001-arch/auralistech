import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

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
    <section className="py-16 bg-gradient-to-r from-tech-green-500 to-tech-blue-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Stay Updated with Tech Trends
        </h2>
        <p className="text-xl text-white/90 mb-8">
          Get weekly insights, product recommendations, and exclusive deals delivered to your inbox.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-white text-slate-900 placeholder-slate-500 border-0"
            required
          />
          <Button 
            type="submit"
            disabled={newsletterMutation.isPending}
            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-8"
          >
            {newsletterMutation.isPending ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
        
        <p className="text-white/70 text-sm mt-4">
          No spam, unsubscribe at any time. Read our{" "}
          <a href="#" className="underline hover:text-white">Privacy Policy</a>.
        </p>
      </div>
    </section>
  );
}
