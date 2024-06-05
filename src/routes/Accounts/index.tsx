import { FaPlus } from 'react-icons/fa6';
import { AccessDenied } from '~/components/AccessDenied';
import { Button } from '~/components/Button';
import { useAuth } from '~/hooks/useAuth';

import { useModal } from '~/hooks/useModal';
import { UsersTable } from '~/routes/Accounts/components/UsersTable';
import { useUsersData } from '~/routes/Accounts/hooks/useUsersData';
import { CreateUserModal } from '~/routes/Accounts/modals/CreateUserModal';
import { UserRole } from '~/types/user';

import { mkUseStyles } from '~/utils/theme';

export const Accounts = () => {
  const { userData } = useAuth();
  const createUserModal = useModal(
    'create-user',
    CreateUserModal,
    { title: 'Add user' },
    {
      handleClose: async () => {
        refresh();
        createUserModal.hide();
      },
    },
  );
  const styles = useStyles();
  const { data, pagination, setPagination, refresh } = useUsersData();

  if (userData?.role !== UserRole.OWNER && userData?.role !== UserRole.ADMIN) return <AccessDenied />;
  return (
    <div style={styles.container}>
      <Button label='Add' icon={<FaPlus />} onClick={() => createUserModal.show()} />
      <UsersTable setPagination={setPagination} users={data?.users} total={data?.total} pagination={pagination} />
    </div>
  );
};

const useStyles = mkUseStyles(() => ({
  container: {
    height: '100%',
  },
}));
