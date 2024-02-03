import { useEffect, useState } from "react";
import styles from "../styles/CreateSession.module.css"
import NoteCard from "../components/NoteCard"
import TextareaAutosize from 'react-textarea-autosize';
import axios from "axios"
import ExplainCard from "../components/ExplainCard";

const CreateSession = () => {
    const [noteArray, setNoteArray] = useState([])
    const createNote = () => {
        setNoteArray([...noteArray, <NoteCard key={noteArray.length} />]);
    }
    const [explainPrompt, setExplainPrompt] = useState("")
    const [generateLabel, setGenerateLabel] = useState("Generate")

    const createExplanation = () => {
        setGenerateLabel("Loading...")
        if (explainPrompt !="") {
        axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are a helpful assistant, skilled in medcine and health. You are clear and consise."
              },
              {
                role: "user",
                content: "Explain: " + explainPrompt + " Answer in a simple language that is easy to understand."
              }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.REACT_APP_OPENAI_API
            }
        }
        ).then(function (response) {
            console.log(response);
            console.log(response.data.choices[0].message.content)
            setGenerateLabel("Generate")
            setNoteArray([...noteArray, <ExplainCard key={noteArray.length} prompt={explainPrompt} content={response.data.choices[0].message.content}/>]);
            setExplainPrompt("")
          })
          .catch(function (error) {
            console.log(error);
          });
        }
    }

    const [models, setModels] = useState([])
 
    
    return (
        <div className={styles.main}>
            <div className={styles.toolbar}>
                <div className={styles.header}>
                    <h2>Toolbox</h2>
                </div>
                <div className={styles.toolbarContent}>
                    <button onClick={() => createNote()}>Add Note</button>
                    <div className={styles.toolCard}>
                        <h4>Generate Explanation</h4>
                        <p>What would you like to explain?</p>
                        <TextareaAutosize
                            id="textbox"
                            className={styles.explainInput}
                            value={explainPrompt}
                            onChange={(e) => setExplainPrompt(e.target.value)}
                            placeholder="Enter your prompt" />
                        <button onClick={() => createExplanation()}>{generateLabel}</button>
                    </div>
                    <div className={styles.toolCard}>
                        <h4>Create Visual Diagram</h4>
                        <p>What diagram would you like to add?</p>
                        <select className={styles.selectModel}>
                            <option value="brain">Brain</option>
                        </select>
                        <button>Create</button>
                    </div>

                </div>
            </div>
            <div className={styles.content}>
                <h4>Create new session</h4>
                <h1>3/2/2024 Session</h1>
                {(noteArray.length > 0) ?
                    noteArray.map((element) => (
                        element
                    ))
                    : <div><p>Start by adding a note or something from the toolbox!</p>
                        <button className={styles.actionButton} onClick={() => createNote()}>Add Note</button></div>}

                        <iframe src="https://saanatomy.com/Embeds/HumanEcorshe/index.html" width="100%" height="550"></iframe>
            </div>
        </div>
    );
}

export default CreateSession;