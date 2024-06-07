import { GetBoundingBox } from "./BoundingBoxCalculator";
import { Point } from "./Point";

export function GetCentroid(pts: Point[]): Point {
  const centroid = pts.reduce(  
    (acc, point) => {  
      return { x: acc.x + point.x, y: acc.y + point.y };  
    },  
    { x: 0, y: 0 }  
  );  
  
  centroid.x /= pts.length;  
  centroid.y /= pts.length;  
  return centroid;
}

export function CenterInCanvas(canvasWidth: number, canvasHeight: number, pts: Point[]) {
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  const centroid = GetCentroid(pts);

  const shiftX = centerX - centroid.x;
  const shiftY = centerY - centroid.y;

  pts.forEach((pt) => {
    pt.x = pt.x + shiftX;
    pt.y = pt.y + shiftY;
  });

  return pts;
}

export function Rotate(points: Point[], angle: number): Point[] {
  let pts = points.map(pt => {return {...pt}});
  const centroid = GetCentroid(pts);

  // translate to origin (0,0)
  pts.forEach((pt) => {
    pt.x = pt.x - centroid.x;
    pt.y = pt.y - centroid.y;
  });

  // rotate
  const angleInRadians = (angle * Math.PI) / 180;  
  pts = pts.map(pt => ({  
    x: pt.x * Math.cos(angleInRadians) - pt.y * Math.sin(angleInRadians),  
    y: pt.x * Math.sin(angleInRadians) + pt.y * Math.cos(angleInRadians)  
  }));  

  // translate back to centroid
  pts.forEach((pt) => {
    pt.x = pt.x + centroid.x;
    pt.y = pt.y + centroid.y;
  });

  return pts;
}

export function GetPolygonArea(points: Point[]): number {  
  let area = 0;  
  
  for (let i = 0; i < points.length; i++) {  
    let j = (i + 1) % points.length;  
    area += points[i].x * points[j].y;  
    area -= points[j].x * points[i].y;  
  }  
  
  area /= 2;  
  return Math.abs(area);  
}  

export function* GetAnglesForAllSegments(pts: Point[]) {
  for(let segment of GetSegments(pts)){
    yield CalculateRotationAngle(segment[0], segment[1]);
  }
}

function* GetSegments(pts: Point[]) : Generator<Point[]> {
  for(let i = 1; i < pts.length; i++){
    yield [pts[i-1], pts[i]];
  }

  if(pts.length > 2){
    yield [pts[pts.length-1], pts[0]]
  }
}

function CalculateRotationAngle(point1: Point, point2: Point): number {  
  let dx = point2.x - point1.x;  
  let dy = point2.y - point1.y;  
    
  let angleInRadians = Math.atan2(dy, dx);  
  let angleInDegrees = angleInRadians * (180 / Math.PI);  
    
  return (360 - angleInDegrees) % 360;  
}  

export function GetAngleForMinimumBoundingBox(pts: Point[]) : number {

  let angleForMinBox: number = 0;
  let minArea = Number.MAX_VALUE;
  for (let angle of GetAnglesForAllSegments(pts)) {
    let rotatedPts = Rotate(pts, angle);
    let box = GetBoundingBox(rotatedPts);
    let area = GetPolygonArea(box);
    console.log(angle, ": ", area);
    if(area < minArea) {
      minArea = area;
      angleForMinBox = angle;
    }
  }

  return angleForMinBox;
}