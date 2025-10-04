import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
      <>
     <div className="flex my-20 w-full items-center justify-center bg-background sm:my-8 md:my-10 lg:my-12 xl:my-16">
        <SignUp />
        </div>
      </>
    )
}