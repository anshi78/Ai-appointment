// file: components/PricingSection.jsx

import { PricingTable } from "@clerk/nextjs";

const PricingSection = () => {
  return (
    <PricingTable
      checkoutProps={{
        appearance: {
          elements: {
            drawerRoot: {
              zIndex: 2000,
            },
          },
        },
      }}
    />
  );
};

export default PricingSection;