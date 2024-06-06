import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { mkUseStyles, useTheme } from '~/utils/theme';

type OptionType = {
  icon?: ReactNode;
  label?: string;
  value: string;
};

type ToggleProps = {
  options: OptionType[];
  active: OptionType['value'];
  setOption: F1<OptionType['value']>;
};

export const OptionsSwitch = (p: ToggleProps) => {
  const styles = useStyles();

  const renderOption = (option: OptionType) => {
    return (
      <Option
        key={option.value}
        onClick={() => p.setOption(option.value)}
        {...option}
        active={p.active === option.value}
      />
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.optionContainer}>{p?.options?.map(renderOption)}</div>
    </div>
  );
};

const Option = (p: OptionType & { active: boolean; onClick: F0 }) => {
  const styles = useStyles();
  const theme = useTheme();
  return (
    <motion.div
      animate={{ backgroundColor: p.active ? theme.colors.blue : theme.colors.dark02 }}
      style={styles.option}
      onClick={p.onClick}
    >
      {p.label && <p>{p.label}</p>}
      {p.icon && p.icon}
    </motion.div>
  );
};

const useStyles = mkUseStyles((t) => ({
  container: {
    flex: 1,
    backgroundColor: t.colors.dark02,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderRadius: t.borderRadius.default,
    padding: 2,
    cursor: 'pointer',
  },
  optionContainer: {
    flexDirection: 'row',
    flex: 1,
    gap: 4,
  },
  option: {
    flex: 1,
    paddingTop: 4,
    paddingBottom: 4,

    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: t.borderRadius.default,
  },
}));
