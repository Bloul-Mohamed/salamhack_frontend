import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <main className='flex items-center justify-center h-[calc(100vh-56.8px)]'>
      <SignIn />
    </main>
}