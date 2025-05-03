import { Button } from "../button";
import { useNavigate } from "react-router-dom";
import { Header } from "../header/header";
import myImage from "../../../public/leone-venter-VieM9BdZKFo-unsplash.jpg";
import { NodeDialogCard } from "../ui/node-dialog-card";
import { XpProgress } from "../ui/XPProgress";

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
          <Button onClick={() => navigate("/graph")} className="">
            Go to Graph Page
          </Button>

          <NodeDialogCard />
          <XpProgress value={10} className="m-1.5" />
        </div>
      </div>
    </div>
  );
}
