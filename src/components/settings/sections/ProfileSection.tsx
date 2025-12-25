import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Pencil, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState("Alexander Dubois");
  const [bio, setBio] = useState("Private investor focused on real estate and alternative assets.");
  
  return (
    <div className="space-y-6">
      {/* Avatar Section */}
      <div className="flex items-center gap-6">
        <div className="relative group">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            AD
          </div>
          <button className="absolute inset-0 rounded-2xl bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-6 h-6 text-white" />
          </button>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-slate-900">Alexander Dubois</h3>
            <Badge className="bg-violet-100 text-violet-700 hover:bg-violet-100">
              Verified Investor
            </Badge>
          </div>
          <p className="text-sm text-slate-500">Member since January 2024</p>
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
            value="alex.dubois@example.com"
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
            className="bg-slate-50 border-slate-200 disabled:opacity-100"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-700">Investor Type</Label>
          <div className="flex items-center gap-2">
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
              Professional Investor
            </Badge>
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-slate-700">Country</Label>
          <Input 
            value="Switzerland"
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
              onClick={() => setIsEditing(false)}
              className="gap-2 bg-violet-600 hover:bg-violet-700"
            >
              <Check className="w-4 h-4" />
              Save Changes
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(false)}
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
