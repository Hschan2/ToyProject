import { FormEvent } from "react";
import InputField from "./InputField";

type AgeInputFormProps = {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

const AgeInputForm = ({ handleSubmit }: AgeInputFormProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-4">
        <InputField label="년" id="year" name="year" placeholder="1900" />
        <InputField label="월" id="month" name="month" placeholder="1" />
        <InputField label="일" id="day" name="day" placeholder="1" />
      </div>

      <div className="relative">
        <hr className="my-8 w-full border-b-gray-400" />
        <button
          className="absolute -top-5 right-0 flex h-12 w-12 items-center justify-center rounded-full bg-green-500"
          type="submit"
        >
                    <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default AgeInputForm;
