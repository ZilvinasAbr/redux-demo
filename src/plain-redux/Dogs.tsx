import { ImagesContainer } from '@/components/images-container';
import { useGetRandomDogsQuery } from './useGetRandomDogsQuery';

export const Dogs = ({ amount }: { amount: number }) => {
  const { data, error, isLoading } = useGetRandomDogsQuery(amount, {
    skip: amount <= 0,
  });

  if (error) {
    return <div>Error: Could not fetch dogs</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Error</div>;
  }

  return <ImagesContainer imageUrls={data} />;
};
