import { FC, ChangeEvent, useState, useRef } from "react";
import Image from 'next/image';

export interface ImageUploadValue {
  file: File;
  buffer: Uint8Array;
  preview: string;
}

interface ImageUploadProps {
  value?: string | null;
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

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <div
        style={{
          marginTop: 12,
          width: 865,
          height: 576,
          borderRadius: 16,
          overflow: 'hidden',
          backgroundColor: '#e5e7eb',
          position: 'relative',
        }}
      >
        {preview ? (
          <img
            src={preview}
            alt="preview"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Image
            src="/images/storyForm/desktop@1x.webp"
            alt="Story placeholder"
            fill
            style={{ objectFit: 'cover' }}
          />
        )}
      </div>

      <label style={{ display: 'inline-block', marginTop: 12 }}>
        <button
          type="button"
          onClick={handleClick}
          className="btn btn--default btn-secondary"
        >
          Завантажити фото
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          style={{ display: 'none' }}
        />
      </label>
    </div>
  );
};