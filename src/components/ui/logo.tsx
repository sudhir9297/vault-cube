import Image from 'next/image'
import React from 'react'

function Logo() {
  return (
    <div className="flex gap-1 items-center  text-black">
      <Image src="/logo.png" width="30" height="30" alt="file drive logo" />
      <div className="flex items-center font-bold text-xl">
        Vault<div className="text-[#2a47c9]">Cube</div>
      </div>
    </div>
  )
}

export default Logo
