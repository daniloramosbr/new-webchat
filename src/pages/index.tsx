import { useState, ChangeEvent, FormEvent } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Link, Tab, Tabs } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { MessageCircle, Users, Zap, Globe } from 'lucide-react';
import { ApiControll } from '@/Controllers';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

interface FormData {
  name: string;
  password: string;
}

interface AuthResponse { data: { token: string; }; status: number;}

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [dataForm, setDataForm] = useState<FormData>({ name: '', password: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const SignUp = async () => {
    try {
      if (!dataForm.name || !dataForm.password) {
        alert('Preencha todos os campos.');
        return;
      }
      setIsLoading(true);
      const res = await ApiControll.Signup(dataForm.name, dataForm.password) as unknown as AuthResponse;

      console.log(res);
      Cookies.set('token', res.data.token);
      router.push('/home');
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const SignIn = async () => {
    try {
      if (!dataForm.name || !dataForm.password) {
        alert('Preencha todos os campos.');
        return;
      }
      setIsLoading(true);
      const res: AuthResponse = await ApiControll.Signin(dataForm.name, dataForm.password) as unknown as AuthResponse;
      console.log(res.status);
      console.log(res);
      if (res.status !== 200) {
        setError(true);
        setIsLoading(false);
        setTimeout(() => {
          setError(false);
        }, 3000);
        return;
      }
      Cookies.set('token', res.data.token);
      router.push('/home');
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };


  return (
    <NextUIProvider>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-950">
        <header className="p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold text-white">WebChat</h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link color="foreground" className="mr-4 text-white">Sobre</Link>
              <Link color="foreground" className="text-white">Contato</Link>
            </motion.div>
          </nav>
        </header>
        <main className="flex-grow flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-col items-center">
              <h2 className="text-2xl font-bold">Bem-vindo ao WebChat</h2>
              <p className="text-center text-default-500">Conecte-se instantaneamente com o mundo</p>
            </CardHeader>
            <CardBody>
              <Tabs aria-label="Login options">
                <Tab key="login" title="Login">
                  <form onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()} className="space-y-4 py-4">
                    <Input
                      label="Nome"
                      placeholder="Seu nome"
                      name="name"
                      variant="bordered"
                      onChange={handleChange}
                      isRequired
                    />
                    <Input
                      label="Senha"
                      placeholder="Sua senha"
                      type="password"
                      name="password"
                      variant="bordered"
                      onChange={handleChange}
                      isRequired

                    />
                  
                  </form>
                  <Button onClick={SignIn} type="submit" color="primary" className="w-full" isLoading={isLoading}>
                      {isLoading ? "Entrando..." : "Entrar"}
                    </Button>
                    <div className="error text-red-700 text-center">
                     {error && 'usuário ou senha inválidos.'}
                    </div>
                </Tab>


                <Tab key="register" title="Registro">
                <form onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()} className="space-y-4 py-4">
                    <Input
                      label="Nome"
                      placeholder="Seu nome"
                      variant="bordered"
                       name="name"
                      isRequired
                      onChange={handleChange}
                    />
                  
                    <Input
                      label="Senha"
                      placeholder="Sua senha"
                      type="password"
                      name="password"
                      variant="bordered"
                      isRequired
                      onChange={handleChange}
                    />
                  
                  </form>
                  <Button onClick={SignUp} type="submit" color="primary" className="w-full" isLoading={isLoading}>
                      {isLoading ? "Registrando..." : "Registrar"}
                    </Button>
                </Tab>
              </Tabs>
            </CardBody>
            <CardFooter className="flex flex-col gap-4">
              <div className="text-center text-sm text-default-500">
                <Link color="foreground" className="hover:underline">Termos</Link>
                {' • '}
                <Link color="foreground" className="hover:underline">Privacidade</Link>
              </div>
            </CardFooter>
          </Card>
        </main>

        <footer className="mt-8 p-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col items-center text-white"
              >
                <MessageCircle className="h-8 w-8 mb-2" />
                <h3 className="font-semibold">Chat em Tempo Real</h3>
                <p className="text-center text-sm">Comunique-se instantaneamente com amigos e colegas</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col items-center text-white"
              >
                <Users className="h-8 w-8 mb-2" />
                <h3 className="font-semibold">Grupos & Canais</h3>
                <p className="text-center text-sm">Crie e participe de comunidades com interesses em comum</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col items-center text-white"
              >
                <Zap className="h-8 w-8 mb-2" />
                <h3 className="font-semibold">Rápido & Seguro</h3>
                <p className="text-center text-sm">Mensagens criptografadas e entrega instantânea</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col items-center text-white"
              >
                <Globe className="h-8 w-8 mb-2" />
                <h3 className="font-semibold">Conecte-se Globalmente</h3>
                <p className="text-center text-sm">Faça amigos ao redor do mundo</p>
              </motion.div>
            </div>
          </div>
        </footer>
      </div>
    </NextUIProvider>
  )
}