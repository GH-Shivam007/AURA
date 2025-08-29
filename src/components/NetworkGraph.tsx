import React, { useMemo, useCallback } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Controls,
  Background,
  MiniMap,
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './NetworkGraph.css';
import { ThreatEvent } from './AuraDashboard';

interface NetworkGraphProps {
  events: ThreatEvent[];
}

interface AccountNode {
  id: string;
  account: string;
  displayName: string;
  isCompromised: boolean;
  threatLevel: number;
  transactions: number;
  isSource: boolean;
  isDestination: boolean;
}

// Custom Account Node Component
const AccountNodeComponent: React.FC<{ data: any }> = ({ data }) => {
  const { account, displayName, isCompromised, threatLevel, transactions } = data;
  
  const getNodeStyle = () => {
    if (isCompromised) {
      return {
        backgroundColor: '#dc2626',
        borderColor: '#ef4444',
        color: 'white',
        boxShadow: '0 0 20px #dc2626'
      };
    }
    
    if (threatLevel > 7) {
      return {
        backgroundColor: '#ea580c',
        borderColor: '#f97316',
        color: 'white'
      };
    }
    
    if (threatLevel > 3) {
      return {
        backgroundColor: '#d97706',
        borderColor: '#f59e0b',
        color: 'white'
      };
    }
    
    return {
      backgroundColor: '#059669',
      borderColor: '#10b981',
      color: 'white'
    };
  };

  return (
    <div 
      className="px-4 py-3 rounded-lg border-2 min-w-[120px] text-center font-mono text-sm"
      style={getNodeStyle()}
    >
      <div className="font-bold text-xs mb-1">{displayName}</div>
      <div className="text-xs opacity-80">
        {transactions} txns
      </div>
      {isCompromised && (
        <div className="text-xs mt-1 font-bold animate-pulse">
          🚨 COMPROMISED
        </div>
      )}
    </div>
  );
};

