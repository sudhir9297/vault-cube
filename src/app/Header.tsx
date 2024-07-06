import { OrganizationSwitcher, SignInButton, UserButton } from '@clerk/nextjs'

export const Header = () => {
  return (
    <div className="border-b py-4 bg-gray-50 ">
      <div className="items-center mx-auto justify-between flex ">
        <div> Vault Cube</div>
        <div>
          <OrganizationSwitcher />
          <UserButton />
          <SignInButton />
        </div>
      </div>
    </div>
  )
}
