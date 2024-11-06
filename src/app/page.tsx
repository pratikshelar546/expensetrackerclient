import Feature from "@/components/LandingPage/Feature";
import MainPage from "@/components/MainPage";
import CustomProvider from "@/CustomProvider/CustomProvider";
import { Suspense } from "react";
export default function Home() {
  return (
    <>
      <Suspense fallback={<p className="text-white">Loading Main page...</p>}>
        <CustomProvider>
          <MainPage />
          <Feature/>
        </CustomProvider>
      </Suspense>
    </>
  );
}
