import { useNavigate } from 'react-router-dom';
import { mkUseStyles, useTheme } from '~/utils/theme';
import { AnimatePresence, motion } from 'framer-motion';
import { MdAccountBox, MdSettings } from 'react-icons/md';
import { CiStreamOn } from 'react-icons/ci';

import { MainNavigationRoute } from '~/navigation/types';
const ICON_SIZE = 24;

export type SideBarItem = {
  label: string;
  path: MainNavigationRoute;
  isActive: boolean;
};

export const Item = (p: SideBarItem) => {
  const styles = useStyles();
  const theme = useTheme();

  const color = p.isActive ? theme.colors.blue : theme.colors.dark05;
  const navigate = useNavigate();
  const handlePress = () => {
    navigate(p.path);
  };

  const iconProps = { fill: color, size: ICON_SIZE };
  const renderIcon = () => {
    switch (p.path) {
      case MainNavigationRoute.STREAMS:
        return <CiStreamOn {...iconProps} />;
      case MainNavigationRoute.ACCOUNTS:
        return <MdAccountBox {...iconProps} />;
      case MainNavigationRoute.SETTINGS:
        return <MdSettings {...iconProps} />;
    }
  };
  return (
    <div style={styles.container} onClick={handlePress}>
      <AnimatePresence mode='sync' key={'menu-item' + p.path}>
        {p.isActive && (
          <motion.div
            key={p.path + p.label}
            initial={{ opacity: 0, width: 0 }}
            animate={{ backgroundColor: color, opacity: 1, width: 4 }}
            exit={{ opacity: 0, width: 0 }}
            style={styles.box}
          />
        )}
      </AnimatePresence>
      <motion.p animate={{ color }} style={styles.label}>
        {p.label}
      </motion.p>
      {renderIcon()}
    </div>
  );
};

const useStyles = mkUseStyles((t) => ({
  container: {
    cursor: 'pointer',
    flexDirection: 'row',
    userSelect: 'none',
    alignItems: 'center',
    paddingRight: t.spacing.l,
    height: 50,
  },
  box: {
    height: '25px',
    borderTopRightRadius: t.borderRadius.medium,
    borderBottomRightRadius: t.borderRadius.medium,
    width: '4px',
  },
  label: { marginLeft: t.spacing.m, flex: 1 },
}));
