import React from "react";
import help1 from "../../../public/help1.svg";
import help2 from "../../../public/help2.svg";
import help3 from "../../../public/help3.svg";
import help4 from "../../../public/help4.svg";
import Image, { StaticImageData } from "next/image";
import { Card, CardContent } from "@/components/ui/card";

function WhoWeHelp() {
  const content = [
    {
      img: help1,
      heading: "Solo Attorneys",
      description:
        "Automate your case research—capture facts, generate arguments with citations, and draft filings in minutes.",
    },
    {
      img: help2,
      heading: "Small Law Firms",
      description:
        "Collaborate seamlessly: share case memory across teams, track opposing arguments, and produce court-ready docs together.",
    },
    {
      img: help3,
      heading: "In-House Counsel",
      description:
        "Manage corporate matters efficiently—store precedents, build compliance cases conversationally, and streamline filings.",
    },
    {
      img: help4,
      heading: "Legal Aid Clinics",
      description:
        "Serve clients faster: gather client stories, structure pro bono cases, and produce evidence-backed briefs with ease.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Who <span className="text-primary">We Help?</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              JustiFi serves legal professionals across all practice areas and firm sizes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {content.map((data, index) => (
              <ContentCard
                key={index}
                heading={data.heading}
                img={data.img}
                description={data.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const ContentCard = ({
  heading,
  img,
  description,
}: {
  heading: string;
  img: StaticImageData;
  description: string;
}) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          {/* Image */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-primary/10 rounded-full flex items-center justify-center">
              <Image
                src={img}
                alt={heading}
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
              />
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
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

export default WhoWeHelp;
