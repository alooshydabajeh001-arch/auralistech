import { type Product, type InsertProduct, type BlogPost, type InsertBlogPost, type ContactSubmission, type NewsletterSubscription } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Blog Posts
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostsByCategory(category: string): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;

  // Contact
  createContactSubmission(submission: ContactSubmission): Promise<ContactSubmission>;

  // Newsletter
  createNewsletterSubscription(subscription: NewsletterSubscription): Promise<NewsletterSubscription>;
}

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private blogPosts: Map<string, BlogPost>;
  private contactSubmissions: Map<string, ContactSubmission>;
  private newsletterSubscriptions: Map<string, NewsletterSubscription>;

  constructor() {
    this.products = new Map();
    this.blogPosts = new Map();
    this.contactSubmissions = new Map();
    this.newsletterSubscriptions = new Map();

    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample products
    const sampleProducts: Product[] = [
      {
        id: "1",
        name: "MacBook Pro 16\" M3 Max",
        description: "Supercharged for pros with the powerful M3 Max chip, 18-hour battery life, and stunning Liquid Retina XDR display.",
        price: "3499.00",
        originalPrice: "3999.00",
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Computing",
        affiliateUrl: "https://amazon.com/dp/example1",
        rating: "4.9",
        reviewCount: 1247,
        featured: true,
        badge: "Editor's Choice",
        discountPercentage: 12,
        createdAt: new Date(),
      },
      {
        id: "2",
        name: "Apple Watch Ultra 2",
        description: "The most rugged and capable Apple Watch ever. Built for adventure with precision GPS and extended battery life.",
        price: "799.00",
        originalPrice: "849.00",
        image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Wearable Tech",
        affiliateUrl: "https://amazon.com/dp/example2",
        rating: "4.8",
        reviewCount: 892,
        featured: true,
        badge: "Trending",
        discountPercentage: 6,
        createdAt: new Date(),
      },
      {
        id: "3",
        name: "Philips Hue Sync Box",
        description: "Transform your entertainment experience with immersive lighting that syncs to your content in real-time.",
        price: "229.00",
        originalPrice: "279.00",
        image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Smart Home",
        affiliateUrl: "https://amazon.com/dp/example3",
        rating: "4.6",
        reviewCount: 543,
        featured: true,
        badge: "New",
        discountPercentage: 18,
        createdAt: new Date(),
      },
      {
        id: "4",
        name: "OpenAI GPT-4 Turbo API",
        description: "Access the most advanced AI language model with enhanced capabilities for complex reasoning and coding tasks.",
        price: "20.00",
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "AI Tools",
        affiliateUrl: "https://platform.openai.com/api-keys",
        rating: "4.9",
        reviewCount: 2341,
        featured: true,
        badge: "AI Powered",
        discountPercentage: null,
        createdAt: new Date(),
      },
      {
        id: "5",
        name: "AirPods Pro (3rd Gen)",
        description: "Advanced Active Noise Cancellation, Adaptive Transparency, and personalized Spatial Audio for the ultimate listening experience.",
        price: "249.00",
        originalPrice: "279.00",
        image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Mobile",
        affiliateUrl: "https://amazon.com/dp/example5",
        rating: "4.8",
        reviewCount: 1876,
        featured: true,
        badge: "Best Seller",
        discountPercentage: 11,
        createdAt: new Date(),
      },
      {
        id: "6",
        name: "ASUS ROG Gaming Desktop",
        description: "Ultimate gaming performance with RTX 4080, Intel i9-13900K, 32GB DDR5 RAM, and liquid cooling system.",
        price: "2499.00",
        originalPrice: "2999.00",
        image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "Computing",
        affiliateUrl: "https://amazon.com/dp/example6",
        rating: "4.7",
        reviewCount: 432,
        featured: true,
        badge: "Limited Time",
        discountPercentage: 17,
        createdAt: new Date(),
      },
    ];

    // Sample blog posts
    const sampleBlogPosts: BlogPost[] = [
      {
        id: "1",
        title: "iPhone 15 Pro Max: The Ultimate Camera Phone Review",
        excerpt: "After two weeks of intensive testing, we dive deep into Apple's flagship phone features, camera capabilities, and whether it's worth the upgrade.",
        content: "Full blog post content would go here...",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Reviews",
        author: "John Doe",
        authorInitials: "JD",
        readTime: "5 min read",
        published: true,
        createdAt: new Date("2023-12-15"),
      },
      {
        id: "2",
        title: "MacBook Air vs Pro: Which Should You Buy in 2024?",
        excerpt: "Comprehensive comparison covering performance, price, battery life, and use cases to help you make the right choice for your needs.",
        content: "Full blog post content would go here...",
        image: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Comparisons",
        author: "Sarah Miller",
        authorInitials: "SM",
        readTime: "8 min read",
        published: true,
        createdAt: new Date("2023-12-12"),
      },
      {
        id: "3",
        title: "Complete Guide to Smart Home Automation for Beginners",
        excerpt: "Step-by-step guide to building your first smart home setup, from choosing devices to automation routines and security considerations.",
        content: "Full blog post content would go here...",
        image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "How-to Guides",
        author: "Mike Rodriguez",
        authorInitials: "MR",
        readTime: "12 min read",
        published: true,
        createdAt: new Date("2023-12-10"),
      },
    ];

    // Initialize data
    sampleProducts.forEach(product => this.products.set(product.id, product));
    sampleBlogPosts.forEach(post => this.blogPosts.set(post.id, post));
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values())
      .filter(product => product.featured)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values())
      .filter(product => product.category === category)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct, 
      id,
      createdAt: new Date()
    };
    this.products.set(id, product);
    return product;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.published)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.published && post.category === category)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const post = this.blogPosts.get(id);
    return post?.published ? post : undefined;
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const post: BlogPost = { 
      ...insertPost, 
      id,
      createdAt: new Date()
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async createContactSubmission(submission: ContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    const contactSubmission: ContactSubmission = { 
      ...submission, 
      id,
      createdAt: new Date()
    };
    this.contactSubmissions.set(id, contactSubmission);
    return contactSubmission;
  }

  async createNewsletterSubscription(subscription: NewsletterSubscription): Promise<NewsletterSubscription> {
    const id = randomUUID();
    const newsletterSubscription: NewsletterSubscription = { 
      ...subscription, 
      id,
      createdAt: new Date()
    };
    this.newsletterSubscriptions.set(id, newsletterSubscription);
    return newsletterSubscription;
  }
}

export const storage = new MemStorage();
