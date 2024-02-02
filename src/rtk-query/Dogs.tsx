import { useGetRandomWesthighlandTerriersQuery } from './api';

export const Dogs = ({ amount }: { amount: number }) => {
  const { data, error, isLoading } = useGetRandomWesthighlandTerriersQuery(
    amount,
    { skip: amount < 0 },
  );

  if (error) {
    return <div>Error: Could not fetch dogs</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return (
      <div className="flex flex-col gap-2 items-center">
        {data.message.map((url, index) => (
          <img width="300" alt={`Dog Image No. ${index + 1}`} src={url} />
        ))}
      </div>
    );
  }
};
