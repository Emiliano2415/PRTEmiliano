'use client'
import { motion } from 'framer-motion'

// ─── CSS keyframes injected as <style> (avoids Tailwind dependency) ───────────
const STYLES = `
@keyframes nn-pulse {
  0%, 100% { opacity: 0.55; r: 5; }
  50%       { opacity: 1;    r: 6.5; }
}
@keyframes nn-pulse-sm {
  0%, 100% { opacity: 0.4; r: 3.5; }
  50%       { opacity: 0.9; r: 4.5; }
}
@keyframes nn-glow {
  0%, 100% { opacity: 0.25; }
  50%       { opacity: 0.75; }
}
@keyframes nn-glow-fast {
  0%, 100% { opacity: 0.15; }
  50%       { opacity: 0.9; }
}
@keyframes nn-edge-activate {
  0%,  100% { stroke-opacity: 0.08; stroke-width: 0.6; }
  50%        { stroke-opacity: 0.65; stroke-width: 1.4; }
}
@keyframes nn-edge-activate-b {
  0%,  100% { stroke-opacity: 0.06; stroke-width: 0.5; }
  50%        { stroke-opacity: 0.55; stroke-width: 1.2; }
}
@keyframes nn-signal-travel {
  0%   { opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { opacity: 0; }
}
@keyframes nn-flow-wave {
  0%   { opacity: 0.05; }
  50%  { opacity: 0.3; }
  100% { opacity: 0.05; }
}
@keyframes avatar-orbit-cw {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes avatar-orbit-ccw {
  from { transform: rotate(0deg); }
  to   { transform: rotate(-360deg); }
}
@keyframes nn-label-fade {
  0%, 100% { opacity: 0.18; }
  50%       { opacity: 0.55; }
}
@keyframes nn-packet {
  0%   { opacity: 0; }
  15%  { opacity: 1; }
  85%  { opacity: 1; }
  100% { opacity: 0; }
}
@keyframes nn-dash {
  to { stroke-dashoffset: -60; }
}
@keyframes nn-outer-arc {
  0%   { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -420; }
}
`

// ─── Network topology ─────────────────────────────────────────────────────────
// viewBox: 280 × 280  — layers spread from x=38 to x=242
// Layer x positions
const LX = [38, 88, 140, 192, 242] as const

// Nodes per layer  [y-positions for each layer]
const LAYERS: number[][] = [
  [80, 120, 160, 200],            // L0: input   (4 nodes)
  [65, 100, 135, 170, 205],       // L1: hidden1 (5 nodes)
  [75, 110, 140, 170, 205],       // L2: hidden2 (5 nodes)
  [85, 120, 155, 190],            // L3: hidden3 (4 nodes)
  [105, 140, 175],                // L4: output  (3 nodes)
]

// Build flat node list with layer index and position
type Node = { id: string; lx: number; ly: number; li: number; ni: number }
const NODES: Node[] = LAYERS.flatMap((ys, li) =>
  ys.map((ly, ni) => ({ id: `n${li}_${ni}`, lx: LX[li], ly, li, ni }))
)

// Build edge list: connect every node in layer L to every node in layer L+1
type Edge = { id: string; x1: number; y1: number; x2: number; y2: number; li: number; ei: number }
const EDGES: Edge[] = []
let edgeIdx = 0
for (let li = 0; li < LAYERS.length - 1; li++) {
  const srcYs = LAYERS[li]
  const dstYs = LAYERS[li + 1]
  srcYs.forEach((sy, si) => {
    dstYs.forEach((dy, di) => {
      EDGES.push({
        id: `e${li}_${si}_${di}`,
        x1: LX[li],  y1: sy,
        x2: LX[li + 1], y2: dy,
        li,
        ei: edgeIdx++,
      })
    })
  })
}

