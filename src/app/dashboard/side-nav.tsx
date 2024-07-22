'use client'

import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import {
  FileIcon,
  icons,
  LayoutDashboard,
  StarIcon,
  TrashIcon,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UploadButton } from './_components/upload-button'

export function SideNav() {
  const pathname = usePathname()

  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      icon: <LayoutDashboard size={20} strokeWidth={1} />,
      path: '/dashboard/files',
    },
    {
      id: 2,
      name: 'Favorites',
      icon: <StarIcon size={20} strokeWidth={1} />,
      path: '/dashboard/favorites',
    },
    {
      id: 3,
      name: 'Trash',
      icon: <TrashIcon size={20} strokeWidth={1} />,
      path: '/dashboard/trash',
    },
  ]

  return (
    <div className="min-w-80">
      <div className="my-4 ml-4">
        <UploadButton />
      </div>
      <div className="flex flex-col pt-4">
        {menuList.map((el) => (
          <Link key={el.id} href={el.path} className="px-4 py-1">
            <div
              className={clsx(
                'flex w-full justify-start gap-1.5 rounded-md p-2.5 text-sm',
                {
                  'bg-[#F5F7FB] font-semibold': pathname.includes(el.path),
                },
              )}
            >
              {el.icon}
              {el.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
