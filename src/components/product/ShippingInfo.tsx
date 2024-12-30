import { Truck, RefreshCw } from "lucide-react";

export function ShippingInfo() {
  return (
    <div className="grid grid-cols-2 gap-4 py-4">
      <div className="flex items-center gap-2">
        <Truck className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm">Free Shipping</span>
      </div>
      <div className="flex items-center gap-2">
        <RefreshCw className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm">30-Day Returns</span>
      </div>
    </div>
  );
}