import React from 'react'

import ConnectWallet from '../account/ConnectWallet'
import { Logo } from '../logo'
import { RpcSwitcher } from './RpcSwitcher'

export const Header: React.FC = () => {
  return (
    <header className="flex justify-between border-b px-4 border-default sm:px-48 top-0 w-full z-10 h-16 bg-scaffold">
      <div className="flex flex-row items-center justify-between h-16 flex-grow">
        <div>
          <a target="_blank" href="https://solend.fi" rel="noreferrer">
            <Logo />
          </a>
        </div>
        <div className="flex flex-row items-center justify-end space-x-2 sm:space-x-4">
          <RpcSwitcher />
          <ConnectWallet />
        </div>
      </div>
    </header>
  )
}
