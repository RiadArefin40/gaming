'use client'
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import React from "react";

interface DotLoadingButtonProps
  extends React.ComponentProps<typeof Button> {
  loading: boolean;
}

export function DotLoadingButton({
  loading,
  children,
  className,
  ...props
}: DotLoadingButtonProps) {
  return (
    <Button
      {...props}
      disabled={loading || props.disabled}
      className={clsx(
        "relative w-full h-11 overflow-hidden",
        loading && "cursor-not-allowed",
        className
      )}
    >
      {loading ? (
        <div className="flex gap-2">
          <span className="dot" />
          <span className="dot delay-200" />
          <span className="dot delay-400" />
        </div>
      ) : (
        children
      )}
    </Button>
  );
}
