import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ShoppingBag,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { businessDetails } from "@/lib/data";

const Footer = () => {
  return (
    <>
      <div className="bg-gradient-to-br from-background via-secondary to-card pt-20 text-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-8 h-8 text-purple-300" />
                <span className="text-2xl font-bold">{businessDetails.name}</span>
              </div>
              <p className="text-purple-200">
                Discover the extraordinary in every purchase. Your journey to
                amazing finds starts here.
              </p>
              <div className="flex space-x-4 pt-4">
                <Link href="#" className="hover:text-purple-300 transition-colors">
                  <Facebook className="w-6 h-6" />
                </Link>
                <a href="#" className="hover:text-purple-300 transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-purple-300 transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-purple-300 transition-colors">
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {[
                  "New Arrivals",
                  "Best Sellers",
                  "Sale",
                  "Gift Cards",
                  "Careers",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-purple-200 hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                {[
                  "Track Order",
                  "Returns & Exchanges",
                  "Shipping Info",
                  "FAQ",
                  "Contact Us",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-purple-200 hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Get in Touch</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-purple-300" />
                  <span className="text-purple-200">
                    123 Shopping Ave, NY 10001
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-purple-300" />
                  <span className="text-purple-200">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-purple-300" />
                  <span className="text-purple-200">support@{businessDetails.name}.com</span>
                </div>
              </div>
            </div>
          </div>

          
          {/* Bottom Bar */}
          <div className="border-t border-purple-700 py-6 text-center text-purple-200">
            <p>© {new Date().getFullYear()} {businessDetails.name}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
