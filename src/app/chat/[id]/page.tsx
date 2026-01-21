import ChatPage from '@/components/chatMode/ChatPage'
import CustomProvider from '@/CustomProvider/CustomProvider'
import React from 'react'

const ChatPageLayout = ({ params }: { params: { id: string } }) => {
  return (
   <CustomProvider>
    <ChatPage id={params.id}/>
   </CustomProvider>
  )
}

export default ChatPageLayout