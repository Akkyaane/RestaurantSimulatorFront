import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';

const SignIn = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Connexion</h1>
      <form action="http://localhost:3000/signup" className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <div className="mb-4">
          <Input type="text" name="email" title="E-mail" />
          <Input type="password" name="password" title="Mot de passe" />
        </div>
        <Button type="submit" name="signin" title="Se connecter" />
      </form>
    </div>
  );
};

export default SignIn;

