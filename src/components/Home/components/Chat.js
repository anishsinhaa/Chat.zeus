import {useContext} from 'react'
import cam from "../../../images/video-call.png"
import add from "../../../images/add-friend.png"
import more from "../../../images/option.png"
import { Messages } from './Messages'
import { Input } from './Input'
import { ChatContext } from "../../../Context/ChatContext";


export const Chat = () => {
  const {data} = useContext(ChatContext)

  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>{data.user?.displayName}</span>
        <div className='chatIcons'>
          <img src={cam} alt='cam'/>
          <img src={add} alt='add'/>
          <img src={more} alt='more'/>
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}
