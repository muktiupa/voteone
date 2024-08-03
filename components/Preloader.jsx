import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Preloader() {
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
        <img
          src="/placeholder.svg"
          alt="Gail's Got Talent"
          className="w-48 h-48"
          width="200"
          height="200"
          style={{ aspectRatio: "200/200", objectFit: "cover" }} />
        <h2 className="mt-6 text-lg font-semibold text-center">{randomInstruction}</h2>
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
