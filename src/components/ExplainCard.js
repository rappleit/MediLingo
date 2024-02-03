import styles from "../styles/ExplainCard.module.css"

const ExplainCard = ({
    prompt,
    content
}) => {
    return ( 
        <div className={styles.main}>
            <h3>{prompt}</h3>
            <p>{content}</p>
        </div>
     );
}
 
export default ExplainCard;