import { useContext, useEffect, useState } from "react";
import Users from "./Users";
import { ContextTsx } from "@/Context/Context";
import { ApiControll } from "@/Controllers";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  name: string;
}

interface DecodedToken {
  id: string;
  // Adicione outras propriedades conforme necessário
}

export default function Nav() {
  const { width, setWidth } = useContext(ContextTsx);
  const [users, setUsers] = useState<User[]>([]);
  const token: string | undefined = Cookies.get('token');
  const decoded: DecodedToken | null = token === undefined ? null : jwtDecode<DecodedToken>(token);

  const exitNav = () => {
    setWidth("0%");
  };

  useEffect(() => {
    async function getUsers() {
      if (decoded && decoded.id) {
        try {
          const res = await ApiControll.getUsers(decoded.id) as { data: User[] };
          setUsers(res.data);
        } catch (error) {
          console.log(error);
        }
      }
    }
    getUsers();
  }, [decoded]);

  return (
    <div className="cont-nav" style={{ width: width }}>
      <div className="header-nav bg-blue-700 flex mb-3">
        <button onClick={exitNav}><ion-icon size='large' name="arrow-back-outline"></ion-icon></button>
        <h1>Nova Conversa</h1>
      </div>
      <div className="users">
        {users && users.map((user) => {
          return <Users key={user.id} id={user.id} name={user.name} /> // Adiciona cada user à lista de Users
        })}
      </div>
    </div>
  );
}
