import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  User,
  Shield,
  Bell,
  Eye,
  Globe,
  CheckCircle2,
  Link2,
  Crown,
  ChevronDown,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileSection } from "./sections/ProfileSection";
import { SecuritySection } from "./sections/SecuritySection";
import { NotificationsSection } from "./sections/NotificationsSection";
import { PrivacySection } from "./sections/PrivacySection";
import { PreferencesSection } from "./sections/PreferencesSection";
import { VerificationSection } from "./sections/VerificationSection";
import { ConnectedAccountsSection } from "./sections/ConnectedAccountsSection";
import { MembershipSection } from "./sections/MembershipSection";

interface SettingsSection {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  component: React.ComponentType;
  status?: "complete" | "incomplete" | "warning";
}

const settingsSections: SettingsSection[] = [
  {
    id: "profile",
    label: "Profile",
    description: "Personal information and display settings",
    icon: User,
    color: "text-violet-600",
    bgColor: "bg-violet-100",
    component: ProfileSection,
    status: "complete"
  },
  {
    id: "security",
    label: "Security",
    description: "Password, 2FA, and login activity",
    icon: Shield,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
    component: SecuritySection,
    status: "warning"
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Email, push, and in-app alerts",
    icon: Bell,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    component: NotificationsSection,
    status: "complete"
  },
  {
    id: "privacy",
    label: "Privacy & Data",
    description: "Data sharing and visibility controls",
    icon: Eye,
    color: "text-slate-600",
    bgColor: "bg-slate-100",
    component: PrivacySection,
    status: "complete"
  },
  {
    id: "preferences",
    label: "Preferences",
    description: "Currency, language, and display options",
    icon: Globe,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    component: PreferencesSection,
    status: "complete"
  },
  {
    id: "verification",
    label: "Verification",
    description: "KYC status and identity documents",
    icon: CheckCircle2,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    component: VerificationSection,
    status: "incomplete"
  },
  {
    id: "connected",
    label: "Connected Accounts",
    description: "Bank accounts and wallets",
    icon: Link2,
    color: "text-cyan-600",
    bgColor: "bg-cyan-100",
    component: ConnectedAccountsSection,
    status: "complete"
  },
  {
    id: "membership",
    label: "Membership",
    description: "Plan, billing, and benefits",
    icon: Crown,
    color: "text-pink-600",
    bgColor: "bg-pink-100",
    component: MembershipSection,
    status: "complete"
  }
];

export const SettingsContent = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>("profile");

  const completedCount = settingsSections.filter(s => s.status === "complete").length;
  const completionPercentage = Math.round((completedCount / settingsSections.length) * 100);

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Settings className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Settings</h1>
            <p className="text-sm text-slate-500">
              Manage your account and preferences
            </p>
          </div>
        </div>

        {/* Completion Progress */}
        <div className="flex items-center gap-4 bg-white rounded-xl border border-slate-200 px-4 py-3 shadow-sm">
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 transform -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="4"
              />
              <motion.circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ strokeDasharray: "0 126" }}
                animate={{ strokeDasharray: `${completionPercentage * 1.26} 126` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-slate-700">{completionPercentage}%</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Profile Completion</p>
            <p className="text-xs text-slate-500">{completedCount} of {settingsSections.length} sections complete</p>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-3">
        {settingsSections.map((section, index) => (
          <SettingsAccordion
            key={section.id}
            section={section}
            index={index}
            isExpanded={expandedSection === section.id}
            onToggle={() => toggleSection(section.id)}
          />
        ))}
      </div>

      {/* Help Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-100"
      >
        <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-violet-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-900">Need help?</p>
          <p className="text-xs text-slate-600 mt-0.5">
            Contact our support team at{" "}
            <a href="mailto:support@fragma.io" className="text-violet-600 hover:underline">
              support@fragma.io
            </a>{" "}
            or visit our Help Center.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

interface SettingsAccordionProps {
  section: SettingsSection;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const SettingsAccordion = ({ section, index, isExpanded, onToggle }: SettingsAccordionProps) => {
  const Icon = section.icon;
  const Component = section.component;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        "rounded-xl border bg-white overflow-hidden transition-all duration-300",
        isExpanded 
          ? "border-violet-200 shadow-lg shadow-violet-500/5" 
          : "border-slate-200 hover:border-slate-300 hover:shadow-md"
      )}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full p-4 lg:p-5 flex items-center gap-4 text-left transition-colors hover:bg-slate-50/50"
      >
        {/* Icon */}
        <motion.div 
          className={cn(
            "flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300",
            section.bgColor
          )}
          whileHover={{ scale: 1.05 }}
        >
          <Icon className={cn("w-5 h-5", section.color)} strokeWidth={1.75} />
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm lg:text-base font-semibold text-slate-900">
              {section.label}
            </h3>
            {section.status === "incomplete" && (
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-semibold">
                Action needed
              </span>
            )}
            {section.status === "warning" && (
              <AlertCircle className="w-4 h-4 text-amber-500" />
            )}
          </div>
          <p className="text-xs lg:text-sm text-slate-500 mt-0.5">
            {section.description}
          </p>
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-slate-400" />
        </motion.div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 lg:px-5 pb-5 pt-2 border-t border-slate-100">
              <Component />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
