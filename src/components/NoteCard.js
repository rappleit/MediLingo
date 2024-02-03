import { useState } from "react";
import styles from "../styles/NoteCard.module.css"
import TextareaAutosize from 'react-textarea-autosize';

const NoteCard = () => {
    const [isEditing, setIsEditing] = useState(true)
    const [oldText, setOldText] = useState("")
    const [text, setText] = useState("")

    const handleCancel = () => {
        setIsEditing(false)
        setText(oldText)
    }

    const handleDone = () => {
        setIsEditing(false)
    }

    const handleEdit = () => {
        setOldText(text)
        setIsEditing(true)
        setTimeout(function() {
            document.getElementById("textbox").focus();
        }, 10);


    }
    return (
        <div className={styles.main}>
            {(isEditing) ?
                <div>
                    <TextareaAutosize
                        id="textbox"
                        className={styles.noteTextInput}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Start typing..." />
                    <button className={styles.done} onClick={() => handleDone()}>Done</button>
                    <button className={styles.cancel} onClick={() => handleCancel()}>Cancel</button>
                </div> :
                <div className={styles.cardContent}>
                    <p>{text}</p>
                </div>
            }
            {(isEditing) ? <></> : <button className={styles.edit} onClick={()=>handleEdit()}>
                Edit
            </button>}
        </div>
    );
}

export default NoteCard;