import React from 'react';
import { Handle, Position } from '@xyflow/react';

const UserMessageNode = ({ data }) => {

  return (
    <div className="relative group">
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-100 p-1 rounded-md shadow-sm text-xs whitespace-nowrap">
        {data.label}
      </div>

      <div className="p-4 bg-green-500 text-white rounded-lg shadow-md">
        <Handle
          type="source"
          position={Position.Right}
          className="w-2 h-2 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"

        />
      </div>
    </div>
  );
};

export default UserMessageNode;
