import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import SEOHead from "@/components/seo-head";
import { Mail, Clock, Users, Send } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Thank you for your message! We'll get back to you soon.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <SEOHead 
        title="Contact Us - Auralis"
        description="Get in touch with the Auralis team. We'd love to hear your questions, suggestions, or collaboration ideas about technology and product reviews."
        keywords="contact auralis, tech support, collaboration, feedback, questions"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-50 mb-4">Get in Touch</h1>
          <p className="text-xl text-slate-300">
            Have questions, suggestions, or want to collaborate? We'd love to hear from you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-semibold text-slate-50 mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-tech-green-500/20 rounded-lg flex items-center justify-center mr-4">
                  <Mail className="text-tech-green-500" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-50">Email</h3>
                  <p className="text-slate-300">hello@auralis.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-tech-blue-500/20 rounded-lg flex items-center justify-center mr-4">
                  <Clock className="text-tech-blue-500" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-50">Response Time</h3>
                  <p className="text-slate-300">Within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mr-4">
                  <Users className="text-purple-500" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-50">Follow Us</h3>
                  <div className="flex space-x-4 mt-2">
                    <a href="#" className="text-slate-400 hover:text-tech-green-500 transition-colors">
                      Twitter
                    </a>
                    <a href="#" className="text-slate-400 hover:text-tech-green-500 transition-colors">
                      YouTube
                    </a>
                    <a href="#" className="text-slate-400 hover:text-tech-green-500 transition-colors">
                      Instagram
                    </a>
                    <a href="#" className="text-slate-400 hover:text-tech-green-500 transition-colors">
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-slate-50 mb-4">Frequently Asked</h3>
              <div className="space-y-4">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-slate-50 mb-2">How do I request a product review?</h4>
                    <p className="text-slate-300 text-sm">
                      Use the contact form with "Product Review Request" as the subject and include details about the product.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-slate-50 mb-2">Do you accept partnerships?</h4>
                    <p className="text-slate-300 text-sm">
                      Yes! We're always open to collaboration. Select "Partnership/Collaboration" when contacting us.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your full name"
                              className="bg-slate-700/50 border-slate-600 text-slate-50 placeholder-slate-400"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="your.email@example.com"
                              className="bg-slate-700/50 border-slate-600 text-slate-50 placeholder-slate-400"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Subject</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-slate-50">
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="review-request">Product Review Request</SelectItem>
                              <SelectItem value="collaboration">Partnership/Collaboration</SelectItem>
                              <SelectItem value="technical">Technical Support</SelectItem>
                              <SelectItem value="feedback">Feedback/Suggestion</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us more about your inquiry..."
                              className="bg-slate-700/50 border-slate-600 text-slate-50 placeholder-slate-400 resize-none"
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      disabled={contactMutation.isPending}
                      className="w-full bg-tech-green-500 hover:bg-tech-green-600 text-white font-semibold py-3"
                    >
                      <Send size={16} className="mr-2" />
                      {contactMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
