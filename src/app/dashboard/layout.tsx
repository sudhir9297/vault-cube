// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

import { SideNav } from './side-nav'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="mx-auto min-h-screen">
      <div className="flex">
        <SideNav />
        <div className="h-screen w-full rounded-3xl bg-[#F6F8FB] p-6">
          {children}
        </div>
      </div>
    </main>
  )
}
