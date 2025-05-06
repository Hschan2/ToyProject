import { FilterButtonsProps } from "../types/button";

export const FilterButtons = ({
  filters,
  selected,
  onSelect,
}: FilterButtonsProps) => (
  <div className="flex flex-wrap justify-center gap-2 mb-4">
    {filters.map(({ label, value }) => (
      <button
        key={value}
        className={`px-4 py-2 rounded border transition ${
          selected === value
            ? "bg-black text-white"
            : "bg-transparent border-gray-400 text-gray-700 hover:bg-gray-100"
        }`}
        onClick={() => onSelect(value)}
      >
        {label}
      </button>
    ))}
  </div>
);
