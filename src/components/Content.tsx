import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import React from "react";

interface ContentProps {
  date: string;
  msg: string;
  sender: string; // ID do remetente
}

interface DecodedToken {
  id: string;
  // Outras propriedades conforme necessário
}

export default function Content({ sender, date, msg }: ContentProps) {
  const token: string | undefined = Cookies.get('token');
  const decoded: DecodedToken | null = token == undefined ? null : jwtDecode<DecodedToken>(token); // Decodifica o token e verifica se está logado
  const data = new Date(date).toLocaleTimeString('pt-BR');
  const position = decoded && decoded.id === sender ? "justify-end" : "justify-start"; // Põe na direita ou esquerda

  return (
    <div className={`msg ${position}`}>
      <div className="color-msg">
        {msg}<span className="text-gray-300">{data}</span>
      </div>
    </div>
  );
}
