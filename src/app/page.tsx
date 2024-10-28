import MainPage from "@/components/MainPage";
import CustomProvider from "@/CustomProvider/CustomProvider";
import { Suspense } from "react";
export default function Home() {
  return (
    <>
      <Suspense fallback={<p>Loading Main page...</p>}>
        <CustomProvider>
          <MainPage />
        </CustomProvider>
      </Suspense>
    </>
  );
}
