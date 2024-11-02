'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { userauth } from '../config/firebaseConfig';

const Dashboard = () => {


  const [user] = useAuthState(userauth);

  return (
    <section>
      <p>Current User: {user?.displayName}</p>
      <p>Current User: {user?.uid}</p>
      this dashboard
    </section>
  )
}

export default Dashboard