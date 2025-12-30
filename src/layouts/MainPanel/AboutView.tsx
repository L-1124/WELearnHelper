import { Github } from "@icon-park/react";
import { Badge } from "@shared/components";

declare const GM_info: any;

export function AboutView() {
    const version = typeof GM_info !== 'undefined' ? GM_info.script.version : 'Dev';

    return (
        <div className="h-full overflow-y-auto text-on-surface leading-normal font-body-large p-0">
            <h1 className="text-title-medium font-semibold text-primary mb-2">关于项目</h1>

            <div className="mb-4">
                <div className="text-sm font-semibold mb-1">WELearn 助手</div>
                <div className="opacity-70 text-xs flex items-center gap-2">
                    <span>版本: {version}</span>
                    <span className="px-1.5 py-0.5 rounded bg-surface-variant text-on-surface-variant text-[10px] font-medium tracking-wide">FORK EDITION</span>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5 text-[13px]">
                    <Badge variant="secondary">Original</Badge>
                    <a
                        href="https://github.com/SSmJaE"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary no-underline border-b border-transparent transition-all hover:border-primary hover:brightness-125 inline-flex items-center gap-1.5 font-medium"
                    >
                        SSmJaE
                    </a>
                </div>

                <div className="flex items-center gap-2.5 text-[13px]">
                    <Badge variant="tertiary">Fork</Badge>
                    <a
                        href="https://github.com/l-1124"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary no-underline border-b border-transparent transition-all hover:border-primary hover:brightness-125 inline-flex items-center gap-1.5 font-medium"
                    >
                        l-1124
                    </a>
                </div>

                <div className="mt-1">
                    <a
                        href="https://github.com/L-1124/WELearnHelper"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary no-underline border-b border-transparent transition-all hover:border-primary hover:brightness-125 inline-flex items-center gap-1.5 font-semibold text-xs bg-surface-container-high px-3 py-2 rounded-lg w-full justify-center hover:bg-surface-container-highest"
                    >
                        <Github theme="outline" size="16" />
                        访问 GitHub 仓库
                    </a>
                </div>
            </div>
            
            <div className="mt-6 opacity-50 text-[11px] border-t border-outline-variant pt-3 leading-relaxed">
                免责声明：本工具仅供学习交流使用，对于使用本脚本造成的任何后果，均由使用者本人承担。
            </div>
        </div>
    );
}
