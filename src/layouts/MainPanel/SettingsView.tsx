import { useStore } from "@core";
import { ConfigSection } from "@shared/components/ConfigSection"; 
import { SectionTitle } from "@shared/components/styles"; 

export function SettingsView() {
    const { sectionSettings } = useStore();

    return (
        <div className="h-full overflow-y-auto scrollbar-thin bg-transparent py-2 text-on-surface">
            {sectionSettings.map((section, idx) => (
                <div key={idx} className="mb-8 px-4">
                    <SectionTitle>
                        {section.title}
                    </SectionTitle>
                    <ConfigSection settings={section.settings} />
                 </div>
            ))}
        </div>
    );
}
