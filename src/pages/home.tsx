import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import Message from "@/components/Message";
import Nav from "@/components/Nav";
import { useContext, useEffect, useState } from "react";
import Chat from "@/components/Chat";
import { useRouter } from "next/navigation";
import { Tooltip } from "@nextui-org/react";
import { ContextTsx } from "@/Context/Context";
import { ApiControll } from "@/Controllers";

interface DecodedToken {
  id: string;
  name: string;
  // Adicione outras propriedades conforme necessário
}

interface MessageData {
  id: string;
  name: string;
  lastMessage: string;
}


export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<DecodedToken | null>(null);
  const { setWidth, update, setChat, setDataUser } = useContext(ContextTsx);
  const [data, setData] = useState<MessageData[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setChat(false);
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [setChat]);

  useEffect(() => {
    const getUser = () => {
      const token = Cookies.get('token');
      const decoded = token == undefined ? null : jwtDecode<DecodedToken>(token);
      if (decoded === null) {
        router.push('/');
        return;
      }
      setUser(decoded);
    };
    getUser();
  }, [router])

  useEffect(() => {
    const getMessages = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const res = await ApiControll.getMessages(user.id) as { data: MessageData[] };
        setData(res.data)
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [user, update]);

  const showUsers = () => {
    setWidth("100%");
  };

  const logout = () => {
    setDataUser({ id: '', name: '' });
    Cookies.remove('token');
    setChat(false);
    setUser(null);
    router.push('/');
  };

  return (
    <div className="cont-home">
      <div className="inbox">
        <Nav />
        <div className="header bg-blue-700 mb-3">
          <h1 className="flex items-center gap-3">
            <ion-icon size='large' name="person-circle-outline"></ion-icon>
            <p>{user && user.name}</p>
          </h1>
          <span className="flex gap-3">
            <Tooltip content="Nova Conversa">
              <button onClick={showUsers}>
                <ion-icon size='large' name="add-circle-outline"></ion-icon>
              </button>
            </Tooltip>
            <Tooltip content="Sair">
              <button onClick={logout}>
                <ion-icon size='large' name="log-out-outline"></ion-icon>
              </button>
            </Tooltip>
          </span>
        </div>
        <div className="messages">
          {loading ? <h1 className="start">CARREGANDO...</h1> : data.length >0  ? (
            data.map((d) => (
              <Message key={d.id} id={d.id} name={d.name} lastMessage={d.lastMessage}/>
            ))
          ) : (
            <div className="start">
              <h1 className="empty">VOCÊ AINDA NÃO TEM CONVERSAS!</h1>
              <p onClick={showUsers}>CLIQUE AQUI E INICIE UMA CONVERSA</p>
            </div>
          )}
        </div>
      </div>
      <Chat />
    </div>
  );
}
