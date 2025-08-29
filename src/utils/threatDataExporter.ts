import { ThreatEvent } from '@/components/AuraDashboard';

export interface ThreatDataJSON {
  timestamp: number;
  totalEvents: number;
  suspiciousEvents: number;
  accounts: AccountData[];
  transactions: TransactionData[];
  networkGraph: NetworkGraphData;
}

export interface AccountData {
  id: string;
  name: string;
  isCompromised: boolean;
  threatLevel: number;
  totalTransactions: number;
  suspiciousTransactions: number;
  totalAmount: number;
  location: {
    country: string;
    city: string;
    lat: number;
    lng: number;
  };
}

export interface TransactionData {
  id: string;
  from: string;
  to: string;
  amount: number;
  timestamp: number;
  status: 'success' | 'blocked' | 'suspicious';
  severity?: 'low' | 'medium' | 'high' | 'critical';
  attackType?: string;
}

export interface NetworkGraphData {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  compromisedAccount: string | null;
}

export interface NetworkNode {
  id: string;
  label: string;
  isCompromised: boolean;
  threatLevel: number;
  totalTransactions: number;
  position?: [number, number, number];
}

export interface NetworkEdge {
  from: string;
  to: string;
  weight: number;
  isSuspicious: boolean;
  transactions: number;
}

export class ThreatDataExporter {
  private static instance: ThreatDataExporter;
  private currentData: ThreatDataJSON | null = null;

  static getInstance(): ThreatDataExporter {
    if (!ThreatDataExporter.instance) {
      ThreatDataExporter.instance = new ThreatDataExporter();
    }
    return ThreatDataExporter.instance;
  }

  exportToJSON(events: ThreatEvent[]): ThreatDataJSON {
    const accountMap = new Map<string, AccountData>();
    const transactionData: TransactionData[] = [];
    
    // Process events to build account and transaction data
    events.forEach(event => {
      // Process source account
      if (!accountMap.has(event.source_account)) {
        accountMap.set(event.source_account, {
          id: event.source_account,
          name: event.source_account.replace('ACC_', '').replace(/_/g, ' '),
          isCompromised: false,
          threatLevel: 0,
          totalTransactions: 0,
          suspiciousTransactions: 0,
          totalAmount: 0,
          location: event.source_geo
        });
      }

      // Process destination account
      if (!accountMap.has(event.dest_account)) {
        accountMap.set(event.dest_account, {
          id: event.dest_account,
          name: event.dest_account.replace('ACC_', '').replace(/_/g, ' '),
          isCompromised: false,
          threatLevel: 0,
          totalTransactions: 0,
          suspiciousTransactions: 0,
          totalAmount: 0,
          location: event.dest_geo
        });
      }

      // Update account data
      const sourceAccount = accountMap.get(event.source_account)!;
      const destAccount = accountMap.get(event.dest_account)!;

      sourceAccount.totalTransactions++;
      destAccount.totalTransactions++;
      
      if (event.amount) {
        sourceAccount.totalAmount += event.amount;
        destAccount.totalAmount += event.amount;
      }

      if (event.suspicious) {
        sourceAccount.suspiciousTransactions++;
        destAccount.suspiciousTransactions++;
        
        const severityWeight = {
          'low': 1,
          'medium': 3,
          'high': 7,
          'critical': 10
        };
        
        const threatIncrease = severityWeight[event.severity || 'medium'];
        sourceAccount.threatLevel = Math.min(10, sourceAccount.threatLevel + threatIncrease);
        destAccount.threatLevel = Math.min(10, destAccount.threatLevel + threatIncrease);
      }

      // Add transaction data
      transactionData.push({
        id: event.id,
        from: event.source_account,
        to: event.dest_account,
        amount: event.amount || 0,
        timestamp: event.timestamp,
        status: event.status,
        severity: event.severity,
        attackType: event.attack_type
      });
    });

    // Find compromised account (most targeted)
    const targetCounts = new Map<string, number>();
    events.forEach(event => {
      if (event.suspicious) {
        const count = targetCounts.get(event.dest_account) || 0;
        targetCounts.set(event.dest_account, count + 1);
      }
    });

    const compromisedAccount = Array.from(targetCounts.entries())
      .sort(([,a], [,b]) => b - a)[0]?.[0] || null;

    // Mark compromised account
    if (compromisedAccount && accountMap.has(compromisedAccount)) {
      accountMap.get(compromisedAccount)!.isCompromised = true;
    }

    // Build network graph data
    const networkGraph = this.buildNetworkGraph(Array.from(accountMap.values()), transactionData, compromisedAccount);

    const result: ThreatDataJSON = {
      timestamp: Date.now(),
      totalEvents: events.length,
      suspiciousEvents: events.filter(e => e.suspicious).length,
      accounts: Array.from(accountMap.values()),
      transactions: transactionData,
      networkGraph
    };

    this.currentData = result;
    return result;
  }

  private buildNetworkGraph(accounts: AccountData[], transactions: TransactionData[], compromisedAccount: string | null): NetworkGraphData {
    const nodes: NetworkNode[] = accounts.map(account => ({
      id: account.id,
      label: account.name,
      isCompromised: account.isCompromised,
      threatLevel: account.threatLevel,
      totalTransactions: account.totalTransactions
    }));

    const edgeMap = new Map<string, NetworkEdge>();
    
    transactions.forEach(transaction => {
      const edgeKey = `${transaction.from}-${transaction.to}`;
      if (!edgeMap.has(edgeKey)) {
        edgeMap.set(edgeKey, {
          from: transaction.from,
          to: transaction.to,
          weight: 0,
          isSuspicious: false,
          transactions: 0
        });
      }

      const edge = edgeMap.get(edgeKey)!;
      edge.weight += transaction.amount;
      edge.transactions++;
      
      if (transaction.status === 'suspicious') {
        edge.isSuspicious = true;
      }
    });

    return {
      nodes,
      edges: Array.from(edgeMap.values()),
      compromisedAccount
    };
  }

  getCurrentData(): ThreatDataJSON | null {
    return this.currentData;
  }

  downloadJSON(): void {
    if (!this.currentData) return;

    const dataStr = JSON.stringify(this.currentData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `threat-data-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }
}