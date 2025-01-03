import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function MarketingPage() {
  return (
    <div className="mx-auto flex w-full max-w-[988px] flex-1 flex-col items-center justify-center gap-2 p-4 lg:flex-row">
      <div className="relative mb-8 h-[240px] w-[240px] lg:mb-0 lg:h-[424px] lg:w-[424px]">
        <Image src="/hero.svg" alt="Hero" fill />
      </div>

      <div className="flex flex-col items-center gap-y-8">
        <h1 className="max-w-[480px] text-center text-xl font-bold text-neutral-600 lg:text-3xl">
          Μάθε, εξάσκησε και βοήθησε τον εαυτό σου με το Lingo!
        </h1>

        <div className="flex w-full max-w-[330px] flex-col items-center gap-y-3">
          <ClerkLoading>
            <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
          </ClerkLoading>

          <ClerkLoaded>
            <SignedOut>
              {/* Use a Link for Sign Up that redirects to the waitlist page */}
              <Link href="https://measured-reptile-13.accounts.dev/waitlist">
                <Button size="lg" variant="secondary" className="w-full">
                  Εγγραφή
                </Button>
              </Link>

              <SignInButton
                mode="modal"
                afterSignInUrl="/learn"
                afterSignUpUrl="/learn"
              >
                <Button size="lg" variant="primaryOutline" className="w-full">
                  Σύνδεση
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserStatusButton />
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
}

// Helper Component to Display Red Button for Banned Users
function UserStatusButton() {
  const { user } = useUser();

  if (user?.username === "admin") {
    return (
      <Button
        size="lg"
        variant="danger" // Assuming "danger" renders a red button
        className="w-full"
      >
        ACCOUNT IS BANNED FOR VIOLATING RULES
      </Button>
    );
  }

  return (
    <Button size="lg" variant="secondary" className="w-full" asChild>
      <Link href="/learn">Καλωσήρθες, συνέχισε!</Link>
    </Button>
  );
}

