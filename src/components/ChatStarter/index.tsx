import styles from './styles.module.css';

interface ChatStarterProps {
  openNewMessageModal: ()=>void
}

export function ChatStarter({openNewMessageModal}:ChatStarterProps) {
  return (
    <div className={`${styles.container} rounded shadow`}>
      <div>
        <h3>Ops!</h3>
        <p>Parece que você é o primeiro a chegar aqui...</p>
      </div>
        <button className="shadow-soft" onClick={openNewMessageModal}>
          Inicie uma<br/>nova conversa.
        </button>
    </div>
  )
}