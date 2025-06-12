import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import { useState } from 'react';

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  console.log(useState);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        setMessage('Une erreur est survenue. Veuillez recommencer.');
        return;
      } else {
        window.location.href = '/signin';
      }

    } catch (e) {
      setMessage(e.message);
    }
  };

      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Inscription</h1>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <div className="mb-4">
                    <Input type="text" name="firstName" title="Prénom" value={formData.firstName} onChange={handleChange} autoComplete="firstName" />
                    <Input type="text" name="lastName" title="Nom" value={formData.lastName} onChange={handleChange} autoComplete="lastName" />
                    <Input type="text" name="phone" title="Numéro de téléphone" value={formData.phone} onChange={handleChange} autoComplete="phone" />
                    <Input type="email" name="email" title="E-mail" value={formData.email} onChange={handleChange} autoComplete="email" />
                    <Input type="password" name="password" title="Mot de passe" value={formData.password} onChange={handleChange} autoComplete="password" />
                </div>
                <Button type="submit" name="signup" title="S'inscrire" />
                {message && <div className="text-red-500 mb-2">{message}</div>}
            </form>
        </div>
    );
};

export default SignUp;