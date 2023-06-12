import { useEffect, useRef, useState } from "react";
import "./pilpil.sass";

export const Pilpil = (props: { width: number; height: number; smallUrl: string; largeUrl: string; alt: string }) => {
  const aspectRation = (props.height / props.width) * 100;
  const thumnailWidth = 30;
  const thumnailHeight = props.height / props.width / thumnailWidth;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasLoadedClassName, setCanvasLoadedClassName] = useState("");

  const imageRef = useRef<HTMLImageElement>(null);
  const [imageLoadedClassName, setImageLoadedClassName] = useState("");

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context === null) return;

      const imageThumbnail = new Image();
      imageThumbnail.src = props.smallUrl;

      imageThumbnail.onload = () => {
        const drawImage = () => {
          canvas.width = imageThumbnail.width;
          canvas.height = imageThumbnail.height;
          context.drawImage(imageThumbnail, 0, 0);
        };

        const blur = (e: number) => {
          context.globalAlpha = 0.5;
          for (let t = -e; t <= e; t += 2) {
            for (let n = -e; n <= e; n += 2) {
              context.drawImage(canvas, n, t);
              if (n >= 0 && t >= 0) {
                context.drawImage(canvas, -(n - 1), -(t - 1));
              }
            }
          }
        };

        drawImage();
        blur(2);
        setCanvasLoadedClassName("canvas--loaded");
      };
    }
  }, []);

  useEffect(() => {
    if (imageRef && imageRef.current) {
      const image = imageRef.current;
      image.src = props.largeUrl;
      setImageLoadedClassName("image--loading");
      image.onload = () => {
        setImageLoadedClassName("image--loaded");
      };
    }
  }, []);

  return (
    <div
      className={`image ${canvasLoadedClassName} ${imageLoadedClassName}`}
      style={{ maxWidth: props.width + "px", maxHeight: props.height + "px" }}
    >
      <div className="image__aspect-ratio" style={{ paddingBottom: aspectRation + "%" }}></div>
      <canvas ref={canvasRef} className="image__canvas" height={thumnailHeight} width={thumnailWidth}></canvas>
      <img ref={imageRef} className="image__original" alt={props.alt} />
    </div>
  );
};
