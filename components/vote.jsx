import { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import Cookies from 'js-cookie';

const Vote = ({ contestants }) => {
  const [currentContestantIndex, setCurrentContestantIndex] = useState(0);
  const [selectedRating, setSelectedRating] = useState(null);
  const [votingData, setVotingData] = useState([]);
  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);

  useEffect(() => {
    // Check voting status and manage 'alreadyVoted' cookie
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/votingstatus`)
      .then(response => {
        let datax = response?.data?.[0] ?? null;
        if (datax) {
          setVotingStatus(datax.status);
          if (datax.status && Cookies.get('alreadyvoted')) {
            setAlreadyVoted(true);
          }
        } else {
          Cookies.remove('alreadyvoted');
        }
      })
      .catch(error => console.error('Error fetching voting status:', error));
  }, []);
  

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  const handleNext = () => {
    if (selectedRating === null) return;

    const currentContestant = contestants[currentContestantIndex];
    setVotingData(prevData => [
      ...prevData,
      { contestantId: currentContestant._id, rating: selectedRating }
    ]);
    setSelectedRating(null);
    setCurrentContestantIndex(currentContestantIndex + 1);
  };

  const handleSubmitVote = () => {
    if (alreadyVoted) {
      alert('You have already cast your vote.');
      return;
    }
  
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/castvote`, votingData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.status === 200) {
        Cookies.set('alreadyvoted', 'true');
        setAlreadyVoted(true);
        alert('Your vote has been successfully submitted.');
      }
    })
    .catch(error => console.error('Error submitting vote:', error));
  };
  

  if (!votingStatus) {
    return <div>Voting is not open at this time.</div>;
  }

  const currentContestant = contestants[currentContestantIndex];
  const isLastContestant = currentContestantIndex === contestants.length - 1;

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-sm p-2 bg-white rounded-lg shadow-lg">
        <div className="p-2 mt-1 bg-white rounded-lg shadow-lg">
          <h2 className="text-gray-800 text-center font-bold text-[1.8rem] mb-3">
            GAIL’s Got Talent 2024
          </h2>
          <div className="flex flex-row items-center justify-evenly w-full">
            <Avatar className="w-24 h-24 mb-4 border border-gray-300 rounded-full">
              <AvatarImage src={currentContestant.image} alt={currentContestant.name} />
              <AvatarFallback>{currentContestant.name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-lg font-semibold">{currentContestant.name}</div>
          </div>
          <div className="mt-6 text-center">
            <p>{currentContestant.artForm}</p>
            <p>Please cast your vote on a scale of 1 to 10, with 1 being the worst and 10 being the best.</p>
            <div className="grid grid-cols-5 gap-2 mt-4">
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
            {isLastContestant ? (
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
      </div>
    </div>
  );
};

export default Vote;
