import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatRelative } from 'date-fns'

import { Doc } from '../../../../convex/_generated/dataModel'
import { FileTextIcon, GanttChartIcon, ImageIcon } from 'lucide-react'
import { ReactNode } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import Image from 'next/image'
import { FileCardActions } from './file-actions'

export function FileCard({
  file,
}: {
  file: Doc<'files'> & { isFavorited: boolean; url: string | null }
}) {
  const userProfile = useQuery(api.users.getUserProfile, {
    userId: file.userId,
  })

  const typeIcons = {
    image: <ImageIcon strokeWidth={1} />,
    pdf: <FileTextIcon strokeWidth={1} />,
    csv: <GanttChartIcon strokeWidth={1} />,
  } as Record<Doc<'files'>['type'], ReactNode>

  return (
    <Card className="rounded-xl shadow-none">
      <CardHeader className="relative flex flex-row items-center justify-between px-2 py-2 pl-6">
        <CardTitle className="flex w-full items-center gap-2 text-base font-normal">
          <div className="flex justify-center">{typeIcons[file.type]}</div>
          {file.name}
        </CardTitle>
        <div>
          <FileCardActions isFavorited={file.isFavorited} file={file} />
        </div>
      </CardHeader>
      <CardContent className="flex h-[200px] items-center justify-center">
        <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl">
          {file.type === 'image' && file.url && (
            <Image
              alt={file.name}
              layout="fill"
              objectFit="contain"
              src={file.url}
            />
          )}
          {file.type === 'csv' && (
            <GanttChartIcon strokeWidth={1} className="h-32 w-32" />
          )}
          {file.type === 'pdf' && (
            <FileTextIcon strokeWidth={1} className="h-32 w-32" />
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-700">
          <Avatar className="h-6 w-6">
            <AvatarImage src={userProfile?.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{userProfile?.name}</div>
            <div className="text-xs text-gray-700">
              Uploaded on{' '}
              {formatRelative(new Date(file._creationTime), new Date())}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
