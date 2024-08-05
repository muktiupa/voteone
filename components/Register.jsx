import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Register({ goBack }) {
  const [showNextComponent, setShowNextComponent] = useState(false);

  const handleNextClick = () => {
    setShowNextComponent(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-gray-800 text-center font-bold text-[1.8rem] mb-3">User Registration</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium mb-1 text-gray-400">
            Your Full Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium mb-1 text-gray-400">
            Email or Mobile
          </label>
          <input
            type="text"
            id="email"
            placeholder="Enter your email or mobile"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </form>
      <div className="flex justify-between mt-10">
        <Button onClick={goBack} className="btn btn-back">
          Back
        </Button>
        <Button onClick={handleNextClick} className="btn btn-next ml-auto">
          Next
        </Button>
      </div>
    </div>
  );
}
