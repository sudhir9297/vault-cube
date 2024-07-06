"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignOutButton, UserButton } from "@clerk/clerk-react";
import { SignedOut, SignInButton, useSession } from "@clerk/nextjs";
import { useMutation, useQueries, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const files = useQuery(api.files.getFiles)

  const createFile = useMutation(api.files.createFile)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>

      {
        files?.map((file) => {
          return <div key={file._id}>
            {file.name}
          </div>
        })
      }

      <Button onClick={() => createFile({ name: "sudhir" })}>
        Click Me
      </Button>
    </main>
  );
}
