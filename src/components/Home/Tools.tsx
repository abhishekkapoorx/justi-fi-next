import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import chat from "../../../public/chat.png";

function Tools() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                We have dedicated tools & support built for{" "}
                <span className="text-primary">
                  legal professionals
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Managing case prep after hours? We get it. Our AI manager converses with you, 
                gathers key facts, tracks citations, and drafts court-ready documents in minutes.
              </p>
              
              {/* Feature Cards */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <Card className="p-4">
                  <CardContent className="p-0">
                    <h3 className="font-semibold text-foreground mb-2">AI-Powered Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Intelligent case analysis with citation tracking
                    </p>
                  </CardContent>
                </Card>
                <Card className="p-4">
                  <CardContent className="p-0">
                    <h3 className="font-semibold text-foreground mb-2">Document Generation</h3>
                    <p className="text-sm text-muted-foreground">
                      Court-ready documents in minutes
                    </p>
                  </CardContent>
                </Card>
                <Card className="p-4">
                  <CardContent className="p-0">
                    <h3 className="font-semibold text-foreground mb-2">Case Memory</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete case history and precedents
                    </p>
                  </CardContent>
                </Card>
                <Card className="p-4">
                  <CardContent className="p-0">
                    <h3 className="font-semibold text-foreground mb-2">24/7 Support</h3>
                    <p className="text-sm text-muted-foreground">
                      Available whenever you need assistance
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md lg:max-w-lg">
                <Image
                  src={chat}
                  alt="AI Legal Assistant Chat Interface"
                  className="w-full h-auto object-contain rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Tools;
