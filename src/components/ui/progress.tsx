import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary flex flex-row divide-x-2",
      className
    )}
    {...props}
  >
    {Array.from({ length: value || 0 }).map((_, index) => (
      <div
        key={index}
        className="h-full w-1/12 bg-primary transition-all bg-[#0141BC]"
      />
    ))}
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
{
  /* <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all bg-[#0141BC]"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
 */
}
