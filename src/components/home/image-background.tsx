import Image from "next/image";

type ImageBackgroundProps = {
  src: string;
  sizes: string;
  preload?: boolean;
};

// A photo that fills its parent and darkens toward the bottom, so the white
// text on top stays readable. The parent needs "relative isolate".
export function ImageBackground({ src, sizes, preload }: ImageBackgroundProps) {
  return (
    <>
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        preload={preload}
        className="-z-10 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-black/80 to-transparent"
      />
    </>
  );
}
