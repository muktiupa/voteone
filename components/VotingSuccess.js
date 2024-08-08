
const VotingSuccess=()=>{

    return(   
              <>
              <div style={{ backgroundImage: 'url("/confeti.gif")', backgroundRepeat: 'repeat' }} >
              <h2 className="text-gray-800 text-center font-bold text-[1.5rem] mb-3">
                GAIL’s Got Talent 2024
              </h2>
              <div className="flex flex-col items-center justify-evenly w-full h-[50vh]">
              <img src="/ggt_preloder_img.webp" alt="Logo" />
                  <h2 className="text-green-400 text-center font-bold text-[1.2rem]">Congratulations! You have successfully submitted your vote!</h2>
              </div> 
              {/* gliter part */}
              </div>
              </>
         )
    
    }
    
    export default VotingSuccess;