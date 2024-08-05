import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { Inter } from "next/font/google";
import Vote from "@/components/Vote";
import {useState,useEffect} from "react";
const inter = Inter({ subsets: ["latin"] });
import { Register } from "@/components/Register";
import axios from "axios";

export default function Home() {

  const isRegistration = process.env.NEXT_PUBLIC_USER_REGISTRATIION;
  const [contestants,setContestants] = useState(null);
  
  const getContestant = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/contestants`);
      setContestants(response.data); // Assuming response.data contains the array of contestants
    } catch (error) {
      console.error('Error fetching contestants:', error);
    }
  };
useEffect(()=>{
  getContestant();

},[]);

  return (
    <>
    <Header/>
  {isRegistration && <Register/>}
   <Vote contestants = {contestants}/>
   <Footer/>
   </>
  );
}
