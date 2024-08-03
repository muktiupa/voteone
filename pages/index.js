import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import { Preloader } from "@/components/preloader";

export default function Home() {
  return (
   <Preloader/>
  );
}
