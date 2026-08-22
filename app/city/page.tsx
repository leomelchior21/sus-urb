import { CityExplorer } from "@/components/city/CityExplorer";
import { SystemsView } from "@/components/city/SystemsView";
import { Navigation } from "@/components/layout/Navigation";

export default function CityPage() {
  return (
    <>
      <Navigation />
      <main className="subpage dark-page">
        <CityExplorer />
        <SystemsView />
      </main>
    </>
  );
}
