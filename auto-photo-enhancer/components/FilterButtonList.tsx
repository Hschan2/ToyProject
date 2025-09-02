import FilterButton from "./ui/FilterButton";
import { generateCssFilter } from "@/utils/generateCssFilter";
import { FILTERS } from "@/constants/filterStyles";
import { AiFilter, FilterType, MoodFilter } from "@/types/filter";
import { AI_PREFIX, DEFAULT_PREFIX } from "@/constants/strings";

interface FilterButtonListProps {
  selectedKey: string | null;
  loadingKey: string | null;
  onSelectAIStyle: (brand: string, tone: string, key: string) => void;
  onSelectMoodStyle: (title: string, tone: string) => void;
}

const FilterButtonList = ({
  selectedKey,
  loadingKey,
  onSelectAIStyle,
  onSelectMoodStyle,
}: FilterButtonListProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-4 px-10">
      {FILTERS.map((filter) => {
        if (filter.type === FilterType.AI) {
          const aiFilter = filter as AiFilter;
          const key = `${aiFilter.brand}-${aiFilter.tone}`;
          const label = `${AI_PREFIX} ${aiFilter.brand} - ${aiFilter.title}`;
          return (
            <FilterButton
              key={key}
              label={label}
              selected={selectedKey === key}
              loading={loadingKey === key}
              onClick={() => onSelectAIStyle(aiFilter.brand, aiFilter.tone, key)}
              mood={false}
            />
          );
        }

        if (filter.type === FilterType.MOOD) {
          const moodFilter = filter as MoodFilter;
          const key = moodFilter.title;
          const label = `${DEFAULT_PREFIX}${moodFilter.title}`;
          return (
            <FilterButton
              key={key}
              label={label}
              selected={selectedKey === key}
              onClick={() => onSelectMoodStyle(key, generateCssFilter(moodFilter.tone))}
              mood={true}
            />
          );
        }

        return null;
      })}
    </div>
  );
};

export default FilterButtonList;
