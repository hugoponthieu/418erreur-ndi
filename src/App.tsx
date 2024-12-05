import { Checkbox } from './components/ui/checkbox'

function App() {
  return (
    <div className="bg-blue-950 bg-deepwater h-dvh flex gap-64 flex-col items-center justify-center w-full bg-cover text-white font-pressstart">
      <a href="https://x.com/not_a_shower" className="text-gray-500 hover:underline pt-4">
        @not_a_shower
      </a>
      <div className='h-full flex flex-col gap-72'>
        <div className="flex flex-row text-8xl justify-center items-center">
          <div>RACE FOR W</div>
          <img className="object-contain h-[90px]" src="src/assets/water-drop.png"></img>
          <div>TER</div>
        </div>
        <div className="flex flex-col gap-8 justify-center items-center">
          <button className="w-fit relative bg-blue-400 rounded-lg border-none p-0 cursor-pointer outline-offset-4 active:outline-none">
            <span className="block px-10 py-6 rounded-lg text-4xl text-white bg-blue-500 translate-y-[-6px] active:translate-y-[-2px]">PLAY</span>
          </button>
          <div className="flex items-center space-x-2 gap-4">
            <Checkbox id="terms" className="border-white" />
            <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Accept terms and conditions
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
