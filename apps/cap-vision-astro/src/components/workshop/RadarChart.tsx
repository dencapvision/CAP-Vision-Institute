import React from 'react';

interface RadarChartProps {
  data: number[];
  labels: string[];
  size?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({ data, labels, size = 300 }) => {
  const center = size / 2;
  const radius = (size / 2) * 0.8;
  const angleStep = (Math.PI * 2) / labels.length;

  // Draw concentric circles (1-10)
  const circles = Array.from({ length: 10 }, (_, i) => (i + 1) * (radius / 10));

  const points = data.map((val, i) => {
    const r = (val / 10) * radius;
    const angle = i * angleStep - Math.PI / 2;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  });

  const polygonPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto overflow-visible">
      {/* Background circles */}
      {circles.map((r, i) => (
        <circle
          key={i}
          cx={center}
          cy={center}
          r={r}
          fill="none"
          stroke="rgba(15, 52, 96, 0.08)"
          strokeWidth="1"
        />
      ))}

      {/* Axis lines */}
      {labels.map((_, i) => {
        const angle = i * angleStep - Math.PI / 2;
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={center + radius * Math.cos(angle)}
            y2={center + radius * Math.sin(angle)}
            stroke="rgba(15, 52, 96, 0.12)"
            strokeWidth="1"
          />
        );
      })}

      {/* Axis Labels */}
      {labels.map((label, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const textRadius = radius + 22;
        const x = center + textRadius * Math.cos(angle);
        const y = center + textRadius * Math.sin(angle);
        
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-[10px] font-bold fill-[#0f3460] opacity-70 nav-font"
          >
            {label}
          </text>
        );
      })}

      {/* Data polygon */}
      <path
        d={polygonPath}
        fill="rgba(197, 160, 89, 0.15)"
        stroke="#c5a059"
        strokeWidth="2.5"
        strokeLinejoin="round"
        style={{ transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
      />

      {/* Data points */}
      {points.map((p, i) => (
        <circle 
          key={i} 
          cx={p.x} 
          cy={p.y} 
          r="4" 
          fill="#c5a059" 
          className="shadow-sm"
          style={{ transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      ))}
    </svg>
  );
};
