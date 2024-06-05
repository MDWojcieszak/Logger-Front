import { Dispatch, SetStateAction, useMemo } from 'react';

import { PaginationState, useReactTable, getCoreRowModel, ColumnDef } from '@tanstack/react-table';
import { useTheme } from '~/utils/theme';
import { format } from 'date-fns';
import { ActionButtons } from '~/components/Table/ActionButtons';
import { Table } from '~/components/Table';
import { StreamType } from '~/api/Stream';
import { useAuth } from '~/hooks/useAuth';
import { UserRole } from '~/types/user';

type StreamsTableProps = {
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  goToStream?: F1<string>;
  handleDelete?: F1<string>;
  streams?: StreamType[];
  total?: number;
};

export const StreamsTable = (p: StreamsTableProps) => {
  const theme = useTheme();
  const defaultData = useMemo(() => [], []);
  const { userData } = useAuth();
  const columns = useMemo<ColumnDef<StreamType>[]>(
    () => [
      {
        header: 'Name',
        footer: (props) => props.column.id,
        cell: (info) => <div style={{ marginLeft: theme.spacing.m }}>{info.getValue<string>()}</div>,
        accessorKey: 'name',
        minSize: 200,
      },
      {
        header: 'Created By',
        footer: (props) => props.column.id,
        cell: (info) => <div>{info.row.original.createdBy.firstName + ' ' + info.row.original.createdBy.lastName}</div>,
      },
      {
        header: 'Created',
        footer: (props) => props.column.id,
        cell: (info) => (
          <div>
            <p style={{ margin: 0, padding: 0 }}>{format(info.getValue<Date>(), 'd MMMM')}</p>
            <p style={{ margin: 0, padding: 0, color: theme.colors.blue04, fontSize: '14px' }}>
              {format(info.getValue<Date>(), 'y')}
            </p>
          </div>
        ),
        accessorKey: 'createdAt',
      },
      {
        header: '',
        id: 'actions',
        footer: (props) => props.column.id,
        cell: (info) => (
          <ActionButtons
            id={info.row.original.id}
            key={info.row.original.id}
            onDelete={
              userData?.role === UserRole.OWNER ||
              userData?.role === UserRole.ADMIN ||
              info.row.original.createdBy.id === userData?.id
                ? p.handleDelete
                : undefined
            }
            goTo={p.goToStream}
            goToLabel='Run'
          />
        ),
        maxSize: 200,
      },
    ],
    [],
  );

  const table = useReactTable({
    data: p.streams || defaultData,
    pageCount: p.total ? Math.ceil(p.total / p.pagination.pageSize) : 1,
    columns,
    state: {
      pagination: p.pagination,
    },
    meta: {},
    columnResizeMode: 'onChange',
    manualPagination: true,
    onPaginationChange: p.setPagination,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  });

  return <Table table={table} />;
};
