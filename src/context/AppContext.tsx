import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { InvestorProfile, Notification, Settings, Property, MatchResult } from '@/types';
import { defaultInvestorProfile, mockNotifications, mockProperties } from '@/data/mockData';

interface AppContextType {
  // Profile
  profile: InvestorProfile;
  setProfile: (profile: InvestorProfile) => void;
  updateProfile: (updates: Partial<InvestorProfile>) => void;
  
  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
  unreadCount: number;
  
  // Settings
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;
  
  // Properties
  properties: Property[];
  setProperties: (properties: Property[]) => void;
  
  // Matches
  matches: MatchResult[];
  calculateMatches: () => void;
  
  // Analysis
  uploadedData: any[];
  setUploadedData: (data: any[]) => void;
  analysisResults: any;
  setAnalysisResults: (results: any) => void;
}

const defaultSettings: Settings = {
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

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<InvestorProfile>(() => {
    const saved = localStorage.getItem('investorProfile');
    return saved ? JSON.parse(saved) : defaultInvestorProfile;
  });
  
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : mockNotifications;
  });
  
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });
  
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [uploadedData, setUploadedData] = useState<any[]>([]);
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  // Persist profile
  useEffect(() => {
    localStorage.setItem('investorProfile', JSON.stringify(profile));
  }, [profile]);

  // Persist notifications
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Persist settings
  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const setProfile = (newProfile: InvestorProfile) => {
    setProfileState(newProfile);
    addNotification({
      type: 'success',
      title: 'Profile Saved',
      message: 'Your investor profile has been updated successfully.',
    });
  };

  const updateProfile = (updates: Partial<InvestorProfile>) => {
    setProfileState(prev => ({
      ...prev,
      ...updates,
      updatedAt: new Date(),
    }));
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const updateSettings = (updates: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
    addNotification({
      type: 'success',
      title: 'Settings Updated',
      message: 'Your preferences have been saved.',
    });
  };

  const calculateMatches = () => {
    const results: MatchResult[] = properties.map(property => {
      let matchScore = 0;
      const reasons: string[] = [];

      // Budget match (40%)
      if (property.price >= profile.budgetMin && property.price <= profile.budgetMax) {
        matchScore += 40;
        reasons.push('Within budget range');
      } else if (property.price <= profile.budgetMax * 1.1) {
        matchScore += 20;
        reasons.push('Slightly above budget');
      }

      // Goal match (30%)
      if (profile.investmentGoal === 'Rental Income' && property.rentalYield > 6) {
        matchScore += 30;
        reasons.push('High rental yield');
      } else if (profile.investmentGoal === 'Capital Appreciation' && property.appreciation > 10) {
        matchScore += 30;
        reasons.push('Strong appreciation potential');
      } else {
        matchScore += 15;
      }

      // Risk match (20%)
      if (
        (profile.riskTolerance === 'Conservative' && property.riskLevel === 'Low') ||
        (profile.riskTolerance === 'Balanced' && property.riskLevel !== 'High') ||
        (profile.riskTolerance === 'Aggressive')
      ) {
        matchScore += 20;
        reasons.push('Risk profile aligned');
      }

      // Location preference (10%)
      if (profile.preferredLocations.includes(property.state) || profile.preferredLocations.length === 0) {
        matchScore += 10;
        reasons.push('Preferred location');
      }

      // Determine category
      let category: 'best-fit' | 'medium-fit' | 'high-risk';
      if (matchScore >= 80 && property.riskLevel !== 'High') {
        category = 'best-fit';
      } else if (property.riskLevel === 'High' && property.opportunityScore > 85) {
        category = 'high-risk';
      } else {
        category = 'medium-fit';
      }

      return {
        property,
        matchScore,
        category,
        reasons,
      };
    });

    results.sort((a, b) => b.matchScore - a.matchScore);
    setMatches(results);
    
    addNotification({
      type: 'success',
      title: 'Matching Complete',
      message: `Found ${results.filter(r => r.category === 'best-fit').length} best-fit properties.`,
    });
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        setProfile,
        updateProfile,
        notifications,
        addNotification,
        markNotificationRead,
        markAllNotificationsRead,
        clearNotifications,
        unreadCount,
        settings,
        updateSettings,
        properties,
        setProperties,
        matches,
        calculateMatches,
        uploadedData,
        setUploadedData,
        analysisResults,
        setAnalysisResults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
