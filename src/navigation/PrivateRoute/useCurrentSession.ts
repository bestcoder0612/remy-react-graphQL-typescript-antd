import { useEffect, useState } from 'react';
import Auth from '@aws-amplify/auth';

type CurrentSessionHook = {
  loading: boolean;
  authenticated: boolean;
};

const useCurrentSession = (): CurrentSessionHook => {
  const [loading, setLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(true);

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const session = await Auth.currentSession();
        setAuthenticated(!!session);
      } catch (err) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    })();
  }, [setLoading, setAuthenticated]);

  return {
    loading,
    authenticated
  };
};

export default useCurrentSession;
