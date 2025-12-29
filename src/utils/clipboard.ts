
/**
 * 复制文本到剪贴板 (通用工具)
 * 优先使用 GM_setClipboard (Tampermonkey 提供，更稳定且支持跨域 iframe)
 * 其次使用 navigator.clipboard.writeText
 * 最后回退到传统的 input select 方法
 */
export async function copyToClipboard(text: string): Promise<boolean> {
    // 1. 尝试使用 Tampermonkey 的 GM_setClipboard
    if (typeof GM_setClipboard !== 'undefined') {
        try {
            GM_setClipboard(text, 'text');
            return true;
        } catch (e) {
            console.warn('[Clipboard] GM_setClipboard failed:', e);
        }
    }

    // 2. 尝试使用现代 Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (e) {
            console.error('[Clipboard] navigator.clipboard failed:', e);
            // 这里可能会抛出 NotAllowedError，继续尝试回退
        }
    }

    // 3. 稳健的回退方法：使用不可见的 textarea
    try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        
        // 确保它在视图之外且不可见
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        return successful;
    } catch (err) {
        console.error('[Clipboard] Fallback failed:', err);
    }

    return false;
}
