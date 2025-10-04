import OneStop from "@/components/Home/OneStop";
import Optimize from "@/components/Home/Optimize";
import WhyPartner from "@/components/Home/WhyPartner";
import ManageTax from "@/components/Home/ManageCases";
import WhoWeHelp from "@/components/Home/WhoWeHelp";
import HomeHero from "@/components/Home/HomeHero";
import Tools from "@/components/Home/Tools";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex flex-col">
        <HomeHero />
        <Tools />
        <WhoWeHelp />
        <ManageTax />
        <OneStop />
        <WhyPartner />
        <Optimize />
      </main>
    </div>
  );
}
