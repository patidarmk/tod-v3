import { ListTodo } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <ListTodo className="h-6 w-6 text-primary" />
            <span className="font-bold inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TodoApp
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}