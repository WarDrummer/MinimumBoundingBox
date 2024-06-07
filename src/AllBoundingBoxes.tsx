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

export function AllBoundingBoxes(props: AllBoundingBoxesProps) {
  const [angles, setAngles] = useState<number[]>([0]);
  const [angleIndex, setAngleIndex] = useState<number>(0);
  const [minBoxAngle] = useState<number>(
    GetAngleForMinimumBoundingBox(props.points)
  );

  useEffect(() => {
    let angles = [];
    for (let angle of GetAnglesForAllSegments(props.points)) {
      angles.push(angle);
    }
    setAngles(angles.sort((n1, n2) => n1 - n2));
  }, [props.points]);

  return (
    <>
      <BoundingBoxCanvas
        width={props.width}
        height={props.height}
        rotation={minBoxAngle}
        points={props.points}
        boundingBoxColor="green"
      />

      <BoundingBoxCanvas
        width={props.width}
        height={props.height}
        rotation={angles[angleIndex]}
        points={props.points}
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
