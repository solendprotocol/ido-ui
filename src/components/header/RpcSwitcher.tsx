import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useWallet, WalletEndpoint } from '@parrotfi/wallets'
import classNames from 'classnames'
import React, { Fragment, useCallback, useState } from 'react'

import { RPC_ENDPOINTS } from '../../config/constants'

export const RpcSwitcher: React.FC = () => {
  const { setEndpoint, endpoint, customRpcUrl: savedCustomRpcUrl } = useWallet()
  const [customRpcURL, setCustomRpcURL] = useState(savedCustomRpcUrl)

  const handleChangeCustomRpc = useCallback(
    (evt) => {
      setCustomRpcURL(evt.target.value)
    },
    [setCustomRpcURL]
  )

  const handleSelectCustomRpc = useCallback(
    (endpoint: WalletEndpoint, close: () => void) => () => {
      if (customRpcURL) {
        endpoint.rpcURL = customRpcURL
        setEndpoint(endpoint)
      }
      close()
    },
    [customRpcURL]
  )

  const handleSelectEndpoint = useCallback(
    (endpoint: WalletEndpoint, close: () => void) => () => {
      setEndpoint(endpoint)
      close()
    },
    [setEndpoint]
  )

  return (
    <Popover className="relative hidden sm:block">
      <Popover.Button className="h-10 px-4 text-sm focus:outline-none flex flex-row items-center justify-center space-x-2 headerBtn primaryBtnColors">
        {endpoint?.rpcName}
        <ChevronDownIcon className="w-5 h-5" aria-hidden="true" />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="z-40 absolute bg-default w-full right-0 origin-top-right shadow-lg outline-none focus:outline-none border border-secondary">
          {({ close }) =>
            RPC_ENDPOINTS.map((item, index) => (
              <div key={item.id}>
                {item.id !== 'custom' ? (
                  <button
                    onClick={handleSelectEndpoint(item, close)}
                    className={classNames(
                      'text-black group flex items-center justify-center w-full px-2 py-4 hover:text-brandPrimary rpcItem',
                      {
                        'border-t border-gray': index > 0,
                      }
                    )}
                  >
                    {item.rpcName}
                  </button>
                ) : (
                  <div className="border-t border-gray group w-full flex flex-col items-center px-3 py-3">
                    <div className="flex flex-row items-center w-full">
                      <label className="text-black flex-1 font-bold">Custom RPC</label>
                      <button
                        className="text-black text-sm"
                        onClick={handleSelectCustomRpc(item, close)}
                      >
                        edit
                      </button>
                    </div>
                    <input
                      placeholder="https://api.mainnet-beta.solana.com"
                      className="text-black bg-input appearance-none pt-2 text-xs focus:outline-none outline-none inline-flex w-full"
                      value={customRpcURL}
                      onChange={handleChangeCustomRpc}
                    />
                  </div>
                )}
              </div>
            ))
          }
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
