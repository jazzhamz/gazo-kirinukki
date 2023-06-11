import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { ImageCropper } from "@/components/ImageCropper";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <ImageCropper
        size={{ width: 200, height: 200 }}
        shape="rect"
        aspect={1 / 1}
        extension="jpg"
      />
    </div>
  );
}
