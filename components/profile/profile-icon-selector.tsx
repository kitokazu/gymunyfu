"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useState } from "react";

interface ProfileIconSelectorProps {
  currentIcon?: ProfileIcon;
  onIconSelect: (icon: ProfileIcon) => void;
  children: React.ReactNode;
}

const availableIcons: {
  icon: ProfileIcon;
  label: string;
  component: React.ComponentType<{ className?: string }>;
}[] = [
  { icon: "briefcase", label: "Briefcase", component: Briefcase },
  { icon: "dollar-sign", label: "Dollar Sign", component: DollarSign },
  { icon: "trending-up", label: "Trending Up", component: TrendingUp },
  { icon: "piggy-bank", label: "Piggy Bank", component: PiggyBank },
  { icon: "credit-card", label: "Credit Card", component: CreditCard },
  { icon: "home", label: "Home", component: Home },
  { icon: "car", label: "Car", component: Car },
  { icon: "graduation-cap", label: "Graduation Cap", component: GraduationCap },
  { icon: "heart", label: "Heart", component: Heart },
  { icon: "star", label: "Star", component: Star },
];

export function ProfileIconSelector({
  currentIcon,
  onIconSelect,
  children,
}: ProfileIconSelectorProps) {
  const [selectedIcon, setSelectedIcon] = useState<ProfileIcon>(
    currentIcon || "briefcase"
  );
  const [open, setOpen] = useState(false);

  const handleIconSelect = (icon: ProfileIcon) => {
    setSelectedIcon(icon);
  };

  const handleSave = () => {
    onIconSelect(selectedIcon);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Profile Icon</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-5 gap-3 py-4">
          {availableIcons.map(({ icon, label, component: IconComponent }) => (
            <Button
              key={icon}
              variant={selectedIcon === icon ? "default" : "outline"}
              size="sm"
              className="h-16 flex flex-col gap-1 p-2"
              onClick={() => handleIconSelect(icon)}
            >
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <IconComponent className="h-4 w-4" />
              </div>
            </Button>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
