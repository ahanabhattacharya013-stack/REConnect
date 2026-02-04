import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Brain,
  Target,
  Users,
  Zap,
  Shield,
  BarChart3,
  Upload,
  Search,
  FileText,
  Settings,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  TrendingUp,
  Building2,
  Globe,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    icon: Brain,
    title: 'Property Intelligence Engine',
    description:
      'Our AI analyzes raw real estate data and converts it into investment-relevant metrics including price growth trends, rental income potential, demand indicators, and risk signals.',
    details: [
      'Historical price analysis and forecasting',
      'Rental yield calculation and projections',
      'Market demand and supply indicators',
      'Volatility and risk signal detection',
    ],
  },
  {
    icon: Target,
    title: 'Opportunity Scoring Model',
    description:
      'Each property is processed through our scoring model that generates an Investment Opportunity Score based on multiple weighted factors.',
    details: [
      '40% Historical appreciation analysis',
      '30% Yield potential assessment',
      '20% Market stability evaluation',
      '10% Risk exposure calculation',
    ],
  },
  {
    icon: Users,
    title: 'Investor Profiling System',
    description:
      'Create detailed investor profiles with budget ranges, risk tolerance, investment goals, and location preferences for personalized recommendations.',
    details: [
      'Budget range configuration (₹5L - ₹50Cr+)',
      'Risk tolerance selection (Conservative/Balanced/Aggressive)',
      'Investment goal setting (Rental Income vs Capital Appreciation)',
      'Timeline preferences (5/10/20 years)',
    ],
  },
  {
    icon: Zap,
    title: 'Matching & Recommendation Engine',
    description:
      'Our intelligent matching system compares investor profiles against scored properties to surface the best-fit opportunities instantly.',
    details: [
      'Best-fit: Matches budget AND primary goal',
      'Medium-fit: Budget match with flexible risk profile',
      'High-risk alternatives: High scores with volatility',
      'Real-time matching as market data updates',
    ],
  },
  {
    icon: Shield,
    title: 'Data Verification Layer',
    description:
      'Automatic verification detects and flags potentially faulty information before it affects your analysis and recommendations.',
    details: [
      'Cross-reference with multiple data sources',
      'Anomaly detection for price inconsistencies',
      'Confidence scoring for all data points',
      'Transparent assumption reporting',
    ],
  },
  {
    icon: BarChart3,
    title: 'Market Intelligence',
    description:
      'Live market data with delta highlighting shows exactly what changed and explains why it matters for your investment decisions.',
    details: [
      'Real-time market trend tracking',
      'Price movement notifications',
      'Sector-wise performance analysis',
      'City-level opportunity scoring',
    ],
  },
];

const steps = [
  {
    number: '01',
    title: 'Create Your Profile',
    description: 'Set up your investor profile with budget, risk tolerance, and investment goals.',
    icon: Users,
    action: '/profile',
    actionLabel: 'Go to Profile',
  },
  {
    number: '02',
    title: 'Upload Your Data',
    description: 'Upload property data, market reports, or financial spreadsheets for analysis.',
    icon: Upload,
    action: '/upload',
    actionLabel: 'Upload Data',
  },
  {
    number: '03',
    title: 'Review Analysis',
    description: 'Our AI processes your data and generates opportunity scores and insights.',
    icon: Brain,
    action: '/dashboard',
    actionLabel: 'View Dashboard',
  },
  {
    number: '04',
    title: 'Find Matches',
    description: 'Get personalized property recommendations based on your profile.',
    icon: Target,
    action: '/properties',
    actionLabel: 'Browse Properties',
  },
  {
    number: '05',
    title: 'Make Decisions',
    description: 'Review detailed insights and AI-generated recommendations for each property.',
    icon: TrendingUp,
    action: '/properties',
    actionLabel: 'Explore Now',
  },
];

export default function About() {
  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-navy-dark to-background" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                'radial-gradient(ellipse at 30% 20%, hsl(340 82% 76% / 0.15) 0%, transparent 50%)',
            }}
          />

          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center space-y-6"
            >
              <Badge variant="outline" className="px-4 py-1.5 border-primary/30 text-primary">
                <Lightbulb className="w-4 h-4 mr-2" />
                About REConnect
              </Badge>
              <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight">
                AI-Powered Real Estate{' '}
                <span className="gradient-text">Investment Intelligence</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                REConnect transforms how real estate professionals and investors analyze
                opportunities. Our platform combines advanced AI with comprehensive market data to
                deliver actionable insights.
              </p>
            </motion.div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="section-title">What REConnect Does</h2>
              <p className="section-subtitle mt-4 max-w-2xl mx-auto">
                Our platform analyzes market data and transforms it into professional,
                presentation-ready insights with best-practice analytics.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6 text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Ingest Any Data</h3>
                <p className="text-muted-foreground">
                  Upload unstructured, unstyled, or incomplete data. We handle the messy work.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                  <Brain className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
                <p className="text-muted-foreground">
                  Our models score properties, detect risks, and surface hidden opportunities.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Actionable Insights</h3>
                <p className="text-muted-foreground">
                  Get matched recommendations with clear explanations and confidence scores.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Deep Dive */}
        <section className="py-16 bg-gradient-to-b from-background to-navy-dark">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="section-title">Platform Features</h2>
              <p className="section-subtitle mt-4 max-w-2xl mx-auto">
                Deep dive into what makes REConnect the most comprehensive real estate intelligence
                platform.
              </p>
            </motion.div>

            <div className="space-y-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 md:p-8"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <feature.icon className="w-7 h-7 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {feature.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Start Guide */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="section-title">Quick Start Guide</h2>
              <p className="section-subtitle mt-4 max-w-2xl mx-auto">
                Follow these steps to get started with REConnect and find your first investment
                opportunity.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="text-4xl font-display font-bold gradient-text">
                          {step.number}
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <step.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{step.title}</h3>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                      <Link to={step.action}>
                        <Button variant="outline" className="gap-2 w-full md:w-auto">
                          {step.actionLabel}
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Ready to Transform Your Investment Process?
              </h2>
              <p className="text-muted-foreground text-lg">
                Join thousands of real estate professionals using REConnect to discover high-value
                opportunities faster than ever.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/dashboard">
                  <Button size="lg" className="btn-primary gap-2">
                    <Globe className="w-5 h-5" />
                    Explore Dashboard
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button size="lg" variant="outline" className="gap-2">
                    <Users className="w-5 h-5" />
                    Create Profile
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
