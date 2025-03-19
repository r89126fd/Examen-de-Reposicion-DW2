import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Login() {
  const router = useRouter();
  const { setUser } = useContext(AppContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = e.target.elements;

    if (username.value === 'admin' && password.value === 'admin123') {
      setUser(username.value);
      router.push('/'); 
    } else {
      alert('Credenciales incorrectas :(');
    }
  };
return (
    <div style={{ padding: '20px' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input type="text" name="username" placeholder="Usuario" required />
        <input type="password" name="password" placeholder="Contraseña" required />
        <button type="submit">Iniciar Sesion</button>
      </form>
    </div>
  );
}