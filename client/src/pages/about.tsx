import { Card, CardContent } from "@/components/ui/card";
import SEOHead from "@/components/seo-head";
import { Target, Heart, Rocket } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <SEOHead 
        title="About Us - Auralis"
        description="Learn about Auralis mission to empower smart tech decisions. Discover our values, vision, and commitment to providing honest tech reviews and recommendations."
        keywords="about auralis, tech mission, tech values, expert reviews, technology guidance"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-50 mb-6">
            Empowering Smart Tech Decisions
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            At Auralis, we believe technology should enhance your life, not complicate it. 
            Our mission is to guide you through the ever-evolving tech landscape with expert insights, 
            honest reviews, and curated recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* About Content */}
          <div>
            {/* Mission & Values */}
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-tech-green-500/20 rounded-lg flex items-center justify-center mr-4">
                  <Target className="text-tech-green-500" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-50 mb-3">Our Mission</h3>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    To democratize access to cutting-edge technology by providing unbiased reviews, 
                    comprehensive guides, and expert recommendations that help everyone make informed decisions.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-tech-blue-500/20 rounded-lg flex items-center justify-center mr-4">
                  <Heart className="text-tech-blue-500" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-50 mb-3">Our Values</h3>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    Transparency, integrity, and user-first approach guide everything we do. 
                    We test products rigorously and share honest opinions to build trust with our community.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mr-4">
                  <Rocket className="text-purple-500" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-50 mb-3">Our Vision</h3>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    To become the most trusted source for tech recommendations globally, 
                    helping millions of people navigate the digital future with confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* About Image */}
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Modern tech workspace with multiple devices and clean setup" 
              className="rounded-2xl shadow-2xl w-full" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent rounded-2xl"></div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-slate-50 mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Card className="bg-slate-800/50 border-slate-700 text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-tech-green-500 mb-2">5M+</div>
                <div className="text-slate-400">Monthly Readers</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700 text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-tech-blue-500 mb-2">1000+</div>
                <div className="text-slate-400">Products Tested</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700 text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-tech-green-500 mb-2">500+</div>
                <div className="text-slate-400">Expert Reviews</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700 text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-tech-blue-500 mb-2">98%</div>
                <div className="text-slate-400">Satisfaction Rate</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-50 mb-6">Meet Our Team</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12">
            Our diverse team of tech enthusiasts, engineers, and writers work tirelessly to bring you 
            the most accurate and helpful technology insights.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Chen", role: "Chief Tech Officer", initials: "SC", color: "tech-green" },
              { name: "Marcus Rodriguez", role: "Senior Review Editor", initials: "MR", color: "tech-blue" },
              { name: "Aisha Patel", role: "AI & Innovation Lead", initials: "AP", color: "purple" },
            ].map((member) => (
              <Card key={member.name} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 ${
                    member.color === "tech-green" ? "bg-tech-green-500" :
                    member.color === "tech-blue" ? "bg-tech-blue-500" : "bg-purple-500"
                  }`}>
                    {member.initials}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-50 mb-2">{member.name}</h3>
                  <p className="text-slate-400">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-tech-green-500 to-tech-blue-500 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Explore?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join millions of tech enthusiasts who trust Auralis for their technology decisions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/products" className="bg-white text-slate-900 font-semibold py-3 px-8 rounded-lg hover:bg-slate-100 transition-colors">
              Browse Products
            </a>
            <a href="/blog" className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-slate-900 transition-colors">
              Read Our Blog
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
