import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const DISCLAIMER_KEY = "fragma_disclaimer_accepted";

export const DisclaimerModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(DISCLAIMER_KEY);
    if (!accepted) {
      setOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(DISCLAIMER_KEY, "true");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent 
        className="max-w-3xl max-h-[90vh] bg-background border-border"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            Important Disclaimer – Please Read Carefully
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6 text-sm text-muted-foreground">
            <p>
              By accessing and using this platform, you acknowledge and agree to the following:
            </p>

            <div>
              <h3 className="font-semibold text-foreground mb-2">1. No Offer, No Solicitation</h3>
              <p>
                The information and content available on this website and platform are for informational purposes only. Nothing on this platform constitutes, or should be interpreted as, an offer to sell or a solicitation of an offer to buy any crypto-asset, security, financial instrument, or interest in any fund or project. Any investment may only be made on the basis of the specific legal and commercial documentation for that offering (e.g. term sheet, subscription agreement, whitepaper, key information document where applicable).
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">2. Regulatory Status & MiCA</h3>
              <p className="mb-2">
                Certain tokens available or displayed on this platform may qualify as crypto-assets under the EU Markets in Crypto-Assets Regulation (MiCA) and/or other applicable laws. The regulatory treatment of a specific token depends on its structure, rights and jurisdiction.
              </p>
              <p className="mb-2">
                Fragma operates with a compliance-by-design framework, integrating EU rules (including MiCA, AML/KYC and GDPR) into its workflows and infrastructure.
              </p>
              <p>
                Availability of any token or deal does not mean it is suitable or permitted for you in your country of residence.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">3. No Advice / No Personal Recommendation</h3>
              <p>
                Nothing on this platform constitutes investment, legal, tax, or other professional advice. Fragma Society / Fragma Finance does not assess whether any investment is suitable or appropriate for you. You are solely responsible for your own investment decisions and should consult independent professional advisers before investing.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">4. Risk of Loss</h3>
              <p className="mb-2">
                Investing in tokenized real-world assets and other crypto-assets involves a high degree of risk, including:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>risk of partial or total loss of capital;</li>
                <li>illiquidity or absence of a secondary market;</li>
                <li>price volatility;</li>
                <li>technology, smart contract, and cybersecurity risks;</li>
                <li>legal, regulatory, and tax risks which may evolve over time.</li>
              </ul>
              <p className="mt-2">
                Past performance or projections are not reliable indicators of future results, and there can be no assurance that any target returns, yields or distributions will be achieved.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">5. Jurisdictional & Eligibility Restrictions</h3>
              <p className="mb-2">
                It is your responsibility to ensure that accessing this platform and investing in any token is permitted under the laws and regulations of your country of nationality, residence or domicile, including any rules on:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>investor categorisation (e.g. retail, professional, qualified / accredited investor);</li>
                <li>foreign exchange or capital control restrictions;</li>
                <li>tax, reporting and other regulatory obligations.</li>
              </ul>
              <p className="mt-2">
                Access to certain offerings may be restricted or prohibited for users in some jurisdictions.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">6. No Liability</h3>
              <p>
                While Fragma Society / Fragma Finance aims to provide accurate and up-to-date information, no representation or warranty, express or implied, is given as to the completeness, reliability or accuracy of the content on this platform. To the maximum extent permitted by law, Fragma and its affiliates shall not be liable for any loss or damage (direct or indirect) arising from the use of, or reliance on, this website, the platform, or any information or tools contained herein.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">7. Intellectual Property</h3>
              <p>
                All content on this platform (including texts, visuals, tools and documentation) is owned by or licensed to Fragma Society / Fragma Finance. You may not copy, reproduce, distribute or reuse any material for commercial purposes without prior written consent, except for strictly personal, non-commercial use.
              </p>
            </div>

            <p className="pt-4 border-t border-border text-foreground font-medium">
              By clicking "I Understand" or by continuing to use this platform, you confirm that you have read, understood and agree to this Disclaimer, and that you are acting in compliance with the laws applicable to you.
            </p>
          </div>
        </ScrollArea>

        <div className="pt-4">
          <Button 
            onClick={handleAccept} 
            className="w-full bg-white hover:bg-white/90 text-background font-semibold py-3"
          >
            I UNDERSTAND
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
