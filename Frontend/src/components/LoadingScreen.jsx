import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLoading } from '../context/LoadingContext';
import VaporizeText from './ui/vapour-text-effect';

const LoadingScreen = () => {
  const { forceLoadComplete } = useLoading();

  const handleComplete = useCallback(() => {
    sessionStorage.setItem('meehaan_loading_seen', 'true');
    forceLoadComplete();
  }, [forceLoadComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        position: 'fixed', inset: 0,
        background: '#000',
        zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <VaporizeText
        text="MEEHAAN"
        color="#F5921E"
        fontFamily='"Syne", "DM Sans", sans-serif'
        fontWeight={800}
        gap={4}
        fadeInMs={500}
        holdMs={800}
        vaporMs={2000}
        onComplete={handleComplete}
      />
    </motion.div>
  );
};

export default LoadingScreen;
