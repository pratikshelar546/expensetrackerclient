import Feature from "@/components/LandingPage/Feature";
import HowITWorks from "@/components/LandingPage/HowITWorks";
import MainPage from "@/components/LandingPage/MainPage";
import CustomProvider from "@/CustomProvider/CustomProvider";
import { Suspense } from "react";
export default function Home() {

  return (
    <>
      <CustomProvider>
        <MainPage />
        <Feature />
        <HowITWorks />
      </CustomProvider>
    </>
  );
}
