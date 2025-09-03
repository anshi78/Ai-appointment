// file: components/Pricing.jsx
"use client";

import React from "react";
import { Card, CardContent } from "./ui/card";
import PricingSection from "./PricingSection"; // <-- Import the new component

const Pricing = () => {
  return (
    <Card className="border-sky-900/30 shadow-lg bg-gradient-to-b from-sky-950/30 to-transparent">
      <CardContent className="p-6 md:p-8">
        <PricingSection /> {/* <-- Use the new component here */}
      </CardContent>
    </Card>
  );
};

export default Pricing;