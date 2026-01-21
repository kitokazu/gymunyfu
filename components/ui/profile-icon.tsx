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

const iconColor = "text-emerald-600"

const getProfileIcon = (icon: ProfileIcon, size: "sm" | "md" | "lg") => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  switch (icon) {
    case "briefcase":
      return <Briefcase className={`${sizeClasses[size]} ${iconColor}`} />;
    case "dollar-sign":
      return <DollarSign className={`${sizeClasses[size]} ${iconColor}`} />;
    case "trending-up":
      return <TrendingUp className={`${sizeClasses[size]} ${iconColor}`} />;
    case "piggy-bank":
      return <PiggyBank className={`${sizeClasses[size]} ${iconColor}`} />;
    case "credit-card":
      return <CreditCard className={`${sizeClasses[size]} ${iconColor}`} />;
    case "home":
      return <Home className={`${sizeClasses[size]} ${iconColor}`} />;
    case "car":
      return <Car className={`${sizeClasses[size]} ${iconColor}`} />;
    case "graduation-cap":
      return <GraduationCap className={`${sizeClasses[size]} ${iconColor}`} />;
    case "heart":
      return <Heart className={`${sizeClasses[size]} ${iconColor}`} />;
    case "star":
      return <Star className={`${sizeClasses[size]} ${iconColor}`} />;
    default:
      return <Briefcase className={`${sizeClasses[size]} ${iconColor}`} />;
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
        "flex-shrink-0 rounded-full bg-emerald-50 flex items-center justify-center",
        getCircleSize(size),
        className
      )}
    >
      {icon ? (
        getProfileIcon(icon, size)
      ) : (
        <Briefcase
          className={cn(iconColor, size === "sm" ? "h-4 w-4" : size === "md" ? "h-6 w-6" : "h-8 w-8")}
        />
      )}
    </div>
  );
}
