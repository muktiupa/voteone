import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Register() {
  const [value, setValue] = useState(50)
  const instructions = [
    "Slide to the left",
    "Slide to the right",
    "Slide up",
    "Slide down",
    "Slide diagonally",
    "Slide in a circle",
    "Slide with your eyes closed",
    "Slide to the beat of the music",
    "Slide like a robot",
    "Slide like a dancer",
  ]
  const randomInstruction = instructions[Math.floor(Math.random() * instructions.length)]
  const [showNextComponent, setShowNextComponent] = useState(false)
  const handleNextClick = () => {
    setShowNextComponent(true)
  }
  return (
    (<div
      className="flex flex-col items-center justify-between min-h-screen bg-white p-4">
      <div className="flex justify-end w-full">
        <span className="text-sm text-gray-500" />
      </div>
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Register</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="email" className="block font-medium mb-1">
                Email or Mobile
              </label>
              <input
                type="text"
                id="email"
                placeholder="Enter your email or mobile"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Register
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-col items-center w-full">
        <div className="flex items-center space-x-1 mb-4">
          <span className="block w-2 h-2 bg-gray-300 rounded-full" />
          <span className="block w-2 h-2 bg-blue-500 rounded-full" />
          <span className="block w-2 h-2 bg-gray-300 rounded-full" />
        </div>
        <Button onClick={handleNextClick} className="w-full max-w-xs">
          Next
        </Button>
      </div>
      {showNextComponent && <div />}
    </div>)
  );
}
