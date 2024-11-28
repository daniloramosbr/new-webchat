import { useContext } from "react";
import { ContextTsx } from "@/Context/Context";

interface UsersProps {
  id: string;
  name: string;
}

export default function Users({ id, name }: UsersProps) {
  const { setWidth, setChat, setDataUser } = useContext(ContextTsx);
  
  const goChat = () => {
    setDataUser({ id, name });
    setWidth("0%");
    setChat(true);
  };

  return (
    <div className="flex items-center" onClick={goChat}>
      <img src="profile.png" width={100} alt="User" />
      <h1>{name}</h1>
    </div>
  );
}
