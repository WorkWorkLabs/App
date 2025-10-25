'use client'

import React, { useMemo } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'

export default function SolanaProvider({ children }: { children: React.ReactNode }) {
  // 使用主网，后续可配置为 devnet/testnet
  const endpoint = 'https://api.mainnet-beta.solana.com'
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  )
}