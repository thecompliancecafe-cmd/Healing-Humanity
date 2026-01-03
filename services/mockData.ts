
import { Campaign, CampaignCategory, Transaction, UserProfile, AnomalyFlag, Quest, Badge, ImpactTeam, GeoRanking, SocialChallenge, ChainReaction } from '../types';

export const MOCK_TEAMS: ImpactTeam[] = [
  { id: 't1', name: 'Silicon Valley Guardians', memberCount: 124, totalImpactXp: 850000, rank: 1, avatar: '🏢', yieldBonus: 0.15 },
  { id: 't2', name: 'Crypto Philanthropists', memberCount: 89, totalImpactXp: 720000, rank: 2, avatar: '🪙', yieldBonus: 0.10 },
  { id: 't3', name: 'Eco-Warriors Alliance', memberCount: 210, totalImpactXp: 610000, rank: 3, avatar: '🌱', yieldBonus: 0.05 },
];

export const MOCK_GEO_RANKINGS: GeoRanking[] = [
  { city: 'Mumbai', donors: 1200, totalDonated: 450, rank: 1 },
  { city: 'New York', donors: 850, totalDonated: 380, rank: 2 },
  { city: 'London', donors: 720, totalDonated: 310, rank: 3 },
  { city: 'Singapore', donors: 540, totalDonated: 290, rank: 4 },
];

export const MOCK_CHALLENGES: SocialChallenge[] = [
  { id: 'sc1', title: '#Feed100K Challenge', description: 'Amplify your impact with Quadratic Matching.', targetAmount: 100000, currentAmount: 64500, endsIn: '2 days', multiplier: 1.5, isQuadratic: true },
  { id: 'sc2', title: 'Education Marathon', description: 'Matching funds from Casper Treasury.', targetAmount: 50000, currentAmount: 12000, endsIn: '18 hours', multiplier: 2.0, isQuadratic: true },
];

export const MOCK_CHAIN_REACTIONS: ChainReaction[] = [
  { id: 'cr1', creator: '@vitalik', type: 'MATCH', target: 50, current: 32.5, endsAt: Date.now() + 7200000 },
];

export const MOCK_QUESTS: Quest[] = [
  { id: 'q1', title: 'The First Drop', description: 'Clean water for 10 people.', xpReward: 500, progress: 10, totalRequired: 10, status: 'COMPLETED', icon: '💧' },
  { id: 'q2', title: 'Education Guardian', description: 'Fund 3 scholarship programs.', xpReward: 1200, progress: 1, totalRequired: 3, status: 'ACTIVE', deadline: '3 days left', icon: '🎓' },
];

export const MOCK_BADGES: Badge[] = [
  { id: 'b1', name: 'Early Adopter', description: 'Genesis phase member.', imageUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=b1', rarity: 'Rare', unlockedAt: '2023-01-15' },
  { id: 'b4', name: 'Transparency King', description: 'Casper Attestation verified.', imageUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=trust', rarity: 'Transparency Champion', unlockedAt: '2024-02-12' },
];

export const MOCK_USER: UserProfile = {
  name: "Alex 'Block' Miner",
  handle: "@alex_blocks",
  walletAddress: "0x71C...9A23",
  totalDonated: 12.5,
  impactScore: 850,
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  connectedExchanges: [
    { id: 'kucoin', name: 'KuCoin', status: 'Connected', icon: 'K', lastSynced: '2 mins ago' }
  ],
  levelInfo: {
    currentLevel: 4,
    currentXp: 4200,
    nextLevelXp: 5000,
    title: 'Consensus Guardian'
  },
  streakDays: 12,
  trustMultiplier: 1.25,
  avatarType: 'Guardian',
  activeQuests: MOCK_QUESTS,
  unlockedBadges: MOCK_BADGES,
  team: MOCK_TEAMS[0]
};

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 'c_001',
    title: 'Clean Water for Rural Delta',
    description: 'Providing sustainable water filtration systems with ZK-verified impact proofs.',
    category: CampaignCategory.Environment,
    targetAmount: 50000,
    raisedAmount: 32450,
    walletAddress: '0x71C...9A23',
    imageUrl: 'https://images.unsplash.com/photo-1541252260732-48221e1650f9?auto=format&fit=crop&q=80&w=800',
    platformFeePercentage: 2.5,
    source: 'Native',
    tScore: 98,
    isLocked: false,
    spendingHistory: [
      { id: 's_1', description: 'Filtration Units', amount: 12000, date: '2023-10-15', category: 'Direct Aid' },
    ],
    impactEvidence: [
      {
        id: 'ie_1', type: 'image', url: 'https://images.unsplash.com/photo-1541252260732-48221e1650f9?auto=format&fit=crop&q=80&w=800', 
        caption: 'Village Center - Active', timestamp: '2023-11-15', location: '12.45° N, 34.12° E', verificationStatus: 'ZK_PROOF_VERIFIED', isPrivate: true
      }
    ],
    attestationHash: 'csp_att_882199f3a1b2c3d4e5f6g7h8i9j0k1l2'
  }
];

export const EXTERNAL_CAMPAIGNS: Campaign[] = [];

export const MOCK_ANOMALIES: AnomalyFlag[] = [
  { id: 'a_1', severity: 'HIGH', description: 'Mismatched Casper attestation detected.', detectedAt: '2024-02-10T14:30:00Z', campaignId: 'c_003', status: 'OPEN' },
];

export const generateMockTransactions = (campaignId: string): Transaction[] => {
  const txs: Transaction[] = [];
  const now = Date.now();
  for(let i = 0; i < 5; i++) {
    txs.push({
      hash: `0x${Math.random().toString(16).substr(2, 40)}`,
      from: `0x${Math.random().toString(16).substr(2, 10)}...`,
      to: 'Escrow Vault',
      amount: Math.floor(Math.random() * 50) + 10,
      timestamp: now - (i * 86400000),
      type: 'DONATION',
      status: 'CONFIRMED',
      smartRoute: { aidPercentage: 90, opsPercentage: 10 }
    });
  }
  return txs;
};
