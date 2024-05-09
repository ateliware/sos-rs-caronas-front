import Skeleton from 'react-loading-skeleton';

interface Props<T> {
  data: T | null;
  isLoading: boolean;
}

export default function DataLoader<T>({ isLoading, data }: Props<T>) {
  if (isLoading) return <Skeleton style={{ width: '98%' }} />;

  return <>{data}</>;
}
