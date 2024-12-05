import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog-no-closed";
import { Button } from "@/components/ui/button";
import "./App.css";

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (checked: boolean) => {
    if (checked) {
      setIsDialogOpen(true);
    }
    setIsChecked(checked);
  };

  return (
    <div className="bg-blue-950 bg-deepwater h-dvh flex gap-64 flex-col items-center justify-center w-full bg-cover text-white font-pressstart">
      <a
        href="https://x.com/not_a_shower"
        className="text-gray-500 hover:underline pt-4"
      >
        @not_a_shower
      </a>
      <div className="h-full flex flex-col gap-72">
        <div className="flex flex-row text-8xl justify-center items-center">
          <div>RACE FOR W</div>
          <img
            className="object-contain h-[90px]"
            src="src/assets/water-drop.png"
            alt="Water Drop"
          />
          <div>TER</div>
        </div>
        <div className="flex flex-col gap-8 justify-center items-center">
          <Button
            variant={"homepage"}
            size={"homepage"}
            disabled={!isChecked}
            className="w-fit relative bg-blue-400 rounded-lg border-none p-0 cursor-pointer outline-offset-4 active:outline-none"
          >
            <span className="block px-10 py-6 rounded-lg text-4xl text-white bg-blue-500 translate-y-[-6px] active:translate-y-[-2px]">
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
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={() => {}}>
        <DialogContent
          className="sm:max-w-[425px]"
          onEscapeKeyDown={(e) => e.preventDefault()} // Bloque la fermeture avec Escape
          onPointerDownOutside={(e) => e.preventDefault()} // Bloque la fermeture en cliquant à l'extérieur
        >
          <DialogHeader>
            <DialogTitle>Captcha</DialogTitle>
          </DialogHeader>
          <div>You must add the captcha content here.</div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
