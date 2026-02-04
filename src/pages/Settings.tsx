import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Moon,
  Sun,
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Shield,
  Lock,
  Eye,
  BarChart3,
  Megaphone,
  Save,
  RotateCcw,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useApp } from '@/context/AppContext';
import { Settings as SettingsType } from '@/types';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const languages = [
  'English',
  'Hindi',
  'Tamil',
  'Telugu',
  'Kannada',
  'Malayalam',
  'Marathi',
  'Bengali',
  'Gujarati',
];

export default function Settings() {
  const { settings, updateSettings } = useApp();
  const [localSettings, setLocalSettings] = useState<SettingsType>(settings);

  const handleSave = () => {
    updateSettings(localSettings);
    toast.success('Settings saved successfully!');
  };

  const handleReset = () => {
    const defaultSettings: SettingsType = {
      language: 'English',
      theme: 'dark',
      notifications: {
        email: true,
        push: true,
        sms: false,
      },
      privacy: {
        shareData: false,
        analytics: true,
        marketing: false,
      },
    };
    setLocalSettings(defaultSettings);
    toast.info('Settings reset to defaults');
  };

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl font-display font-bold">Settings</h1>
              <p className="text-muted-foreground mt-1">
                Manage your preferences and account settings
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleReset} className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
              <Button className="btn-primary gap-2" onClick={handleSave}>
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </motion.div>

          {/* Language & Theme */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 space-y-6"
          >
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Language & Appearance
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Language */}
              <div className="space-y-3">
                <Label>Language</Label>
                <Select
                  value={localSettings.language}
                  onValueChange={(value) =>
                    setLocalSettings((s) => ({ ...s, language: value }))
                  }
                >
                  <SelectTrigger className="input-field">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Theme */}
              <div className="space-y-3">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-3">
                  {(['dark', 'light', 'system'] as const).map((theme) => (
                    <Button
                      key={theme}
                      variant={localSettings.theme === theme ? 'default' : 'outline'}
                      onClick={() => setLocalSettings((s) => ({ ...s, theme }))}
                      className={`gap-2 capitalize ${
                        localSettings.theme === theme ? 'btn-primary' : 'hover:border-primary/50'
                      }`}
                    >
                      {theme === 'dark' ? (
                        <Moon className="w-4 h-4" />
                      ) : theme === 'light' ? (
                        <Sun className="w-4 h-4" />
                      ) : (
                        <Globe className="w-4 h-4" />
                      )}
                      {theme}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 space-y-6"
          >
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notification Preferences
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive property matches and market updates via email
                    </p>
                  </div>
                </div>
                <Switch
                  checked={localSettings.notifications.email}
                  onCheckedChange={(checked) =>
                    setLocalSettings((s) => ({
                      ...s,
                      notifications: { ...s.notifications, email: checked },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Get instant alerts for new opportunities
                    </p>
                  </div>
                </div>
                <Switch
                  checked={localSettings.notifications.push}
                  onCheckedChange={(checked) =>
                    setLocalSettings((s) => ({
                      ...s,
                      notifications: { ...s.notifications, push: checked },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive critical alerts via text message
                    </p>
                  </div>
                </div>
                <Switch
                  checked={localSettings.notifications.sms}
                  onCheckedChange={(checked) =>
                    setLocalSettings((s) => ({
                      ...s,
                      notifications: { ...s.notifications, sms: checked },
                    }))
                  }
                />
              </div>
            </div>
          </motion.div>

          {/* Privacy Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 space-y-6"
          >
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Privacy & Data
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Share Profile Data</p>
                    <p className="text-sm text-muted-foreground">
                      Allow sharing anonymized data with partner platforms
                    </p>
                  </div>
                </div>
                <Switch
                  checked={localSettings.privacy.shareData}
                  onCheckedChange={(checked) =>
                    setLocalSettings((s) => ({
                      ...s,
                      privacy: { ...s.privacy, shareData: checked },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Usage Analytics</p>
                    <p className="text-sm text-muted-foreground">
                      Help improve REConnect with anonymous usage data
                    </p>
                  </div>
                </div>
                <Switch
                  checked={localSettings.privacy.analytics}
                  onCheckedChange={(checked) =>
                    setLocalSettings((s) => ({
                      ...s,
                      privacy: { ...s.privacy, analytics: checked },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Megaphone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Marketing Communications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive promotional offers and updates
                    </p>
                  </div>
                </div>
                <Switch
                  checked={localSettings.privacy.marketing}
                  onCheckedChange={(checked) =>
                    setLocalSettings((s) => ({
                      ...s,
                      privacy: { ...s.privacy, marketing: checked },
                    }))
                  }
                />
              </div>
            </div>
          </motion.div>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6 space-y-4 border-destructive/30"
          >
            <h2 className="text-xl font-semibold flex items-center gap-2 text-destructive">
              <Lock className="w-5 h-5" />
              Danger Zone
            </h2>
            <p className="text-sm text-muted-foreground">
              These actions are irreversible. Please proceed with caution.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10">
                Clear All Data
              </Button>
              <Button variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10">
                Delete Account
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
