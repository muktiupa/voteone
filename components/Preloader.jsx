const Preloader = ({ goNext }) => {
  return (
    <>
      <h2 className="text-gray-800 text-center font-bold text-[1.8rem] mb-3">
        GAIL’s Got Talent 2024
      </h2>
      <div className="flex flex-col items-center justify-evenly w-full h-[70vh]">
        <div className="text-center">
          <h3>PreLoader  GAIL’s Got Talent 2024</h3>
        </div>
       
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={goNext}
          >
            Next
          </button>
        
      </div>
    </>
  );
};

export default Preloader;
