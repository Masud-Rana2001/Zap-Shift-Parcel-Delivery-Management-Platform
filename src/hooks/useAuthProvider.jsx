
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function useAuthProvider() {
  const authInfo = useContext(AuthContext)
  return authInfo
}

export default useAuthProvider