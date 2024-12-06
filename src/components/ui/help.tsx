import { InfoIcon } from "../icons/info";
import { RetroButton } from "./button";
import { Dialog, DialogTrigger } from "./dialog";
import { RetroDialog } from "./retro-dialog";

export function HelpButton() {
  return (
    <Dialog>
      <DialogTrigger className="cursor-help" asChild>
        <RetroButton legend="Instructions">
          <InfoIcon size={32} color="black" />
        </RetroButton>
      </DialogTrigger>
      <RetroDialog
        informations={{
          title: "How to play the game ?",
          description:
            "The goal is to save the ocean by catching all the bottles, for that click on the bottles. Each bottle caught earns you money. With that money you will be able to buy an automatic bottle collector, a malware to erase overfishing and seagrasses to stop global warming. Finally, to control Nemo, use your mouse and move your mouse to the window corners to rotate the camera.",
        }}
      />
    </Dialog>
  );
}
