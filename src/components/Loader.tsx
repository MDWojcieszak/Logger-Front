import { Transition, motion } from 'framer-motion';
import { Theme, mkUseStyles, useTheme } from '~/utils/theme';

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const DotVariants = {
  initial: {
    y: '0%',
  },
  animate: {
    y: '100%',
  },
};

const DotTransition: Transition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: 'reverse',
  ease: 'easeInOut',
};

type LoaderProps = {
  size?: number;
  color?: keyof Theme['colors'];
};

export const Loader = ({ size = 40, color = 'white' }: LoaderProps) => {
  const styles = useStyles();
  const theme = useTheme();
  const dotSize = Math.round(0.2 * size);
  const dotStyle = { ...styles.dot, width: dotSize, height: dotSize };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        style={{ ...styles.dotContainer, height: 2 * dotSize, width: size }}
        variants={ContainerVariants}
        initial='initial'
        animate='animate'
      >
        <motion.span
          style={{ ...dotStyle, backgroundColor: theme.colors[color] }}
          variants={DotVariants}
          transition={DotTransition}
        />
        <motion.span
          style={{ ...styles.dot, width: dotSize, height: dotSize, backgroundColor: theme.colors[color] }}
          variants={DotVariants}
          transition={DotTransition}
        />
        <motion.span
          style={{ ...styles.dot, width: dotSize, height: dotSize, backgroundColor: theme.colors[color] }}
          variants={DotVariants}
          transition={DotTransition}
        />
      </motion.div>
    </motion.div>
  );
};

const useStyles = mkUseStyles(() => ({
  dotContainer: {
    width: '10rem',
    height: '5rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    userSelect: 'none',
  },
  dot: {
    display: 'block',
    borderRadius: '50%',
  },
}));
