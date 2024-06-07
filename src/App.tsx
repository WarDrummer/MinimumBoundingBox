import { AllBoundingBoxes } from "./AllBoundingBoxes";
import { Point } from "./Point";

const polygon1Points: Point[] = [
  { x: 5, y: 5 },
  { x: 155, y: 35 },
  { x: 15, y: 15 },
  { x: 5, y: 95 },
];

const polygon2Points: Point[] = [
  { x: 5, y: 5 },
  { x: 175, y: 55 },
  { x: 85, y: 105 },
  { x: 5, y: 95 },
];

export function App() {
  return (
    <>
      <AllBoundingBoxes height={250} width={250} points={polygon1Points} />
      <hr />
      <AllBoundingBoxes height={250} width={250} points={polygon2Points} />
    </>
  );
}
