import type { EdgeType, GraphNode } from "./types";
import { loadGraph } from "./graph";

export interface BundleNode {
  id: string;
  type: GraphNode["type"];
  title: string;
  isAnchor: boolean;
  /** Distance from the anchor along the bundle expansion. */
  depth: number;
}

export interface BundleEdge {
  from: string;
  to: string;
  edge: EdgeType;
}

export interface Bundle {
  anchor: string;
  nodes: BundleNode[];
  edges: BundleEdge[];
}

/**
 * Mirrors the depth-1 expansion in tools/regen.py: include the anchor, every
 * direct outbound, and every direct inbound. For Question anchors, also pull
 * Methods that any addressing Claim invokes — the regen tool does the same so
 * the anchor's argumentative neighborhood is intact.
 */
export async function buildBundle(anchorId: string): Promise<Bundle | null> {
  const g = await loadGraph();
  const anchor = g.nodes.get(anchorId);
  if (!anchor) return null;

  const included = new Map<string, BundleNode>();
  included.set(anchor.id, {
    id: anchor.id,
    type: anchor.type,
    title: anchor.title,
    isAnchor: true,
    depth: 0,
  });

  const edges: BundleEdge[] = [];
  const queue: Array<{ id: string; depth: number }> = [{ id: anchor.id, depth: 0 }];
  const seen = new Set<string>([anchor.id]);

  while (queue.length > 0) {
    const { id, depth } = queue.shift()!;
    if (depth >= 1) continue;
    const node = g.nodes.get(id);
    if (!node) continue;

    const neighbors: Array<{ id: string; edge: EdgeType; from: string; to: string }> = [];
    for (const out of node.outgoing) {
      neighbors.push({ id: out.to, edge: out.edge, from: id, to: out.to });
    }
    for (const inc of node.incoming) {
      neighbors.push({ id: inc.from, edge: inc.edge, from: inc.from, to: id });
    }

    for (const n of neighbors) {
      const target = g.nodes.get(n.id);
      if (!target) continue;
      if (!included.has(n.id)) {
        included.set(n.id, {
          id: target.id,
          type: target.type,
          title: target.title,
          isAnchor: false,
          depth: depth + 1,
        });
      }
      const key = `${n.from}|${n.edge}|${n.to}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push({ from: n.from, to: n.to, edge: n.edge });
      }
      if (depth + 1 < 1) {
        queue.push({ id: n.id, depth: depth + 1 });
      }
    }
  }

  // Add edges between any two included nodes (so the subgraph is closed)
  for (const node of included.values()) {
    const full = g.nodes.get(node.id);
    if (!full) continue;
    for (const out of full.outgoing) {
      if (!included.has(out.to)) continue;
      const key = `${node.id}|${out.edge}|${out.to}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ from: node.id, to: out.to, edge: out.edge });
    }
  }

  return {
    anchor: anchor.id,
    nodes: Array.from(included.values()),
    edges,
  };
}
