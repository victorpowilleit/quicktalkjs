import styles from './styles.module.css';
import React, {useState} from "react";

interface NewMessageModalProps {
  closeModal: () => void;
  handleNewMessage: (message: string) => void;
}

type EventType = React.MouseEvent<HTMLDivElement | HTMLSpanElement, MouseEvent> | null

export function NewMessageModal({closeModal, handleNewMessage}: NewMessageModalProps) {

  const [message, setMessage] = useState('');

  function handleCloseModal(e: EventType = null) {
    e?.stopPropagation();
    closeModal();
  }

  function handleSendMessage() {
    handleNewMessage(message)
    handleCloseModal()
  }

  return (
    <div className={styles.bgCover} onClick={(e) => handleCloseModal(e)}>
      <div className={`${styles.modalContainer} rounded`} onClick={e => e.stopPropagation()}>
        <div>Escreva sua mensagem aqui. <span onClick={handleCloseModal}>x</span></div>
        <textarea autoFocus className="rounded" value={message} onChange={e => setMessage(e.target.value)}/>
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  )
}