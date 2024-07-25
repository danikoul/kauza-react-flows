import { BaseEdge, getBezierPath } from '@xyflow/react';
 
export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {

  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
 
  return (
    <>
      <BaseEdge id={id} path={edgePath} />
    </>
  );
}