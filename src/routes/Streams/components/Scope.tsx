import { mkUseStyles, useTheme } from '~/utils/theme';
import { motion } from 'framer-motion';
type ScopeProps = {
  name: string;
  color: string;
  active: boolean;
  setEnabled: F0;
};
export const Scope = (p: ScopeProps) => {
  const styles = useStyles();
  const theme = useTheme();
  const handlePress = () => {
    p.setEnabled();
  };
  return (
    <motion.div
      style={{
        ...styles.container,
      }}
      animate={{
        backgroundColor: p.color + theme.colorOpacity(p.active ? 1 : 0.2),
        color: '#FFFFFF' + theme.colorOpacity(p.active ? 1 : 0.2),
      }}
      onClick={handlePress}
    >
      {p.name}
    </motion.div>
  );
};

const useStyles = mkUseStyles((t) => ({
  container: {
    userSelect: 'none',
    borderRadius: 2,
    cursor: 'pointer',
    paddingLeft: t.spacing.m,
    paddingRight: t.spacing.m,
  },
}));