// Custom Threat Edge Component
const ThreatEdgeComponent: React.FC<any> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const getEdgeStyle = () => {
    const baseStyle = {
      strokeWidth: Math.min(12, Math.max(4, (data?.count || 1) * 1.5)),
      strokeOpacity: 1,
      ...style,
    };

    if (data?.isSuspicious) {
      return {
        ...baseStyle,
        stroke: '#ef4444',
        strokeDasharray: '15,10',
        filter: 'drop-shadow(0 0 8px #ef4444)',
      };
    }

    if (data?.isHighVolume) {
      return {
        ...baseStyle,
        stroke: '#f59e0b',
        filter: 'drop-shadow(0 0 6px #f59e0b)',
      };
    }

    return {
      ...baseStyle,
      stroke: '#fbbf24',
      opacity: 1,
      filter: 'drop-shadow(0 0 4px #fbbf24)',
    };
  };

  return (
    <>
      <defs>
        {/* Animated gradient for threat edges */}
        <linearGradient id="threat-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#dc2626">
            <animate attributeName="stop-color" values="#dc2626;#ef4444;#dc2626" dur="2s" repeatCount="indefinite"/>
          </stop>
          <stop offset="50%" stopColor="#ef4444">
            <animate attributeName="stop-color" values="#ef4444;#fca5a5;#ef4444" dur="2s" repeatCount="indefinite"/>
          </stop>
          <stop offset="100%" stopColor="#fca5a5">
            <animate attributeName="stop-color" values="#fca5a5;#ef4444;#fca5a5" dur="2s" repeatCount="indefinite"/>
          </stop>
        </linearGradient>
        
        {/* Pulsing gradient for high volume */}
        <linearGradient id="volume-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d97706">
            <animate attributeName="stop-color" values="#d97706;#f59e0b;#d97706" dur="3s" repeatCount="indefinite"/>
          </stop>
          <stop offset="50%" stopColor="#f59e0b">
            <animate attributeName="stop-color" values="#f59e0b;#fbbf24;#f59e0b" dur="3s" repeatCount="indefinite"/>
          </stop>
          <stop offset="100%" stopColor="#fbbf24">
            <animate attributeName="stop-color" values="#fbbf24;#f59e0b;#fbbf24" dur="3s" repeatCount="indefinite"/>
          </stop>
        </linearGradient>
        
        {/* Golden flowing gradient for normal transactions */}
        <linearGradient id="golden-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#b45309">
            <animate attributeName="stop-color" values="#b45309;#d97706;#b45309" dur="4s" repeatCount="indefinite"/>
          </stop>
          <stop offset="25%" stopColor="#d97706">
            <animate attributeName="stop-color" values="#d97706;#f59e0b;#d97706" dur="4s" repeatCount="indefinite"/>
          </stop>
          <stop offset="50%" stopColor="#f59e0b">
            <animate attributeName="stop-color" values="#f59e0b;#fbbf24;#f59e0b" dur="4s" repeatCount="indefinite"/>
          </stop>
          <stop offset="75%" stopColor="#fbbf24">
            <animate attributeName="stop-color" values="#fbbf24;#fde047;#fbbf24" dur="4s" repeatCount="indefinite"/>
          </stop>
          <stop offset="100%" stopColor="#fde047">
            <animate attributeName="stop-color" values="#fde047;#fbbf24;#fde047" dur="4s" repeatCount="indefinite"/>
          </stop>
        </linearGradient>
        
        {/* Flow animation markers */}
        <marker id="flow-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
          <polygon points="0,0 0,6 9,3" fill="#fbbf24" opacity="0.8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite"/>
          </polygon>
        </marker>
        
        <marker id="threat-arrow" markerWidth="12" markerHeight="12" refX="10" refY="4" orient="auto" markerUnits="strokeWidth">
          <polygon points="0,0 0,8 10,4" fill="#ef4444">
            <animate attributeName="fill" values="#ef4444;#dc2626;#ef4444" dur="1s" repeatCount="indefinite"/>
          </polygon>
        </marker>
      </defs>
      
      <BaseEdge 
        path={edgePath} 
        style={getEdgeStyle()}
        markerEnd={data?.isSuspicious ? 'url(#threat-arrow)' : 'url(#flow-arrow)'}
      />
      
      {/* Transaction flow particles */}
      {!data?.isSuspicious && (
        <circle r="3" fill="#fbbf24" opacity="0.8">
          <animateMotion dur="3s" repeatCount="indefinite" path={edgePath} />
          <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite"/>
        </circle>
      )}
      
      {data?.isSuspicious && (
        <circle r="4" fill="#ef4444" opacity="0.9">
          <animateMotion dur="1.5s" repeatCount="indefinite" path={edgePath} />
          <animate attributeName="r" values="2;6;2" dur="1.5s" repeatCount="indefinite"/>
        </circle>
      )}
      
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 10,
            pointerEvents: 'all',
          }}
          className={`
            px-3 py-2 rounded-full text-xs font-mono font-bold transition-all duration-300
            ${data?.isSuspicious 
              ? 'bg-red-500/95 text-white animate-pulse border-2 border-red-300 shadow-red-500/50' 
              : data?.isHighVolume
              ? 'bg-orange-500/95 text-white border-2 border-orange-300 shadow-orange-500/50'
              : 'bg-yellow-500/95 text-black border-2 border-yellow-300 shadow-yellow-500/50'
            }
            backdrop-blur-md shadow-2xl hover:scale-110
          `}
        >
          <div className="flex items-center space-x-1">
            {data?.isSuspicious && <span className="animate-bounce">🚨</span>}
            <span>${((data?.count || 1) * 1000).toLocaleString()}</span>
            {data?.isHighVolume && <span className="animate-bounce">💰</span>}
          </div>
          <div className="text-[10px] opacity-75">
            {data?.count || 1} transactions
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

const nodeTypes = {
  account: AccountNodeComponent,
};

const edgeTypes = {
  threat: ThreatEdgeComponent,
};

