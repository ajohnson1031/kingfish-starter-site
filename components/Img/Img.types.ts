export enum ImgVariant {
  ICON = "icon",
  STATIC_IMAGE = "image",
}

export interface ImgProps {
  src: any;
  type?: ImgVariant;
  alt?: string;
  width?: string | number;
  height?: string | number;
  size?: any;
  color?: string;
  className?: string;
}
