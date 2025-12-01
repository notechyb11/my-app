import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

// Import the existing Capybara component (assuming it's named and exported like this)
import LoadingCapybara from './loadingCapybara'; 

// --- TYPE DEFINITIONS ---

// Define the expected props for the NarrativeSection component
interface NarrativeSectionProps {
  children: React.ReactNode;
  title: string;
}

// --- COMPONENTS ---

/**
 * Placeholder for the Dynamic Background (to be replaced with React Bits).
 */
const DynamicBackground: React.FC = () => (
  <div className="absolute inset-0 -z-10 bg-gray-900 opacity-90">
    {/* Placeholder for Particle/Floating Lines effect */}
    <div className="w-full h-full animate-pulse-slow bg-[radial-gradient(ellipse_at_top,_var(--tw-color-indigo-900),_var(--tw-color-gray-900))]"></div>
  </div>
);

/**
 * Helper component for the narrative sections, ensuring consistent styling.
 */
const NarrativeSection: React.FC<NarrativeSectionProps> = ({ children, title }) => (
  <div className="h-[200vh] flex flex-col items-center justify-start pt-40 pb-[100vh]">
    <div className="max-w-3xl w-full text-center p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl transition duration-500 hover:shadow-indigo-500/50">
      <h2 className="text-4xl font-extrabold text-indigo-700 mb-4">{title}</h2>
      <p className="text-xl text-gray-700">{children}</p>
    </div>
  </div>
);

/**
 * The main Scrollytelling Homepage component.
 * Manages scroll state and pinned element animation.
 */
const Homepage: React.FC = () => {
  // Use useRef with the specific element type (HTMLDivElement) for type safety
const containerRef = useRef<HTMLDivElement>(null);
  // Framer Motion hook to get scroll progress within the container
  const { scrollYProgress } = useScroll({ container: containerRef });

  // ----------------------------------------------------
  // FRAMER MOTION: SCROLLYTELLING LOGIC
  // ----------------------------------------------------
  
  // 1. Capybara Scale and Opacity Transformation (from 0% to 50% scroll)
  const capybaraScale: MotionValue<number> = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
  const capybaraOpacity: MotionValue<number> = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // 2. Capybara Position Transformation (from 0% to 50% scroll)
  const capybaraX: MotionValue<string> = useTransform(scrollYProgress, [0, 0.5], ['-50%', '0%']);
  const capybaraY: MotionValue<string> = useTransform(scrollYProgress, [0, 0.5], ['-50%', '0%']);
  
  // 3. Narrative Header Opacity (Visible only between 40% and 60% scroll)
  const headerOpacity: MotionValue<number> = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  return (
    // Ensure the container has defined height and overflow-y-scroll for the scroll context
    <div className="w-full h-screen bg-gray-100 overflow-y-scroll" ref={containerRef}>
      
      {/* ---------------------------------------------------- */}
      {/* FIXED PINNED SECTION: The Capybara & Dynamic BG */}
      {/* This element remains fixed in the viewport while scrolling the content underneath */}
      {/* ---------------------------------------------------- */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Dynamic Background Effect */}
        <DynamicBackground />
        
        {/* Pinned Capybara Element (Animates out) */}
        <motion.div
          style={{ 
            scale: capybaraScale, 
            opacity: capybaraOpacity,
            x: capybaraX,
            y: capybaraY
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          {/* Render the existing Capybara component inside the motion container */}
          <LoadingCapybara />
        </motion.div>

        {/* Narrative Header (Fades in) */}
        <motion.div 
            style={{ opacity: headerOpacity }}
            className="absolute top-0 left-0 w-full p-6 text-center text-white bg-indigo-900/80 backdrop-blur-sm shadow-xl"
        >
            <h1 className="text-xl sm:text-3xl font-bold">The Narrative Unfolds...</h1>
        </motion.div>

      </div>

      {/* ---------------------------------------------------- */}
      {/* SCROLLING NARRATIVE SECTIONS */}
      {/* This content is positioned below the pinned section and is what the user scrolls through */}
      {/* ---------------------------------------------------- */}
      <div className="relative z-10 bg-white">
        
        <NarrativeSection title="Chapter 1: The Introduction">
          This initial narrative segment takes up a large amount of vertical space to drive the pinned element's animation.
        </NarrativeSection>
        
        <NarrativeSection title="Chapter 2: The Core Message">
          In this section, you would trigger new Framer Motion animations or updates based on the current scroll position using the `scrollYProgress` value.
        </NarrativeSection>
        
        <NarrativeSection title="Conclusion">
          The final content block, which transitions smoothly back to the standard application layout below.
        </NarrativeSection>

        {/* End of Scrollytelling content */}
        <div className="h-64 bg-gray-200 p-10 text-center text-gray-600">
            End of Narrative. Call-to-Action Area.
        </div>
      </div>
    </div>
  );
};

export default Homepage;