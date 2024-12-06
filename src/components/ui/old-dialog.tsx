import { PropsWithChildren } from "react";
import { Dialog, DialogContent, DialogHeader } from "./dialog-no-closed";

interface OldDialogProps {
  header: string;
  isDialogOpen: boolean;
}

export function OldDialog({
  children,
  isDialogOpen,
  header,
}: PropsWithChildren<OldDialogProps>) {
  return (
    <Dialog open={isDialogOpen}>
      <DialogContent
        className="w-fit sm:rounded-none border-b-4 border-b-black border-t-4 border-t-white border-l-4 border-l-white border-r-4 border-r-black bg-[#CCCCCC] p-1"
        onEscapeKeyDown={(e) => e.preventDefault()} // Bloque la fermeture avec Escape
        onPointerDownOutside={(e) => e.preventDefault()} // Bloque la fermeture en cliquant à l'extérieur
      >
        <DialogHeader className="bg-gradient-to-r from-[#0141BC] to-[#49A3DD] text-sm font-pressstart  flex flex-row w-full  px-4 py-1 text-white">
          {header}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
