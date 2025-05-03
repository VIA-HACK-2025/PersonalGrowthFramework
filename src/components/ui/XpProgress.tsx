import * as React from "react";
import * as Progress from "@radix-ui/react-progress";

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof Progress.Root> {
  value?: number;
  indicatorColor?: string
}

const XpProgress = React.forwardRef<
  React.ComponentRef<typeof Progress.Root>,
  ProgressProps
>(({ className = "", value = 0, indicatorColor, ...props }, ref) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <Progress.Root
      ref={ref}
      className={`relative h-[25px] w-[300px] overflow-hidden rounded-full bg-gray-300 ${className}`}
      style={{ transform: "translateZ(0)" }}
      value={clampedValue}
      {...props}
    >
      <Progress.Indicator
        className={`h-full ${indicatorColor || "bg-green-500"} transition-transform duration-[660ms] ease-[cubic-bezier(0.65,0,0.35,1)]`}
        style={{ transform: `translateX(-${100 - clampedValue}%)` }}
      />
    </Progress.Root>
  );
});
XpProgress.displayName = "XpProgress";

export { XpProgress };
