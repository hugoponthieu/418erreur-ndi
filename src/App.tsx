import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import "./App.css";
import { useNavigate } from "react-router";

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = (checked: boolean) => {
    if (checked) {
      setIsDialogOpen(true);
    }
    setIsChecked(checked);
  };

  return (
    <div className="bg-blue-950 bg-deepwater h-dvh flex flex-col items-center justify-center w-full bg-cover text-white font-pressstart">
      <a
        href="https://x.com/not_a_shower_zob"
        className="text-gray-500 text-[10px] md:text-sm hover:underline pt-4"
      >
        @not_a_shower
      </a>
      <div className="h-full flex flex-col items-center justify-center gap-16 md:gap-72">
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
        <div className="flex flex-col gap-8 justify-center items-center">
            <Button
            variant={"default"}
            size={"homepage"}
            disabled={!isChecked}
            className="w-fit relative bg-blue-400 rounded-lg border-none p-0 cursor-pointer outline-offset-4 active:outline-none"
            onClick={() => navigate("/game")}
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
              Accept terms and conditions
            </label>
          </div>
        </div>
      </div>

      {/* Dialog */}
      {/* <Dialog open={isDialogOpen} onOpenChange={() => {}}>
        <DialogContent
          className="md:max-w-[425px]"
          onEscapeKeyDown={(e) => e.preventDefault()} // Bloque la fermeture avec Escape
          onPointerDownOutside={(e) => e.preventDefault()} // Bloque la fermeture en cliquant à l'extérieur
        >
          <DialogHeader>
            <DialogTitle>Captcha</DialogTitle>
          </DialogHeader>
          <div>You must add the captcha content here.</div>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}

export default App;