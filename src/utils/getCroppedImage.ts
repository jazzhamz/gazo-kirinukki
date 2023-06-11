export const getCroppedImage = ({
  croppedAreaPixels,
  imgSrc,
  size,
  extension,
}: {
  croppedAreaPixels: { width: number; height: number; x: number; y: number };
  imgSrc: string;
  size: { width: number; height: number };
  extension: "jpg" | "jpeg" | "png" | "gif";
}) => {
  const image = new Image();
  image.src = imgSrc;

  const canvas = document.createElement("canvas");
  canvas.width = size.width;
  canvas.height = size.height;

  const ctx: any = canvas.getContext("2d");
  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    size.width,
    size.height
  );

  const croppedImage = canvas.toDataURL("image/" + extension);
  return croppedImage;
};
