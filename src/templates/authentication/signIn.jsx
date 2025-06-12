import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import { useState } from 'react';

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        setError('Une erreur est survenue. Veuillez recommencer.');
        return;
      } else {
        const result = await res.text();

        const data = JSON.parse(result);

        localStorage.setItem('token', data.token);

        const base64Url = data.token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );

        const userData = JSON.parse(jsonPayload);

        localStorage.setItem('user_id', userData.id);
        localStorage.setItem('user_email', userData.email);

        window.location.href = '/my-reservations';
      }

    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Connexion</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <div className="mb-4">
          <Input type="text" name="email" title="E-mail" value={formData.email} onChange={handleChange} autoComplete="email" />
          <Input type="password" name="password" title="Mot de passe" value={formData.password} onChange={handleChange} autoComplete="password" />
        </div>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <Button type="submit" name="signin" title="Se connecter" />
      </form>
    </div>
  );
};

export default SignIn;
