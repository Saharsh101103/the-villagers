import { Badge } from "@/components/ui/badge";

interface ProductBadgesProps {
  category: string;
  publishedDate: string;
}

export function ProductBadges({ category, publishedDate }: ProductBadgesProps) {

  const isNew = (() => {
    const now = new Date(); // Current date
    const published = new Date(publishedDate); // Parse the published date
    const differenceInDays = (now.getTime() - published.getTime()) / (1000 * 60 * 60 * 24);
    return differenceInDays <= 7; // Check if the difference is 7 days or less
  })();

  return (
    <div className="flex gap-2">
      {isNew && <Badge variant="secondary">New Arrival</Badge>}
      <Badge variant="outline">{category}</Badge>
    </div>
  );
}