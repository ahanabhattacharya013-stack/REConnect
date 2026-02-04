import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Building2,
  TrendingUp,
  Users,
  Target,
  Upload,
  BarChart3,
  PieChart,
  FileText,
  Search,
  Filter,
  RefreshCw,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatCard } from '@/components/ui/StatCard';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { AreaChartComponent } from '@/components/charts/AreaChartComponent';
import { PieChartComponent } from '@/components/charts/PieChartComponent';
import { BarChartComponent } from '@/components/charts/BarChartComponent';
import { useApp } from '@/context/AppContext';
import { mockProperties, marketTrends, sectorAllocation, riskDistribution } from '@/data/mockData';
import { chartColors } from '@/components/charts/ChartColors';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const quickActions = [
  { icon: Upload, label: 'Upload Data', path: '/upload', color: 'from-primary to-secondary' },
  { icon: Users, label: 'Investor Profile', path: '/profile', color: 'from-secondary to-primary' },
  { icon: Target, label: 'Find Matches', path: '/properties', color: 'from-primary to-secondary' },
  { icon: FileText, label: 'View Reports', path: '/about', color: 'from-secondary to-primary' },
];

export default function Dashboard() {
  const { properties, matches, calculateMatches, profile } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');

  useEffect(() => {
    if (matches.length === 0 && profile.budgetMax > 0) {
      calculateMatches();
    }
  }, []);

  const filteredProperties = mockProperties.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === 'all' || property.city === selectedCity;
    const matchesRisk = selectedRisk === 'all' || property.riskLevel === selectedRisk;
    return matchesSearch && matchesCity && matchesRisk;
  });

  const cities = [...new Set(mockProperties.map((p) => p.city))];

  const totalValue = mockProperties.reduce((sum, p) => sum + p.price, 0);
  const avgScore = Math.round(mockProperties.reduce((sum, p) => sum + p.opportunityScore, 0) / mockProperties.length);
  const avgYield = (mockProperties.reduce((sum, p) => sum + p.rentalYield, 0) / mockProperties.length).toFixed(1);

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
              <h1 className="text-3xl font-display font-bold">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Your real estate investment command center
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2" onClick={calculateMatches}>
                <RefreshCw className="w-4 h-4" />
                Refresh Data
              </Button>
              <Link to="/upload">
                <Button className="btn-primary gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Data
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {quickActions.map((action, index) => (
              <Link key={action.label} to={action.path}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`glass-card p-4 flex items-center gap-3 cursor-pointer hover:border-primary/30 transition-all`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center`}
                  >
                    <action.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="font-medium">{action.label}</span>
                </motion.div>
              </Link>
            ))}
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <StatCard
              title="Total Portfolio Value"
              value={`₹${(totalValue / 10000000).toFixed(0)} Cr`}
              change={12.5}
              trend="up"
              icon={<Building2 className="w-6 h-6" />}
            />
            <StatCard
              title="Properties Analyzed"
              value={mockProperties.length.toString()}
              change={8}
              trend="up"
              icon={<BarChart3 className="w-6 h-6" />}
            />
            <StatCard
              title="Avg Opportunity Score"
              value={avgScore.toString()}
              change={3.2}
              trend="up"
              icon={<Target className="w-6 h-6" />}
            />
            <StatCard
              title="Avg Rental Yield"
              value={`${avgYield}%`}
              change={0.5}
              trend="up"
              icon={<TrendingUp className="w-6 h-6" />}
            />
          </motion.div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <AreaChartComponent
                data={marketTrends}
                xAxisKey="month"
                dataKeys={[
                  { key: 'residential', name: 'Residential', color: chartColors.pink },
                  { key: 'commercial', name: 'Commercial', color: chartColors.lavender },
                  { key: 'industrial', name: 'Industrial', color: chartColors.mint },
                ]}
                title="Market Trend Index"
                height={320}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <PieChartComponent
                data={sectorAllocation}
                title="Sector Allocation"
                height={320}
                innerRadius={50}
                outerRadius={90}
              />
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <PieChartComponent
                data={riskDistribution}
                title="Risk Distribution"
                height={280}
                innerRadius={50}
                outerRadius={90}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <BarChartComponent
                data={mockProperties.slice(0, 5).map((p) => ({
                  name: p.city,
                  score: p.opportunityScore,
                  yield: p.rentalYield * 10,
                }))}
                xAxisKey="name"
                dataKeys={[
                  { key: 'score', name: 'Score', color: chartColors.pink },
                  { key: 'yield', name: 'Yield x10', color: chartColors.lavender },
                ]}
                title="Top Cities by Opportunity"
                height={280}
              />
            </motion.div>
          </div>

          {/* Properties Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-2xl font-display font-semibold">Featured Properties</h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search properties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full sm:w-64 input-field"
                  />
                </div>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-full sm:w-40 input-field">
                    <SelectValue placeholder="All Cities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedRisk} onValueChange={setSelectedRisk}>
                  <SelectTrigger className="w-full sm:w-40 input-field">
                    <SelectValue placeholder="All Risk Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risk</SelectItem>
                    <SelectItem value="Low">Low Risk</SelectItem>
                    <SelectItem value="Medium">Medium Risk</SelectItem>
                    <SelectItem value="High">High Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties.slice(0, 8).map((property) => {
                const match = matches.find((m) => m.property.id === property.id);
                return (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    matchScore={match?.matchScore}
                    reasons={match?.reasons}
                    onViewDetails={() => {}}
                  />
                );
              })}
            </div>

            {filteredProperties.length > 8 && (
              <div className="text-center">
                <Link to="/properties">
                  <Button variant="outline" className="gap-2">
                    View All Properties
                    <Filter className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
