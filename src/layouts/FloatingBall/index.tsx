
import { store } from "@core";
import PopOver from "@shared/components/PopOver";
import welearnIcon from "@/src/assets/welearn.png";

export function FloatingBall() {

    return (
        <div
            className="w-full h-full flex justify-center items-center cursor-grab active:cursor-grabbing hover:bg-surface-container-high transition-colors"
            onDoubleClick={() => {
                store.setVisibility("floating", false);
                store.setVisibility("panel", true);
            }}
        >
            <PopOver
                content="双击打开"
                placement={"top"}
                offsetPixel={20}
            >
                <div className="w-full h-full flex items-center justify-center">
                    <img
                        src={welearnIcon}
                        alt="WELearn"
                        className="w-7 h-7 object-contain pointer-events-none select-none"
                    />
                </div>
            </PopOver>
        </div>
    );
}
