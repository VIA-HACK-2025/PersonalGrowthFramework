import { Avatar } from "../avatar";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-background shadow">
      <div className="flex items-center gap-4">
        <span className="font-bold text-xl">MyApp</span>
        <nav className="hidden md:flex gap-2">
          <Button variant="ghost">Home</Button>
          <Button variant="ghost">Tasks</Button>
          <Button variant="ghost">Learning Plan</Button>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost">Search</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
