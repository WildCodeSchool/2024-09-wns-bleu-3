import { useGetUserInfoQuery } from '@/generated/graphql-types';

export function useAuth() {
  const { data, loading, error, refetch } = useGetUserInfoQuery({
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  });

  return {
    data,
    loading,
    error,
    user: data?.getUserInfo || null,
    isLoggedIn: !!data?.getUserInfo?.isLoggedIn,
    refetch,
  };
}