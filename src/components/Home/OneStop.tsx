import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import oneStop from "../../../public/oneStop.svg";

function OneStop() {
  const content = [
    "Conversational Case Building—capture key facts through guided dialogue.",
    "AI-Powered Argument Drafting—generate supporting & opposing arguments with citations.",
    "Document Generation—produce court-ready filings in minutes.",
    "Memory Retrieval—access past case details and precedents instantly.",
    "Meeting Scheduling—set up hearings and client consults with a simple prompt.",
    "Opposition Analysis—identify counterarguments and case weaknesses.",
    "Filing Support—prepare and manage court documents seamlessly.",
    "Ongoing Case Management—track deadlines, updates, and case progress.",
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Introducing Your One-Stop{" "}
              <span className="text-primary">Litigation Management Suite</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              We help legal professionals streamline case workflows, automate drafting, and maintain complete case memory{" "}
              <span className="block sm:inline mt-2 sm:mt-0">
                with our all-in-one litigation management platform—available whenever you need it!
              </span>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Feature Grid */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {content.map((text, idx) => (
                  <Card key={idx} className="hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {text}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Illustration */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg">
                <Image
                  src={oneStop}
                  alt="Legal case management platform"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OneStop;
