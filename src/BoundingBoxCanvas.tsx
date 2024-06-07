import { useRef, useEffect, useState } from "react";
import { Point } from "./Point";
import { GetBoundingBox } from "./BoundingBoxCalculator";
import {
  CenterInCanvas,
  GetCentroid,
  GetPolygonArea,
  Rotate,
} from "./PolygonMath";

type BoundingBoxCanvasProps = {
  width: number;
  height: number;
  rotation: number;
  points: Point[];
  boundingBoxColor?: string;
};

export function BoundingBoxCanvas({
  width,
  height,
  rotation,
  points,
  boundingBoxColor = "red",
}: BoundingBoxCanvasProps) {
  const canvasRef = useRef(null);
  const [area, setArea] = useState(0);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current as HTMLCanvasElement;
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

      const rotatedPts = Rotate(points, rotation);
      const pts = CenterInCanvas(width, height, rotatedPts);

      clearCanvas(ctx);

      // draw shape
      drawFilledPolygon(pts, "lightgray", ctx);
      drawPolygonOutline(pts, "black", ctx);

      // draw centroid
      drawPoint(GetCentroid(pts), "green", ctx);

      // draw bounding box
      drawPolygonOutline(GetBoundingBox(pts), boundingBoxColor, ctx);

      setArea(GetPolygonArea(GetBoundingBox(pts)));
    }
  }, [rotation]);

  function clearCanvas(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, width, height);
  }

  function drawPoint(pt: Point, color: string, ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = color;
    ctx.fillRect(pt.x, pt.y, 3, 3);
  }

  function drawFilledPolygon(
    pts: Point[],
    color: string,
    ctx: CanvasRenderingContext2D
  ) {
    if (pts.length > 2) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
      }
      ctx.closePath();
      ctx.fill();
    }
  }

  function drawPolygonOutline(
    pts: Point[],
    color: string,
    ctx: CanvasRenderingContext2D
  ) {
    if (pts.length > 2) {
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
      }
      ctx.closePath();
      ctx.stroke();
    }
  }

  return (
    <span
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <canvas ref={canvasRef} width={width} height={height} />
      <span>
        Bounding Box Area: {area.toFixed(2)}
        <br />
        Rotation {rotation.toFixed(2)}
      </span>
    </span>
  );
}
