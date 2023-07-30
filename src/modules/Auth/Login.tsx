import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import supabase from '../../config/supabase';
import { useEffect } from 'react';
import { useUserContext } from '../../store/contexts/UserContext';
import logo from '../../assets/logo.svg';
function Login() {
  const { setIsLoggedIn, setUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session && session.user) {
        console.log(session.user);
        setUser(session?.user.id);
        setIsLoggedIn(true);
        navigate('/loads');
      }
      if (!session) {
        setIsLoggedIn(false);
        navigate('/login');
      }
    });
    return () => subscription.unsubscribe();
  }, []);
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} />
      <div className={styles.loading}>
        <span className={styles['loading-text']}>Loading</span>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
    </div>
  );
}
export default Login;