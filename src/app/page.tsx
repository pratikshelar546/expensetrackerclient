import Feature from "@/components/LandingPage/Feature";
import MainPage from "@/components/MainPage";
import CustomProvider from "@/CustomProvider/CustomProvider";
import { Suspense } from "react";
export default function Home() {

  return (
    <>
      <CustomProvider>
        <MainPage />
        <Feature />
      </CustomProvider>
    </>
  );
}
