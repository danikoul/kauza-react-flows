import React from 'react';
import { Handle, Position } from '@xyflow/react';

const BotMessageNode = ({ data }) => {

  return (
 
    <div className="relative group">

        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap p-1 text-gray-600 font-bold text-[8px] ">
            Nom du message
        </div>

        <div className="px-4 py-1 flex justify-center items-center w-24 bg-gray-300 text-blue-950 font-extrabold text-sm rounded-full">

        {data.label}

        <Handle
            className='bg-white flex justify-center items-center p-1 text-blue-950 opacity-0 group-hover:opacity-100 transition-opacity duration-200 '
            type="source"
            position={Position.Right}>
            +
        </Handle>

        <Handle
            className='text-black flex justify-center items-center'
            type="target"
            position={Position.Left}
            style={{ background: '#fff' }}/>
                
        </div>

    </div>
  );
};

export default BotMessageNode;