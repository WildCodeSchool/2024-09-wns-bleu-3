import { useGetUserInfoQuery } from '@/generated/graphql-types';

export function useAuth() {
  const { data, loading, error, refetch } = useGetUserInfoQuery({
    fetchPolicy: 'network-only',
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