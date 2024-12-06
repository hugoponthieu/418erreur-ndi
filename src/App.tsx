import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import "./App.css";
import { OldDialog } from "./components/ui/old-dialog";
import { OldProgress } from "./components/ui/old-progress";
import { Game } from "./game-tcha/game";
import { useNavigate } from "react-router";
import { useAccess } from "@/components/ui/access-provider";
import { HelpButton } from "./components/ui/help";

function App() {
  const navigate = useNavigate();
  const maxScore = 3;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogWinOpen, setIsDialogWinOpen] = useState(false);
  const [won, setWon] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [counter, setCounter] = useState(0);
  const [message, setMessage] = useState("");
  const { setCanAccessGame } = useAccess();

  let interval: NodeJS.Timeout;
  useEffect(() => {
    if (won) {
      setCounter(0);
      interval = setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter < 12) {
            return prevCounter + 1;
          } else {
            clearInterval(interval);
            return prevCounter;
          }
        });
      }, 300);
    } else {
      setCounter(0);
      setMessage("");
      clearInterval(interval);
      setWon(false);
    }

    return () => clearInterval(interval);
  }, [isChecked, won]);

  useEffect(() => {
    if (counter === 12) {
      setIsDialogWinOpen(false);
    } else if (counter >= 8) {
      setMessage("Making turtle eat plastic");
    } else if (counter >= 6) {
      setMessage("Wasting some garbage");
    } else if (counter >= 4) {
      setMessage("Loading the resource");
    } else {
      setMessage("");
    }
  }, [counter]);

  useEffect(() => {
    if (!isChecked) {
      setWon(false);
    }
  }, [isChecked]);

  const handleCheckboxChange = (checked: boolean) => {
    if (checked) {
      setIsDialogOpen(true);
    }
    setIsChecked(checked);
  };

  return (
    <div className="bg-blue-950 bg-deepwater h-dvh flex flex-col items-center justify-center w-full bg-cover text-white font-pressstart">
      <a
        href="https://x.com/not_a_shower"
        className="text-gray-500 text-[10px] md:text-sm hover:underline pt-4"
      >
        @not_a_shower
      </a>
      <div className="h-full flex flex-col items-center justify-center gap-16 md:gap-50">
        <div className="flex text-center flex-col text-6xl md:text-8xl justify-center items-center">
          <div>RACE FOR</div>
          <div className="flex flex-row">
            <div>W</div>
            <img
              className="object-contain h-[60px] md:h-[90px] pb-2"
              src="/water-drop.png"
              alt="Water Drop"
            />
            <div>TER</div>
          </div>
        </div>
        <HelpButton withLabel="How to play" />
        <div className="flex flex-col gap-8 justify-center items-center">
          <Button
            variant={"default"}
            size={"homepage"}
            disabled={!won}
            className="w-fit relative bg-blue-400 rounded-lg border-none p-0 cursor-pointer outline-offset-4 active:outline-none"
            onClick={() => {
              setCanAccessGame(true);
              navigate("/game");
            }}
          >
            <span className="block px-10 py-6 rounded-lg text-2xl md:text-4xl text-white bg-blue-500 translate-y-[-6px] active:translate-y-[-2px]">
              PLAY
            </span>
          </Button>
          <div className="flex items-center space-x-2 gap-4">
            <Checkbox
              id="terms"
              className="border-white"
              checked={isChecked}
              onCheckedChange={handleCheckboxChange}
            />
            <label
              htmlFor="terms"
              className="text-[10px] md:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I am not a robot
            </label>
          </div>
        </div>
      </div>

      {/* Dialog */}
      <OldDialog header="Captcha" isDialogOpen={isDialogOpen}>
        <Game
          maxScore={maxScore}
          setWin={() => {
            setWon(true);
            setIsDialogOpen(false);
            setIsDialogWinOpen(true);
          }}
        />
      </OldDialog>
      <OldDialog
        header="You are not a robot"
        isDialogOpen={isDialogWinOpen && won}
      >
        <p className="font-pressstart text-xs">{message}</p>
        <OldProgress value={counter} />
      </OldDialog>
    </div>
  );
}

export default App;
