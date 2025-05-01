import OneStop from "@/components/Home/OneStop";
import Optimize from "@/components/Home/Optimize";
import WhyPartner from "@/components/Home/WhyPartner";
import ManageTax from "@/components/Home/ManageCases";
import WhoWeHelp from "@/components/Home/WhoWeHelp";
import HomeHero from "@/components/Home/HomeHero";
import Tools from "@/components/Home/Tools";
import Faqs from "@/components/Home/Faqs";
import Testimonials from "@/components/Home/Testimonials";
import Pricing from "@/components/Home/Pricing";
import Blog from "@/components/Home/Blog"
export default function Home() {
  return (
    <div className="">
      <HomeHero />
      <Tools />
      <WhoWeHelp />
      <ManageTax />
      <OneStop />
      <WhyPartner />
      {/* <Testimonials /> */}
      {/* <Pricing /> */}
      {/* <Blog/> */}
      {/* <Faqs /> */}
      <Optimize />
    </div>
  );
}
