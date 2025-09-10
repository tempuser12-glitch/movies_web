import { ReactNode, useState } from "react";

interface TooltipProps {
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, position = "top", children }) => {
  const [visible, setVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
    left: "right-full mr-2 top-1/2 -translate-y-1/2",
    right: "left-full ml-2 top-1/2 -translate-y-1/2",
  };

  return (
    <div className="relative inline-block" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      {children}
      {visible && (
        <div className={`absolute ${positionClasses[position]} bg-black text-white text-sm px-2 py-1 rounded shadow-lg whitespace-nowrap z-50`}>
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