// ─── Animated signal packet paths (a subset of edges for motion packets) ─────
// Pick representative edges: one per layer transition, varying y
const PACKET_PATHS = [
  { id: 'pp0', d: `M${LX[0]},80 L${LX[1]},65`,    dur: '2.4s', delay: '0s'    },
  { id: 'pp1', d: `M${LX[0]},160 L${LX[1]},135`,  dur: '2.2s', delay: '0.6s'  },
  { id: 'pp2', d: `M${LX[1]},205 L${LX[2]},205`,  dur: '2.6s', delay: '1.1s'  },
  { id: 'pp3', d: `M${LX[1]},100 L${LX[2]},110`,  dur: '2.0s', delay: '0.3s'  },
  { id: 'pp4', d: `M${LX[2]},75  L${LX[3]},85`,   dur: '2.3s', delay: '0.8s'  },
  { id: 'pp5', d: `M${LX[2]},140 L${LX[3]},155`,  dur: '2.1s', delay: '1.4s'  },
  { id: 'pp6', d: `M${LX[3]},120 L${LX[4]},105`,  dur: '2.5s', delay: '0.4s'  },
  { id: 'pp7', d: `M${LX[3]},190 L${LX[4]},175`,  dur: '2.0s', delay: '1.7s'  },
]

// ─── Layer label info ─────────────────────────────────────────────────────────
const LAYER_LABELS = [
  { x: LX[0], text: 'input',    delay: '0s'   },
  { x: LX[1], text: 'hidden_1', delay: '0.4s' },
  { x: LX[2], text: 'hidden_2', delay: '0.8s' },
  { x: LX[3], text: 'hidden_3', delay: '1.2s' },
  { x: LX[4], text: 'output',   delay: '1.6s' },
]

// Determine edge activation timing: edges in later layers activate later (staggered wave)
function edgeAnimDelay(li: number, ei: number): string {
  const base = li * 0.35 + (ei % 7) * 0.08
  return `${base.toFixed(2)}s`
}

function nodeAnimDelay(li: number, ni: number): string {
  return `${(li * 0.28 + ni * 0.12).toFixed(2)}s`
}

// Node glow radius (larger for output layer)
function nodeR(li: number): number {
  if (li === 0) return 4.5
  if (li === 4) return 5.5
  return 5
}

