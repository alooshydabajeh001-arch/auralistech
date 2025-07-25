import { Link } from "wouter";
import { Facebook, Twitter, Youtube, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <h3 className="text-2xl font-bold text-tech-green-500">Auralis</h3>
            </div>
            <p className="text-slate-400 mb-6 max-w-md">
              Smart Tech for the Future. We help you navigate the digital world with expert reviews, 
              honest recommendations, and cutting-edge insights.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-tech-green-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-tech-green-500 transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-tech-green-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-tech-green-500 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-slate-50 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-slate-400 hover:text-tech-green-500 transition-colors">Home</Link></li>
              <li><Link href="/products" className="text-slate-400 hover:text-tech-green-500 transition-colors">Products</Link></li>
              <li><Link href="/blog" className="text-slate-400 hover:text-tech-green-500 transition-colors">Blog</Link></li>
              <li><Link href="/about" className="text-slate-400 hover:text-tech-green-500 transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-tech-green-500 transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold text-slate-50 mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><Link href="/products?category=Smart%20Home" className="text-slate-400 hover:text-tech-green-500 transition-colors">Smart Home</Link></li>
              <li><Link href="/products?category=Wearable%20Tech" className="text-slate-400 hover:text-tech-green-500 transition-colors">Wearable Tech</Link></li>
              <li><Link href="/products?category=AI%20Tools" className="text-slate-400 hover:text-tech-green-500 transition-colors">AI Tools</Link></li>
              <li><Link href="/products?category=Computing" className="text-slate-400 hover:text-tech-green-500 transition-colors">Computing</Link></li>
              <li><Link href="/products?category=Mobile" className="text-slate-400 hover:text-tech-green-500 transition-colors">Mobile</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © 2023 Auralis. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-tech-green-500 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-tech-green-500 text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-slate-400 hover:text-tech-green-500 text-sm transition-colors">Affiliate Disclosure</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
