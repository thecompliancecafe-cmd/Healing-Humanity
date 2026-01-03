
export enum CampaignCategory {
  Medical = 'Medical',
  Education = 'Education',
  DisasterRelief = 'Disaster Relief',
  Environment = 'Environment',
  HumanRights = 'Human Rights'
}

export interface SpendingRecord {
  id: string;
  description: string;
  amount: number;
  date: string;
  proofUrl?: string;
  category: 'Operational' | 'Direct Aid' | 'Logistics';
}

export interface ImpactEvidence {
  id: string;
  type: 'image' | 'video' | 'document';
  url: string;
  caption: string;
  timestamp: string;
  location: string;
  verificationStatus: 'AI_VERIFIED' | 'PENDING' | 'MANUAL_REVIEW' | 'ZK_PROOF_VERIFIED';
  comparisonTag?: 'BEFORE' | 'AFTER';
  isPrivate?: boolean;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  category: CampaignCategory;
  targetAmount: number;
  raisedAmount: number;
  walletAddress: string;
  imageUrl: string;
  spendingHistory: SpendingRecord[];
  platformFeePercentage: number;
  source?: 'Native' | 'The Giving Block' | 'Gitcoin' | 'UNICEF';
  tScore: number;
  impactEvidence: ImpactEvidence[];
  isLocked?: boolean;
  attestationHash?: string;
}

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  amount: number;
  timestamp: number;
  type: 'DONATION' | 'PLATFORM_FEE' | 'CHARITY_RELEASE' | 'SPENDING';
  status: 'PENDING' | 'CONFIRMED';
  smartRoute?: {
    aidPercentage: number;
    opsPercentage: number;
  };
}

export interface AuditReport {
  score: number;
  summary: string;
  riskAnalysis: string;
  efficiencyRating: string;
  attestationId?: string;
}

export interface AnomalyFlag {
  id: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  detectedAt: string;
  campaignId: string;
  status: 'OPEN' | 'RESOLVED';
}

export interface ConnectedExchange {
  id: string;
  name: string;
  status: 'Connected' | 'Not Connected';
  icon: string; 
  lastSynced?: string;
}

// --- GAMIFICATION TYPES ---

export interface Quest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  progress: number;
  totalRequired: number;
  status: 'ACTIVE' | 'COMPLETED' | 'LOCKED';
  deadline?: string;
  icon?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Transparency Champion';
  unlockedAt?: string;
}

export interface UserLevel {
  currentLevel: number;
  currentXp: number;
  nextLevelXp: number;
  title: string;
}

export interface ImpactTeam {
  id: string;
  name: string;
  memberCount: number;
  totalImpactXp: number;
  rank: number;
  avatar: string;
  yieldBonus?: number;
}

export interface GeoRanking {
  city: string;
  donors: number;
  totalDonated: number;
  rank: number;
}

export interface ChainReaction {
  id: string;
  creator: string;
  type: 'MATCH' | 'SPEED' | 'STREAK';
  target: number;
  current: number;
  endsAt: number;
}

export interface SocialChallenge {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  endsIn: string;
  multiplier: number;
  isQuadratic?: boolean;
}

export interface UserProfile {
  name: string;
  handle: string;
  walletAddress: string;
  totalDonated: number; 
  impactScore: number;
  avatarUrl: string;
  connectedExchanges: ConnectedExchange[];
  
  levelInfo: UserLevel;
  streakDays: number;
  trustMultiplier: number;
  avatarType: 'Scholar' | 'Guardian' | 'Provider' | 'Protector' | 'Novice';
  activeQuests: Quest[];
  unlockedBadges: Badge[];
  team?: ImpactTeam;
}
