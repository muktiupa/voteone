import { useState, useEffect } from 'react';
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Preloader from "@/components/Preloader";
import Register from "@/components/Register";
import Vote from "@/components/Vote";
import VotingSuccess from "@/components/VotingSuccess";
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Home() {
  const isRegistration = process.env.NEXT_PUBLIC_USER_REGISTRATIION === 'true';
  const [contestants, setContestants] = useState(null);
  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [currentStep, setCurrentStep] = useState('preloader');
  const apiToken = process.env.NEXT_PUBLIC_APITOKEN;

  const getContestant = async () => {
    try {
      const response = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/contestants`,{
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

  const handleNext = () => {
    if (votingStatus) {
      setCurrentStep(isRegistration ? 'register' : 'vote');
    }
  };

  useEffect(() => {
    getContestant();
  }, []);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/votingstatus`,{
      headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiToken}`
              }
    })
      .then(response => {
        let datax = response?.data?.[0] ?? null;
        if (datax) {
          setVotingStatus(datax.status);
          if (datax.status && Cookies.get('alreadyvoted')) {
            setAlreadyVoted(true);
            setCurrentStep('votingsuccess');
          } else {
            setCurrentStep(votingStatus ? 'vote' : 'preloader');
          }
        } else {
          Cookies.remove('alreadyvoted');
          setCurrentStep('preloader');
        }
      })
      .catch(error => console.error('Error fetching voting status:', error));
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center bg-gray-100 min-h-[85vh]">
        <div className="w-full max-w-sm p-2 bg-white rounded-lg shadow-lg">
          <div className="p-2 mt-1 bg-white rounded-lg shadow-lg">
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
    </>
  );
}
