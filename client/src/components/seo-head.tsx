import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
}

export default function SEOHead({
  title = "Auralis - Smart Tech for the Future",
  description = "Discover the latest AI devices, smart home gear, laptops, and cutting-edge tech products. Expert reviews and recommendations for tech enthusiasts.",
  keywords = "tech gadgets, AI devices, smart home, laptops, wearable tech, mobile accessories",
  ogImage = "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630",
  ogType = "website",
  canonical,
}: SEOHeadProps) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Set meta tags
    const metaTags = [
      { name: "description", content: description },
      { name: "keywords", content: keywords },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: ogType },
      { property: "og:image", content: ogImage },
      { property: "og:url", content: window.location.href },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ];

    // Remove existing meta tags and add new ones
    metaTags.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      const existingTag = document.querySelector(selector);
      
      if (existingTag) {
        existingTag.setAttribute("content", content);
      } else {
        const meta = document.createElement("meta");
        if (name) meta.setAttribute("name", name);
        if (property) meta.setAttribute("property", property);
        meta.setAttribute("content", content);
        document.head.appendChild(meta);
      }
    });

    // Set canonical URL if provided
    if (canonical) {
      let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalTag) {
        canonicalTag = document.createElement("link");
        canonicalTag.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute("href", canonical);
    }

    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Auralis",
      description: "Smart Tech for the Future",
      url: window.location.origin,
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.setAttribute("type", "application/ld+json");
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);
  }, [title, description, keywords, ogImage, ogType, canonical]);

  return null;
}
