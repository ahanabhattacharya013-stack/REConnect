import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Building2,
  TrendingUp,
  Brain,
  Target,
  Shield,
  Zap,
  ChevronRight,
  BarChart3,
  Users,
  Globe,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { AreaChartComponent } from '@/components/charts/AreaChartComponent';
import { marketTrends, cityPerformance } from '@/data/mockData';
import { chartColors } from '@/components/charts/ChartColors';

const features = [
  {
    icon: Brain,
    title: 'Property Intelligence Engine',
    description:
      'AI-powered analysis converts raw data into investment-relevant metrics including price trends, rental potential, and risk signals.',
  },
  {
    icon: Target,
    title: 'Opportunity Scoring',
    description:
      'Advanced scoring model ranks properties based on appreciation, yield potential, stability, and risk exposure.',
  },
  {
    icon: Users,
    title: 'Investor Profiling',
    description:
      'Build structured profiles with budget, risk tolerance, and goals for personalized recommendations.',
  },
  {
    icon: Zap,
    title: 'Smart Matching Engine',
    description:
      'Instantly matches investor profiles with scored properties to surface best-fit opportunities.',
  },
  {
    icon: Shield,
    title: 'Data Verification',
    description:
      'Automatic verification layer detects and corrects faulty information before analysis.',
  },
  {
    icon: BarChart3,
    title: 'Market Intelligence',
    description:
      'Live market data with delta highlighting shows what changed and why it matters for your deals.',
  },
];

const stats = [
  { value: '₹500Cr+', label: 'Properties Analyzed' },
  { value: '15K+', label: 'Investment Matches' },
  { value: '92%', label: 'Accuracy Rate' },
  { value: '8', label: 'Indian States' },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark to-background" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, hsl(340 82% 76% / 0.15) 0%, transparent 60%)',
          }}
        />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                AI-Powered Real Estate Intelligence
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
                Transform Data Into{' '}
                <span className="gradient-text">Investment Opportunities</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                REConnect analyzes market data, scores properties, and matches investors with the
                best opportunities across India. No more manual research.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/dashboard">
                <Button size="lg" className="btn-primary text-lg px-8 py-6 gap-2">
                  Start Analyzing
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 gap-2">
                  Learn More
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </section>

      {/* Market Overview */}
      <section className="py-20 bg-gradient-to-b from-background to-navy-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Live Market Intelligence</h2>
            <p className="section-subtitle mt-4 max-w-2xl mx-auto">
              Real-time market trends across residential, commercial, and industrial sectors in
              India's top cities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <AreaChartComponent
                data={marketTrends}
                xAxisKey="month"
                dataKeys={[
                  { key: 'residential', name: 'Residential', color: chartColors.pink },
                  { key: 'commercial', name: 'Commercial', color: chartColors.lavender },
                  { key: 'industrial', name: 'Industrial', color: chartColors.mint },
                ]}
                title="Property Index Trends (Base: 100)"
                height={350}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-semibold mb-4">City Performance Scores</h3>
              <div className="space-y-4">
                {cityPerformance.map((city, index) => (
                  <div key={city.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{city.name}</span>
                      <span className="text-primary font-bold">{city.score}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${city.score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${chartColors.pink} 0%, ${chartColors.lavender} 100%)`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Appreciation: {city.appreciation}%</span>
                      <span>Rental Yield: {city.rental}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">Powerful Intelligence Features</h2>
            <p className="section-subtitle mt-4 max-w-2xl mx-auto">
              From data analysis to investor matching, REConnect handles the heavy lifting so you
              can focus on closing deals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 group hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              Ready to Find Your Next Investment?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of real estate professionals using REConnect to discover high-value
              opportunities faster.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="btn-primary text-lg px-8 py-6 gap-2">
                  <Globe className="w-5 h-5" />
                  Explore Properties
                </Button>
              </Link>
              <Link to="/profile">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 gap-2">
                  <Users className="w-5 h-5" />
                  Create Profile
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold">REConnect</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-foreground transition-colors">
                About
              </Link>
              <Link to="/dashboard" className="hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link to="/properties" className="hover:text-foreground transition-colors">
                Properties
              </Link>
              <Link to="/settings" className="hover:text-foreground transition-colors">
                Settings
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 REConnect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </Layout>
  );
}
