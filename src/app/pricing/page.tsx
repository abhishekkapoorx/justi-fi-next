import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing - JustiFi",
  description: "Choose the perfect plan for your legal practice. Flexible pricing options for individuals and teams.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the plan that fits your practice. All plans include our core AI-powered case management features.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <Card className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Starter</CardTitle>
                  <Badge variant="secondary">Most Popular</Badge>
                </div>
                <CardDescription>
                  Perfect for solo practitioners and small firms
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Up to 10 active cases</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">AI-powered case analysis</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Document management</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Basic citation generation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Email support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Advanced analytics</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">API access</span>
                  </li>
                </ul>
                <Button className="w-full">Get Started</Button>
              </CardContent>
            </Card>

            {/* Professional Plan */}
            <Card className="relative border-primary">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">Recommended</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Professional</CardTitle>
                <CardDescription>
                  Ideal for growing law firms and teams
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$79</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Up to 50 active cases</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">AI-powered case analysis</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Advanced document management</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Smart citation generation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Team collaboration tools</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Advanced analytics</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Priority support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">API access</span>
                  </li>
                </ul>
                <Button className="w-full">Get Started</Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="relative">
              <CardHeader>
                <CardTitle className="text-xl">Enterprise</CardTitle>
                <CardDescription>
                  For large firms with custom needs
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Unlimited cases</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">AI-powered case analysis</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Enterprise document management</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Advanced citation generation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Full team collaboration</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Custom analytics dashboard</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Full API access</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Dedicated support</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Compare Features</h2>
            <p className="text-lg text-muted-foreground">
              See what's included in each plan
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold">Features</th>
                  <th className="text-center p-4 font-semibold">Starter</th>
                  <th className="text-center p-4 font-semibold">Professional</th>
                  <th className="text-center p-4 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b">
                  <td className="p-4">Active Cases</td>
                  <td className="p-4 text-center">10</td>
                  <td className="p-4 text-center">50</td>
                  <td className="p-4 text-center">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">AI Case Analysis</td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Document Management</td>
                  <td className="p-4 text-center">Basic</td>
                  <td className="p-4 text-center">Advanced</td>
                  <td className="p-4 text-center">Enterprise</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Team Collaboration</td>
                  <td className="p-4 text-center"><X className="w-4 h-4 text-gray-400 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">API Access</td>
                  <td className="p-4 text-center"><X className="w-4 h-4 text-gray-400 mx-auto" /></td>
                  <td className="p-4 text-center"><X className="w-4 h-4 text-gray-400 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Support</td>
                  <td className="p-4 text-center">Email</td>
                  <td className="p-4 text-center">Priority</td>
                  <td className="p-4 text-center">Dedicated</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about our pricing
            </p>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Can I change plans anytime?</h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Is there a free trial?</h3>
              <p className="text-muted-foreground">
                We offer a 14-day free trial for all plans. No credit card required to get started.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">What happens to my data if I cancel?</h3>
              <p className="text-muted-foreground">
                Your data remains accessible for 30 days after cancellation. You can export all your data during this period.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Do you offer discounts for annual billing?</h3>
              <p className="text-muted-foreground">
                Yes, we offer a 20% discount for annual billing on all paid plans.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Can I get a custom plan for my firm?</h3>
              <p className="text-muted-foreground">
                Absolutely! Contact our sales team to discuss custom pricing and features for your specific needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of legal professionals who trust JustiFi for their case management needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
