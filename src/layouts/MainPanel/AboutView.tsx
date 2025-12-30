import { Github } from "@icon-park/react";
import { Badge } from "@shared/components";
import logo from "@assets/welearn.png";

declare const GM_info: any;

export function AboutView() {
    const version = typeof GM_info !== 'undefined' ? GM_info.script.version : 'Dev';
    const author = typeof GM_info !== 'undefined' ? GM_info.script.author : 'l-1124';

    const contributors = [
        { name: "SSmJaE", role: "原作者", url: "https://github.com/SSmJaE" },
        { name: author, role: "维护者", url: "https://github.com/l-1124" },
    ];

    return (
        <div className="h-full overflow-y-auto text-on-surface p-4 scrollbar-thin">
            {/* Header */}
            <div className="flex items-center gap-4">
                <div>
                    <img src={logo} alt="Logo" className="w-12 h-12 rounded-2xl" />
                </div>
                <div className="grid gap-0">
                    <h1 className="text-xl font-bold text-on-surface tracking-tight leading-none m-0">WELearn 助手</h1>
                    <Badge variant="secondary" className="w-fit !text-[10px] !px-2 !py-0 !h-fit mt-2">
                        v{version}
                    </Badge>
                </div>
            </div>

            {/* Contributors */}
            <div className="mt-6 mb-6">
                <div className="flex flex-col gap-2">
                    {contributors.map(c => (
                        <div key={c.name} className="flex items-center justify-between group p-2 rounded-lg hover:bg-surface-container-high/50 transition-colors -mx-2">
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-sm">
                                    {c.role}
                                </Badge>
                                <a
                                    href={c.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-on-surface-variant/40 hover:text-primary transition-colors pr-1"
                                >
                                    <span className="text-[14px] font-medium text-on-surface group-hover:text-primary transition-colors">{c.name}</span>
                                </a>
                            </div>

                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-outline-variant/10 pt-6 flex flex-col items-center gap-4">
                <a
                    href="https://github.com/L-1124/WELearnHelper"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-primary hover:brightness-110 transition-all bg-primary/5 px-4 py-2 rounded-full hover:bg-primary/10"
                >
                    <Github theme="outline" size="20" />
                    <span className="text-[12px]">View Project on GitHub</span>
                </a>

                <p className="text-[12px] text-on-surface-variant/40 text-center leading-relaxed max-w-[280px]">
                    仅供学习交流使用 • 请勿用于商业用途<br />
                    后果由使用者本人承担
                </p>
            </div>
        </div>
    );
}
