import { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import Cookies from 'js-cookie';

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
    if (selectedRating === null) return;
    if (!contestants) return;
    const currentContestant = contestants[currentContestantIndex];
    setVotingData(prevData => [
      ...prevData,
      { contestantId: currentContestant._id, rating: selectedRating }
    ]);
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

    axios.post(`${apiToken}/castvote`, votingData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_APITOKEN}`
      }
    })
      .then(response => {
        if (response.status === 200) {
          Cookies.set('alreadyvoted', 'true');
          setAlreadyVoted(true);
          alert('Your vote has been successfully submitted.');
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
      <h2 className="text-gray-800 text-center font-bold text-[1.8rem] mb-3">
        GAIL’s Got Talent 2024
      </h2>
      {currentContestant &&
        <div className="flex flex-row items-center justify-evenly w-full">
          <Avatar className="w-24 h-24 mb-4 border border-gray-300 rounded-full">
            {currentContestant?.image && <AvatarImage src={currentContestant?.image} alt={currentContestant.name} />}
            <AvatarFallback>{currentContestant?.name ?? ''}</AvatarFallback>
          </Avatar>
          <div className="text-lg font-semibold">{currentContestant.name}</div>
        </div>
      }
      <div className="mt-6 text-center">
        <p>{currentContestant?.artForm ?? ''}</p>
        <p>Please cast your vote on a scale of 1 to 10, with 1 being the worst and 10 being the best.</p>
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
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
      <div className="flex justify-between mt-6">
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
    </>
  );
};

export default Vote;
