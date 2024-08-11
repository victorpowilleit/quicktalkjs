import styles from './styles.module.css';

export function ChatStarter() {
  return (
    <div className={`${styles.container} rounded shadow`}>
      <div>
        <h3>Ops!</h3>
        <p>Parece que você é o primeiro a chegar aqui...</p>
      </div>
        <button className="shadow-soft">
          Inicie uma<br/>nova conversa.
        </button>
    </div>
  )
}