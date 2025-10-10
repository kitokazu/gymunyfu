"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { pinnedAssets } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const suggestedUsers = [
  { username: "wealthbuilder", displayName: "Sarah Chen", followers: 12500 },
  { username: "cryptoking", displayName: "Marcus Johnson", followers: 8900 },
  {
    username: "debtfreejourney",
    displayName: "Emily Rodriguez",
    followers: 15200,
  },
];

export function TrendingSidebar() {
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());

  const toggleFollow = (username: string) => {
    setFollowedUsers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(username)) {
        newSet.delete(username);
      } else {
        newSet.add(username);
      }
      return newSet;
    });
  };

  return (
    <aside className="hidden xl:block xl:w-80 space-y-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="h-4 w-4 text-primary" />
            Pinned Assets
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {pinnedAssets.map((asset) => (
            <div
              key={asset.symbol}
              className="rounded-lg p-2 hover:bg-muted transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-foreground">
                      {asset.symbol}
                    </p>
                    <span className="text-xs text-muted-foreground capitalize">
                      {asset.type === "crypto" ? "Crypto" : "Stock"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{asset.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    ${asset.price.toLocaleString()}
                  </p>
                  <div
                    className={`flex items-center gap-1 text-xs ${
                      asset.change >= 0 ? "text-success" : "text-destructive"
                    }`}
                  >
                    {asset.change >= 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    <span>
                      {asset.change >= 0 ? "+" : ""}
                      {asset.change}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </aside>
  );
}
