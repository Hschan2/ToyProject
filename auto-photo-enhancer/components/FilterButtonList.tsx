import FilterButton from "./ui/FilterButton";
import { generateCssFilter } from "@/utils/generateCssFilter";
import { moodStyles, styles } from "@/constants/filterStyles";

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
    <>
      <div className="flex flex-wrap justify-center gap-2 mb-4 px-10">
        {styles.map(({ brand, tone, title }) => {
          const key = `${brand}-${tone}`;
          const label = `AI ${brand} - ${title}`;
          return (
            <FilterButton
              key={key}
              label={label}
              selected={selectedKey === key}
              loading={loadingKey === key}
              onClick={() => onSelectAIStyle(brand, tone, key)}
              mood={false}
            />
          );
        })}
      </div>
      <div className="flex flex-wrap justify-center gap-2 mb-4 px-10">
        {moodStyles.map(({ title, tone }) => (
          <FilterButton
            key={title}
            label={`Default - ${title}`}
            selected={selectedKey === title}
            onClick={() => onSelectMoodStyle(title, generateCssFilter(tone))}
            mood={true}
          />
        ))}
      </div>
    </>
  );
};

export default FilterButtonList;
