import React from 'react';
import { Handle, Position } from '@xyflow/react';

const UserMessageNode = ({ data, isConnectable }) => {

  return (
    <div className="relative group">

      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap p-1 text-gray-600 font-bold text-[8px] ">
            Nom du message
      </div>

      <div className="p-1 flex rounded-md shadow-sm text-xs whitespace-nowrap">
        
      </div>

      <div className="p-4 bg-red-700  text-white rounded-lg shadow-md">

      {data.label}
      <Handle
            className='text-black flex justify-center items-center'
            type="target"
            position={Position.Left}
            style={{ background: '#fff' }}/>

        <Handle
          type="source"
          position={Position.Right}
          className="w-2 h-2 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          isConnectable={isConnectable} // Ensure handle can connect
        />
      </div>
    </div>
  );
};

export default UserMessageNode;
