import { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import Cookies from 'js-cookie';
// import defaultAvatar from '../public/avatar.png'

const Vote = ({ contestants, alreadyVoted, setAlreadyVoted, goBack , apiToken }) => {
  const [currentContestantIndex, setCurrentContestantIndex] = useState(0);
  const [selectedRating, setSelectedRating] = useState(null);
  const [votingData, setVotingData] = useState([]);
  const [currentContestant, setCurrentContestant] = useState(null);
  const [isLastContestant, setIsLastContestant] = useState(null);


  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  const handleNext = () => {
    if (selectedRating === null || !contestants) return;
  
    const currentContestant = contestants[currentContestantIndex];
  
    setVotingData(prevData => {
      const existingEntryIndex = prevData.findIndex(
        entry => entry.contestantId === currentContestant._id
      );
  
      if (existingEntryIndex !== -1) {
        // Update existing entry
        const updatedData = [...prevData];
        updatedData[existingEntryIndex].rating = selectedRating;
        return updatedData;
      } else {
        // Add new entry
        return [
          ...prevData,
          { contestantId: currentContestant._id, rating: selectedRating }
        ];
      }
    });
    setSelectedRating(null);
    setCurrentContestantIndex(currentContestantIndex + 1);
    setCurrentContestant(contestants[currentContestantIndex + 1]);
  
  };



  const handleBackClick = () => {
    if (currentContestantIndex > 0) {
      setCurrentContestantIndex(currentContestantIndex - 1);
      setCurrentContestant(contestants[currentContestantIndex - 1]);
      setSelectedRating(null);
    } else {
      goBack(); // Call the goBack function passed from the parent component
    }
  };

  const handleSubmitVote = () => {
    if (alreadyVoted) {
      alert('You have already cast your vote.');
      return;
    }
 
    const currentContestant = contestants?.[currentContestantIndex] ?? null;

    if(!selectedRating && !currentContestant){
      alert('Select a rating before submit.');
      return;
    }

    let finalvotingdata = [...votingData,{ contestantId: currentContestant._id, rating: selectedRating }];
    

   
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/castvote`, finalvotingdata, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_APITOKEN}`
      }
    })
      .then(response => {
        if (response.status === 201) {
          Cookies.set('alreadyvoted', 'true');
          setAlreadyVoted(true);
          alert('Congratulations! Your vote has been submitted successfully. Thanks for your contribution.');
        }
      })
      .catch(error => {
                     console.error('Error submitting vote:', error);
                      let msg = error?.response?.data?.message ?? "Error Found";
                      alert(msg);
                     }
                    );
  };

  useEffect(() => {
    if (contestants) {
      setCurrentContestant(contestants[currentContestantIndex]);
      setIsLastContestant(contestants.length - 1);
    }
  }, [contestants, currentContestantIndex]);

  return (
    <>
    <div style={{background: "rgb(255 255 255)"}} className='voting--  absolute top-[15%] left-[auto]  z-50 w-[95%] p-6  shadow-md border-2 rounded-[33px]  mukti--'>
      <h2 className="text-gray-800 text-center font-bold text-[1.5rem] mb-3">
        GAIL’s Got Talent 2024
      </h2>
      {currentContestant &&
        <div className="flex flex-row items-center justify-center  w-full">
          <div className='w-30% flex justify-center pt-4'>
          <Avatar className="w-20 h-20 mb-2 border border-gray-300 rounded-[50%]  ">
          <img src={`/contestants/${currentContestant._id}.png`} alt="avater" className="w-[300px] overflow-hidden" />
          
          </Avatar>
          </div>
          <div className="text-lg p-5  font-semibold w-[70%]">
            <div>{currentContestant.name}</div>
            <div className='text-sm text-gray-300'>{currentContestant?.artForm ?? ''}</div>
          </div>
        </div>
      }
      <div className="mt-1 text-center">
        <p className='text-sm'>Please cast your vote on a scale of 0 to 10, with 0 being the worst and 10 being the best.</p>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
            <Button
              key={number}
              variant={selectedRating === number ? "default" : "outline"}
              className="w-full h-12"
              onClick={() => handleRatingClick(number)}
            >
              {number}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-3 gap-4">
        <Button
          variant="default"
          className="w-full"
          onClick={handleBackClick}
        >
          Back
        </Button>
        {isLastContestant === currentContestantIndex ? (
          <Button
            variant="default"
            className="w-full"
            onClick={handleSubmitVote}
            disabled={selectedRating === null}
          >
            Submit Vote
          </Button>
        ) : (
          <Button
            variant="default"
            className="w-full"
            onClick={handleNext}
            disabled={selectedRating === null}
          >
            Next
          </Button>
        )}
      </div>
      </div>
    </>
  );
};

export default Vote;
