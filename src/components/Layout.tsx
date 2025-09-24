import React from 'react';
import Header from '@/components/Header';
import { MadeWithApplaa } from '@/components/made-with-applaa';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-background">
       <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div>
      <Header />
      <main className="flex-1 w-full container py-8">
        {children}
      </main>
      <MadeWithApplaa />
    </div>
  );
}