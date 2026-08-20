import React, { useRef, useEffect, useState, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { NODE_COLORS, NODE_SIZES } from '../../utils/constants';

export const GraphCanvas = ({ data, onNodeClick }) => {
  const containerRef = useRef();
  const fgRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

  /* Resize observer keeps graph matched to container */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) {
        setDimensions({ width: Math.round(width), height: Math.round(height) });
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleNodeClick = useCallback(
    (node) => {
      if (onNodeClick) onNodeClick(node);

      /* Center camera on clicked node */
      if (fgRef.current) {
        fgRef.current.centerAt(node.x, node.y, 400);
        fgRef.current.zoom(2.5, 400);
      }
    },
    [onNodeClick]
  );

  if (!data || !data.nodes || data.nodes.length === 0) {
    return (
      <div className="graph-canvas-container" ref={containerRef}>
        <div className="graph-empty-state">No graph data available</div>
      </div>
    );
  }

  const formattedData = {
    nodes: data.nodes.map((n) => ({
      id: n.id,
      name: n.name,
      val: NODE_SIZES[n.label] || 8,
      color: NODE_COLORS[n.label] || '#6366f1',
      label: n.label,
    })),
    links: data.edges.map((e) => ({
      source: e.source,
      target: e.target,
      type: e.type,
    })),
  };

  return (
    <div className="graph-canvas-container" ref={containerRef}>
      <ForceGraph2D
        ref={fgRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={formattedData}
        nodeLabel={(node) => `${node.label}: ${node.name}`}
        nodeColor={(node) => node.color}
        nodeRelSize={6}
        linkColor={() => 'rgba(99, 102, 241, 0.2)'}
        linkWidth={1.5}
        linkDirectionalParticles={1}
        linkDirectionalParticleSpeed={0.005}
        onNodeClick={handleNodeClick}
        backgroundColor="#0a0e17"
        cooldownTicks={80}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const size = node.val || 8;
          const fontSize = Math.max(10 / globalScale, 1.5);

          /* Draw node circle */
          ctx.beginPath();
          ctx.arc(node.x, node.y, size, 0, 2 * Math.PI);
          ctx.fillStyle = node.color;
          ctx.fill();

          /* Draw glow effect */
          ctx.shadowColor = node.color;
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.shadowBlur = 0;

          /* Draw label when zoomed in enough */
          if (globalScale > 1.2) {
            ctx.font = `${fontSize}px Inter, sans-serif`;
            ctx.fillStyle = '#e2e8f0';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(node.name, node.x, node.y + size + fontSize + 1);
          }
        }}
      />
    </div>
  );
};
