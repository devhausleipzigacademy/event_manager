import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary:
              "bg-primary hover:bg-primary-dark text-sm normal-case",
            card: "py-4",
          },
        }}
      />
    </div>
  );
}
