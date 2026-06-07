import SiteNav from "./components/SiteNav";

import HeroCuttingMat from "./sections/HeroCuttingMat";
import IsntJustACoaster from "./sections/IsntJustACoaster";
import PoweredByAi from "./sections/PoweredByAi";
import SoPortableWearable from "./sections/SoPortableWearable";
import WearableHud from "./sections/WearableHud";
import ProductGallery from "./sections/ProductGallery";

import CoffeeLift from "./sections/CoffeeLift";
import ThermodynamicStability from "./sections/ThermodynamicStability";
import CircularityBlueprint from "./sections/CircularityBlueprint";
import WordmarkKinetic from "./sections/WordmarkKinetic";
import SmartFlipEncryption from "./sections/SmartFlipEncryption";
import GripLockedAntislip from "./sections/GripLockedAntislip";
import CorkBarkSplit from "./sections/CorkBarkSplit";
import Sustainability from "./sections/Sustainability";
import FactsGrid from "./sections/FactsGrid";

import ReviewsIntro from "./sections/ReviewsIntro";
import ReviewsList from "./sections/ReviewsList";
import AlwaysOnGallery from "./sections/AlwaysOnGallery";
import RunsOnRtx from "./sections/RunsOnRtx";
import DropTested from "./sections/DropTested";
import LegacySupport from "./sections/LegacySupport";
import Oryzo1Model from "./sections/Oryzo1Model";

import ContactFooter from "./sections/ContactFooter";

/**
 * One-page scroll site. The 23 screens are stacked in order. They're grouped under
 * four anchor regions (#intro / #features / #product / #contact) so the fixed nav's
 * IntersectionObserver can underline the active link as the user scrolls.
 */
export default function App() {
  return (
    <div className="relative bg-ink">
      <SiteNav />

      <main>
        <div id="intro">
          <HeroCuttingMat />
          <IsntJustACoaster />
          <PoweredByAi />
          <SoPortableWearable />
          <WearableHud />
          <ProductGallery />
        </div>

        <div id="features">
          <CoffeeLift />
          <ThermodynamicStability />
          <CircularityBlueprint />
          <WordmarkKinetic />
          <SmartFlipEncryption />
          <GripLockedAntislip />
          <CorkBarkSplit />
          <Sustainability />
          <FactsGrid />
        </div>

        <div id="product">
          <ReviewsIntro />
          <ReviewsList />
          <AlwaysOnGallery />
          <RunsOnRtx />
          <DropTested />
          <LegacySupport />
          <Oryzo1Model />
        </div>

        <div id="contact">
          <ContactFooter />
        </div>
      </main>
    </div>
  );
}
