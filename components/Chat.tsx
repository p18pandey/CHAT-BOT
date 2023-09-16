"use client"   // for client side rendering
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button'       // shadcn component
import { Textarea } from "@/components/ui/textarea"   // shadcn component

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import './Chat.css';  

// chat component

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<{ isUser: boolean; text: string }[]>([]);
    const [input, setInput] = useState<string>('');
    const formRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch('http://localhost:3001'); // fetching message from server
                const data = await response.json();

                setMessages(data.messages || []);   // Error handling
            } catch (error) {
                console.error('Error fetching messages.', error);
            }
        };

        // Fetch initial messages when the component mounts
        fetchMessages();
    }, []);

    const handleKeyUp = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            formRef.current?.dispatchEvent(
                new Event('submit', { cancelable: true, bubbles: true })
            );
        }
    };

    const sendMessage = async (event: React.FormEvent) => {
        event.preventDefault();

        if (input.trim() === '') return;

        setMessages([...messages, { isUser: true, text: input.trim() }]);
        setInput('');

        try {
            const response = await fetch('http://localhost:3001', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: input }),
            });
            const data = await response.json();

            const aiMessage =
                data.message || "Sorry, I couldn't understand your message.";

            setMessages((previousMessages) => [
                ...previousMessages,
                { isUser: false, text: aiMessage },
            ]);
        } catch (error) {
            console.error('Error fetching AI response.', error);
        }
    };

    return (
        <div >
            <div className="chat-container  " >
                <div className="chat-header">
                    <div className='bold'><h1 className='text 3xl'> CHAT BOT</h1></div>
                </div>
                <div className="chat-body " id="chat-body">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`chat-message ${message.isUser ? 'user-message' : 'ai-message'
                                }`}>
                            <div className="message-user-identification">
                                <p>
                                    {' '}


                                    {message.isUser ? (
                                        <div>

                                            {/* avatar */}
                                            <Avatar>
                                                <AvatarImage src="https://shorturl.at/jJSZ9" />
                                                <AvatarFallback>John</AvatarFallback>
                                            </Avatar>

                                        </div>
                                    ) : (
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback>CB</AvatarFallback>
                                        </Avatar>
                                    )}


                                </p>
                            </div>
                            <p>{message.text}</p>
                        </div>
                    ))}
                </div>
                <form className="chat-input" onSubmit={sendMessage} ref={formRef}>
                    {/* textarea */}
                    <Textarea className=".chat-container .chat-input textarea"

                        // type={"text"}
                        placeholder="type your message"
                        value={input}
                        onKeyUp={(e) => handleKeyUp(e)}
                        onChange={(e) => setInput(e.target.value)}
                    />


                    <Button id='sendbutton' >
                        Send
                    </Button>

                </form>
            </div>
        </div>

    );
};

export default Chat;
