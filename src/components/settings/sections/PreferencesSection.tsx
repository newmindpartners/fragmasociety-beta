import { useState } from "react";
import { Globe, DollarSign, Clock, Layout } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

const currencies: SelectOption[] = [
  { value: "usd", label: "USD ($)" },
  { value: "eur", label: "EUR (€)" },
  { value: "gbp", label: "GBP (£)" },
  { value: "chf", label: "CHF (Fr)" },
];

const languages: SelectOption[] = [
  { value: "en", label: "English" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "es", label: "Español" },
];

const timezones: SelectOption[] = [
  { value: "europe/zurich", label: "Europe/Zurich (CET)" },
  { value: "europe/london", label: "Europe/London (GMT)" },
  { value: "america/new_york", label: "America/New York (EST)" },
  { value: "asia/singapore", label: "Asia/Singapore (SGT)" },
];

const densities: SelectOption[] = [
  { value: "comfortable", label: "Comfortable" },
  { value: "compact", label: "Compact" },
];

export const PreferencesSection = () => {
  const [currency, setCurrency] = useState("eur");
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("europe/zurich");
  const [density, setDensity] = useState("comfortable");

  const renderSelect = (
    icon: React.ElementType,
    label: string,
    value: string,
    options: SelectOption[],
    onChange: (val: string) => void
  ) => {
    const Icon = icon;
    return (
      <div className="space-y-2">
        <Label className="text-slate-700 flex items-center gap-2">
          <Icon className="w-4 h-4 text-slate-500" />
          {label}
        </Label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {renderSelect(DollarSign, "Currency", currency, currencies, setCurrency)}
      {renderSelect(Globe, "Language", language, languages, setLanguage)}
      {renderSelect(Clock, "Timezone", timezone, timezones, setTimezone)}
      {renderSelect(Layout, "Display Density", density, densities, setDensity)}
    </div>
  );
};
