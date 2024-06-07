import { Point } from "./Point";

export function GetBoundingBox(pts: Point[]): Point[] {
  let right = Number.MIN_VALUE;
  let left = Number.MAX_VALUE;
  let top = Number.MIN_VALUE;
  let bottom = Number.MAX_VALUE;
  
  pts.forEach((pt) => {
    if(pt.x > right) {
      right = pt.x;
    }
    if(pt.x < left) {
      left = pt.x;
    }
    if(pt.y > top) {
      top = pt.y;
    }
    if(pt.y < bottom) {
      bottom = pt.y;
    }
  });

  return [
    {y: top, x: left},
    {y: top, x: right},
    {y: bottom, x: right},
    {y: bottom, x: left}
  ];
}