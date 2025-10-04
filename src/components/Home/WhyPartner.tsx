import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Partner1 from "../../../public/Partner1.svg";
import Partner2 from "../../../public/Partner2.svg";
import Partner3 from "../../../public/Partner3.svg";

function WhyPartner() {
  const partners = [
    {
      img: Partner1,
      heading: "Expert Counsel",
      description:
        "Tap into AI-driven legal insights and structured arguments backed by concrete citations.",
      link: "/features#expert-counsel",
    },
    {
      img: Partner2,
      heading: "Case Automation",
      description:
        "Automate fact-gathering, opposing arguments, and draft court documents in minutes.",
      link: "/features#case-automation",
    },
    {
      img: Partner3,
      heading: "End-to-End Management",
      description:
        "Track deadlines, schedule hearings conversationally, and keep all case memory in one place.",
      link: "/features#case-management",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              <span className="text-primary">Why Partner</span> with JustiFi?
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
              Join thousands of legal professionals who trust JustiFi for their case management needs
            </p>
          </div>
          
          {/* Partner Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {partners.map((partner, index) => (
              <PartnerCard
                key={index}
                img={partner.img}
                heading={partner.heading}
                description={partner.description}
                link={partner.link}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const PartnerCard = ({
  img,
  heading,
  description,
  link,
}: {
  img: StaticImageData;
  heading: string;
  description: string;
  link: string;
}) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
      <CardContent className="p-6 md:p-8 text-center h-full flex flex-col justify-center">
        <div className="space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
              <Image
                src={img}
                alt={heading}
                className="w-8 h-8 md:w-10 md:h-10 object-contain"
              />
            </div>
          </div>
          
          {/* Content */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              {heading}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WhyPartner;
