import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import step1 from "../../../public/manage1.svg";
import step2 from "../../../public/manage2.svg";
import step3 from "../../../public/manage3.svg";
import { StaticImageData } from "next/image";

function ManageCase() {
  const steps = [
    {
      img: step1,
      title: "Discuss",
      description:
        "Start a guided conversation to capture all the essential facts and issues of your case.",
    },
    {
      img: step2,
      title: "Construct",
      description:
        "Generate structured arguments—supporting and opposing factors—complete with solid citations.",
    },
    {
      img: step3,
      title: "File & Track",
      description:
        "Draft court-ready documents and manage upcoming hearings and deadlines seamlessly.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute -z-50 w-[250px] md:w-[500px] bottom-0 h-[250px] md:h-[500px] rounded-full bg-primary/10 blur-[100px] md:blur-[150px]" />
      <div className="absolute -z-50 w-[250px] md:w-[500px] h-[250px] md:h-[500px] right-0 rounded-full bg-primary/10 blur-[100px] md:blur-[150px]" />
      <div className="absolute -z-50 w-[250px] md:w-[500px] h-[250px] md:h-[500px] right-1/3 rounded-full bg-primary/10 blur-[100px] md:blur-[150px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Build Your Case in{" "}
              <span className="text-primary">3 Simple Steps</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Our streamlined process makes case building efficient and comprehensive
            </p>
            <Button asChild size="lg" className="px-8 py-6 text-lg">
              <Link href="/dashboard">
                Start Building Now
              </Link>
            </Button>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step, idx) => (
              <StepCard
                key={idx}
                index={idx}
                img={step.img}
                title={step.title}
                description={step.description}
                isLast={idx === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const StepCard = ({
  index,
  img,
  title,
  description,
  isLast,
}: {
  index: number;
  img: StaticImageData;
  title: string;
  description: string;
  isLast: boolean;
}) => (
  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
    <CardContent className="p-6 md:p-8 text-center">
      {/* Step Number */}
      <div className="mb-6">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl md:text-3xl font-bold text-primary">
            {index + 1}
          </span>
        </div>
      </div>

      {/* Icon */}
      <div className="mb-6">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Image 
            src={img} 
            alt={title} 
            className="w-8 h-8 md:w-10 md:h-10 object-contain" 
          />
        </div>
      </div>

      {/* Content */}
      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </CardContent>
  </Card>
);

export default ManageCase;
