import { useContext, useEffect, useState } from "react"
import { ContextTsx } from "@/Context/Context"
import Content from "./Content"
import { ApiControll } from "@/Controllers"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"

interface DecodedToken {  id: string }

interface MessageData { id: string; sender: string; data: string; createdAt: string;}

interface ApiResponse { data: MessageData[];}

interface CreateMessageResponse {  success: boolean; messageId: string;  }

export default function Chat() {

const token: string | undefined = Cookies.get('token')
const decoded: DecodedToken | null = token === undefined ? null :  jwtDecode<DecodedToken>(token);      //decodifica o token e verifica se esta logado
    
    const {chat, dataUser, setUpdate, update} = useContext(ContextTsx)
    const [dataMsg, setDataMsg] = useState<MessageData[]>([]);

    const [dataForm, setDataForm] = useState({
      data: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setDataForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    useEffect(() => { 
      
      const getChatMessage = async () => 
        { 
          if (decoded && decoded.id && dataUser && dataUser.id) 
           { try 
            {
               const res = (await ApiControll.getMessageChat(decoded.id, dataUser.id)) as ApiResponse;
             setDataMsg(res.data); } 
             catch (error) { 
              console.log(error);

              } } }; 
              if (decoded && dataUser && dataUser.id) { getChatMessage(); }
            }, [dataUser, update]);
          

    const sendMessage = async () => {
      if (!dataForm.data || !decoded || !decoded.id) { 
        return;
      }
      try {

        const res = await ApiControll.createMessage(decoded.id, dataUser.id, dataForm.data) as unknown as CreateMessageResponse;
        setUpdate(res);
        setDataForm({ data: '' });
        
      } catch (error) {
        console.log(error);
      }

    }

  return (
    <div className="chat bg-[#F0F2F5] w-full">
    {chat ?
     <div className="cont-chat w-full">
      <div className="info flex bg-blue-700 items-center" >
         <img src="profile.png" alt="User" width={50}/>
         
       <h2>{dataUser.name}</h2>
      </div>
      <div className="content-msg">
        
      {dataMsg && dataMsg.map((user: MessageData) => (
  <Content key={user.id}  date={user.createdAt} msg={user.data} sender={user.sender} />
))}
      </div>

      <div className="send flex">
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()} className="w-full">

        <input name="data" placeholder="Escreva sua mensagem" type="text" onChange={handleChange} value={dataForm.data} />
        </form>
      
      <button onClick={sendMessage}><ion-icon size='large' name="send-outline"></ion-icon></button>
      </div>

     </div> 
     
      : <div className="flex items-center justify-center  w-full text-blue-700">
      
          <h1 className="font-extrabold text-4xl">WEBCHAT</h1>
    
     </div>  }
    
  </div>
  )
}
