import { DogsResponse } from '@/common/types';

const baseUrl = 'https://dog.ceo/api/';

export const fetchRandomDogs = async (
  amount: number,
): Promise<DogsResponse> => {
  try {
    const response = await fetch(`${baseUrl}breeds/image/random/${amount}`);

    if (!response.ok) {
      throw new Error();
    }

    const dogs: DogsResponse = await response.json();

    return dogs;
  } catch (error) {
    throw new Error('Error while fetching');
  }
};
