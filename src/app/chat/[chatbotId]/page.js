'use client';

import ChatWidget from '@/components/ChatWidget';

export default function ChatPage({ params }) {
    // In a real app we'd fetch settings from an API or Supabase here using the chatbotId

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
        body { background-color: transparent !important; margin: 0; overflow: hidden; }
        html { background-color: transparent !important; margin: 0; overflow: hidden; }
      `}} />
            <div className="w-full h-full relative">
                <ChatWidget
                    chatbotId={params.chatbotId}
                    greeting="Hi there! How can I assist you today?"
                    themeColor="#6366f1"
                />
            </div>
        </>
    );
}
