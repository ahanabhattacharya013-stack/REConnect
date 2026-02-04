import { motion } from 'framer-motion';
import { MapPin, TrendingUp, Percent, AlertTriangle, Star, Building2 } from 'lucide-react';
import { Property } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface PropertyCardProps {
  property: Property;
  matchScore?: number;
  reasons?: string[];
  onViewDetails?: () => void;
}

export function PropertyCard({ property, matchScore, reasons, onViewDetails }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} L`;
    }
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const riskColors = {
    Low: 'bg-success/20 text-success border-success/30',
    Medium: 'bg-warning/20 text-warning border-warning/30',
    High: 'bg-destructive/20 text-destructive border-destructive/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className="glass-card overflow-hidden group"
    >
      {/* Header with Score */}
      <div className="relative p-4 border-b border-border/50">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg line-clamp-1">{property.name}</h3>
            <div className="flex items-center gap-1 text-muted-foreground mt-1">
              <MapPin className="w-3 h-3" />
              <span className="text-sm">
                {property.location}, {property.city}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="outline" className={riskColors[property.riskLevel]}>
              {property.riskLevel} Risk
            </Badge>
            {matchScore !== undefined && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-primary fill-primary" />
                <span className="font-bold text-primary">{matchScore}%</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="p-4 space-y-4">
        <div className="text-2xl font-bold text-primary">{formatPrice(property.price)}</div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3" />
              Appreciation
            </div>
            <div className="font-semibold text-success">+{property.appreciation}%</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Percent className="w-3 h-3" />
              Rental Yield
            </div>
            <div className="font-semibold">{property.rentalYield}%</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Building2 className="w-3 h-3" />
              Type
            </div>
            <div className="font-medium text-sm">{property.propertyType}</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <AlertTriangle className="w-3 h-3" />
              Vacancy
            </div>
            <div className="font-semibold">{property.vacancyRate}%</div>
          </div>
        </div>

        {/* Opportunity Score */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Opportunity Score</span>
            <span className="font-semibold">{property.opportunityScore}/100</span>
          </div>
          <Progress value={property.opportunityScore} className="h-2" />
        </div>

        {/* Match Reasons */}
        {reasons && reasons.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {reasons.map((reason, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {reason}
              </Badge>
            ))}
          </div>
        )}

        {/* Action Button */}
        <Button onClick={onViewDetails} className="w-full btn-primary">
          View Details
        </Button>
      </div>
    </motion.div>
  );
}
