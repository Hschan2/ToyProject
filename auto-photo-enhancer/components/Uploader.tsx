interface UploaderProps {
  onFileSelect: (file: File | null) => void;
}

const Uploader = ({ onFileSelect }: UploaderProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileSelect(file);
  };

  return (
    <label className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer mb-4">
      사진/동영상 첨부
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleChange}
        className="hidden"
      />
    </label>
  );
};

export default Uploader;
