import { FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { StreamService } from '~/api/Stream';
import { Button } from '~/components/Button';

import { useModal } from '~/hooks/useModal';

import { StreamsTable } from '~/routes/Streams/components/StreamsTable';
import { useStreamData } from '~/routes/Streams/hooks/useStreamData';
import { CreateStreamModal } from '~/routes/Streams/modals/CreateStreamModal';

import { mkUseStyles } from '~/utils/theme';

export const Streams = () => {
  const navigate = useNavigate();

  const createStreamModal = useModal(
    'create-stream',
    CreateStreamModal,
    { title: 'Add Stream' },
    {
      handleClose: async () => {
        refresh();
        createStreamModal.hide();
      },
    },
  );
  const styles = useStyles();
  const { data, pagination, setPagination, refresh } = useStreamData();

  const handleRunStream = (id: string) => {
    navigate(id);
  };

  const handleDelete = async (id: string) => {
    try {
      await StreamService.delete({ id });
      refresh();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div style={styles.container}>
      <Button label='Add' icon={<FaPlus />} onClick={() => createStreamModal.show()} />
      <StreamsTable
        goToStream={handleRunStream}
        handleDelete={handleDelete}
        setPagination={setPagination}
        streams={data?.streams}
        total={data?.total}
        pagination={pagination}
      />
    </div>
  );
};

const useStyles = mkUseStyles(() => ({
  container: {
    height: '100%',
  },
}));
