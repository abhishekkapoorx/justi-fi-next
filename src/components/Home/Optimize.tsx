import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import bolt from "../../../public/bolt.svg";
import Link from "next/link";

function Optimize() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 border-primary/20">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="space-y-8">
                {/* Icon */}
                <div className="flex justify-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/20 rounded-full flex items-center justify-center">
                    <Image
                      src={bolt}
                      alt="Lightning bolt - Speed and efficiency"
                      className="w-8 h-8 md:w-10 md:h-10 object-contain"
                    />
                  </div>
                </div>
                
                {/* Content */}
                <div className="space-y-6">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                    Optimize your case strategy{" "}
                    <span className="block sm:inline mt-2 sm:mt-0">
                      effortlessly with JustiFi.
                    </span>
                  </h1>
                  
                  <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                    Join thousands of legal professionals who have transformed their practice with our AI-powered platform.
                  </p>
                </div>
                
                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="px-8 py-6 text-lg">
                    <Link href="/dashboard">
                      Start Building Now
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg">
                    <Link href="/pricing">
                      View Pricing
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Optimize;
