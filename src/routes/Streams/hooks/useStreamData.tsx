import { PaginationState } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { StreamDataResponse, StreamService } from '~/api/Stream';

export const useStreamData = () => {
  const [data, setData] = useState<StreamDataResponse>();
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 15 });

  const fetchData = async () => {
    try {
      const data = await StreamService.getList({
        take: pagination.pageSize,
        skip: pagination.pageIndex * pagination.pageSize,
      });
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagination]);

  return {
    data,
    pagination,
    setPagination,
    refresh: fetchData,
  };
};
