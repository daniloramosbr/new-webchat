import { Divider } from "@nextui-org/divider";
import { useContext } from "react";
import { ContextTsx } from "@/Context/Context";


interface MessageProps {
  id: string;
  name: string;
  lastMessage: string;
}


export default function Message({ id, name, lastMessage }: MessageProps) {
  const { setChat, setDataUser } = useContext(ContextTsx);

  const goChat = () => {
    setDataUser({ id, name });
    setChat(true);
  };

  return (
    <div className="cont-message" onClick={goChat}>
      <div className="flex items-center">
        <img src="profile.png" alt="profile" width={100} />
        <div>
          <h1>{name}</h1>
          <p>{lastMessage}</p>
        </div>
       
      </div>
      <Divider orientation="horizontal" />
    </div>
  );
}
