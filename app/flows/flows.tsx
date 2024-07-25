'use client'

import React, { useCallback, useState } from 'react';
import { ReactFlow, addEdge, Background, Controls, applyEdgeChanges, applyNodeChanges, useReactFlow, } from '@xyflow/react';
import 'tailwindcss/tailwind.css';
import CustomNode from './node';
import '@xyflow/react/dist/style.css';
import inputNode from './input-node';
import BotMessageNode from './bot-message-node';
import UserMessageNode from './user-message';
import FallbackNode from './fallback-node';

const initialNodes = [
  {
    id: '1',
    type: 'inputNode', // type input node
    draggable: false,
    data: { label: 'Point de départ', id:'1' },
    position: { x: 250, y: 100 },
  },
  {
    id: '2',
    type: 'botMessageNode',
    data: { label: 'Réponse', id:'2' },
    position: { x: 450, y: 0 },
  },
  {
    id: '3',
    type: 'custom',
    data: { label: 'Alternatives', id:'3' },
    position: { x: 450, y: 100 },
  },

  {
    id: '4',
    type: 'fallback',
    data: { label: 'Repli par défaut', id:'4' },
    position: { x: 450, y: 200 },
  }
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e1-4', source: '1', target: '4' },
];

const Flow = () => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [selectedNode, setSelectedNode] = useState(null); // State for selected node
    const [selectedNodeId, setSelectedNodeId] = useState(null); // State for selected node ID

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes],
      );
      const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges],
      );

    const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

    // Handle node click to select it
    const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setSelectedNodeId(node.id);
    }, []);

    //Fonction d'ajout de nodes avec des types message du bot

    const addBotMessageNode = useCallback(() => {

    while (!selectedNode) {
        alert('Please select a node to add the new node to.');
        return;
        }      
    const newNodeId = (nodes.length + 1).toString();

    const newNode = {
        id: newNodeId,
        type: 'botMessageNode',
        data: { label: `Réponse du bot`, id: newNodeId },
        position: {
            x: selectedNode.position.x + 200,
            y: selectedNode.position.y,
        },
        
        selectable: true, // Make node selectable
        draggable: true, // Make node draggable
    };

    const newEdge = {
    id: `e${selectedNode.id}-${newNodeId}`,
    source: selectedNode.id,
    target: newNodeId,
    };

    setNodes((nds) => nds.concat(newNode));
    setEdges((eds) => eds.concat(newEdge));
  }, [nodes, selectedNode]);

  //Fonction d'ajout de nodes avec des types reponse de l'utilisateur

  const addUserMessageNode = useCallback(() => {

    if (!selectedNode) {
        alert('Please select a node to add the new node to.');
        return;
      }

    const newNodeId = (nodes.length + 1).toString();
    const newNode = {
      id: newNodeId,
      type: 'userMessageNode',
      data: { label: `Message d'utilisateur`, id: newNodeId },
      position: {
        x: selectedNode.position.x + 200,
        y: selectedNode.position.y,
      },

      selectable: true, // Make node selectable
      draggable: true, // Make node draggable
    };

    const newEdge = {
        id: `e${selectedNode.id}-${newNodeId}`,
        source: selectedNode.id,
        target: newNodeId,
      };
    setNodes((nds) => nds.concat(newNode));
    setEdges((eds) => eds.concat(newEdge));

    setNodes((nds) => nds.concat(newNode));
  }, [nodes, selectedNode]);

   // Function to delete the selected node
   const deleteSelectedNode = useCallback(() => {
    if (!selectedNodeId) {
      alert('Please select a node to delete.');
      return;
    }

    // Remove the selected node
    setNodes((nds) => nds.filter((node) => node.id !== selectedNodeId));

    // Remove edges connected to the selected node
    setEdges((eds) => eds.filter((edge) => edge.source !== selectedNodeId && edge.target !== selectedNodeId));

    // Reset the selected node
    setSelectedNodeId(null);
  }, [nodes, edges, selectedNodeId]);

  // Les types de nodes en fonction des boutton d'ajout
  const nodeTypes = {

    custom: CustomNode,
    inputNode: inputNode,
    fallback:FallbackNode,
    botMessageNode: (node) => <BotMessageNode {...node} onAddNode={addBotMessageNode} />,
    userMessageNode: (node) => <UserMessageNode {...node} onAddNode={addUserMessageNode} />,

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

      <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={deleteSelectedNode}
        >
          Supprimer le Node
        </button>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={onNodeClick} // Handle node click
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Flow;
