import axios from "axios";

const BaseUrl = "https://api-chat-nu.vercel.app"

class ApiController {

    async Signup(name: string, password: string) {

        try {

            const res = await axios.post(`${BaseUrl}/signup`, {
                name: name,
                password: password
            });
            
            return res;

        } catch (error) {
            
           return error
            
        }

    }

    async Signin(name: string, password: string) {

        try {

            const res = await axios.post(`${BaseUrl}/signin`, {
                name: name,
                password: password
            });
            
            return res
            
        } catch (error) {
            return error
        }
    }

    async getMessages (id: string) {

        try {

            const res = await axios.get(`${BaseUrl}/lastmessages/${id}`);
            
            return res
            
        } catch (error) {
            return error
        }
    }

    async getUsers (id: string) {

        try {
            
            const res = await axios.get(`${BaseUrl}/users/${id}`);
            
            return res

            
        } catch (error) {
            return error
        }
    }

    async getMessageChat(MyId: string, UserId: string) {
        
        try {

           const res = await axios.post(`${BaseUrl}/chat`, {
            from: MyId,
            to: UserId
           })

           return res
            
        } catch (error) {
            return error
        }
    }

    async createMessage (from: string, receive: string, data: string) {

        try {

            const res = await axios.post(`${BaseUrl}/message`, {
              sender: from,
              receiver: receive,
              data: data
            });
            
            return res
            
        } catch (error) {
            return error
        }

    }

}

export const ApiControll = new ApiController();