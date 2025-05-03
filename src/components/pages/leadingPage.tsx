import { Button } from "../button";
import { useNavigate } from "react-router-dom";
import { Header } from "../header/header";
import myImage from "../../../public/landing-page-back.jpg";
import { XpProgress } from "../ui/XpProgress";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full">
      <Header />
      <div
        className="flex flex-row items-center justify-center min-h-screen text-foreground bg-cover "
        style={{ backgroundImage: `url(${myImage})` }}
      >
        <div>
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Personal Growth Framework
          </h1>
          <p className="text-lg mb-6">
            Track your learning and time with visual graphs!
          </p>
          <Button onClick={() => navigate("/graph")} className="w-2xl h-16 !text-2xl">
            Go to Graph Page
          </Button>
          <XpProgress value={10} className="m-1.5" />
        </div>
      </div>
    </div>
  );
}
