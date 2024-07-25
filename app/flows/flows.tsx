'use client'

import React, { useCallback, useState } from 'react';
import { ReactFlow, addEdge, Background, Controls } from '@xyflow/react';
import 'tailwindcss/tailwind.css';
import CustomNode from './node';
import '@xyflow/react/dist/style.css';
import inputNode from './input-node';
import BotMessageNode from './bot-message-node';
import UserMessageNode from './user-message';

const initialNodes = [
  {
    id: '1',
    type: 'inputNode', // type input node
    data: { label: 'Point de départ' },
    position: { x: 250, y: 50 },
  },
  {
    id: '2',
    type: 'botMessageNode',
    data: { label: 'Réponse' },
    position: { x: 450, y: 0 },
  },
  {
    id: '3',
    type: 'custom',
    data: { label: 'Node 3' },
    position: { x: 450, y: 100 },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', aminated: true },
  { id: 'e1-3', source: '1', target: '3' },
];

const Flow = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onConnect = (params: any) => setEdges((eds) => addEdge(params, eds));

  const onNodeDoubleClick = (event: any, node: any) => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      type: 'custom',
      data: { label: `Node ${nodes.length + 1}` },
      position: { x: node.position.x + 150, y: node.position.y },
    };
    setNodes((nds) => nds.concat(newNode));
    setEdges((eds) =>
      eds.concat({ id: `e${node.id}-${newNode.id}`, source: node.id, target: newNode.id })
    );
  };

  //Fonction d'ajout de nodes avec des types message du bot

  const addBotMessageNode = useCallback(() => {

    const newNodeId = (nodes.length + 1).toString();
    const newNode = {
      id: newNodeId,
      type: 'botMessage',
      data: { label: `Réponse du bot`, id: newNodeId },
      position: { x: Math.random() * 400, y: Math.random() * 400 }, // Position aléatoire
    };

    setNodes((nds) => nds.concat(newNode));
  }, [nodes]);

  //Fonction d'ajout de nodes avec des types reponse de l'utilisateur

  const addUserMessageNode = useCallback(() => {

    const newNodeId = (nodes.length + 1).toString();
    const newNode = {
      id: newNodeId,
      type: 'botMessage',
      data: { label: `Réponse du bot`, id: newNodeId },
      position: { x: Math.random() * 400, y: Math.random() * 400 }, // Position aléatoire
    };

    setNodes((nds) => nds.concat(newNode));
  }, [nodes]);

  // Les types de nodes en fonction des boutton d'ajout
  const nodeTypes = {

    custom: CustomNode,
    inputNode: inputNode,
    botMessageNode: (node: any) => <BotMessageNode {...node} onAddNode={addBotMessageNode} />,
    userMessageNode: (node: any) => <UserMessageNode {...node} onAddNode={addUserMessageNode} />,
    // botMessageNode: BotMessageNode,

  };

  return (
    <div className="w-full h-screen">

        <div className="flex gap-2 mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={addBotMessageNode}
        >
          Ajouter message du bot
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={addUserMessageNode}
        >
          Ajouter Message de l'utilisateur
        </button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodeDoubleClick={onNodeDoubleClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Flow;
