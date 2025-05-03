import { useNavigate } from "react-router-dom";
import { Button } from "../button";
export function Header() {
  const navigate = useNavigate();
  return (
    <header className="w-full flex justify-between px-4 py-3 bg-background shadow">
      {/* Logo / Brand */}
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold">PetMixer</span>
      </div>

      {/* Desktop navigation */}
      <nav className="hidden md:flex gap-4">
        <Button variant="ghost">Home</Button>
        <Button variant="ghost">Features</Button>
      </nav>

      {/* Right side: User menu */}
      <div className="flex flex-1 gap-2">
        <Button
          size={"lg"}
          variant={"secondary"}
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </div>
    </header>
  );
}
