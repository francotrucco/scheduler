"use client";

import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";

export default function Home() {
  const user = useUser();

  if (!user) {
    return <p>No logged in user</p>;
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          {user.isSignedIn ? <SignOutButton /> : <SignInButton />}
        </div>
      </main>
    </>
  );
}
