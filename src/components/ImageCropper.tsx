import { getCroppedImage } from "@/utils/getCroppedImage";
import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";

export const ImageCropper = ({
  size,
  shape,
  aspect,
  extension,
}: {
  size: { width: number; height: number };
  shape: "round" | "rect";
  aspect: number;
  extension: "jpg" | "jpeg" | "png" | "gif";
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedArea, setCroppedArea] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const [imgSrc, setImgSrc] = useState<string>("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSave = () => {
    getCroppedImage({ croppedAreaPixels, imgSrc, size, extension });
  };

  const onCropComplete = useCallback(
    (
      croppedArea: { width: number; height: number; x: number; y: number },
      croppedAreaPixels: {
        width: number;
        height: number;
        x: number;
        y: number;
      }
    ) => {
      setCroppedArea(croppedArea);
      setCroppedAreaPixels(croppedAreaPixels);
      console.log(croppedArea, croppedAreaPixels);
    },
    []
  );

  return (
    <>
      <label className="form-label">画像を選択</label>
      <input
        type="file"
        id="customFile"
        accept="image/*"
        onChange={handleImageUpload}
      />
      <div className="cropper">
        {!!imgSrc && (
          <>
            <div className="cropper">
              <Cropper
                image={imgSrc}
                crop={crop}
                rotation={rotation}
                zoom={zoom}
                aspect={aspect}
                cropShape={shape}
                onCropComplete={onCropComplete}
                onCropChange={setCrop}
                onRotationChange={setRotation}
                onZoomChange={setZoom}
              />
            </div>
            <input
              type="range"
              value={rotation}
              min={0}
              max={360}
              step={1}
              aria-labelledby="Rotation"
              onChange={(e) => setRotation(Number(e.target.value))}
            />
            <button color="secondary" onClick={handleSave}>
              保存
            </button>
          </>
        )}
      </div>
    </>
  );
};
