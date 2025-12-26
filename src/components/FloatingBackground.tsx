import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

interface Trail {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

const FloatingBackground = () => {
  const [trails, setTrails] = useState<Trail[]>([]);
  
  // Smooth cursor position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 150 });
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 150 });

  useEffect(() => {
    let trailId = 0;
    let lastTime = Date.now();

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Add trail only every 30ms for better performance
      if (now - lastTime > 30) {
        const newTrail = {
          id: trailId++,
          x: e.clientX,
          y: e.clientY,
          timestamp: now,
        };

        setTrails((prev) => {
          const filtered = prev.filter(t => now - t.timestamp < 1500); // Keep trails for 1.5s
          return [...filtered, newTrail].slice(-25); // Max 25 trails
        });
        
        lastTime = now;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Main glow that follows cursor smoothly */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 700,
          height: 700,
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.25) 0%, rgba(96, 165, 250, 0.15) 40%, transparent 70%)",
          filter: "blur(70px)",
          left: smoothMouseX,
          top: smoothMouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Secondary delayed glow for depth */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 450,
          height: 450,
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, rgba(168, 85, 247, 0.15) 50%, transparent 70%)",
          filter: "blur(50px)",
          left: smoothMouseX,
          top: smoothMouseY,
          translateX: "-40%",
          translateY: "-40%",
        }}
        transition={{
          type: "spring",
          damping: 40,
          stiffness: 100,
        }}
      />

      {/* Trail particles with varied animations */}
      {trails.map((trail, index) => {
        const age = trails.length - index;
        const opacity = Math.max(0.1, 1 - age / trails.length);
        const colors = [
          "rgba(124, 58, 237, 0.5)", 
          "rgba(96, 165, 250, 0.5)",
          "rgba(236, 72, 153, 0.5)",
          "rgba(168, 85, 247, 0.5)",
        ];
        
        return (
          <motion.div
            key={trail.id}
            className="absolute"
            style={{
              left: trail.x,
              top: trail.y,
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            {/* Large blur circle */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 100,
                height: 100,
                background: `radial-gradient(circle, ${colors[index % colors.length]} 0%, transparent 70%)`,
                filter: "blur(30px)",
                translateX: "-50%",
                translateY: "-50%",
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: [opacity * 0.8, 0],
                scale: [0.5, 2],
              }}
              transition={{ 
                duration: 1.5,
                ease: "easeOut"
              }}
            />
            
            {/* Small sharp glow for definition */}
            <motion.div
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: colors[index % colors.length],
                boxShadow: `0 0 20px ${colors[index % colors.length]}`,
                translateX: "-50%",
                translateY: "-50%",
              }}
              initial={{ opacity: 0.8, scale: 1 }}
              animate={{ 
                opacity: 0,
                scale: 0,
              }}
              transition={{ 
                duration: 0.8,
                ease: "easeOut"
              }}
            />
          </motion.div>
        );
      })}

      {/* Ambient background gradients */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute top-20 left-20 w-[500px] h-[500px] rounded-full blur-3xl animate-pulse"
          style={{ 
            background: "radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)",
            animationDuration: "8s"
          }}
        />
        <div 
          className="absolute bottom-20 right-20 w-[500px] h-[500px] rounded-full blur-3xl animate-pulse"
          style={{ 
            background: "radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, transparent 70%)",
            animationDuration: "10s",
            animationDelay: "3s"
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full blur-3xl animate-pulse"
          style={{ 
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)",
            animationDuration: "12s",
            animationDelay: "1s",
            transform: "translate(-50%, -50%)"
          }}
        />
      </div>
    </div>
  );
};

export default FloatingBackground;
