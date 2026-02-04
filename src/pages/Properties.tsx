import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  SortAsc,
  Grid3X3,
  List,
  MapPin,
  TrendingUp,
  Building2,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PropertyCard } from '@/components/ui/PropertyCard';
import { useApp } from '@/context/AppContext';
import { mockProperties, indianStates } from '@/data/mockData';
import { Property } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChartComponent } from '@/components/charts/LineChartComponent';
import { chartColors } from '@/components/charts/ChartColors';

export default function Properties() {
  const { matches, calculateMatches } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('score');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const filteredProperties = mockProperties
    .filter((property) => {
      const matchesSearch =
        property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.state.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesState = selectedState === 'all' || property.state === selectedState;
      const matchesType = selectedType === 'all' || property.propertyType === selectedType;
      const matchesRisk = selectedRisk === 'all' || property.riskLevel === selectedRisk;
      return matchesSearch && matchesState && matchesType && matchesRisk;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.opportunityScore - a.opportunityScore;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'yield':
          return b.rentalYield - a.rentalYield;
        case 'appreciation':
          return b.appreciation - a.appreciation;
        default:
          return 0;
      }
    });

  const propertyTypes = ['Residential', 'Commercial', 'Industrial', 'Retail'];

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} L`;
    }
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4"
          >
            <div>
              <h1 className="text-3xl font-display font-bold">Property Intelligence</h1>
              <p className="text-muted-foreground mt-1">
                Browse and analyze investment opportunities across India
              </p>
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, city, or state..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 input-field"
                />
              </div>

              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="w-40 input-field">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {indianStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40 input-field">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedRisk} onValueChange={setSelectedRisk}>
                <SelectTrigger className="w-40 input-field">
                  <SelectValue placeholder="Risk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk</SelectItem>
                  <SelectItem value="Low">Low Risk</SelectItem>
                  <SelectItem value="Medium">Medium Risk</SelectItem>
                  <SelectItem value="High">High Risk</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 input-field">
                  <SortAsc className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="score">Opportunity Score</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="yield">Rental Yield</SelectItem>
                  <SelectItem value="appreciation">Appreciation</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border border-border rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className="rounded-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className="rounded-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between"
          >
            <p className="text-muted-foreground">
              Showing <span className="text-foreground font-medium">{filteredProperties.length}</span>{' '}
              properties
            </p>
            <Button variant="outline" size="sm" onClick={calculateMatches} className="gap-2">
              <Filter className="w-4 h-4" />
              Match with Profile
            </Button>
          </motion.div>

          {/* Properties Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={
              viewMode === 'grid'
                ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }
          >
            {filteredProperties.map((property, index) => {
              const match = matches.find((m) => m.property.id === property.id);
              return (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {viewMode === 'grid' ? (
                    <PropertyCard
                      property={property}
                      matchScore={match?.matchScore}
                      reasons={match?.reasons}
                      onViewDetails={() => setSelectedProperty(property)}
                    />
                  ) : (
                    <div
                      className="glass-card p-4 flex flex-col md:flex-row md:items-center gap-4 cursor-pointer hover:border-primary/30 transition-all"
                      onClick={() => setSelectedProperty(property)}
                    >
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{property.name}</h3>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <MapPin className="w-3 h-3" />
                              {property.location}, {property.city}
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              property.riskLevel === 'Low'
                                ? 'border-success/30 text-success'
                                : property.riskLevel === 'Medium'
                                ? 'border-warning/30 text-warning'
                                : 'border-destructive/30 text-destructive'
                            }
                          >
                            {property.riskLevel}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">
                            {formatPrice(property.price)}
                          </div>
                          <div className="text-muted-foreground">Price</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-success">
                            +{property.appreciation}%
                          </div>
                          <div className="text-muted-foreground">Appreciation</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold">{property.rentalYield}%</div>
                          <div className="text-muted-foreground">Yield</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold gradient-text">
                            {property.opportunityScore}
                          </div>
                          <div className="text-muted-foreground">Score</div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {filteredProperties.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Building2 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No properties found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Property Detail Dialog */}
      <Dialog open={!!selectedProperty} onOpenChange={() => setSelectedProperty(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto glass-card-elevated">
          {selectedProperty && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedProperty.name}</DialogTitle>
                <DialogDescription className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {selectedProperty.location}, {selectedProperty.city}, {selectedProperty.state}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Price and Score */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="glass-card p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {formatPrice(selectedProperty.price)}
                    </div>
                    <div className="text-sm text-muted-foreground">Price</div>
                  </div>
                  <div className="glass-card p-4 text-center">
                    <div className="text-2xl font-bold gradient-text">
                      {selectedProperty.opportunityScore}
                    </div>
                    <div className="text-sm text-muted-foreground">Opportunity Score</div>
                  </div>
                  <div className="glass-card p-4 text-center">
                    <div className="text-2xl font-bold text-success">
                      +{selectedProperty.appreciation}%
                    </div>
                    <div className="text-sm text-muted-foreground">Appreciation</div>
                  </div>
                  <div className="glass-card p-4 text-center">
                    <div className="text-2xl font-bold">{selectedProperty.rentalYield}%</div>
                    <div className="text-sm text-muted-foreground">Rental Yield</div>
                  </div>
                </div>

                {/* Price History Chart */}
                <LineChartComponent
                  data={selectedProperty.priceHistory}
                  xAxisKey="month"
                  dataKeys={[{ key: 'price', name: 'Price (₹)', color: chartColors.pink }]}
                  title="Price History"
                  height={200}
                />

                {/* Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Property Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type</span>
                        <span>{selectedProperty.propertyType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Area</span>
                        <span>{selectedProperty.area.toLocaleString()} sq.ft</span>
                      </div>
                      {selectedProperty.bedrooms && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Bedrooms</span>
                          <span>{selectedProperty.bedrooms}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Vacancy Rate</span>
                        <span>{selectedProperty.vacancyRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Market Stability</span>
                        <span>{selectedProperty.marketStability}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Risk Analysis</h4>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Risk Score</span>
                          <span>{selectedProperty.riskScore}%</span>
                        </div>
                        <Progress value={100 - selectedProperty.riskScore} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Stability</span>
                          <span>{selectedProperty.marketStability}%</span>
                        </div>
                        <Progress value={selectedProperty.marketStability} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProperty.amenities.map((amenity) => (
                      <Badge key={amenity} variant="secondary">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h4 className="font-semibold">AI Insight</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {selectedProperty.description} This property shows{' '}
                    {selectedProperty.appreciation > 10 ? 'strong' : 'moderate'} appreciation potential
                    and {selectedProperty.rentalYield > 6 ? 'above-average' : 'standard'} rental yield,
                    making it suitable for{' '}
                    {selectedProperty.riskLevel === 'Low'
                      ? 'conservative'
                      : selectedProperty.riskLevel === 'Medium'
                      ? 'balanced'
                      : 'aggressive'}{' '}
                    investors seeking {selectedProperty.rentalYield > 6 ? 'steady income' : 'capital growth'}.
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
