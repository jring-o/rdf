import type { EdgeType, Graph, GraphNode } from "./types";
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
 * BFS expansion around an anchor up to maxDepth hops. Mirrors the bundle
 * shape used by tools/regen.py: anchor + every directly-connected node
 * (outbound or inbound). Closes the subgraph by including any edges that
 * exist between two already-included nodes.
 */
export function buildBundleFromGraph(
  graph: Graph,
  anchorId: string,
  maxDepth = 1,
): Bundle | null {
  const anchor = graph.nodes.get(anchorId);
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
    if (depth >= maxDepth) continue;
    const node = graph.nodes.get(id);
    if (!node) continue;

    const neighbors: Array<{ id: string; edge: EdgeType; from: string; to: string }> = [];
    for (const out of node.outgoing) {
      neighbors.push({ id: out.to, edge: out.edge, from: id, to: out.to });
    }
    for (const inc of node.incoming) {
      neighbors.push({ id: inc.from, edge: inc.edge, from: inc.from, to: id });
    }

    for (const n of neighbors) {
      const target = graph.nodes.get(n.id);
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
      if (depth + 1 < maxDepth) {
        queue.push({ id: n.id, depth: depth + 1 });
      }
    }
  }

  for (const node of included.values()) {
    const full = graph.nodes.get(node.id);
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

/** Build-time wrapper that loads the graph from disk. Existing callers. */
export async function buildBundle(anchorId: string): Promise<Bundle | null> {
  const g = await loadGraph();
  return buildBundleFromGraph(g, anchorId, 1);
}
