import { WalletEndpoint } from '@parrotfi/wallets'
import { web3 } from '@project-serum/anchor'
import BigNumber from 'bignumber.js'
import moment from 'moment'

export const NETWORK = process.env.NEXT_PUBLIC_NETWORK
export const VERSION = process.env.NEXT_PUBLIC_VERSION

/**
 * Used for lending page countdown
 */
export const IDO_STARTS = moment.utc(1635768000000)

export const RPC_ENDPOINTS: WalletEndpoint[] = [
  {
    id: 'solend',
    network: 'mainnet-beta' as web3.Cluster,
    rpcURL: 'https://rpc.solend.fi',
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
  {
    id: 'custom',
    network: 'mainnet-beta' as web3.Cluster,
    rpcURL: '',
    rpcName: 'Custom RPC',
    commitment: 'processed' as web3.Commitment,
  },
]

export const IDO_RESULTS = {
  '9ovxEpihFJNFhrpqNVg8HSDhtEG4CHneuRuyM9A6s9KV': {
    contributed: 26274440.451072,
    allocation: new BigNumber(4000000),
  },
}

export const IDO_ENDPOINTS = [
  {
    network: 'mainnet-beta' as web3.Cluster,
    programId: 'CyZ1SrCwv33hqMU8Shx6E1GhrY3PJ8yCcaMko5RpKaxt',
    usdcMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    pools: ['9ovxEpihFJNFhrpqNVg8HSDhtEG4CHneuRuyM9A6s9KV'],
  },
]

export const DEFAULT_RPC = RPC_ENDPOINTS.find((i) => i.id === 'solend')
