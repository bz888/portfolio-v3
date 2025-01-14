import Ballpit from '@/components/Ballpit';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex flex-col'>
    <div className="flex flex-col items-center justify-center h-1/3 mx-auto text-center pt-6 z-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link href="/">
        <span className="text-blue-500 underline hover:text-blue-700 cursor-pointer">
          Go back home
        </span>
      </Link>
    </div>
    <div className='w-screen h-screen fixed z-1'>
      <Ballpit/>
    </div>
    </div>
  );
}