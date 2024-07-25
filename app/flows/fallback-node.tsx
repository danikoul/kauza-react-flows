import React from 'react';
import { Handle, Position } from '@xyflow/react';

const FallbackNode = ({ data, isConnectable }) => {

  return (
    <div className="px-4 py-1 flex justify-center items-center w-24 group bg-blue-500 text-white text-sm rounded-full">

      {data.label}
        
        <Handle
            className='bg-white flex justify-center items-center p-1 text-blue-950 opacity-0 group-hover:opacity-100 transition-opacity duration-200 '
            type="source"
            isConnectable={isConnectable} // Ensure handle can connect
            position={Position.Right}>
            +
        </Handle>

        <Handle className='text-black flex justify-center items-center'
            type="target"
            position={Position.Left}
            style={{ background: '#fff' }}/>
                
    </div>
  );
};

export default FallbackNode;
