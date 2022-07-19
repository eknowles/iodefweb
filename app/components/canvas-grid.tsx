import { useRef, useEffect, CSSProperties } from "react";

const CanvasGrid = () => {
  const canvas = useRef<HTMLCanvasElement>();
  let ctx = null;

  // initialize the canvas context
  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle = canvas.current;

    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;

    // get context of the canvas
    ctx = canvasEle.getContext("2d");
  }, []);

  useEffect(() => {
    const r1Info = { x: 20, y: 30, w: 100, h: 50 };
    drawRect(r1Info);
  }, []);

  // draw rectangle
  const drawRect = (info, style: CSSProperties = {}) => {
    const { x, y, w, h } = info;
    const { borderColor = "black", borderWidth = 1 } = style;

    ctx.beginPath();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    ctx.rect(x, y, w, h);
    ctx.stroke();
  };

  return <canvas ref={canvas}></canvas>;
};

export default CanvasGrid;
