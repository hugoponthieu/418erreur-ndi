import { Informations } from "@/lib/infos";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { InfoIcon } from "../icons/info";

interface RetroDialogProps {
  informations: Informations;
}
export function RetroDialog({ informations }: RetroDialogProps) {
  return (
    <DialogContent className="pixel-border-lg-white">
      <DialogHeader>
        <DialogTitle className="font-pressstart flex flex-row gap-2 items-center">
          <InfoIcon size={22} color="black" />
          <p>{informations.title}</p>
        </DialogTitle>
        <DialogDescription className="font-pressstart">
          {informations.description}
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
