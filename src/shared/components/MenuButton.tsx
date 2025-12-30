import { FC, HTMLAttributes } from "react";

interface MenuButtonProps extends HTMLAttributes<HTMLDivElement> {
    disabled?: boolean;
}

export const MenuButton: FC<MenuButtonProps> = ({ disabled, className = "", children, ...props }) => {
    return (
        <div
            className={`
                text-[24px] cursor-pointer flex justify-center items-center font-serif
                ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-125 hover:rotate-[30deg] transition-transform duration-500"}
                ${className}
            `}
            style={{
                fontFamily: "华文新魏, serif"
            }}
            {...props}
        >
            {children}
        </div>
    );
};
