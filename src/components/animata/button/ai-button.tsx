import { Loader2, Sparkle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { loadFull } from "tsparticles";

import type { ISourceOptions } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const options: ISourceOptions = {
  key: "star",
  name: "Star",
  particles: {
    number: {
      value: 20,
      density: {
        enable: false,
      },
    },
    color: {
      value: ["#7c3aed", "#bae6fd", "#a78bfa", "#93c5fd", "#0284c7", "#fafafa", "#38bdf8"],
    },
    shape: {
      type: "star",
      options: {
        star: {
          sides: 4,
        },
      },
    },
    opacity: {
      value: 0.8,
    },
    size: {
      value: { min: 1, max: 4 },
    },
    rotate: {
      value: {
        min: 0,
        max: 360,
      },
      enable: true,
      direction: "clockwise",
      animation: {
        enable: true,
        speed: 10,
        sync: false,
      },
    },
    links: {
      enable: false,
    },
    reduceDuplicates: true,
    move: {
      enable: true,
      center: {
        x: 120,
        y: 45,
      },
    },
  },
  interactivity: {
    events: {},
  },
  smooth: true,
  fpsLimit: 120,
  background: {
    color: "transparent",
    size: "cover",
  },
  fullScreen: {
    enable: false,
  },
  detectRetina: true,
  absorbers: [
    {
      enable: true,
      opacity: 0,
      size: {
        value: 1,
        density: 1,
        limit: {
          radius: 5,
          mass: 5,
        },
      },
      position: {
        x: 110,
        y: 45,
      },
    },
  ],
  emitters: [
    {
      autoPlay: true,
      fill: true,
      life: {
        wait: true,
      },
      rate: {
        quantity: 5,
        delay: 0.5,
      },
      position: {
        x: 110,
        y: 45,
      },
    },
  ],
};

interface AiButtonProps {
  isPublished: boolean;
  disabled: boolean;
  sectionId?: string;
  courseId: string;
  page: string;
}

export default function AiButton({ isPublished, disabled, courseId, page, sectionId }: AiButtonProps) {
  const [particleState, setParticlesReady] = useState<"loaded" | "ready">();
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setParticlesReady("loaded");
    });
  }, []);

  const modifiedOptions = useMemo(() => {
    options.autoPlay = isHovering;
    return options;
  }, [isHovering]);

  const handleClick = async () => {
    let url = `/api/course/${courseId}`;
    if (page === "Section") {
      url += `/sections/${sectionId}`;
    }
    try {
      setIsLoading(true);
      isPublished ? await axios.post(url + "/unpublish") : await axios.post(url + "/publish");
      toast.success(`${isPublished ? "Unpublished" : "Published"} ${page}`);
      router.refresh();
    } catch (error: any) {
      toast.error(error.response?.data?.error || error.message);
      console.log(
        `Failed to ${isPublished ? "unpublish" : "publish"} ${page}`,
        error
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      className={`group relative rounded-md bg-gradient-to-r ${!isPublished ? "bg-gradient-to-r from-sky-500 to-blue-700" : "bg-gradient-to-r from-orange-600 to-yellow-600"} p-1 text-white transition-transform`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      disabled={disabled || isLoading}
      onClick={handleClick}
    >
      <div className="relative flex items-center justify-center gap-2 rounded-md bg-gradient-to-r  px-4 py-0.5 text-white">




        <span className="font-semibold">  {isLoading ? <Loader2 className="h-4 w-4 my-1 animate-spin" /> : isPublished ? "Unpublish" : "Publish"}</span>
      </div>
      {!!particleState && (
        <Particles
          id="whatever"
          className={`pointer-events-none absolute -bottom-4 -left-4 -right-4 -top-4 z-0 opacity-0 transition-opacity ${particleState === "ready" ? "group-hover:opacity-100" : ""}`}
          particlesLoaded={async () => {
            setParticlesReady("ready");
          }}
          options={modifiedOptions}
        />
      )}
    </button>
  );
}
