"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type {
  FinancialProfile,
  BankAccount,
  CreditCard,
  Investment,
  Loan,
  IncomeSource,
} from "@/lib/types";
import {
  DollarSign,
  TrendingUp,
  CreditCardIcon,
  Building2,
  Save,
  X,
  Plus,
  GripVertical,
  Trash2,
  FileText,
  Pencil,
  Info,
  ChevronUp,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface EditableFinancialOverviewProps {
  profile: FinancialProfile;
  isOwnProfile: boolean;
  onSave?: (profile: FinancialProfile) => void;
}

type EditingSection =
  | "income"
  | "bankAccounts"
  | "creditCards"
  | "investments"
  | "loans"
  | null;

export function EditableFinancialOverview({
  profile: initialProfile,
  isOwnProfile,
  onSave,
}: EditableFinancialOverviewProps) {
  const [editingSection, setEditingSection] = useState<EditingSection>(null);
  const [profile, setProfile] = useState(initialProfile);
  const [tempProfile, setTempProfile] = useState(initialProfile);

  const handleEdit = (section: EditingSection) => {
    setEditingSection(section);
    setTempProfile(profile);
  };

  const handleSave = () => {
    setProfile(tempProfile);
    onSave?.(tempProfile);
    setEditingSection(null);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setEditingSection(null);
  };

  const addIncomeSource = () => {
    const newSource: IncomeSource = {
      id: Date.now().toString(),
      name: "New Income Source",
      amount: 0,
      type: "other",
      frequency: "yearly",
    };
    setTempProfile({
      ...tempProfile,
      incomeBreakdown: [...(tempProfile.incomeBreakdown || []), newSource],
    });
  };

  const addBankAccount = () => {
    const newAccount: BankAccount = {
      id: Date.now().toString(),
      name: "New Bank",
      type: "checking",
      description: "",
    };
    setTempProfile({
      ...tempProfile,
      bankAccounts: [...(tempProfile.bankAccounts || []), newAccount],
    });
  };

  const addCreditCard = () => {
    const newCard: CreditCard = {
      id: Date.now().toString(),
      name: "New Card",
      type: "Visa",
      benefits: [],
    };
    setTempProfile({
      ...tempProfile,
      creditCards: [...(tempProfile.creditCards || []), newCard],
    });
  };

  const addInvestment = () => {
    const newInvestment: Investment = {
      id: Date.now().toString(),
      name: "New Investment",
      type: "stocks",
      category: "Stocks",
    };
    setTempProfile({
      ...tempProfile,
      investments: [...(tempProfile.investments || []), newInvestment],
    });
  };

  const addLoan = () => {
    const newLoan: Loan = {
      id: Date.now().toString(),
      name: "New Loan",
      type: "other",
    };
    setTempProfile({
      ...tempProfile,
      loans: [...(tempProfile.loans || []), newLoan],
    });
  };

  const removeIncomeSource = (id: string) => {
    setTempProfile({
      ...tempProfile,
      incomeBreakdown: tempProfile.incomeBreakdown?.filter(
        (source) => source.id !== id
      ),
    });
  };

  const removeBankAccount = (id: string) => {
    setTempProfile({
      ...tempProfile,
      bankAccounts: tempProfile.bankAccounts?.filter((acc) => acc.id !== id),
    });
  };

  const removeCreditCard = (id: string) => {
    setTempProfile({
      ...tempProfile,
      creditCards: tempProfile.creditCards?.filter((card) => card.id !== id),
    });
  };

  const removeInvestment = (id: string) => {
    setTempProfile({
      ...tempProfile,
      investments: tempProfile.investments?.filter((inv) => inv.id !== id),
    });
  };

  const removeLoan = (id: string) => {
    setTempProfile({
      ...tempProfile,
      loans: tempProfile.loans?.filter((loan) => loan.id !== id),
    });
  };

  const moveItem = <T,>(
    array: T[],
    index: number,
    direction: "up" | "down"
  ) => {
    const newArray = [...array];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newArray.length) return array;
    [newArray[index], newArray[newIndex]] = [
      newArray[newIndex],
      newArray[index],
    ];
    return newArray;
  };

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

  const isEditing = editingSection !== null;
  const currentProfile = isEditing ? tempProfile : profile;

  return (
    <div className="space-y-4">
      {/* Income Breakdown */}
      {profile.showIncome &&
        currentProfile.incomeBreakdown &&
        currentProfile.incomeBreakdown.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-1">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Income Breakdown
                </CardTitle>
                {isOwnProfile && editingSection !== "income" && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleEdit("income")}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="space-y-2">
                {editingSection === "income" && (
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm" onClick={addIncomeSource}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add Income Source
                    </Button>
                  </div>
                )}
                {currentProfile.incomeBreakdown.map((source, index) => {
                  const percentage = currentProfile.totalIncome
                    ? (source.amount / currentProfile.totalIncome) * 100
                    : 0;
                  return (
                    <div key={source.id} className="space-y-1">
                      {editingSection === "income" ? (
                        <div className="flex items-start gap-2">
                          <div className="flex flex-col gap-1 pt-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() =>
                                setTempProfile({
                                  ...tempProfile,
                                  incomeBreakdown: moveItem(
                                    tempProfile.incomeBreakdown!,
                                    index,
                                    "up"
                                  ),
                                })
                              }
                              disabled={index === 0}
                            >
                              <GripVertical className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex-1 space-y-2">
                            <Input
                              value={source.name}
                              onChange={(e) => {
                                const updated = [
                                  ...(tempProfile.incomeBreakdown || []),
                                ];
                                updated[index] = {
                                  ...updated[index],
                                  name: e.target.value,
                                };
                                setTempProfile({
                                  ...tempProfile,
                                  incomeBreakdown: updated,
                                });
                              }}
                              placeholder="Income source name"
                            />
                            <Input
                              type="number"
                              value={source.amount}
                              onChange={(e) => {
                                const updated = [
                                  ...(tempProfile.incomeBreakdown || []),
                                ];
                                updated[index] = {
                                  ...updated[index],
                                  amount: Number(e.target.value),
                                };
                                setTempProfile({
                                  ...tempProfile,
                                  incomeBreakdown: updated,
                                });
                              }}
                              placeholder="Amount"
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => removeIncomeSource(source.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-foreground">
                              {source.name}
                            </span>
                            {isOwnProfile &&
                              (currentProfile.showIncomeAmounts ?? true) && (
                                <span className="font-medium text-foreground">
                                  ${source.amount.toLocaleString()}
                                </span>
                              )}
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              {editingSection === "income" && (
                <div className="flex items-center gap-2 pt-2">
                  <Switch
                    id="show-amounts"
                    checked={tempProfile.showIncomeAmounts ?? true}
                    onCheckedChange={(checked) =>
                      setTempProfile({
                        ...tempProfile,
                        showIncomeAmounts: checked,
                      })
                    }
                  />
                  <Label htmlFor="show-amounts" className="text-sm">
                    Show income amounts (only visible to you)
                  </Label>
                </div>
              )}

              {editingSection === "income" && (
                <div className="flex justify-end gap-2 pt-2 border-t">
                  <Button variant="outline" size="sm" onClick={handleCancel}>
                    <X className="h-4 w-4 mr-1.5" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-1.5" />
                    Save
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

      {/* Assets Grid */}
      {profile.showAssets && (
        <div className="grid gap-4 md:grid-cols-2">
          {/* Bank Accounts */}
          {(profile.showBankAccounts ?? true) && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Building2 className="h-4 w-4 text-primary" />
                    Bank Accounts
                  </CardTitle>
                  {isOwnProfile && editingSection !== "bankAccounts" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleEdit("bankAccounts")}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {currentProfile.bankAccounts &&
                currentProfile.bankAccounts.length > 0 ? (
                  <>
                    {currentProfile.bankAccounts.map((account, index) => (
                      <BankAccountItem
                        key={account.id}
                        account={account}
                        index={index}
                        isEditing={editingSection === "bankAccounts"}
                        onUpdate={(updatedAccount) => {
                          const updated = [...(tempProfile.bankAccounts || [])];
                          updated[index] = updatedAccount;
                          setTempProfile({
                            ...tempProfile,
                            bankAccounts: updated,
                          });
                        }}
                        onMove={(direction) =>
                          setTempProfile({
                            ...tempProfile,
                            bankAccounts: moveItem(
                              tempProfile.bankAccounts!,
                              index,
                              direction
                            ),
                          })
                        }
                        onRemove={() => removeBankAccount(account.id)}
                        canMoveUp={index > 0}
                      />
                    ))}
                    {editingSection === "bankAccounts" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full bg-transparent"
                          onClick={addBankAccount}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Bank Account
                        </Button>
                        <div className="flex justify-end gap-2 pt-2 border-t">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCancel}
                          >
                            <X className="h-4 w-4 mr-1.5" />
                            Cancel
                          </Button>
                          <Button size="sm" onClick={handleSave}>
                            <Save className="h-4 w-4 mr-1.5" />
                            Save
                          </Button>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No bank accounts added
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Credit Cards */}
          {(profile.showCreditCards ?? true) && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <CreditCardIcon className="h-4 w-4 text-primary" />
                    Credit Cards
                  </CardTitle>
                  {isOwnProfile && editingSection !== "creditCards" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleEdit("creditCards")}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {currentProfile.creditCards &&
                currentProfile.creditCards.length > 0 ? (
                  <>
                    {currentProfile.creditCards.map((card, index) => (
                      <CreditCardItem
                        key={card.id}
                        card={card}
                        index={index}
                        isEditing={editingSection === "creditCards"}
                        onUpdate={(updatedCard) => {
                          const updated = [...(tempProfile.creditCards || [])];
                          updated[index] = updatedCard;
                          setTempProfile({
                            ...tempProfile,
                            creditCards: updated,
                          });
                        }}
                        onMove={(direction) =>
                          setTempProfile({
                            ...tempProfile,
                            creditCards: moveItem(
                              tempProfile.creditCards!,
                              index,
                              direction
                            ),
                          })
                        }
                        onRemove={() => removeCreditCard(card.id)}
                        canMoveUp={index > 0}
                      />
                    ))}
                    {editingSection === "creditCards" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full bg-transparent"
                          onClick={addCreditCard}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Credit Card
                        </Button>
                        <div className="flex justify-end gap-2 pt-2 border-t">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCancel}
                          >
                            <X className="h-4 w-4 mr-1.5" />
                            Cancel
                          </Button>
                          <Button size="sm" onClick={handleSave}>
                            <Save className="h-4 w-4 mr-1.5" />
                            Save
                          </Button>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No credit cards added
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Investments */}
          {(profile.showInvestments ?? true) && (
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    Investments
                  </CardTitle>
                  {isOwnProfile && editingSection !== "investments" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleEdit("investments")}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {currentProfile.investments &&
                currentProfile.investments.length > 0 ? (
                  <>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {currentProfile.investments.map((investment, index) => (
                        <div
                          key={investment.id}
                          className="flex items-start gap-2 rounded-lg border border-border p-3"
                        >
                          {editingSection === "investments" && (
                            <div className="flex flex-col gap-1 pt-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() =>
                                  setTempProfile({
                                    ...tempProfile,
                                    investments: moveItem(
                                      tempProfile.investments!,
                                      index,
                                      "up"
                                    ),
                                  })
                                }
                                disabled={index === 0}
                              >
                                <GripVertical className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                          <div className="flex-1">
                            {editingSection === "investments" ? (
                              <div className="space-y-2">
                                <Input
                                  value={investment.name}
                                  onChange={(e) => {
                                    const updated = [
                                      ...(tempProfile.investments || []),
                                    ];
                                    updated[index] = {
                                      ...updated[index],
                                      name: e.target.value,
                                    };
                                    setTempProfile({
                                      ...tempProfile,
                                      investments: updated,
                                    });
                                  }}
                                  placeholder="Investment name"
                                />
                                <Select
                                  value={investment.type}
                                  onValueChange={(
                                    value:
                                      | "stocks"
                                      | "crypto"
                                      | "real-estate"
                                      | "bonds"
                                      | "other"
                                  ) => {
                                    const updated = [
                                      ...(tempProfile.investments || []),
                                    ];
                                    updated[index] = {
                                      ...updated[index],
                                      type: value,
                                    };
                                    setTempProfile({
                                      ...tempProfile,
                                      investments: updated,
                                    });
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="stocks">
                                      Stocks
                                    </SelectItem>
                                    <SelectItem value="crypto">
                                      Crypto
                                    </SelectItem>
                                    <SelectItem value="real-estate">
                                      Real Estate
                                    </SelectItem>
                                    <SelectItem value="bonds">Bonds</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Input
                                  value={investment.category || ""}
                                  onChange={(e) => {
                                    const updated = [
                                      ...(tempProfile.investments || []),
                                    ];
                                    updated[index] = {
                                      ...updated[index],
                                      category: e.target.value,
                                    };
                                    setTempProfile({
                                      ...tempProfile,
                                      investments: updated,
                                    });
                                  }}
                                  placeholder="Category (e.g., Tech Stocks, Index Funds)"
                                />
                              </div>
                            ) : (
                              <>
                                <div className="flex items-start justify-between">
                                  <div>
                                    <p className="text-sm font-medium text-foreground">
                                      {investment.name}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <p className="text-xs text-muted-foreground capitalize">
                                        {investment.type.replace("-", " ")}
                                      </p>
                                      {investment.category && (
                                        <>
                                          <span className="text-xs text-muted-foreground">
                                            •
                                          </span>
                                          <p className="text-xs text-muted-foreground">
                                            {investment.category}
                                          </p>
                                        </>
                                      )}
                                    </div>
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
                              </>
                            )}
                          </div>
                          {editingSection === "investments" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={() => removeInvestment(investment.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    {editingSection === "investments" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-3 bg-transparent"
                          onClick={addInvestment}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Investment
                        </Button>
                        <div className="flex justify-end gap-2 pt-2 border-t mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCancel}
                          >
                            <X className="h-4 w-4 mr-1.5" />
                            Cancel
                          </Button>
                          <Button size="sm" onClick={handleSave}>
                            <Save className="h-4 w-4 mr-1.5" />
                            Save
                          </Button>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No investments added
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Loans */}
      {(profile.showLoans ?? true) && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4 text-primary" />
                Loans
              </CardTitle>
              {isOwnProfile && editingSection !== "loans" && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleEdit("loans")}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {currentProfile.loans && currentProfile.loans.length > 0 ? (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  {currentProfile.loans.map((loan, index) => (
                    <div
                      key={loan.id}
                      className="flex items-start gap-2 rounded-lg border border-border p-3"
                    >
                      {editingSection === "loans" && (
                        <div className="flex flex-col gap-1 pt-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              setTempProfile({
                                ...tempProfile,
                                loans: moveItem(
                                  tempProfile.loans!,
                                  index,
                                  "up"
                                ),
                              })
                            }
                            disabled={index === 0}
                          >
                            <GripVertical className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                      <div className="flex-1">
                        {editingSection === "loans" ? (
                          <div className="space-y-2">
                            <Input
                              value={loan.name}
                              onChange={(e) => {
                                const updated = [...(tempProfile.loans || [])];
                                updated[index] = {
                                  ...updated[index],
                                  name: e.target.value,
                                };
                                setTempProfile({
                                  ...tempProfile,
                                  loans: updated,
                                });
                              }}
                              placeholder="Loan name"
                            />
                            <Select
                              value={loan.type}
                              onValueChange={(
                                value:
                                  | "student"
                                  | "mortgage"
                                  | "auto"
                                  | "personal"
                                  | "business"
                                  | "other"
                              ) => {
                                const updated = [...(tempProfile.loans || [])];
                                updated[index] = {
                                  ...updated[index],
                                  type: value,
                                };
                                setTempProfile({
                                  ...tempProfile,
                                  loans: updated,
                                });
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="student">
                                  Student Loan
                                </SelectItem>
                                <SelectItem value="mortgage">
                                  Mortgage
                                </SelectItem>
                                <SelectItem value="auto">Auto Loan</SelectItem>
                                <SelectItem value="personal">
                                  Personal Loan
                                </SelectItem>
                                <SelectItem value="business">
                                  Business Loan
                                </SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input
                              value={loan.lender || ""}
                              onChange={(e) => {
                                const updated = [...(tempProfile.loans || [])];
                                updated[index] = {
                                  ...updated[index],
                                  lender: e.target.value,
                                };
                                setTempProfile({
                                  ...tempProfile,
                                  loans: updated,
                                });
                              }}
                              placeholder="Lender (optional)"
                            />
                          </div>
                        ) : (
                          <>
                            <p className="text-sm font-medium text-foreground">
                              {loan.name}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <p className="text-xs text-muted-foreground capitalize">
                                {loan.type.replace("-", " ")}
                              </p>
                              {loan.lender && (
                                <>
                                  <span className="text-xs text-muted-foreground">
                                    •
                                  </span>
                                  <p className="text-xs text-muted-foreground">
                                    {loan.lender}
                                  </p>
                                </>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                      {editingSection === "loans" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => removeLoan(loan.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                {editingSection === "loans" && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-3 bg-transparent"
                      onClick={addLoan}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Loan
                    </Button>
                    <div className="flex justify-end gap-2 pt-2 border-t mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancel}
                      >
                        <X className="h-4 w-4 mr-1.5" />
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleSave}>
                        <Save className="h-4 w-4 mr-1.5" />
                        Save
                      </Button>
                    </div>
                  </>
                )}
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No loans added</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function BankAccountItem({
  account,
  index,
  isEditing,
  onUpdate,
  onMove,
  onRemove,
  canMoveUp,
}: {
  account: BankAccount;
  index: number;
  isEditing: boolean;
  onUpdate: (account: BankAccount) => void;
  onMove: (direction: "up" | "down") => void;
  onRemove: () => void;
  canMoveUp: boolean;
}) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="rounded-lg border border-border p-3">
      <div className="flex items-start gap-2">
        {isEditing && (
          <div className="flex flex-col gap-1 pt-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => onMove("up")}
              disabled={!canMoveUp}
            >
              <GripVertical className="h-3 w-3" />
            </Button>
          </div>
        )}
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2">
              <Input
                value={account.name}
                onChange={(e) => onUpdate({ ...account, name: e.target.value })}
                placeholder="Bank name"
              />
              <Select
                value={account.type}
                onValueChange={(
                  value: "checking" | "savings" | "investment"
                ) => {
                  onUpdate({ ...account, type: value });
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="checking">Checking</SelectItem>
                  <SelectItem value="savings">Savings</SelectItem>
                  <SelectItem value="investment">Investment</SelectItem>
                </SelectContent>
              </Select>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Description (optional)
                </Label>
                <Textarea
                  value={account.description || ""}
                  onChange={(e) =>
                    onUpdate({ ...account, description: e.target.value })
                  }
                  placeholder="e.g., High-yield savings with 4.5% APY"
                  rows={2}
                  className="text-sm"
                />
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {account.name}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {account.type}
                  </p>
                </div>
                {account.description && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 shrink-0"
                    onClick={() => setShowDescription(!showDescription)}
                  >
                    {showDescription ? (
                      <ChevronUp className="h-3 w-3" />
                    ) : (
                      <Info className="h-3 w-3 text-primary" />
                    )}
                  </Button>
                )}
              </div>
              {showDescription && account.description && (
                <div className="mt-2 rounded-md bg-muted/50 p-2">
                  <p className="text-xs text-foreground">
                    {account.description}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        {isEditing && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive shrink-0"
            onClick={onRemove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

function CreditCardItem({
  card,
  index,
  isEditing,
  onUpdate,
  onMove,
  onRemove,
  canMoveUp,
}: {
  card: CreditCard;
  index: number;
  isEditing: boolean;
  onUpdate: (card: CreditCard) => void;
  onMove: (direction: "up" | "down") => void;
  onRemove: () => void;
  canMoveUp: boolean;
}) {
  const [showBenefits, setShowBenefits] = useState(false);
  const [benefitsText, setBenefitsText] = useState(
    (card.benefits || []).join("\n")
  );

  return (
    <div className="rounded-lg border border-border p-3">
      <div className="flex items-start gap-2">
        {isEditing && (
          <div className="flex flex-col gap-1 pt-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => onMove("up")}
              disabled={!canMoveUp}
            >
              <GripVertical className="h-3 w-3" />
            </Button>
          </div>
        )}
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2">
              <Input
                value={card.name}
                onChange={(e) => onUpdate({ ...card, name: e.target.value })}
                placeholder="Card name"
              />
              <Input
                value={card.type || ""}
                onChange={(e) => onUpdate({ ...card, type: e.target.value })}
                placeholder="Card type (Visa, Mastercard, Amex)"
              />
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Benefits (one per line)
                </Label>
                <Textarea
                  value={benefitsText}
                  onChange={(e) => {
                    setBenefitsText(e.target.value);
                    const benefits = e.target.value
                      .split("\n")
                      .filter((b) => b.trim());
                    onUpdate({ ...card, benefits });
                  }}
                  placeholder="3x points on travel&#10;$300 annual travel credit&#10;Priority Pass lounge access"
                  rows={3}
                  className="text-sm"
                />
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {card.name}
                  </p>
                  {card.type && (
                    <p className="text-xs text-muted-foreground">{card.type}</p>
                  )}
                </div>
                {card.benefits && card.benefits.length > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 shrink-0"
                    onClick={() => setShowBenefits(!showBenefits)}
                  >
                    {showBenefits ? (
                      <ChevronUp className="h-3 w-3" />
                    ) : (
                      <Info className="h-3 w-3 text-primary" />
                    )}
                  </Button>
                )}
              </div>
              {showBenefits && card.benefits && card.benefits.length > 0 && (
                <div className="mt-2 space-y-1 rounded-md bg-muted/50 p-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    Benefits:
                  </p>
                  <ul className="space-y-0.5">
                    {card.benefits.map((benefit, i) => (
                      <li
                        key={i}
                        className="text-xs text-foreground flex items-start gap-1.5"
                      >
                        <span className="text-primary mt-0.5">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
        {isEditing && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive shrink-0"
            onClick={onRemove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
