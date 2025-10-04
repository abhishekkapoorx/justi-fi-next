import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import heroImg from "../../../public/hero1.svg";
import pattern from "../../../public/pattern.svg";

function HomeHero() {
  return (
    <section className="min-h-screen w-full bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-7xl mx-auto relative">
          {/* Background Effects */}
          <div className="absolute -z-30 bottom-0 left-0 w-[200px] md:w-[390px] h-[200px] md:h-[370px] blur-[100px] md:blur-[150px] rounded-full bg-primary/20"></div>
          <div className="absolute -z-30 top-0 right-0 w-[200px] md:w-[390px] h-[200px] md:h-[370px] blur-[100px] md:blur-[150px] rounded-full bg-primary/20"></div>
          
          {/* Pattern */}
          <Image
            src={pattern}
            alt="pattern"
            className="h-[300px] w-[300px] md:h-[400px] md:w-[400px] -z-20 absolute top-10 right-10 opacity-20"
          />
          
          {/* Content */}
          <div className="flex flex-col items-center text-center space-y-8 py-8 md:py-12">
            {/* Hero Image */}
            <div className="relative">
              <Image
                src={heroImg}
                alt="JustiFi Legal Case Management"
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain mx-auto"
              />
            </div>
            
            {/* Main Heading */}
            <div className="space-y-4 max-w-5xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
                JustiFi: Agentic Lawsuit Manager
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground">
                Build, Manage & File Your Cases Effortlessly
              </h2>
            </div>
            
            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Automate case construction through guided conversations, generate
              court-ready documents, and track arguments with solid citations.
              <br className="hidden sm:block" />
              <span className="block sm:inline mt-2 sm:mt-0">
                JustiFi keeps all your case memory in one place for seamless updates.
              </span>
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="w-full sm:w-auto px-8 py-6 text-lg">
                <Link href="/dashboard">
                  Get Started
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto px-8 py-6 text-lg">
                <Link href="/contact">
                  Talk to an Expert
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
