const Preloader = ({ goNext }) => {
  return (
    <>
      
      <div className="flex flex-col items-center justify-evenly w-full">
       
        <img src="/ggt_preloder_img.svg" alt="Logo" />
        <h3 className="text-gray-800 text-center font-bold text-[1.2rem] mb-2 pt-9">
        GAIL’s Got Talent 2024
      </h3>
          <h5 className="text-center">Click the <strong>'Next'</strong> button to start voting for your favorite candidate.</h5>
      
       
          <button
            className="inline-flex mt-5 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full max-w-xs"
            onClick={goNext}
          >
            Next
          </button>
        
      </div>
    </>
  );
};

export default Preloader;
