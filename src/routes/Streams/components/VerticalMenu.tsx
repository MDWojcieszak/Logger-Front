import { AnimatePresence, motion } from 'framer-motion';
import { OptionsSwitch } from '~/components/OptionsSwitch';
import { Toggle } from '~/components/Toggle';
import { LogLevel } from '~/types/stream';
import { mkUseStyles, useTheme } from '~/utils/theme';
import { BiSolidHide } from 'react-icons/bi';
import { MdAutoDelete } from 'react-icons/md';

type VerticalManuProps = {
  isExpanded: boolean;
  disabledLogLevels: LogLevel[];
  setDisabledLogLevel: F1<LogLevel>;
  hideItems: boolean;
  setHideItems: F1<boolean>;
};

const MENU_SIZE = 200;

export const VerticalManu = ({ isExpanded, disabledLogLevels, setDisabledLogLevel, ...p }: VerticalManuProps) => {
  const styles = useStyles();
  const theme = useTheme();

  return (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          style={styles.container}
          initial={{ width: 0, marginLeft: 0, opacity: 0 }}
          animate={{ width: MENU_SIZE, marginLeft: theme.spacing.m, opacity: 1 }}
          exit={{ width: 0, marginLeft: 0, opacity: 0 }}
        >
          <div style={styles.contentContainer}>
            <div style={styles.toggleContainer}>
              <div style={styles.row}>
                <Toggle
                  enabled={!disabledLogLevels.find((l) => l === LogLevel.INFO)}
                  setEnabled={() => setDisabledLogLevel(LogLevel.INFO)}
                />
                <p>INFO</p>
              </div>
              <div style={styles.row}>
                <Toggle
                  enabled={!disabledLogLevels.find((l) => l === LogLevel.DEBUG)}
                  setEnabled={() => setDisabledLogLevel(LogLevel.DEBUG)}
                />
                <p style={{ color: 'gray' }}>DEBUG</p>
              </div>
              <div style={styles.row}>
                <Toggle
                  enabled={!disabledLogLevels.find((l) => l === LogLevel.SUCCESS)}
                  setEnabled={() => setDisabledLogLevel(LogLevel.SUCCESS)}
                />
                <p style={{ color: theme.colors.lightGreen }}>SUCCESS</p>
              </div>
              <div style={styles.row}>
                <Toggle
                  enabled={!disabledLogLevels.find((l) => l === LogLevel.WARNING)}
                  setEnabled={() => setDisabledLogLevel(LogLevel.WARNING)}
                />
                <p style={{ color: theme.colors.yellow }}>WARN</p>
              </div>
              <div style={styles.row}>
                <Toggle
                  enabled={!disabledLogLevels.find((l) => l === LogLevel.ERROR)}
                  setEnabled={() => setDisabledLogLevel(LogLevel.ERROR)}
                />
                <p style={{ color: theme.colors.red }}>ERROR</p>
              </div>
            </div>
            <div>
              <p style={{ fontSize: 14, color: theme.colors.dark05, marginBottom: theme.spacing.sm, lineHeight: 1.1 }}>
                Behavior of disabled elements
              </p>
              <OptionsSwitch
                active={p.hideItems ? 'delete' : 'hide'}
                setOption={(option: string) => p.setHideItems(option === 'hide' ? false : true)}
                options={[
                  { value: 'delete', icon: <MdAutoDelete size={20} /> },
                  { value: 'hide', icon: <BiSolidHide size={20} /> },
                ]}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const useStyles = mkUseStyles((t) => ({
  container: {
    width: 200,
    backgroundColor: t.colors.gray06,
    borderRadius: t.borderRadius.default,
    overflow: 'hidden',
  },
  contentContainer: {
    padding: t.spacing.m,
    width: 200 - 68,
    flex: 1,
    justifyContent: 'space-between',
  },
  toggleContainer: {
    gap: t.spacing.m,
  },
  row: {
    userSelect: 'none',
    flexDirection: 'row',
    flex: 1,
    gap: t.spacing.m,
  },
}));
