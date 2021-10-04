import React from 'react'

export const Logo: React.FC = () => {
  return (
    <>
      <div className="select-none hidden dark:block">
        <img
          src="/icons/logo.dark.svg"
          alt="Logo"
          height="50"
          style={{
            height: 50,
          }}
        />
      </div>
      <div className="select-none dark:hidden">
        <img
          src="/icons/logo.light.svg"
          alt="Logo"
          height="50"
          style={{
            height: 50,
          }}
        />
      </div>
    </>
  )
}
