import { Button } from "../button";
import { useNavigate } from "react-router-dom";
import { Header } from "../header/header";
import { myImage } from "../../../public/";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full">
      <Header />
      <div className="flex flex-row items-center justify-center min-h-screen bg-background text-foreground">
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
        </div>
        <div
          className="w-64 h-64 bg-cover bg-center rounded-lg shadow-lg"
          style={{ backgroundImage: `url(${myImage})` }}
        />
      </div>
    </div>
  );
}
