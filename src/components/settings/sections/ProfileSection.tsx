import { useState, useEffect } from "react";
import { Camera, Pencil, Check, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useUserProfile } from "@/hooks/useUserProfile";
import { toast } from "sonner";

const INVESTOR_TYPE_LABELS: Record<string, { label: string; color: string }> = {
  RETAIL: { label: "Retail Investor", color: "bg-blue-100 text-blue-700" },
  PROFESSIONAL: { label: "Professional Investor", color: "bg-emerald-100 text-emerald-700" },
  QUALIFIED: { label: "Qualified Investor", color: "bg-violet-100 text-violet-700" },
  ACCREDITED: { label: "Accredited Investor", color: "bg-amber-100 text-amber-700" },
  WHOLESALE: { label: "Wholesale Investor", color: "bg-teal-100 text-teal-700" },
  QII: { label: "Qualified Institutional Investor", color: "bg-indigo-100 text-indigo-700" },
};

export const ProfileSection = () => {
  const { profile, loading, updateProfile } = useUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");

  // Sync form with profile data
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || profile.fullName || "");
      setBio(profile.bio || "");
    }
  }, [profile]);

  const handleSave = async () => {
    setIsSaving(true);
    const success = await updateProfile({
      displayName,
      bio,
    } as any);
    setIsSaving(false);
    
    if (success) {
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } else {
      toast.error("Failed to update profile");
    }
  };

  const handleCancel = () => {
    // Reset to original values
    if (profile) {
      setDisplayName(profile.displayName || profile.fullName || "");
      setBio(profile.bio || "");
    }
    setIsEditing(false);
  };

  // Get initials for avatar
  const getInitials = () => {
    if (profile?.firstName && profile?.lastName) {
      return `${profile.firstName[0]}${profile.lastName[0]}`.toUpperCase();
    }
    if (profile?.fullName) {
      const parts = profile.fullName.split(" ");
      return parts.length > 1 
        ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
        : parts[0].substring(0, 2).toUpperCase();
    }
    return "U";
  };

  // Get investor type display
  const investorTypeInfo = INVESTOR_TYPE_LABELS[profile?.investorType || "RETAIL"];

  // Format member since date
  const memberSince = profile?.createdAt 
    ? new Date(profile.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "—";

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Avatar Section */}
      <div className="flex items-center gap-6">
        <div className="relative group">
          {profile?.avatarUrl ? (
            <img 
              src={profile.avatarUrl} 
              alt={profile.fullName || "User"} 
              className="w-20 h-20 rounded-2xl object-cover shadow-lg"
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {getInitials()}
            </div>
          )}
          <button className="absolute inset-0 rounded-2xl bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-6 h-6 text-white" />
          </button>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-slate-900">
              {profile?.fullName || profile?.email || "User"}
            </h3>
            {profile?.kycStatus === "APPROVED" && (
              <Badge className="bg-violet-100 text-violet-700 hover:bg-violet-100">
                Verified Investor
              </Badge>
            )}
          </div>
          <p className="text-sm text-slate-500">Member since {memberSince}</p>
          <Button variant="outline" size="sm" className="mt-2 gap-2 text-xs">
            <Camera className="w-3.5 h-3.5" />
            Change Photo
          </Button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-slate-700">Display Name</Label>
          <div className="relative">
            <Input 
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              disabled={!isEditing}
              className="bg-slate-50 border-slate-200 disabled:opacity-100"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-slate-700">Email</Label>
          <Input 
            value={profile?.email || ""}
            disabled
            className="bg-slate-50 border-slate-200 disabled:opacity-100"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label className="text-slate-700">Bio</Label>
          <Input 
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            disabled={!isEditing}
            placeholder="Tell us about yourself..."
            className="bg-slate-50 border-slate-200 disabled:opacity-100"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-700">Investor Type</Label>
          <div className="flex items-center gap-2">
            <Badge className={`${investorTypeInfo.color} hover:${investorTypeInfo.color}`}>
              {investorTypeInfo.label}
            </Badge>
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-slate-700">Country</Label>
          <Input 
            value={profile?.countryName || profile?.country || "—"}
            disabled
            className="bg-slate-50 border-slate-200 disabled:opacity-100"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-2">
        {isEditing ? (
          <>
            <Button 
              onClick={handleSave}
              disabled={isSaving}
              className="gap-2 bg-violet-600 hover:bg-violet-700"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              Save Changes
            </Button>
            <Button 
              variant="outline" 
              onClick={handleCancel}
              disabled={isSaving}
              className="gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </Button>
          </>
        ) : (
          <Button 
            variant="outline" 
            onClick={() => setIsEditing(true)}
            className="gap-2"
          >
            <Pencil className="w-4 h-4" />
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  );
};
