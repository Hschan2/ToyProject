import { Palette, Sparkle } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";

const FilterButton = ({
  label,
  selected,
  loading,
  onClick,
  mood,
  disabled,
}: {
  label: string;
  selected: boolean;
  loading?: boolean;
  onClick: () => void;
  mood: boolean;
  disabled?: boolean;
}) => {
  const base =
    "flex items-center justify-center w-auto text-sm px-3 py-2 rounded-full";
  const selectedStyle = "bg-black text-white border hover:bg-neutral-700";
  const unselectedStyle = "bg-white text-black border hover:bg-neutral-200";

  return (
    <button
      className={`${base} ${selected ? selectedStyle : unselectedStyle}`}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {mood === true ? (
            <Palette className="w-4 h-4 mr-1" />
          ) : (
            <Sparkle className="w-4 h-4 mr-1" />
          )}
          {label}
        </>
      )}
    </button>
  );
};

export default FilterButton;
