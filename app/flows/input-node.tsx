import React from 'react';
import { Handle, Position } from '@xyflow/react';

const inputNode = ({ data }) => {
  return (
    <div className="px-4 py-1 bg-blue-950 text-white text-xs rounded-full">
      {data.label}
        
        <Handle
        className='bg-blue-500'
        type="source"
        position={Position.Right}
        style={{ background: '#000' }} />

    </div>
  );
};

export default inputNode;
