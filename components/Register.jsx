import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Register() {
  const [showNextComponent, setShowNextComponent] = useState(false)
  const handleNextClick = () => {
    setShowNextComponent(true)
  }
  return (
    (<div
      className="flex flex-col items-center justify-between min-h-[85vh] bg-white p-4">
    
      <div className="flex flex-col items-center justify-center flex-1 w-[100%]">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-10">User Registration</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-medium mb-1 text-gray-400">
                Your Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="email" className="block font-medium mb-1  text-gray-400">
                Email or Mobile
              </label>
              <input
                type="text"
                id="email"
                placeholder="Enter your email or mobile"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </form>
         
        <Button onClick={handleNextClick} className="w-full mt-10">
          Next
        </Button>
     
        </div>
       
      </div>
    </div>)
  );
}
