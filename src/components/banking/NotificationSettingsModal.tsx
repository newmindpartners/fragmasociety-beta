import { Bell, Mail, Smartphone, ArrowDownLeft, ArrowUpRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNotificationPreferences } from "@/hooks/useNotificationPreferences";
import { Skeleton } from "@/components/ui/skeleton";

interface NotificationSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NotificationSettingsModal = ({ open, onOpenChange }: NotificationSettingsModalProps) => {
  const { preferences, loading, togglePreference } = useNotificationPreferences();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="theme-dashboard sm:max-w-md bg-white border-gray-200 text-gray-900 max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="space-y-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Bell className="w-6 h-6 text-primary" />
          </div>
          <div>
            <DialogTitle className="text-xl font-semibold text-foreground">Transfer Notifications</DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Choose how you want to be notified about your transfers
            </p>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4 flex-1 overflow-y-auto">
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-10 rounded-full" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Notification Channels */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Notification Channels</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <Label className="font-medium text-foreground">Email Notifications</Label>
                        <p className="text-xs text-muted-foreground">Receive transfer updates via email</p>
                      </div>
                    </div>
                    <Switch
                      checked={preferences?.transfer_email ?? true}
                      onCheckedChange={() => togglePreference("transfer_email")}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <Label className="font-medium text-foreground">Push Notifications</Label>
                        <p className="text-xs text-muted-foreground">Receive instant push notifications</p>
                      </div>
                    </div>
                    <Switch
                      checked={preferences?.transfer_push ?? true}
                      onCheckedChange={() => togglePreference("transfer_push")}
                    />
                  </div>
                </div>
              </div>

              {/* Notification Types */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Notification Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <ArrowDownLeft className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <Label className="font-medium text-foreground">Deposit Confirmations</Label>
                        <p className="text-xs text-muted-foreground">When your deposit is received</p>
                      </div>
                    </div>
                    <Switch
                      checked={preferences?.deposit_confirmed ?? true}
                      onCheckedChange={() => togglePreference("deposit_confirmed")}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                        <ArrowUpRight className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <Label className="font-medium text-foreground">Withdrawal Confirmations</Label>
                        <p className="text-xs text-muted-foreground">When your withdrawal is processed</p>
                      </div>
                    </div>
                    <Switch
                      checked={preferences?.withdrawal_confirmed ?? true}
                      onCheckedChange={() => togglePreference("withdrawal_confirmed")}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <RefreshCw className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <Label className="font-medium text-foreground">Status Updates</Label>
                        <p className="text-xs text-muted-foreground">When transfer status changes</p>
                      </div>
                    </div>
                    <Switch
                      checked={preferences?.status_updates ?? true}
                      onCheckedChange={() => togglePreference("status_updates")}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Action Button */}
          <Button
            type="button"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => onOpenChange(false)}
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};