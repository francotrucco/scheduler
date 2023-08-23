import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

function Header() {
  return (
    <header
      className="
        mx-auto
        flex
        w-full
        max-w-4xl
        items-center
        justify-between
        p-8
        text-white
      "
    >
      <h1>My App</h1>
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton
          appearance={{
            elements: {
              userButtonPopoverCard: "bg-teal-100",
            },
          }}
        />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton />
      </SignedOut>
    </header>
  );
}

export default Header;