export default function AvatarSVG() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: 'clamp(200px, 22vw, 280px)',
        height: 'clamp(200px, 22vw, 280px)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <style>{STYLES}</style>

      <svg
        viewBox="0 0 280 280"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Animated neural network visualization"
        role="img"
      >
        <defs>
          {/* Background gradient */}
          <radialGradient id="nn-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#1a1030" />
            <stop offset="100%" stopColor="#0d0d15" />
          </radialGradient>

          {/* Node glow gradients */}
          <radialGradient id="nn-node-purple" cx="40%" cy="35%" r="65%">
            <stop offset="0%"   stopColor="#c4b5fd" />
            <stop offset="55%"  stopColor="#6d28d9" />
            <stop offset="100%" stopColor="#2e1065" />
          </radialGradient>

          <radialGradient id="nn-node-cyan" cx="40%" cy="35%" r="65%">
            <stop offset="0%"   stopColor="#e0f9ff" />
            <stop offset="50%"  stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#0e7490" />
          </radialGradient>

          <radialGradient id="nn-node-indigo" cx="40%" cy="35%" r="65%">
            <stop offset="0%"   stopColor="#a5b4fc" />
            <stop offset="55%"  stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </radialGradient>

          {/* Ambient glow (purple/cyan) */}
          <radialGradient id="nn-glow-purple" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#6d28d9" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6d28d9" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nn-glow-cyan" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#67e8f9" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#67e8f9" stopOpacity="0" />
          </radialGradient>

          {/* Clip to circle */}
          <clipPath id="nn-clip-circle">
            <circle cx="140" cy="140" r="134" />
          </clipPath>

          {/* Glow filters */}
          <filter id="nn-filter-glow-sm" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="nn-filter-glow-md" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="nn-filter-edge-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>

          {/* Packet path defs */}
          {PACKET_PATHS.map(pp => (
            <path key={`def-${pp.id}`} id={pp.id} d={pp.d} />
          ))}

          {/* Orbit paths */}
          <path
            id="nn-orbit-path-1"
            d="M240,140 A100,28 0 0,1 40,140 A100,28 0 0,1 240,140"
            transform="rotate(-20, 140, 140)"
          />
          <path
            id="nn-orbit-path-2"
            d="M252,140 A112,38 0 0,1 28,140 A112,38 0 0,1 252,140"
            transform="rotate(35, 140, 140)"
          />
        </defs>

        {/* ── Background ─────────────────────────────────────────────────── */}
        <circle cx="140" cy="140" r="134" fill="url(#nn-bg)" />

        {/* ── Subtle grid (same pattern as original) ───────────────────── */}
        <g clipPath="url(#nn-clip-circle)" opacity="0.07">
          {[50, 70, 90, 110, 130, 150, 170, 190, 210, 230].map(y => (
            <line key={`h${y}`} x1="6" y1={y} x2="274" y2={y} stroke="#c4b5fd" strokeWidth="0.5" />
          ))}
          {[50, 70, 90, 110, 130, 150, 170, 190, 210, 230].map(x => (
            <line key={`v${x}`} x1={x} y1="6" x2={x} y2="274" stroke="#c4b5fd" strokeWidth="0.5" />
          ))}
        </g>

        {/* ── Ambient glow blobs ────────────────────────────────────────── */}
        <circle
          cx="80"  cy="140" r="55"
          fill="url(#nn-glow-purple)"
          style={{ animation: 'nn-glow 4s ease-in-out infinite' }}
        />
        <circle
          cx="200" cy="140" r="48"
          fill="url(#nn-glow-cyan)"
          style={{ animation: 'nn-glow 4s ease-in-out infinite 2s' }}
        />
        <circle
          cx="140" cy="140" r="40"
          fill="url(#nn-glow-purple)"
          style={{ animation: 'nn-flow-wave 3.5s ease-in-out infinite 1s' }}
        />

        {/* ── Edges (all connections) ───────────────────────────────────── */}
        <g clipPath="url(#nn-clip-circle)">
          {EDGES.map(e => {
            const activePct = (e.li + e.ei % 4) % 3 === 0
            return (
              <line
                key={e.id}
                x1={e.x1} y1={e.y1}
                x2={e.x2} y2={e.y2}
                stroke={e.li % 2 === 0 ? '#6d28d9' : '#4f46e5'}
                strokeWidth="0.6"
                strokeOpacity="0.1"
                style={{
                  animation: `${activePct ? 'nn-edge-activate' : 'nn-edge-activate-b'} ${2.8 + (e.ei % 5) * 0.4}s ease-in-out infinite ${edgeAnimDelay(e.li, e.ei)}`,
                }}
              />
            )
          })}
        </g>

        {/* ── Glowing edge highlights (top-of-glow layer, blurred) ─────── */}
        <g clipPath="url(#nn-clip-circle)" filter="url(#nn-filter-edge-glow)">
          {EDGES.filter(e => e.ei % 6 === 0).map(e => (
            <line
              key={`glow-${e.id}`}
              x1={e.x1} y1={e.y1}
              x2={e.x2} y2={e.y2}
              stroke="#c4b5fd"
              strokeWidth="1.2"
              strokeOpacity="0"
              style={{
                animation: `nn-edge-activate ${2.2 + (e.ei % 4) * 0.5}s ease-in-out infinite ${edgeAnimDelay(e.li, e.ei + 1)}`,
              }}
            />
          ))}
        </g>

        {/* ── Nodes ─────────────────────────────────────────────────────── */}
        {NODES.map(n => {
          const r = nodeR(n.li)
          // Input layer → cyan, hidden → purple/indigo mix, output → cyan
          const fill =
            n.li === 0 ? 'url(#nn-node-cyan)'
            : n.li === 4 ? 'url(#nn-node-cyan)'
            : n.li % 2 === 1 ? 'url(#nn-node-purple)'
            : 'url(#nn-node-indigo)'
          const glowColor = n.li === 0 || n.li === 4 ? '#67e8f9' : '#c4b5fd'
          const delay = nodeAnimDelay(n.li, n.ni)
          return (
            <g key={n.id} filter="url(#nn-filter-glow-sm)">
              {/* Outer glow ring */}
              <circle
                cx={n.lx} cy={n.ly}
                r={r + 4}
                fill="none"
                stroke={glowColor}
                strokeWidth="0.8"
                strokeOpacity="0"
                style={{ animation: `nn-glow-fast ${1.8 + n.ni * 0.3}s ease-in-out infinite ${delay}` }}
              />
              {/* Main node */}
              <circle
                cx={n.lx} cy={n.ly}
                r={r}
                fill={fill}
                style={{ animation: `${n.li % 2 === 0 ? 'nn-pulse' : 'nn-pulse-sm'} ${2.2 + n.ni * 0.25}s ease-in-out infinite ${delay}` }}
              />
              {/* Specular highlight */}
              <circle
                cx={n.lx - r * 0.3} cy={n.ly - r * 0.3}
                r={r * 0.28}
                fill="white"
                opacity="0.35"
              />
            </g>
          )
        })}

        {/* ── Animated signal packets (animateMotion on packet paths) ──── */}
        {PACKET_PATHS.map(pp => (
          <g key={pp.id}>
            <circle
              r="2.2"
              fill="#67e8f9"
              filter="url(#nn-filter-glow-sm)"
              style={{ animation: `nn-packet ${pp.dur} ease-in-out infinite ${pp.delay}` }}
            >
              <animateMotion
                dur={pp.dur}
                repeatCount="indefinite"
                begin={pp.delay}
                calcMode="linear"
              >
                <mpath href={`#${pp.id}`} />
              </animateMotion>
            </circle>
          </g>
        ))}

        {/* ── Layer labels (tiny monospace) ─────────────────────────────── */}
        <g
          fontFamily="monospace"
          fontSize="6"
          textAnchor="middle"
          fill="#c4b5fd"
          clipPath="url(#nn-clip-circle)"
        >
          {LAYER_LABELS.map(ll => (
            <text
              key={ll.text}
              x={ll.x}
              y="256"
              style={{ animation: `nn-label-fade 4s ease-in-out infinite ${ll.delay}` }}
            >
              {ll.text}
            </text>
          ))}
        </g>

        {/* ── Vertical dotted layer separators ─────────────────────────── */}
        {[1, 2, 3].map(li => (
          <line
            key={`sep${li}`}
            x1={(LX[li - 1] + LX[li]) / 2}
            y1="30"
            x2={(LX[li - 1] + LX[li]) / 2}
            y2="250"
            stroke="#c4b5fd"
            strokeWidth="0.4"
            strokeOpacity="0.08"
            strokeDasharray="3 6"
          />
        ))}

        {/* ── Orbiting decorative rings ─────────────────────────────────── */}
        <g style={{ transformOrigin: '140px 140px', animation: 'avatar-orbit-cw 16s linear infinite' }}>
          <ellipse
            cx="140" cy="140"
            rx="100" ry="28"
            fill="none"
            stroke="#6d28d9"
            strokeWidth="0.7"
            strokeOpacity="0.25"
            strokeDasharray="5 9"
            transform="rotate(-20, 140, 140)"
          />
          <circle r="3.5" fill="#c4b5fd" style={{ filter: 'drop-shadow(0 0 4px #c4b5fd)' }}>
            <animateMotion dur="16s" repeatCount="indefinite">
              <mpath href="#nn-orbit-path-1" />
            </animateMotion>
          </circle>
        </g>

        <g style={{ transformOrigin: '140px 140px', animation: 'avatar-orbit-ccw 22s linear infinite' }}>
          <ellipse
            cx="140" cy="140"
            rx="112" ry="38"
            fill="none"
            stroke="#67e8f9"
            strokeWidth="0.5"
            strokeOpacity="0.18"
            strokeDasharray="3 11"
            transform="rotate(35, 140, 140)"
          />
          <circle r="2.5" fill="#67e8f9" style={{ filter: 'drop-shadow(0 0 3px #67e8f9)' }}>
            <animateMotion dur="22s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
              <mpath href="#nn-orbit-path-2" />
            </animateMotion>
          </circle>
        </g>

        {/* ── Corner bracket decorators (same as original) ──────────────── */}
        <g stroke="#c4b5fd" strokeWidth="1" strokeOpacity="0.3" fill="none">
          <path d="M30 60 L30 40 L50 40" />
          <path d="M250 60 L250 40 L230 40" />
          <path d="M30 220 L30 240 L50 240" />
          <path d="M250 220 L250 240 L230 240" />
        </g>

        {/* ── Border ring ───────────────────────────────────────────────── */}
        <circle
          cx="140" cy="140" r="134"
          fill="none"
          stroke="#6d28d9"
          strokeWidth="2"
          strokeOpacity="0.45"
        />

        {/* ── Animated cyan arc on outer ring ───────────────────────────── */}
        <circle
          cx="140" cy="140" r="134"
          fill="none"
          stroke="#67e8f9"
          strokeWidth="1.2"
          strokeOpacity="0.35"
          strokeDasharray="80 340"
          style={{ animation: 'nn-outer-arc 8s linear infinite' }}
        />
      </svg>
    </motion.div>
  )
}
