'use client'
import Movie from '@/components/Movie';
export default function Home() {

  

  return (
    <div id="home" className="">
      <h1 className="text-4xl text-center font-bold mt-20">Welcome to Movie App</h1>
      <Movie></Movie>
    </div>
  );
}
