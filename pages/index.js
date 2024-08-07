import { useState, useEffect } from 'react';
// import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Preloader from "@/components/Preloader";
import Register from "@/components/Register";
import Vote from "@/components/Vote";
import VotingSuccess from "@/components/VotingSuccess";
import axios from 'axios';
import Cookies from 'js-cookie';
import NeoHeader from '@/components/ui/NeoHeader';
import Header from '@/components/ui/Header';

export default function Home() {
  const isRegistration = process.env.NEXT_PUBLIC_USER_REGISTRATIION === 'true';
  const [contestants, setContestants] = useState(null);
  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [votingStatus, setVotingStatus] = useState(false);
  const [currentStep, setCurrentStep] = useState('preloader');
  const apiToken = process.env.NEXT_PUBLIC_APITOKEN;

  const getContestant = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/contestants`,{
        headers:{
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${apiToken}`
                }
      });

      setContestants(response.data);
    } catch (error) {
      console.error('Error fetching contestants:', error);
    }
  };

  const handleBack = () => {
    if (currentStep === 'register') {
      setCurrentStep('preloader');
    } else if (currentStep === 'vote') {
      setCurrentStep(isRegistration ? 'register' : 'preloader');
    }
  };


  const handleNext = async() => {
    let statuscheck = await votingStatuscheck();
 
    if (statuscheck) {
      setCurrentStep(isRegistration ? 'register' : 'vote');
     
    }else{
      alert("Voting lines are close Now.");
      setCurrentStep('preloader');
    }
  };

  useEffect(() => {
    getContestant();
  }, []);

  const votingStatuscheck = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/votingstatus`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiToken}`
        }
      });
  
      let datax = response?.data?.[0] ?? null;
      if (datax) {
        if (datax.status) {
          if (datax.status && Cookies.get('alreadyvoted')) {
            setAlreadyVoted(true);
            setCurrentStep('votingsuccess');
          } else {
            setCurrentStep(datax.status ? 'vote' : 'preloader');
          }
          setVotingStatus(datax.status);
          return datax.status;
        } else {
          Cookies.remove('alreadyvoted');
          setCurrentStep('preloader');
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error fetching voting status:', error);
      return false;
    }
  };

 useEffect(()  =>{
votingStatuscheck();
if(alreadyVoted){

  setCurrentStep('votingsuccess');
}

  },[alreadyVoted]);

  return (
    <div className='max-w-[450px]'>
    <div className=" relative max-h-[100vh] h-[90vh] w-full">
      {currentStep === "preloader" || currentStep === "votingsuccess" ? <Header /> : <NeoHeader/>}
      <div className="flex flex-col items-center justify-center bg-gray-100 h-[60vh]">
        <div className="w-full h-full max-w-sm bg-white">
          <div className="flex flex-1 items-center justify-center">
            {currentStep === 'preloader' && <Preloader votingStatus={votingStatus} goNext={handleNext} />}
            {currentStep === 'register' && <Register goBack={handleBack} apiToken={apiToken} />}
            {currentStep === 'vote' && (
              <Vote
                contestants={contestants}
                alreadyVoted={alreadyVoted}
                setAlreadyVoted={setAlreadyVoted}
                goBack={handleBack}
                apiToken={apiToken}
              />
            )}
            {currentStep === 'votingsuccess' && <VotingSuccess />}
          </div>
        </div>
      </div>
      <Footer />
    </div>
    </div>
  );
}
