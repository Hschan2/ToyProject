import { Filter } from "./Edit";

export type FilterButtonsProps = {
  filters: Filter[];
  selected: string;
  onSelect: (value: string) => void;
};
