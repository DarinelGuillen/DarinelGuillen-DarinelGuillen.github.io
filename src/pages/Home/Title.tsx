// Path: C:\Users\darin\Documents\react-vite-shadcn-ui-template\src\pages\Home\Title.tsx
import React, { useEffect } from "react";
import Footer from "@/components/Footer/Footer";
import data from "@data/data.json";

// 1) Import framer-motion + intersection-observer
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const variantsContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // Stagger para que hijos aparezcan escalonados
      staggerChildren: 0.2,
    },
  },
};

const variantsChild = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      type: "spring",
      stiffness: 120,
      damping: 14,
    },
  },
};

const Title: React.FC = () => {
  const { short_name, rol } = data.resume.personal_info;

  // 2) useInView y useAnimation
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  return (
    // 3) motion.section controlado por variants + controls
    <motion.section
      ref={ref}
      className="flex flex-col justify-between h-screen w-screen bg-whi text-dar"
      variants={variantsContainer}
      initial="hidden"
      animate={controls}
    >
      <motion.div className="flex items-center justify-center flex-grow flex-col">
        <motion.h1 className="custom-title font-cor" variants={variantsChild}>
          {short_name}
        </motion.h1>
        <motion.p className="custom-paragraph font-cor" variants={variantsChild}>
          {rol}
        </motion.p>
      </motion.div>

      {/* Footer */}
      <motion.div variants={variantsChild}>
        <Footer />
      </motion.div>
    </motion.section>
  );
};

export default Title;
