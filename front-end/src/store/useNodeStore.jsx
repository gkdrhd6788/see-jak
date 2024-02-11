import { applyEdgeChanges, applyNodeChanges } from "reactflow";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useNodeStore = create(
  devtools((set, get) => ({
    nodes: [],
    edges: [],
    setNodes: (newNodes) => {
      set({ nodes: newNodes });
    },

    onNodesChange: (changes) => {
      if (changes[0].type === "position" && changes[0].dragging) {
        set({
          nodes: applyNodeChanges(
            [
              {
                ...changes[0],
                position: {
                  x: get().nodes.find((node) => node.id === changes[0].id).position.x,
                  y: changes[0].position.y,
                },
                positionAbsolute: {
                  x: get().nodes.find((node) => node.id === changes[0].id).position.x,
                  y: changes[0].positionAbsolute.y,
                },
                plotId: get().nodes.find((node) => node.id === changes[0].id).data.plotId,
                storyId: get().nodes.find((node) => node.id === changes[0].id).data.storyId,
              },
            ],
            get().nodes
          ),
        });
      } else set({ nodes: applyNodeChanges(changes, get().nodes) });
    },

    arrangeStory(newStory, plotId, idx, plotColor) {
      const lastNode = get().nodes.slice(-1)[0];
      const newNodeId = String(get().nodes.length + 1);
      const type = "story";
      const data = {
        title: newStory.storyTitle,
        color: plotColor,
        plotId: plotId,
        storyId: newStory.storyId,
        characters: newStory.characters,
      };

      const position = {
        x: idx * 200,
        y: newStory.positionY,
      };

      set({
        nodes: [
          ...get().nodes,
          {
            id: newNodeId,
            type,
            data,
            position,
            positionAbsolute: position,
            width: 128,
            height: 160,
            selected: false,
            dragging: false,
          },
        ],
      });

      /*
       *
       *
       * 앞 node와 연결하는 edge 자동으로 생성
       */
      if (get().nodes.length > 1) {
        const lastEdge = get().edges.slice(-1)[0];
        const newEdgeId = lastEdge === undefined ? "1" : String(Number(lastEdge.id) + 1);

        const sourceColor = lastNode.data.color;
        const targetColor = plotColor;
        const newEdge = {
          id: newEdgeId,
          style: {
            sourceColor: sourceColor,
            targetColor: targetColor,
          },
          type: "story",
          source: lastNode.id,
          sourceHandle: null,
          target: newNodeId,
          targetHandle: null,
          animated: true,
        };

        set({ edges: [...get().edges, newEdge] });
      }
    },
    addStory(addIndex) {
      console.log(addIndex);
      const lastNode = get().nodes[addIndex - 1];
      const newNodeId = String(Number(lastNode.id) + 1);

      const type = "story";
      const data = {
        title: "storyyyy",
        color: colors[Math.floor(Math.random() * 9)], // 받아온 plotColor 넣어주기
      };

      const position = { x: Number(lastNode.id) * 200, y: 0 };

      set({
        nodes: [
          ...get().nodes,

          {
            id: newNodeId,
            type,
            data,
            position,
            positionAbsolute: position,
            width: 128,
            height: 160,
            selected: false,
            dragging: false,
          },
        ],
      });
      console.log("nodes", get().nodes);

      /*
       *
       *
       * 가장 마지막 node와 연결하는 edge 자동으로 생성
       */
      const lastEdge = get().edges.slice(-1)[0];
      const newEdgeId = lastEdge === undefined ? "1" : String(Number(lastEdge.id) + 1);

      const sourceColor = lastNode.data.color;
      const targetColor = data.color;
      const newEdge = {
        id: newEdgeId,
        style: {
          sourceColor: sourceColor,
          targetColor: targetColor,
        },
        type: "story",
        source: lastNode.id,
        sourceHandle: null,
        target: newNodeId,
        targetHandle: null,
      };

      set({ edges: [...get().edges, newEdge] });
      console.log("edges", get().edges);
    },
  }))
);

export default useNodeStore;
