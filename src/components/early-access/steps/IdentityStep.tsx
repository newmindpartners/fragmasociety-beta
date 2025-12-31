import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { EarlyAccessFormData, countries } from "@/types/earlyAccess";

interface IdentityStepProps {
  formData: EarlyAccessFormData;
  updateField: <K extends keyof EarlyAccessFormData>(field: K, value: EarlyAccessFormData[K]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function IdentityStep({ formData, updateField, onNext, onBack }: IdentityStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-light text-white mb-2">
          Let's start with the basics
        </h2>
        <p className="text-white/60">
          Tell us who you are
        </p>
      </div>

      <div className="space-y-5">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-white/80 text-sm font-medium">
            Full name
          </Label>
          <Input
            id="fullName"
            type="text"
            placeholder="John Smith"
            value={formData.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 rounded-xl focus:border-violet-500/50 focus:ring-violet-500/20"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white/80 text-sm font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 rounded-xl focus:border-violet-500/50 focus:ring-violet-500/20"
          />
        </div>

        {/* Country */}
        <div className="space-y-2">
          <Label className="text-white/80 text-sm font-medium">
            Country of residence
          </Label>
          <Select value={formData.country} onValueChange={(value) => updateField('country', value)}>
            <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-violet-500/50 focus:ring-violet-500/20">
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-white/10 max-h-60">
              {countries.map((country) => (
                <SelectItem 
                  key={country} 
                  value={country}
                  className="text-white hover:bg-white/10 focus:bg-white/10"
                >
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* City */}
        <div className="space-y-2">
          <Label htmlFor="city" className="text-white/80 text-sm font-medium">
            City of residence
          </Label>
          <Input
            id="city"
            type="text"
            placeholder="New York"
            value={formData.city}
            onChange={(e) => updateField('city', e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 rounded-xl focus:border-violet-500/50 focus:ring-violet-500/20"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-white/60 hover:text-white hover:bg-white/5"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={onNext}
          className="bg-white text-slate-900 hover:bg-white/90 rounded-full px-6"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
