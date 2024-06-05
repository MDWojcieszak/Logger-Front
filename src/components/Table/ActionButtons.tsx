import { MdDelete, MdEdit } from 'react-icons/md';
import { Button } from '~/components/Button';
import { mkUseStyles } from '~/utils/theme';
import { FaPlay } from 'react-icons/fa';

type ActionButtonsProps = {
  id: string;
  onDelete?: F1<string>;
  deleteLabel?: string;
  onEdit?: F1<string>;
  editLabel?: string;
  goTo?: F1<string>;
  goToLabel?: string;
};
export const ActionButtons = (p: ActionButtonsProps) => {
  const styles = useStyles();
  return (
    <div style={styles.container}>
      {p.onEdit && <Button label={p.editLabel || ''} icon={<MdEdit />} onClick={() => p.onEdit?.(p.id)}></Button>}
      {p.goTo && <Button label={p.goToLabel || ''} icon={<FaPlay />} onClick={() => p.goTo?.(p.id)}></Button>}
      {p.onDelete && (
        <Button label={p.deleteLabel || ''} icon={<MdDelete />} onClick={() => p.onDelete?.(p.id)} variant='delete' />
      )}
    </div>
  );
};

const useStyles = mkUseStyles((t) => ({
  container: {
    flexDirection: 'row',
    gap: t.spacing.m,
    justifyContent: 'flex-end',
    marginRight: t.spacing.s,
  },
}));
