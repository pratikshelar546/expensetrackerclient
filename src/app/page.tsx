import MainPage from "@/components/MainPage";
import CustomProvider from "@/CustomProvider/CustomProvider";
export default function Home() {
  return (
    <>
      <CustomProvider>
        <MainPage />
      </CustomProvider>
    </>
  );
}
