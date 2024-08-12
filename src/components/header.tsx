import { Button } from '@/components/ui/button'
import Logo from '@/components/ui/logo'
import {
  OrganizationList,
  OrganizationProfile,
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  UserProfile,
  useSession,
} from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <div className="relative z-10 px-2 py-3">
      <div className="mx-auto flex items-center justify-between">
        <Link href="/" className="ml-4">
          <Logo />
        </Link>

        <div className="flex gap-2">
          <OrganizationSwitcher />
          <UserButton />

          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  )
}