export const NetworkGraph: React.FC<NetworkGraphProps> = ({ events }) => {
  console.log('NetworkGraph received events:', events.length);
  
  const { networkNodes, networkEdges } = useMemo(() => {
    if (events.length === 0) return { networkNodes: [], networkEdges: [] };
    
    console.log('Processing events for bipartite network graph...');
    
    // Process events to create account data
    const accountMap = new Map<string, AccountNode>();
    const edgeMap = new Map<string, { source: string; target: string; count: number; isSuspicious: boolean }>();
    
    // Find the most targeted account (compromised)
    const targetCounts = new Map<string, number>();
    events.forEach(event => {
      if (event.dest_account && event.suspicious) {
        const count = targetCounts.get(event.dest_account) || 0;
        targetCounts.set(event.dest_account, count + 1);
      }
    });
    
    const compromisedAccount = Array.from(targetCounts.entries())
      .sort(([,a], [,b]) => b - a)[0]?.[0];

    console.log('Compromised account:', compromisedAccount);

    // Create account nodes
    events.slice(0, 30).forEach((event) => {
      if (!event.source_account || !event.dest_account) return;
      
      // Process source account
      if (!accountMap.has(event.source_account)) {
        accountMap.set(event.source_account, {
          id: event.source_account,
          account: event.source_account,
          displayName: event.source_account.replace('ACC_', '').replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
          isCompromised: event.source_account === compromisedAccount,
          threatLevel: 0,
          transactions: 0,
          isSource: false,
          isDestination: false
        });
      }

      // Process destination account
      if (!accountMap.has(event.dest_account)) {
        accountMap.set(event.dest_account, {
          id: event.dest_account,
          account: event.dest_account,
          displayName: event.dest_account.replace('ACC_', '').replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
          isCompromised: event.dest_account === compromisedAccount,
          threatLevel: 0,
          transactions: 0,
          isSource: false,
          isDestination: false
        });
      }

      // Update account data
      const sourceNode = accountMap.get(event.source_account)!;
      const destNode = accountMap.get(event.dest_account)!;

      sourceNode.isSource = true;
      destNode.isDestination = true;
      sourceNode.transactions++;
      destNode.transactions++;

      if (event.suspicious) {
        const severityWeight = {
          'low': 1,
          'medium': 3,
          'high': 7,
          'critical': 10
        };
        
        const threatIncrease = severityWeight[event.severity || 'medium'];
        sourceNode.threatLevel = Math.min(10, sourceNode.threatLevel + threatIncrease);
        destNode.threatLevel = Math.min(10, destNode.threatLevel + threatIncrease);
      }

      // Create edges
      const edgeKey = `${event.source_account}-${event.dest_account}`;
      if (!edgeMap.has(edgeKey)) {
        edgeMap.set(edgeKey, {
          source: event.source_account,
          target: event.dest_account,
          count: 0,
          isSuspicious: false
        });
      }
      
      const edge = edgeMap.get(edgeKey)!;
      edge.count++;
      if (event.suspicious) {
        edge.isSuspicious = true;
      }
    });

    const accounts = Array.from(accountMap.values());
    const sourceAccounts = accounts.filter(acc => acc.isSource);
    const destAccounts = accounts.filter(acc => acc.isDestination);

    // Create nodes for radial layout with central compromised node
    const nodes: Node[] = [];
    const centerX = 400;
    const centerY = 300;
    const radius = 200;
    
    // Find compromised account for center position
    const compromisedAcc = accounts.find(acc => acc.isCompromised);
    
    if (compromisedAcc) {
      // Place compromised account at center
      nodes.push({
        id: compromisedAcc.id,
        type: 'account',
        position: { x: centerX, y: centerY },
        data: {
          account: compromisedAcc.account,
          displayName: compromisedAcc.displayName,
          isCompromised: compromisedAcc.isCompromised,
          threatLevel: compromisedAcc.threatLevel,
          transactions: compromisedAcc.transactions
        }
      });
    }
    
    // Position other accounts in a circle around the center
    const otherAccounts = accounts.filter(acc => !acc.isCompromised);
    const angleStep = (2 * Math.PI) / otherAccounts.length;
    
    otherAccounts.forEach((account, index) => {
      const angle = index * angleStep;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      nodes.push({
        id: account.id,
        type: 'account',
        position: { x, y },
        data: {
          account: account.account,
          displayName: account.displayName,
          isCompromised: account.isCompromised,
          threatLevel: account.threatLevel,
          transactions: account.transactions
        }
      });
    });

    // Create edges with enhanced visuals - using standard edges for visibility
    const edges: Edge[] = Array.from(edgeMap.values()).map((edge, index) => {
      const isHighVolume = edge.count > 5;
      const strokeWidth = Math.min(8, Math.max(3, edge.count * 1.2));
      
      // Determine glow class based on edge type
      let edgeClass = '';
      if (edge.isSuspicious) {
        edgeClass = 'transaction-edge-suspicious';
      } else if (isHighVolume) {
        edgeClass = 'transaction-edge-volume';
      } else {
        edgeClass = 'transaction-edge-normal';
      }
      
      return {
        id: `edge-${index}`,
        source: edge.source,
        target: edge.target,
        type: 'default', // Use default edge type for better visibility
        animated: true,
        className: edgeClass, // Apply CSS animation class
        style: {
          strokeWidth,
          stroke: edge.isSuspicious ? '#ef4444' : isHighVolume ? '#f59e0b' : '#fbbf24',
          strokeOpacity: 0.9,
        },
        label: `$${((edge.count || 1) * 1000).toLocaleString()}`,
        labelStyle: {
          fontSize: '10px',
          fontWeight: 'bold',
          color: edge.isSuspicious ? '#ef4444' : '#000',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '2px 6px',
          borderRadius: '4px',
        },
        data: {
          count: edge.count,
          isSuspicious: edge.isSuspicious,
          isHighVolume,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: edge.isSuspicious ? '#ef4444' : '#fbbf24',
          width: 12,
          height: 12,
        },
      };
    });

    console.log('Generated nodes:', nodes.length, 'edges:', edges.length);
    console.log('Edge details:', edges.map(e => ({ id: e.id, source: e.source, target: e.target })));
    return { networkNodes: nodes, networkEdges: edges };
  }, [events]);

  const [nodes, setNodes, onNodesChange] = useNodesState(networkNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(networkEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Update nodes and edges when data changes
  React.useEffect(() => {
    setNodes(networkNodes);
    setEdges(networkEdges);
  }, [networkNodes, networkEdges, setNodes, setEdges]);

  if (networkNodes.length === 0) {
    return (
      <div className="h-full w-full bg-background relative flex items-center justify-center">
        <div className="text-foreground text-center">
          <h3 className="text-xl font-bold mb-2">Account Network Graph</h3>
          <p className="text-muted-foreground">Waiting for threat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-background relative">
      <div className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur-md p-4 rounded-lg border border-primary/20">
        <h3 className="text-lg font-bold mb-2 text-foreground">Account Network Graph</h3>
        <div className="text-sm space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-foreground">Compromised Account</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-foreground">High Risk</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-foreground">Normal</span>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            Accounts: {networkNodes.length} | Connections: {networkEdges.length}
          </div>
        </div>
      </div>
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.2, includeHiddenNodes: false }}
        attributionPosition="bottom-right"
        className="bg-background"
        defaultEdgeOptions={{
          style: { 
            strokeWidth: 4, 
            stroke: '#fbbf24',
            strokeOpacity: 0.8,
          },
          type: 'default',
          animated: true,
        }}
        connectionLineStyle={{ stroke: '#fbbf24', strokeWidth: 3 }}
        snapToGrid={false}
        snapGrid={[15, 15]}
      >
        <Controls className="bg-background border border-primary/20" />
        <Background 
          color="#666" 
          gap={20} 
          size={1} 
        />
        <MiniMap 
          className="bg-background border border-primary/20"
          nodeColor={(node) => {
            if (node.data?.isCompromised) return '#dc2626';
            if (typeof node.data?.threatLevel === 'number' && node.data.threatLevel > 7) return '#ea580c';
            if (typeof node.data?.threatLevel === 'number' && node.data.threatLevel > 3) return '#d97706';
            return '#059669';
          }}
        />
      </ReactFlow>
    </div>
  );
};