import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - JustiFi",
  description: "Learn about JustiFi's mission to revolutionize legal case management with AI-powered solutions.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              About JustiFi
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're revolutionizing legal case management with AI-powered solutions that make justice more accessible, efficient, and effective for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                To democratize access to legal services by providing intelligent, AI-powered tools that help legal professionals and individuals build stronger cases, streamline workflows, and achieve better outcomes.
              </p>
              <p className="text-lg text-muted-foreground">
                We believe that everyone deserves access to quality legal representation and that technology can bridge the gap between complex legal processes and practical solutions.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-2xl">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-medium">AI-Powered Case Analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-medium">Intelligent Document Management</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-medium">Automated Citation Generation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-medium">Real-time Legal Insights</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Accuracy</h3>
              <p className="text-muted-foreground">
                We ensure our AI systems provide precise, reliable legal analysis and recommendations.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Efficiency</h3>
              <p className="text-muted-foreground">
                Our tools streamline legal workflows, saving time and resources for better case outcomes.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Security</h3>
              <p className="text-muted-foreground">
                We maintain the highest standards of data protection and client confidentiality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-lg text-muted-foreground">
              Legal experts and technology innovators working together
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-center mb-2">Legal Experts</h3>
              <p className="text-muted-foreground text-center">
                Experienced attorneys and legal professionals who understand the complexities of case management.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-center mb-2">AI Engineers</h3>
              <p className="text-muted-foreground text-center">
                Machine learning specialists building intelligent systems for legal applications.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-center mb-2">Product Designers</h3>
              <p className="text-muted-foreground text-center">
                UX/UI experts creating intuitive interfaces for complex legal workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Legal Practice?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of legal professionals who trust JustiFi for their case management needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/pricing" 
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              View Pricing
            </a>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
