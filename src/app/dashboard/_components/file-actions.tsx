import { Doc, Id } from '../../../../convex/_generated/dataModel'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Download,
  FileIcon,
  MoreVertical,
  StarHalf,
  StarIcon,
  StarOffIcon,
  TrashIcon,
  UndoIcon,
} from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useState } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useToast } from '@/components/ui/use-toast'
import { Protect } from '@clerk/nextjs'

export function FileCardActions({
  file,
  isFavorited,
}: {
  file: Doc<'files'> & { url: string | null }
  isFavorited: boolean
}) {
  const deleteFile = useMutation(api.files.deleteFile)
  const restoreFile = useMutation(api.files.restoreFile)
  const toggleFavorite = useMutation(api.files.toggleFavorite)
  const { toast } = useToast()
  const me = useQuery(api.users.getMe)

  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  return (
    <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will mark the file for our deletion process. Files are
              deleted periodically
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteFile({
                  fileId: file._id,
                })
                toast({
                  variant: 'default',
                  title: 'File marked for deletion',
                  description: 'Your file will be deleted soon',
                })
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical strokeWidth={1} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              if (!file.url) return
              window.open(file.url, '_blank')
            }}
            className="flex cursor-pointer items-center gap-2"
          >
            <Download className="h-4 w-4" /> Download
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              toggleFavorite({
                fileId: file._id,
              })
            }}
            className="flex cursor-pointer items-center gap-2"
          >
            {isFavorited ? (
              <div className="flex items-center gap-2">
                <StarOffIcon className="h-4 w-4" /> Unfavorite
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <StarIcon className="h-4 w-4" /> Favorite
              </div>
            )}
          </DropdownMenuItem>

          <Protect
            condition={(check) => {
              return (
                check({
                  role: 'org:admin',
                }) || file.userId === me?._id
              )
            }}
            fallback={<></>}
          >
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                if (file.shouldDelete) {
                  restoreFile({
                    fileId: file._id,
                  })
                } else {
                  setIsConfirmOpen(true)
                }
              }}
              className="flex cursor-pointer items-center gap-2"
            >
              {file.shouldDelete ? (
                <div className="flex cursor-pointer items-center gap-2 text-green-600">
                  <UndoIcon className="h-4 w-4" /> Restore
                </div>
              ) : (
                <div className="flex cursor-pointer items-center gap-2 text-red-600">
                  <TrashIcon className="h-4 w-4" /> Delete
                </div>
              )}
            </DropdownMenuItem>
          </Protect>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
