const VotingSuccess=()=>{

    return(   
              <>
              <div>
              <video autoPlay loop muted  className="w-full absolute left-0 top-[30%] ">
        <source src="/gliter.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
              <h2 className="text-gray-800 text-center font-bold text-[1.5rem] mb-3">
                GAIL’s Got Talent 2024
              </h2>
              <div className="flex flex-col items-center justify-evenly w-full h-[50vh]">
              <img src="/ggt_preloder_img.svg" alt="Logo" />
                  <h2 className="text-green-400 text-center font-bold text-[1.2rem]">Congratulations! You have successfully submitted your vote!</h2>
              </div> 
              </div>
              </>
         )
    
    }
    
    export default VotingSuccess;