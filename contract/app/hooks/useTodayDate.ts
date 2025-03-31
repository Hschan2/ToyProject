import { useEffect, useState } from "react";

type TodayDate = {
  year: string;
  month: string;
  day: string;
};

function useTodayDate() {
  const [today, setToday] = useState<TodayDate>({ year: "", month: "", day: "" });

  useEffect(() => {
    const now = new Date();
    setToday({
      year: now.getFullYear().toString(),
      month: String(now.getMonth() + 1).padStart(2, "0"),
      day: String(now.getDate()).padStart(2, "0"),
    });
  }, []);

  return today;
}

export default useTodayDate;
