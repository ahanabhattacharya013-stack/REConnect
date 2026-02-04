import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Target,
  TrendingUp,
  Clock,
  Save,
  Search,
  Building2,
  Shield,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useApp } from '@/context/AppContext';
import { indianStates } from '@/data/mockData';
import { StatCard } from '@/components/ui/StatCard';
import { PieChartComponent } from '@/components/charts/PieChartComponent';
import { RadarChartComponent } from '@/components/charts/RadarChartComponent';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export default function Profile() {
  const { profile, updateProfile, setProfile, matches, calculateMatches } = useApp();
  const [localProfile, setLocalProfile] = useState(profile);

  const handleSave = () => {
    setProfile(localProfile);
    calculateMatches();
    toast.success('Profile saved successfully!');
  };

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(1)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(0)} L`;
    }
    return `₹${value.toLocaleString('en-IN')}`;
  };

  const toggleLocation = (state: string) => {
    setLocalProfile((prev) => ({
      ...prev,
      preferredLocations: prev.preferredLocations.includes(state)
        ? prev.preferredLocations.filter((s) => s !== state)
        : [...prev.preferredLocations, state],
    }));
  };

  const profileCompleteness = () => {
    let score = 0;
    if (localProfile.name) score += 15;
    if (localProfile.email) score += 15;
    if (localProfile.phone) score += 10;
    if (localProfile.address) score += 10;
    if (localProfile.budgetMax > localProfile.budgetMin) score += 20;
    if (localProfile.preferredLocations.length > 0) score += 15;
    if (localProfile.preferredPropertyTypes.length > 0) score += 15;
    return score;
  };

  const radarData = [
    { metric: 'Budget', value: Math.min((localProfile.budgetMax / 100000000) * 100, 100) },
    { metric: 'Risk', value: localProfile.riskTolerance === 'Aggressive' ? 90 : localProfile.riskTolerance === 'Balanced' ? 60 : 30 },
    { metric: 'Timeline', value: (localProfile.timeline / 20) * 100 },
    { metric: 'Locations', value: Math.min(localProfile.preferredLocations.length * 20, 100) },
    { metric: 'Diversity', value: Math.min(localProfile.preferredPropertyTypes.length * 25, 100) },
  ];

  const matchStats = {
    bestFit: matches.filter((m) => m.category === 'best-fit').length,
    mediumFit: matches.filter((m) => m.category === 'medium-fit').length,
    highRisk: matches.filter((m) => m.category === 'high-risk').length,
  };

  const matchDistribution = [
    { name: 'Best Fit', value: matchStats.bestFit || 1 },
    { name: 'Medium Fit', value: matchStats.mediumFit || 1 },
    { name: 'High Risk', value: matchStats.highRisk || 1 },
  ];

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl font-display font-bold">Investor Profile</h1>
              <p className="text-muted-foreground mt-1">
                Configure your investment preferences for personalized recommendations
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={calculateMatches} className="gap-2">
                <Search className="w-4 h-4" />
                Find Matches
              </Button>
              <Button className="btn-primary gap-2" onClick={handleSave}>
                <Save className="w-4 h-4" />
                Save Profile
              </Button>
            </div>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <StatCard
              title="Profile Completeness"
              value={`${profileCompleteness()}%`}
              icon={<User className="w-6 h-6" />}
              trend={profileCompleteness() >= 80 ? 'up' : 'neutral'}
            />
            <StatCard
              title="Best-Fit Matches"
              value={matchStats.bestFit.toString()}
              icon={<Target className="w-6 h-6" />}
              trend="up"
            />
            <StatCard
              title="Budget Range"
              value={formatCurrency(localProfile.budgetMax)}
              icon={<DollarSign className="w-6 h-6" />}
            />
            <StatCard
              title="Risk Profile"
              value={localProfile.riskTolerance}
              icon={<Shield className="w-6 h-6" />}
            />
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Personal Information */}
              <div className="glass-card p-6 space-y-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Personal Information
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={localProfile.name}
                      onChange={(e) => setLocalProfile((p) => ({ ...p, name: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={localProfile.email}
                      onChange={(e) => setLocalProfile((p) => ({ ...p, email: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+91 XXXXX XXXXX"
                      value={localProfile.phone}
                      onChange={(e) => setLocalProfile((p) => ({ ...p, phone: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter your full address"
                      value={localProfile.address}
                      onChange={(e) => setLocalProfile((p) => ({ ...p, address: e.target.value }))}
                      className="input-field min-h-20"
                    />
                  </div>
                </div>
              </div>

              {/* Investment Criteria */}
              <div className="glass-card p-6 space-y-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Investment Criteria
                </h2>

                {/* Budget Range */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Budget Range</Label>
                    <span className="text-sm text-primary font-medium">
                      {formatCurrency(localProfile.budgetMin)} - {formatCurrency(localProfile.budgetMax)}
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <span className="text-xs text-muted-foreground">Minimum Budget</span>
                      <Slider
                        value={[localProfile.budgetMin]}
                        min={500000}
                        max={100000000}
                        step={500000}
                        onValueChange={([value]) =>
                          setLocalProfile((p) => ({ ...p, budgetMin: value }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <span className="text-xs text-muted-foreground">Maximum Budget</span>
                      <Slider
                        value={[localProfile.budgetMax]}
                        min={500000}
                        max={500000000}
                        step={500000}
                        onValueChange={([value]) =>
                          setLocalProfile((p) => ({ ...p, budgetMax: value }))
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Risk Tolerance */}
                <div className="space-y-3">
                  <Label>Risk Tolerance</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['Conservative', 'Balanced', 'Aggressive'] as const).map((risk) => (
                      <Button
                        key={risk}
                        variant={localProfile.riskTolerance === risk ? 'default' : 'outline'}
                        onClick={() => setLocalProfile((p) => ({ ...p, riskTolerance: risk }))}
                        className={
                          localProfile.riskTolerance === risk
                            ? 'btn-primary'
                            : 'hover:border-primary/50'
                        }
                      >
                        {risk}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Investment Goal */}
                <div className="space-y-3">
                  <Label>Primary Investment Goal</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {(['Rental Income', 'Capital Appreciation'] as const).map((goal) => (
                      <Button
                        key={goal}
                        variant={localProfile.investmentGoal === goal ? 'default' : 'outline'}
                        onClick={() => setLocalProfile((p) => ({ ...p, investmentGoal: goal }))}
                        className={`gap-2 ${
                          localProfile.investmentGoal === goal
                            ? 'btn-primary'
                            : 'hover:border-primary/50'
                        }`}
                      >
                        {goal === 'Rental Income' ? (
                          <DollarSign className="w-4 h-4" />
                        ) : (
                          <TrendingUp className="w-4 h-4" />
                        )}
                        {goal}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-3">
                  <Label>Investment Timeline</Label>
                  <Select
                    value={localProfile.timeline.toString()}
                    onValueChange={(value) =>
                      setLocalProfile((p) => ({ ...p, timeline: parseInt(value) as 5 | 10 | 20 }))
                    }
                  >
                    <SelectTrigger className="input-field">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Years</SelectItem>
                      <SelectItem value="10">10 Years</SelectItem>
                      <SelectItem value="20">20 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Location Preferences */}
              <div className="glass-card p-6 space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Preferred Locations
                </h2>
                <p className="text-sm text-muted-foreground">
                  Select states where you'd like to invest (leave empty for all India)
                </p>
                <div className="flex flex-wrap gap-2">
                  {indianStates.map((state) => (
                    <Badge
                      key={state}
                      variant={localProfile.preferredLocations.includes(state) ? 'default' : 'outline'}
                      className={`cursor-pointer transition-all ${
                        localProfile.preferredLocations.includes(state)
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:border-primary/50'
                      }`}
                      onClick={() => toggleLocation(state)}
                    >
                      {state}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Property Type Preferences */}
              <div className="glass-card p-6 space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  Property Type Preferences
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Residential', 'Commercial', 'Industrial', 'Retail'].map((type) => (
                    <Button
                      key={type}
                      variant={
                        localProfile.preferredPropertyTypes.includes(type) ? 'default' : 'outline'
                      }
                      onClick={() =>
                        setLocalProfile((p) => ({
                          ...p,
                          preferredPropertyTypes: p.preferredPropertyTypes.includes(type)
                            ? p.preferredPropertyTypes.filter((t) => t !== type)
                            : [...p.preferredPropertyTypes, type],
                        }))
                      }
                      className={
                        localProfile.preferredPropertyTypes.includes(type)
                          ? 'btn-primary'
                          : 'hover:border-primary/50'
                      }
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Sidebar Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <RadarChartComponent
                data={radarData}
                angleKey="metric"
                dataKeys={[{ key: 'value', name: 'Profile Strength' }]}
                title="Profile Analysis"
                height={280}
              />

              <PieChartComponent
                data={matchDistribution}
                title="Match Distribution"
                height={280}
                innerRadius={50}
                outerRadius={80}
              />

              {/* Quick Stats */}
              <div className="glass-card p-6 space-y-4">
                <h3 className="font-semibold">Profile Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Risk Profile</span>
                    <Badge variant="secondary">{localProfile.riskTolerance}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Goal</span>
                    <Badge variant="secondary">{localProfile.investmentGoal.split(' ')[0]}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Timeline</span>
                    <Badge variant="secondary">{localProfile.timeline} Years</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Locations</span>
                    <Badge variant="secondary">
                      {localProfile.preferredLocations.length || 'All India'}
                    </Badge>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
