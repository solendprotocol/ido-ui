import { WalletEndpoint } from '@parrotfi/wallets'
import { web3 } from '@project-serum/anchor'
import BigNumber from 'bignumber.js'
import moment from 'moment'

export const NETWORK = process.env.NEXT_PUBLIC_NETWORK
export const VERSION = process.env.NEXT_PUBLIC_VERSION

/**
 * Used for lending page countdown
 */
export const IDO_STARTS = moment('2021-11-01')

export const RPC_ENDPOINTS: WalletEndpoint[] = [
  {
    id: 'quicknode',
    network: 'mainnet-beta' as web3.Cluster,
    rpcURL:
      'https://wispy-shy-sun.solana-mainnet.quiknode.pro/89cfe785b014007e7ee4c5f2ee5bb5572b4735db/',
    rpcName: 'Solend Node 1',
    commitment: 'processed',
  },
  {
    id: 'genesys',
    network: 'mainnet-beta' as web3.Cluster,
    rpcURL: 'https://lokidfxnwlabdq.main.genesysgo.net:8899',
    rpcName: 'Solend Node 2',
    commitment: 'processed',
  },
  {
    id: 'public',
    network: 'mainnet-beta' as web3.Cluster,
    rpcURL: 'https://api.mainnet-beta.solana.com',
    rpcName: 'Public Mainnet RPC',
    commitment: 'processed',
  },
  {
    id: 'serum',
    network: 'mainnet-beta' as web3.Cluster,
    rpcURL: 'https://solana-api.projectserum.com',
    rpcName: 'Serum RPC',
    commitment: 'processed',
  },
  {
    id: 'rpcpool',
    network: 'mainnet-beta' as web3.Cluster,
    rpcURL: 'https://free.rpcpool.com',
    rpcName: 'RPCPool RPC',
    commitment: 'processed',
  },
  // TODO: Filter by deployment
  {
    id: 'devnet',
    network: 'devnet' as web3.Cluster,
    rpcURL: 'https://api.devnet.solana.com',
    rpcName: 'Solana Devnet',
    commitment: 'processed' as web3.Commitment,
  },
  {
    id: 'devnet2',
    network: 'devnet' as web3.Cluster,
    rpcURL:
      'https://wispy-white-bird.solana-devnet.quiknode.pro/77f628d0d9a021582e43e00e6b16cbbe19a08bf9/',
    rpcName: 'Solana Devnet',
    commitment: 'processed' as web3.Commitment,
  },
  {
    id: 'custom',
    network: 'mainnet-beta' as web3.Cluster,
    rpcURL: '',
    rpcName: 'Custom RPC',
    commitment: 'processed' as web3.Commitment,
  },
]

export const IDO_RESULTS = {
  '5JGWQPf6zLhuxL4bXa8aWKPxakqVJMWbMf9TBaVWfpXD': {
    contributed: 69229456.78,
    allocation: new BigNumber(2.1).multipliedBy(0.8).multipliedBy(10 ** 9),
  },
  '9U8xzksWyGkKCAdf4yS49VftTKXk5sSurJn8xF1hcdqd': {
    contributed: 15544369.99,
    allocation: new BigNumber(2.1).multipliedBy(0.2).multipliedBy(10 ** 9),
  },
}

export const IDO_ENDPOINTS = [
  {
    network: 'mainnet-beta' as web3.Cluster,
    programId: '7r2chJLUU87eaM7T1aBi6f7g9BbtbgnwQ9kPbMGxJQWV',
    usdcMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    pools: [
      '5JGWQPf6zLhuxL4bXa8aWKPxakqVJMWbMf9TBaVWfpXD', //Round 1
      '9U8xzksWyGkKCAdf4yS49VftTKXk5sSurJn8xF1hcdqd', //Round 2
    ],
  },
  {
    network: 'devnet' as web3.Cluster,
    programId: '8SBvVZtJbHPQVhbsmQz8c4Msyj2i1WYrigMEi2BY2YHH',
    usdcMint: 'BoKaqcjcRgbaciV33odD1rMrtz29wh5HFFVmSFBMTZhQ',
    pools: ['DNYoGszDLvVpz2hQB6Z9RMWpXynBWGuWn4JGdLoDgY85'],
  },
]

export const DEFAULT_RPC = RPC_ENDPOINTS.find((i) => i.id === 'devnet2')
