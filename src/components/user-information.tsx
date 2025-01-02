import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CreditCard,
  Building2,
  Wallet,
  PieChart,
  TrendingUp,
  BanknoteIcon,
} from "lucide-react";

export function UserInformation() {
  return (
    <div className="grid gap-6">
      {/* Investment Portfolio */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Investment Portfolio
          </CardTitle>
          <CardDescription>Current investment allocation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Stocks</span>
                <span className="font-medium">60%</span>
              </div>
              <Progress value={60} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Bonds</span>
                <span className="font-medium">20%</span>
              </div>
              <Progress value={20} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Crypto</span>
                <span className="font-medium">10%</span>
              </div>
              <Progress value={10} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Cash</span>
                <span className="font-medium">10%</span>
              </div>
              <Progress value={10} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credit Cards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Credit Cards
          </CardTitle>
          <CardDescription>Connected payment methods</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                  <CreditCard className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                </div>
                <div>
                  <div className="font-medium">Chase Sapphire Reserve</div>
                  <div className="text-sm text-muted-foreground">**** 4589</div>
                </div>
              </div>
              <Badge>Primary</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                  <CreditCard className="h-4 w-4 text-green-700 dark:text-green-300" />
                </div>
                <div>
                  <div className="font-medium">Amex Platinum</div>
                  <div className="text-sm text-muted-foreground">**** 7891</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bank Accounts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Bank Accounts
          </CardTitle>
          <CardDescription>Connected bank accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900">
                  <BanknoteIcon className="h-4 w-4 text-purple-700 dark:text-purple-300" />
                </div>
                <div>
                  <div className="font-medium">Chase Checking</div>
                  <div className="text-sm text-muted-foreground">**** 2356</div>
                </div>
              </div>
              <Badge>Primary</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-orange-100 p-2 dark:bg-orange-900">
                  <Wallet className="h-4 w-4 text-orange-700 dark:text-orange-300" />
                </div>
                <div>
                  <div className="font-medium">Ally Savings</div>
                  <div className="text-sm text-muted-foreground">**** 8912</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trading Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Trading Activity
          </CardTitle>
          <CardDescription>Recent trading statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Win Rate</div>
              <div className="text-2xl font-bold">67%</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">
                Monthly Trades
              </div>
              <div className="text-2xl font-bold">45</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Avg. Return</div>
              <div className="text-2xl font-bold text-green-600">+2.4%</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Risk Score</div>
              <div className="text-2xl font-bold">7/10</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
