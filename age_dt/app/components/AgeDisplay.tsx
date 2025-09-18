import { NumberType } from "../constants/types";

type AgeDisplayProps = {
  years: NumberType;
  months: NumberType;
  days: NumberType;
};

const AgeDisplay = ({ years, months, days }: AgeDisplayProps) => {
  return (
    <div className="flex flex-row gap-4 p-4">
      <div className="flex">
        <span className="text-4xl font-bold text-green-500">
          {years ?? "- -"}
        </span>
        <span className="text-4xl font-bold">년</span>
      </div>
      <div className="flex">
        <span className="text-4xl font-bold text-green-500">
          {months ?? "- -"}
        </span>
        <span className="text-4xl font-bold">월</span>
      </div>
      <div className="flex">
        <span className="text-4xl font-bold text-green-500">
          {days ?? "- -"}
        </span>
        <span className="text-4xl font-bold">일</span>
      </div>
    </div>
  );
};

export default AgeDisplay;
