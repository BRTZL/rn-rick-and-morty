import {useInfiniteQuery} from '@tanstack/react-query';
import axios from 'axios';

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

type ApiResponse = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
};

export type StatusFilterType = 'alive' | 'dead' | 'unknown';

type UseRickAndMortyCharactersProps = {
  statusFilter?: StatusFilterType;
};

const useRickAndMortyCharacters = ({
  statusFilter,
}: UseRickAndMortyCharactersProps) => {
  return useInfiniteQuery<ApiResponse, Error>({
    queryKey: ['characters', statusFilter],
    queryFn: async ({pageParam}) => {
      console.log({pageParam});
      const res = await axios.get<ApiResponse>(
        `${pageParam}${statusFilter ? `&status=${statusFilter}` : ''}`,
      );
      return res.data;
    },
    initialPageParam: `https://rickandmortyapi.com/api/character?page=1${
      statusFilter ? `&status=${statusFilter}` : ''
    }`,
    getNextPageParam: lastPage => {
      if (!lastPage.info.next) {
        return undefined;
      }
      return lastPage.info.next;
    },
    getPreviousPageParam: firstPage => {
      if (!firstPage.info.prev) {
        return undefined;
      }
      return firstPage.info.prev;
    },
  });
};

export default useRickAndMortyCharacters;
