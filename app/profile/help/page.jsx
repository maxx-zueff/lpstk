"use client";

import { useState, useRef, useEffect } from "react";
import { Header } from "@/app/_components/header";
import Image from "next/image";
import styles from "./page.module.scss";

export default function SupportPage() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Добрый день!", time: "18:23", isUser: true },
    { id: 2, text: "Я хочу обсудить мои заказы", time: "18:25", isUser: true },
    { 
      id: 3, 
      text: "Привет! Готовы воплотить ваши цветочные фантазии в жизнь. Выберите номер вашего заказа", 
      time: "18:26", 
      isUser: false 
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;
    
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: inputMessage,
      time,
      isUser: true,
    }]);
    
    setInputMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className={styles.page}>
      <Header title="Поддержка" />

      <div className={styles.chat}>
        <div className={styles.date}>
          <span>Сегодня</span>
        </div>

        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message_wrapper} ${
              message.isUser ? styles.user_message : styles.support_message
            }`}
          >
            <div className={styles.message_content}>
              <div className={styles.message}>
                <p>{message.text}</p>
              </div>
              <span className={styles.message_time}>{message.time}</span>
            </div>
          </div>
        ))}
        
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.input_wrapper}>
        <div className={styles.input_container}>
          <input
            type="text"
            placeholder="Сообщение..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className={styles.message_input}
          />
          <button className={styles.send_button} onClick={handleSendMessage}>
            <Image src="/next.svg" width={20} height={20} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
}
