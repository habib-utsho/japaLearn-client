import { motion } from "framer-motion";

type TMyMotion = {
  x?: number;
  y?: number;
  rotate?: number;
  duration?: number;
  scale?: number;
  children: React.ReactNode;
};

const MyMotion: React.FC<TMyMotion> = ({
  x,
  y,
  rotate,
  duration,
  scale,
  children,
}) => {
  return (
    <motion.div
      variants={{
        hidden: {
          x: x || 0,
          y: y || 0,
          rotate: rotate || 0,
          opacity: 0,
          scale: scale || 1,
        },
        animate: { x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 },
      }}
      initial="hidden"
      whileInView="animate"
      viewport={{ once: true }}
      transition={{ duration: duration || 0.5, type: "spring", stiffness: 70 }}
    >
      {children}
    </motion.div>
  );
};

export default MyMotion;
