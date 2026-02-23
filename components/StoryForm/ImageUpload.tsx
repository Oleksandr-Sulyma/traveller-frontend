import { FC, ChangeEvent, useState } from "react";

export interface ImageUploadValue {
  file: File;
  buffer: Uint8Array;
  preview: string;
}

interface ImageUploadProps {
  value?: string | null; // preview (для edit-форм)
  onChange: (value: ImageUploadValue | null) => void;
}

export const ImageUpload: FC<ImageUploadProps> = ({
  value,
  onChange,
}) => {
  const [preview, setPreview] = useState<string | null>(value ?? null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) {
      onChange(null);
      return;
    }

    const previewReader = new FileReader();
    const bufferReader = new FileReader();

    previewReader.onload = () => {
      if (typeof previewReader.result !== "string") return;

      const previewResult = previewReader.result;
      setPreview(previewResult);

      bufferReader.onload = () => {
        if (!(bufferReader.result instanceof ArrayBuffer)) return;

        onChange({
          file,
          preview: previewResult,
          buffer: new Uint8Array(bufferReader.result),
        });
      };

      bufferReader.readAsArrayBuffer(file);
    };

    previewReader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} />

      <div
        style={{
          marginTop: 12,
          width: 200,
          height: 200,
          border: "1px dashed #ccc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {preview ? (
          <img
            src={preview}
            alt="preview"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        ) : (
          <span>No image</span>
        )}
      </div>
    </div>
  );
};