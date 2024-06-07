import { useEffect, useState } from "react";
import { BoundingBoxCanvas } from "./BoundingBoxCanvas";
import { Point } from "./Point";
import {
  GetAnglesForAllSegments,
  GetAngleForMinimumBoundingBox,
} from "./PolygonMath";

type AllBoundingBoxesProps = {
  width: number;
  height: number;
  points: Point[];
};

export function AllBoundingBoxes({
  width,
  height,
  points,
}: AllBoundingBoxesProps) {
  const [angles, setAngles] = useState<number[]>([0]);
  const [angleIndex, setAngleIndex] = useState<number>(0);
  const [minBoxAngle, setMinBoxAngle] = useState<number>(0);

  useEffect(() => {
    setMinBoxAngle(GetAngleForMinimumBoundingBox(points));

    let angles = [];
    for (let angle of GetAnglesForAllSegments(points)) {
      angles.push(angle);
    }
    setAngles(angles.sort((n1, n2) => n1 - n2));
  }, [points]);

  return (
    <>
      <BoundingBoxCanvas
        width={width}
        height={height}
        rotation={minBoxAngle}
        points={points}
        boundingBoxColor="green"
      />

      <BoundingBoxCanvas
        width={width}
        height={height}
        rotation={angles[angleIndex]}
        points={points}
      />
      <center>
        <button
          onClick={() => {
            setAngleIndex((angleIndex + 1) % angles.length);
          }}
        >
          Rotate{" "}
        </button>
      </center>
    </>
  );
}
