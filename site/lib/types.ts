export type NodeType = "question" | "claim" | "evidence" | "method" | "source";

export type EdgeType =
  | "addresses"
  | "supports"
  | "opposes"
  | "derivedFrom"
  | "informs"
  | "usesMethod";

export const NODE_TYPES: NodeType[] = [
  "question",
  "claim",
  "evidence",
  "method",
  "source",
];

export const EDGE_TYPES: EdgeType[] = [
  "addresses",
  "supports",
  "opposes",
  "derivedFrom",
  "informs",
  "usesMethod",
];

export const NODE_TYPE_LABEL: Record<NodeType, string> = {
  question: "Question",
  claim: "Claim",
  evidence: "Evidence",
  method: "Method",
  source: "Source",
};

export const EDGE_LABEL: Record<EdgeType, string> = {
  addresses: "addresses",
  supports: "supports",
  opposes: "opposes",
  derivedFrom: "derived from",
  informs: "informs",
  usesMethod: "uses method",
};

export const EDGE_INVERSE_LABEL: Record<EdgeType, string> = {
  addresses: "addressed by",
  supports: "supported by",
  opposes: "opposed by",
  derivedFrom: "source for",
  informs: "informed by",
  usesMethod: "used by",
};

export interface NodeFrontmatter {
  id: string;
  type: NodeType;
  title: string;
  status?: string;
  source_section?: string;
  created?: string;
  edges?: Partial<Record<EdgeType, string[]>>;
}

export interface OutgoingEdge {
  edge: EdgeType;
  to: string;
}

export interface IncomingEdge {
  edge: EdgeType;
  from: string;
}

export interface GraphNode {
  id: string;
  type: NodeType;
  title: string;
  status?: string;
  source_section?: string;
  sections: string[];
  created?: string;
  body: string;
  filePath: string;
  outgoing: OutgoingEdge[];
  incoming: IncomingEdge[];
}

export interface Graph {
  nodes: Map<string, GraphNode>;
  byType: Record<NodeType, GraphNode[]>;
  bySection: Map<string, GraphNode[]>;
  brokenEdges: Array<{ from: string; to: string; edge: EdgeType }>;
}
