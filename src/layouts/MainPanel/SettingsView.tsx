import { useStore } from "@core";
import { ConfigSection } from "@shared/components/ConfigSection"; 
import { SectionTitle } from "@shared/components/styles"; 

export function SettingsView() {
    const { sectionSettings } = useStore();

    return (
        <div className="h-full overflow-y-auto bg-transparent py-2 text-on-surface">
            {sectionSettings.map((section, idx) => (
                <div key={idx} className="mb-8 px-4">
                    <SectionTitle>
                        {section.title}
                    </SectionTitle>
                    {/* We reuse the internal logic of ConfigSection.
                        Ideally ConfigSection itself should be refactored to be generic or accept classNames,
                        but here we just position it.
                    */}
                    <ConfigSection settings={section.settings} />
                 </div>
            ))}
        </div>
    );
}
