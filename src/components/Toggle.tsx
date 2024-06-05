import { motion } from 'framer-motion';
import { mkUseStyles, useTheme } from '~/utils/theme';
type ToggleProps = {
  enabled: boolean;
  setEnabled: F1<boolean>;
};

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 60,
};

export const Toggle = (p: ToggleProps) => {
  const toggleSwitch = () => p.setEnabled(!p.enabled);
  const styles = useStyles();
  const theme = useTheme();
  return (
    <motion.div
      animate={{ backgroundColor: p.enabled ? theme.colors.blue : theme.colors.dark02 }}
      style={{ ...styles.container, ...(p.enabled && styles.active) }}
      onClick={toggleSwitch}
    >
      <motion.div style={styles.handle} layout transition={spring} />
    </motion.div>
  );
};

const useStyles = mkUseStyles((t) => ({
  container: {
    width: '40px',
    height: '20px',
    backgroundColor: t.colors.blue,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderRadius: '50px',
    padding: 2,
    cursor: 'pointer',
  },
  active: {
    justifyContent: 'flex-end',
  },
  handle: {
    backgroundColor: 'white',
    width: '20px',
    height: '20px',
    borderRadius: '100%',
  },
}));
