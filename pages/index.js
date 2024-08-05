import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import { Preloader } from "@/components/preloader";
// import { Vote } from "lucide-react";
import { Register } from "@/components/Register";

export default function Home() {
  return (
    <>
   {/* <Preloader/> */}
   {/* <Vote/> */}
   <Register/>
   </>
  );
}
