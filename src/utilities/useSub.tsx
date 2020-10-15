import { useEffect, useState } from 'react';
import Auth from '@aws-amplify/auth';

type UseSub = {
  error?: Error;
  loading: boolean;
  sub?: string;
};

const useSub = (): UseSub => {
  const [error, setError] = useState<Error | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [sub, setSub] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!loading) return;
    (async (): Promise<void> => {
      try {
        const {
          attributes: { sub }
        } = await Auth.currentAuthenticatedUser();
        setSub(sub);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [loading]);

  return {
    error,
    loading,
    sub
  };
};

export default useSub;
