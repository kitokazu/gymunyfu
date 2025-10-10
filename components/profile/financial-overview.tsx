"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FinancialProfile } from "@/lib/types";
import { DollarSign, TrendingUp, CreditCard, Building2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface FinancialOverviewProps {
  profile: FinancialProfile;
}

export function FinancialOverview({ profile }: FinancialOverviewProps) {
  if (!profile.showIncome && !profile.showAssets) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">
            Financial information is private
          </p>
        </CardContent>
      </Card>
    );
  }

  const totalAssets =
    (profile.bankAccounts?.reduce((sum, acc) => sum + (acc.balance || 0), 0) ||
      0) +
    (profile.investments?.reduce((sum, inv) => sum + (inv.value || 0), 0) || 0);

  return (
    <div className="space-y-4">
      {/* Income Breakdown */}
      {profile.showIncome &&
        profile.incomeBreakdown &&
        profile.incomeBreakdown.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Income Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {profile.incomeBreakdown.map((source) => {
                  const percentage = profile.totalIncome
                    ? (source.amount / profile.totalIncome) * 100
                    : 0;
                  return (
                    <div key={source.id} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground">{source.name}</span>
                        <span className="font-medium text-foreground">
                          ${source.amount.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

      {/* Assets Grid */}
      {profile.showAssets && (
        <div className="grid gap-4 md:grid-cols-2">
          {/* Bank Accounts */}
          {profile.bankAccounts && profile.bankAccounts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Building2 className="h-4 w-4 text-primary" />
                  Bank Accounts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {profile.bankAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {account.name}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {account.type}
                      </p>
                    </div>
                    {account.balance !== undefined && (
                      <p className="text-sm font-bold text-foreground">
                        ${account.balance.toLocaleString()}
                      </p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Credit Cards */}
          {profile.creditCards && profile.creditCards.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <CreditCard className="h-4 w-4 text-primary" />
                  Credit Cards
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {profile.creditCards.map((card) => (
                  <div key={card.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">
                        {card.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ****{card.lastFour}
                      </p>
                    </div>
                    {card.limit && card.balance !== undefined && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>
                            ${card.balance.toLocaleString()} / $
                            {card.limit.toLocaleString()}
                          </span>
                          <span>
                            {Math.round((card.balance / card.limit) * 100)}%
                          </span>
                        </div>
                        <Progress
                          value={(card.balance / card.limit) * 100}
                          className="h-1"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Investments */}
          {profile.investments && profile.investments.length > 0 && (
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Investments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {profile.investments.map((investment) => (
                    <div
                      key={investment.id}
                      className="flex items-center justify-between rounded-lg border border-border p-3"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {investment.name}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {investment.type.replace("-", " ")}
                        </p>
                      </div>
                      <div className="text-right">
                        {investment.value !== undefined && (
                          <p className="text-sm font-bold text-foreground">
                            ${investment.value.toLocaleString()}
                          </p>
                        )}
                        {investment.returnRate !== undefined && (
                          <p className="text-xs text-success">
                            +{investment.returnRate}%
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
