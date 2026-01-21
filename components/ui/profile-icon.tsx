"use client";

import type { ProfileIcon } from "@/lib/types";
import {
  Briefcase,
  DollarSign,
  TrendingUp,
  PiggyBank,
  CreditCard,
  Home,
  Car,
  GraduationCap,
  Heart,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileIconProps {
  icon?: ProfileIcon;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const getProfileIcon = (icon: ProfileIcon, size: "sm" | "md" | "lg") => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  const iconProps = { className: sizeClasses[size] };

  switch (icon) {
    case "briefcase":
      return <Briefcase {...iconProps} />;
    case "dollar-sign":
      return <DollarSign {...iconProps} />;
    case "trending-up":
      return <TrendingUp {...iconProps} />;
    case "piggy-bank":
      return <PiggyBank {...iconProps} />;
    case "credit-card":
      return <CreditCard {...iconProps} />;
    case "home":
      return <Home {...iconProps} />;
    case "car":
      return <Car {...iconProps} />;
    case "graduation-cap":
      return <GraduationCap {...iconProps} />;
    case "heart":
      return <Heart {...iconProps} />;
    case "star":
      return <Star {...iconProps} />;
    default:
      return <Briefcase {...iconProps} />;
  }
};

const getCircleSize = (size: "sm" | "md" | "lg") => {
  const sizeClasses = {
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-14 w-14",
  };
  return sizeClasses[size];
};

export function ProfileIconComponent({
  icon,
  size = "md",
  className,
}: ProfileIconProps) {
  return (
    <div
      className={cn(
        "flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center",
        getCircleSize(size),
        className
      )}
    >
      {icon ? (
        getProfileIcon(icon, size)
      ) : (
        <Briefcase
          className={cn(
            "text-primary",
            size === "sm" ? "h-4 w-4" : size === "md" ? "h-6 w-6" : "h-8 w-8"
          )}
        />
      )}
    </div>
  );
}
