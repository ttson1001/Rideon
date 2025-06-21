import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useApp } from '@/contexts/app-context';
import {
  Bell,
  Shield,
  CreditCard,
  Globe,
  Moon,
  Sun,
  Smartphone,
  Mail,
  MessageSquare,
  Eye,
  EyeOff,
  Trash2,
  Download,
  Monitor,
  Check,
} from 'lucide-react';

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  marketing: boolean;
  bookingUpdates: boolean;
  paymentAlerts: boolean;
  newMessages: boolean;
}

interface PrivacySettings {
  profileVisible: boolean;
  showEmail: boolean;
  showPhone: boolean;
  allowMessages: boolean;
}

const Settings: FC = () => {
  const { language, setLanguage, theme, setTheme, t } = useApp();

  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    push: true,
    sms: false,
    marketing: false,
    bookingUpdates: true,
    paymentAlerts: true,
    newMessages: true,
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
    allowMessages: true,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleNotificationChange = (key: keyof NotificationSettings, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key: keyof PrivacySettings, value: boolean) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }));
  };

  const languages = [
    { code: 'vi' as const, name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
  ];

  const themes = [
    { value: 'light' as const, label: t('settings.appearance.light'), icon: Sun },
    { value: 'dark' as const, label: t('settings.appearance.dark'), icon: Moon },
    { value: 'system' as const, label: t('settings.appearance.system'), icon: Monitor },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{t('settings.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{t('settings.description')}</p>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="account">{t('settings.tabs.account')}</TabsTrigger>
          <TabsTrigger value="notifications">{t('settings.tabs.notifications')}</TabsTrigger>
          <TabsTrigger value="privacy">{t('settings.tabs.privacy')}</TabsTrigger>
          <TabsTrigger value="appearance">{t('settings.tabs.appearance')}</TabsTrigger>
          <TabsTrigger value="security">{t('settings.tabs.security')}</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                {t('settings.account.title')}
              </CardTitle>
              <CardDescription>{t('settings.account.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t('settings.account.firstName')}</Label>
                  <Input id="firstName" defaultValue="Nguyễn" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{t('settings.account.lastName')}</Label>
                  <Input id="lastName" defaultValue="Văn An" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="nguyenvanan@email.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t('settings.account.phone')}</Label>
                <Input id="phone" defaultValue="0123456789" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">{t('settings.appearance.language')}</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <div className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button>{t('settings.account.saveChanges')}</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">{t('settings.account.dangerZone')}</CardTitle>
              <CardDescription>{t('settings.account.dangerDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                <div>
                  <h4 className="font-medium">{t('settings.account.downloadData')}</h4>
                  <p className="text-sm text-gray-600">{t('settings.account.downloadDescription')}</p>
                </div>
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  {t('settings.account.download')}
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-red-600">{t('settings.account.deleteAccount')}</h4>
                  <p className="text-sm text-gray-600">{t('settings.account.deleteDescription')}</p>
                </div>
                <Button variant="destructive" className="gap-2">
                  <Trash2 className="w-4 h-4" />
                  {t('settings.account.delete')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                {t('settings.notifications.title')}
              </CardTitle>
              <CardDescription>{t('settings.notifications.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <div>
                      <Label>{t('settings.notifications.email')}</Label>
                      <p className="text-sm text-gray-600">{t('settings.notifications.emailDescription')}</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked: boolean) => handleNotificationChange('email', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-gray-500" />
                    <div>
                      <Label>{t('settings.notifications.push')}</Label>
                      <p className="text-sm text-gray-600">{t('settings.notifications.pushDescription')}</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked: boolean) => handleNotificationChange('push', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-gray-500" />
                    <div>
                      <Label>{t('settings.notifications.sms')}</Label>
                      <p className="text-sm text-gray-600">{t('settings.notifications.smsDescription')}</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.sms}
                    onCheckedChange={(checked: boolean) => handleNotificationChange('sms', checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">{t('settings.notifications.types')}</h4>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>{t('settings.notifications.bookingUpdates')}</Label>
                    <p className="text-sm text-gray-600">{t('settings.notifications.bookingDescription')}</p>
                  </div>
                  <Switch
                    checked={notifications.bookingUpdates}
                    onCheckedChange={(checked: boolean) => handleNotificationChange('bookingUpdates', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>{t('settings.notifications.paymentAlerts')}</Label>
                    <p className="text-sm text-gray-600">{t('settings.notifications.paymentDescription')}</p>
                  </div>
                  <Switch
                    checked={notifications.paymentAlerts}
                    onCheckedChange={(checked: boolean) => handleNotificationChange('paymentAlerts', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>{t('settings.notifications.newMessages')}</Label>
                    <p className="text-sm text-gray-600">{t('settings.notifications.messagesDescription')}</p>
                  </div>
                  <Switch
                    checked={notifications.newMessages}
                    onCheckedChange={(checked: boolean) => handleNotificationChange('newMessages', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                {t('settings.privacy.title')}
              </CardTitle>
              <CardDescription>{t('settings.privacy.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>{t('settings.privacy.profileVisible')}</Label>
                    <p className="text-sm text-gray-600">{t('settings.privacy.profileDescription')}</p>
                  </div>
                  <Switch
                    checked={privacy.profileVisible}
                    onCheckedChange={(checked: boolean) => handlePrivacyChange('profileVisible', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>{t('settings.privacy.showEmail')}</Label>
                    <p className="text-sm text-gray-600">{t('settings.privacy.emailDescription')}</p>
                  </div>
                  <Switch
                    checked={privacy.showEmail}
                    onCheckedChange={(checked: boolean) => handlePrivacyChange('showEmail', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>{t('settings.privacy.showPhone')}</Label>
                    <p className="text-sm text-gray-600">{t('settings.privacy.phoneDescription')}</p>
                  </div>
                  <Switch
                    checked={privacy.showPhone}
                    onCheckedChange={(checked: boolean) => handlePrivacyChange('showPhone', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>{t('settings.privacy.allowMessages')}</Label>
                    <p className="text-sm text-gray-600">{t('settings.privacy.messagesDescription')}</p>
                  </div>
                  <Switch
                    checked={privacy.allowMessages}
                    onCheckedChange={(checked: boolean) => handlePrivacyChange('allowMessages', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                {t('settings.appearance.title')}
              </CardTitle>
              <CardDescription>{t('settings.appearance.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>{t('settings.appearance.theme')}</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {themes.map((themeOption) => {
                      const Icon = themeOption.icon;
                      return (
                        <Button
                          key={themeOption.value}
                          variant={theme === themeOption.value ? 'default' : 'outline'}
                          className="h-auto py-4 flex flex-col items-center gap-2"
                          onClick={() => setTheme(themeOption.value)}
                        >
                          <Icon className="w-5 h-5" />
                          <span>{themeOption.label}</span>
                          {theme === themeOption.value && <Check className="w-4 h-4" />}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                {t('settings.security.title')}
              </CardTitle>
              <CardDescription>{t('settings.security.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">{t('settings.security.currentPassword')}</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? 'text' : 'password'}
                      defaultValue="••••••••"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">{t('settings.security.newPassword')}</Label>
                  <Input id="newPassword" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t('settings.security.confirmPassword')}</Label>
                  <Input id="confirmPassword" type="password" />
                </div>

                <Button>{t('settings.security.updatePassword')}</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings; 