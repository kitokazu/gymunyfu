"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SettingsIcon, Loader2, Check } from "lucide-react"
import { useCurrentUser } from "@/lib/hooks/use-current-user"
import { updateUser, updateFinancialProfile } from "@/lib/services"

export default function SettingsPage() {
  const { user, loading: userLoading } = useCurrentUser()

  const [displayName, setDisplayName] = useState("")
  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")

  const [showIncome, setShowIncome] = useState(false)
  const [showAssets, setShowAssets] = useState(false)

  const [saving, setSaving] = useState(false)
  const [savingPrivacy, setSavingPrivacy] = useState(false)
  const [saved, setSaved] = useState(false)
  const [savedPrivacy, setSavedPrivacy] = useState(false)

  // Initialize form values when user loads
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "")
      setUsername(user.username || "")
      setBio(user.bio || "")
      setShowIncome(user.financialProfile?.showIncome || false)
      setShowAssets(user.financialProfile?.showAssets || false)
    }
  }, [user])

  const handleSaveProfile = async () => {
    if (!user) return

    setSaving(true)
    setSaved(false)

    try {
      await updateUser(user.id, {
        displayName,
        username,
        bio,
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (error) {
      console.error("Error saving profile:", error)
    } finally {
      setSaving(false)
    }
  }

  const handlePrivacyChange = async (field: "showIncome" | "showAssets", value: boolean) => {
    if (!user || !user.financialProfile) return

    const newValue = field === "showIncome" ? { showIncome: value } : { showAssets: value }

    if (field === "showIncome") {
      setShowIncome(value)
    } else {
      setShowAssets(value)
    }

    setSavingPrivacy(true)
    setSavedPrivacy(false)

    try {
      await updateFinancialProfile(user.id, {
        ...user.financialProfile,
        ...newValue,
      })
      setSavedPrivacy(true)
      setTimeout(() => setSavedPrivacy(false), 2000)
    } catch (error) {
      console.error("Error saving privacy settings:", error)
      // Revert on error
      if (field === "showIncome") {
        setShowIncome(!value)
      } else {
        setShowAssets(!value)
      }
    } finally {
      setSavingPrivacy(false)
    }
  }

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-2xl p-4 space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <SettingsIcon className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        </div>

        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your profile details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                placeholder="Your display name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="@username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself"
                className="min-h-[100px]"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <Button onClick={handleSaveProfile} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : saved ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Saved!
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Control what information is visible to others</CardDescription>
              </div>
              {savingPrivacy && (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              )}
              {savedPrivacy && (
                <Check className="h-4 w-4 text-green-500" />
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show Income Information</Label>
                <p className="text-sm text-muted-foreground">Display your income breakdown on your profile</p>
              </div>
              <Switch
                checked={showIncome}
                onCheckedChange={(value) => handlePrivacyChange("showIncome", value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show Asset Information</Label>
                <p className="text-sm text-muted-foreground">Display your assets and investments on your profile</p>
              </div>
              <Switch
                checked={showAssets}
                onCheckedChange={(value) => handlePrivacyChange("showAssets", value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Private Account</Label>
                <p className="text-sm text-muted-foreground">Only approved followers can see your posts</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive email updates about your activity</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Comment Notifications</Label>
                <p className="text-sm text-muted-foreground">Get notified when someone comments on your posts</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Like Notifications</Label>
                <p className="text-sm text-muted-foreground">Get notified when someone likes your posts</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full bg-transparent">
              Change Password
            </Button>
            <Button variant="destructive" className="w-full">
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
