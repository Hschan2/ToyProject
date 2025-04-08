export interface ContractProps {
  date: {
    year: string;
    month: string;
    day: string;
  };
  onRenderComplete?: () => void;
}
