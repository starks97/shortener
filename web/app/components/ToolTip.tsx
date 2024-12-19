export default function ToolTip({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="relative inline-block group">
      {children}

      {/* Tooltip */}
      <div
        id="tooltip"
        role="tooltip"
        className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2
                       hidden group-hover:block
                       bg-black text-white text-sm rounded-lg py-1 px-3
                       whitespace-normal break-words z-50
                       after:absolute after:top-full after:left-1/2 after:transform after:-translate-x-1/2
                       after:border-8 after:border-transparent after:border-t-black
                       transition-opacity duration-300"
      >
        {label}
      </div>
    </div>
  );
}
