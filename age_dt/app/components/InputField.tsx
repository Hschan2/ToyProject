type InputFieldProps = {
  label: string;
  id: string;
  name: string;
  placeholder: string;
};

const InputField = ({ label, id, name, placeholder }: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs" htmlFor={id}>
        {label}
      </label>
      <input
        className="w-16 border border-gray-400 px-3 py-2 rounded-lg"
        placeholder={placeholder}
        id={id}
        name={name}
      />
    </div>
  );
};

export default InputField;
