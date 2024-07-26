import MainPage from "@/components/MainPage";
import CustomProvider from "@/CustomProvider/CustomProvider";
import Image from "next/image";
export default function Home() {
  return (
    <>
      <CustomProvider>
        <MainPage />
      </CustomProvider>
    </>
  );
}
