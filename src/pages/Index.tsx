import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Diya from "@/components/Diya";
import { toast } from "@/hooks/use-toast";
import { useMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [showRedirect, setShowRedirect] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMobile();

  useEffect(() => {
    const audio = new Audio(
      "https://pagalfree.com/musics/128-Kudmayi%20(Film%20Version)%20-%20Rocky%20Aur%20Rani%20Kii%20Prem%20Kahaani%20128%20Kbps.mp3"
    );
    audio.preload = "auto";

    const playAudio = () => {
      audio
        .play()
        .catch((error) =>
          console.error("Failed to play audio automatically:", error)
        );
      document.removeEventListener("click", playAudio);
      document.removeEventListener("touchstart", playAudio);
    };

    document.addEventListener("click", playAudio);
    document.addEventListener("touchstart", playAudio);

    return () => {
      document.removeEventListener("click", playAudio);
      document.removeEventListener("touchstart", playAudio);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const handleOpenInvitation = () => {
    if (isMobile) {
      setOpen(true);
    } else {
      setShowRedirect(true);
    }
  };

  const handleSubmit = () => {
    if (passcode === "PriyaWedsVijay") {
      setShowRedirect(true);
      setOpen(false);
    } else {
      toast({
        title: "Incorrect Passcode",
        description: "Please enter the correct passcode to proceed.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-amber-50 flex flex-col items-center justify-center relative py-8 px-4 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-10 left-0 right-0 flex justify-center transform -rotate-12">
        <img
          src="/lovable-uploads/762354ab-cff9-4c6a-9800-94eeefc3c43c.png"
          alt="Decorative element"
          className="w-60 h-auto opacity-15"
        />
      </div>
      <div className="absolute -bottom-20 -left-20 transform rotate-45">
        <img
          src="/lovable-uploads/e1d52835-2f4a-42a2-8647-66379e0cc295.png"
          alt="Decorative element"
          className="w-60 h-auto opacity-15"
        />
      </div>

      {/* Diya animation at top */}
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2">
        <Diya />
      </div>
      <div className="absolute top-5 right-12">
        <Diya />
      </div>
      <div className="absolute top-5 left-12">
        <Diya />
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-2xl p-6 md:p-10 max-w-md w-full text-center relative border-2 border-red-800 z-10"
      >
        <img
          src="/lovable-uploads/5d906655-818b-462e-887e-0a392db20d48.png"
          alt="Lord Ganesh"
          className="w-28 h-auto mx-auto mb-4 transform -translate-y-20 absolute left-1/2 -translate-x-1/2 top-0"
        />

        <h3 className="text-red-800 font-semibold text-xl mt-12">शुभ विवाह</h3>
        <h1 className="text-3xl md:text-4xl font-bold text-red-900 mt-3">
          Priya & Vijay
        </h1>
        <h3 className="text-amber-700 font-medium mt-2 mb-6">
          30<sup>th</sup> March, 2025
        </h3>

        <p className="text-gray-700 mb-8">
          You are cordially invited to celebrate the Sacred Union of
        </p>

        <Button
          onClick={handleOpenInvitation}
          className="bg-red-800 hover:bg-red-900 text-white px-6 py-6 rounded-lg shadow-md text-lg font-medium w-full mb-4 transition-transform transform hover:scale-105"
        >
          Open Invitation
        </Button>

        <Button
          onClick={() => navigate("/wishing-wall")}
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-4 rounded-lg shadow-md text-base font-medium w-full transition-transform transform hover:scale-105"
        >
          💐 Send Your Blessings 💐
        </Button>
      </motion.div>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white rounded-lg border-2 border-amber-700 max-w-md">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-red-800 mb-4">
              Enter Passcode
            </h2>
            <input
              type="text"
              placeholder="Passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full p-3 border-2 border-amber-200 rounded-lg mb-4 text-center focus:outline-none focus:border-amber-500"
            />
            <Button
              onClick={handleSubmit}
              className="bg-red-800 hover:bg-red-900 text-white px-6 py-2 rounded-lg w-full"
            >
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {showRedirect && <Navigate to="/invitation" />}
    </div>
  );
};

export default Index;
