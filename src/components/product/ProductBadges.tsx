import { Badge } from "@/components/ui/badge";

interface ProductBadgesProps {
  category: string;
  isNew?: boolean;
}

export function ProductBadges({ category, isNew }: ProductBadgesProps) {
  return (
    <div className="flex gap-2">
      {isNew && <Badge variant="secondary">New Arrival</Badge>}
      <Badge variant="outline">{category}</Badge>
    </div>
  );
}