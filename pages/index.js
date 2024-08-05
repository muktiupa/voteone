import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { Inter } from "next/font/google";
import Vote from "@/components/Vote";

const inter = Inter({ subsets: ["latin"] });
import { Register } from "@/components/Register";

export default function Home() {

  const isRegistration = process.env.NEXT_PUBLIC_USER_REGISTRATIION;
  const contestants = [
    {
      _id: "66ace0b6dc7d3d725fe24e77",
      name: "Mukti Upadhyay",
      artForm: "Classical Dance",
      image: "/images/mukti.jpg"
    },
    {
      _id: "66ace0b6dc7d3d725fe24e78",
      name: "Raj Kumar",
      artForm: "Singing",
      image: "/images/raj.jpg"
    },
    {
      _id: "66ace0b6dc7d3d725fe24e79",
      name: "Simran Kaur",
      artForm: "Painting",
      image: "/images/simran.jpg"
    }
  ];
  

  return (
    <>
    <Header/>
  {isRegistration && <Register/>}
   <Vote contestants = {contestants}/>
   <Footer/>
   </>
  );
}
