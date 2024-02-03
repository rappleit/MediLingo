import { useCallback, useEffect, useRef, useState } from "react";
import styles from "../styles/UploadReport.module.css"
import { pdfjs, Document, Page } from 'react-pdf';
import "react-pdf/dist/esm/Page/TextLayer.css";
import { FaFileUpload, FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import html2canvas from "html2canvas";
import TextareaAutosize from 'react-textarea-autosize';
import axios from "axios";
import FormData from 'form-data';
import Report1 from "../assets/sample_reports/samplereport1.pdf"
import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;
export const clamp = (val, min, max) => Math.max(min, Math.min(max, val))
export let Selection

  ; (function (Selection) {
    Selection["None"] = "None"
    Selection["Clicked"] = "Clicked"
    Selection["Dragging"] = "Dragging"
    Selection["Selected"] = "Selected"
  })(Selection || (Selection = {}))

export const useClickToSelect = () => {
  const [selection, setSelection] = useState(Selection.None)
  const [node, setNode] = useState()
  const [{ dx, dy }, setOffset] = useState({
    dx: 0,
    dy: 0
  })
  const [{ startX, startY }, setStartPosition] = useState({
    startX: 0,
    startY: 0
  })

  const ref = useCallback(nodeEle => {
    setNode(nodeEle)
  }, [])

  const handleMouseDown = useCallback(
    e => {
      if (!node) {
        return
      }
      const eleRect = node.getBoundingClientRect()
      const startRelativePos = {
        startX: e.clientX - eleRect.left,
        startY: e.clientY - eleRect.top
      }
      setOffset({ dx: 0, dy: 0 })
      setStartPosition(startRelativePos)
      const startPos = {
        x: e.clientX,
        y: e.clientY
      }
      setSelection(Selection.Clicked)

      const handleMouseMove = e => {
        let dx = e.clientX - startPos.x
        let dy = e.clientY - startPos.y
        const maxX = eleRect.width - startRelativePos.startX
        const maxY = eleRect.height - startRelativePos.startY
        dx = clamp(dx, 0, maxX)
        dy = clamp(dy, 0, maxY)

        setOffset({ dx, dy })
        setSelection(Selection.Dragging)
        updateCursor()
      }

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        setSelection(Selection.Selected)
        resetCursor()
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    },
    [node, dx, dy]
  )

  const handleTouchStart = useCallback(
    e => {
      if (!node) {
        return
      }
      const touch = e.touches[0]

      const eleRect = node.getBoundingClientRect()
      const startRelativePos = {
        startX: touch.clientX - eleRect.left,
        startY: touch.clientY - eleRect.top
      }
      setOffset({ dx: 0, dy: 0 })
      setStartPosition(startRelativePos)
      const startPos = {
        x: touch.clientX,
        y: touch.clientY
      }
      setSelection(Selection.Clicked)

      const handleTouchMove = e => {
        if (!node) {
          return
        }
        const touch = e.touches[0]
        let dx = touch.clientX - startPos.x
        let dy = touch.clientY - startPos.y
        const maxX = eleRect.width - startRelativePos.startX
        const maxY = eleRect.height - startRelativePos.startY
        dx = clamp(dx, 0, maxX)
        dy = clamp(dy, 0, maxY)

        setOffset({ dx, dy })
        setSelection(Selection.Dragging)
        updateCursor()
      }

      const handleTouchEnd = () => {
        document.removeEventListener("touchmove", handleTouchMove)
        document.removeEventListener("touchend", handleTouchEnd)
        setSelection(Selection.Selected)
        resetCursor()
      }

      document.addEventListener("touchmove", handleTouchMove)
      document.addEventListener("touchend", handleTouchEnd)
    },
    [node, dx, dy]
  )

  const updateCursor = () => {
    document.body.style.cursor = "crosshair"
    document.body.style.userSelect = "none"
  }

  const resetCursor = () => {
    document.body.style.removeProperty("cursor")
    document.body.style.removeProperty("user-select")
  }

  useEffect(() => {
    if (!node) {
      return
    }
    node.addEventListener("mousedown", handleMouseDown)
    node.addEventListener("touchstart", handleTouchStart)
    return () => {
      node.removeEventListener("mousedown", handleMouseDown)
      node.removeEventListener("touchstart", handleTouchStart)
    }
  }, [node, dx, dy])

  return [ref, dx, dy, startX, startY, selection]
}


export const mergeRefs = refs => {
  return value => {
    refs.forEach(ref => {
      if (typeof ref === "function") {
        ref(value)
      } else if (ref != null) {
        ref.current = value
      }
    })
  }
}

const UploadReport = () => {
  const containerRef = useRef()
  const [clickToSelectRef, dx, dy, startX, startY, selection] = useClickToSelect()
  const containerMergedRef = mergeRefs([containerRef, clickToSelectRef])
  const [askImg, setAskImg] = useState()
  useEffect(() => {
    const container = containerRef.current;
    if (!container || selection !== Selection.Selected || dx === 0 || dy === 0) {
      return;
    }
    html2canvas(container, {
      x: startX,
      y: startY,
      width: dx,
      height: dy,
    }).then((canvas) => {
      const img = canvas.toDataURL("image/png");
      setAskImg(img)
      canvas.toBlob(function (blob) {
        setAskBlob(blob)
      })

    });
  }, [dx, dy, startX, startY, selection]);

  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const nextPage = () => {
    if (pageNum < numPages) {
      setPageNum(pageNum + 1)

    }
  }

  const previousPage = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1)

    }
  }

  const [question, setQuestion] = useState("")
  const [askBlob, setAskBlob] = useState()
  const [answer, setAnswer] = useState("How can I help you?")





  const handleAsk = (e) => {
    e.preventDefault();
    console.log(askBlob)
    if (question != "") {
      setAnswer("Loading...")
      const form = new FormData();
      form.append("providers", "openai");
      form.append("file", askBlob, "qnimage.png");
      form.append("question", question + " Please elaborate and your answer in simple terms. Answer in full sentences. Keep it succint.");
      form.append("fallback_providers", "");
      form.append("max_tokens", 400);
      form.append("show_original_response", true);


      const options = {
        method: "POST",
        url: "https://api.edenai.run/v2/image/question_answer",
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_EDENAI_API,
          "Content-Type": "multipart/form-data;"
        },
        data: form,
      };

      axios
        .request(options)
        .then((response) => {
          console.log(response.data)
          setAnswer(response.data.openai.answers[0])
        })
        .catch((error) => {
          console.error(error);
        });

    } else {
      setAnswer("Please enter a question.")
    }
  }


  return (
    <div className={styles.main}>
      <h1>Analyse A Report</h1>
      <div className={styles.instructions}>
        <h3>Instructions:</h3>
        <ol>
          <li>Upload your medical report as a PDF document.</li>
          <li>Select the portion of the document you have questions about by clicking and dragging.</li>
          <li>Use our chatbot on the right to ask your questions.</li>
          <li>Repeat step 2 if you would like to ask another question.</li>
        </ol>
          <h4>Choose a sample report:</h4>
          <div className={styles.selectionWrapper}>
            <button onClick={() => setFile(Report1)}>Report 1</button>
            <button>Report 2</button>
            <button>Report 3</button>
            <button>Report 4</button>
          </div>
      </div>
      <div className={styles.wrapper}>
        {(file) ? <div className={styles.filewrapper}>
          <div className={styles.container} ref={containerMergedRef}>
            {selection === Selection.Dragging && (
              <div
                className={styles.selection}
                style={{
                  transform: `translate(${startX}px, ${startY}px)`,
                  width: `${dx}px`,
                  height: `${dy}px`,
                }}
              />
            )}
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNum} renderTextLayer={false} height={680} width={window.screen.availWidth * 0.44} renderAnnotationLayer={false}></Page>
            </Document>
          </div>

          <div className={styles.fileControls}>
            <p>Page {pageNum} of {numPages}</p>
            <button onClick={() => previousPage()}><FaChevronCircleLeft /></button>
            <button onClick={() => nextPage()}><FaChevronCircleRight /></button>
          </div>
        </div> :
          <div className={styles.nofilewrapper}>
            <FaFileUpload style={{ "fontSize": "54px", "marginTop": "36px" }} />
            <h2>Please upload your medical report in PDF</h2>
          </div>
        }
        <div className={styles.analyser}>
          <div className={styles.previewCard}>
            <h4>Drag over the report to select the area you would like to ask about.</h4>
            {(askImg) ? <img src={askImg} alt="" /> : <></>}
          </div>
          <div className={styles.chatbot}>
            <div className={styles.header}>
              <h4>Ask Dr. Octo</h4>
              <p>About the selected area of your report</p>

            </div>
            <div className={styles.footer}>
              <TextareaAutosize
                className={styles.chatInput}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question" />
              <button onClick={(e) => handleAsk(e)}>Ask Away!</button>
            </div>
            <div className={styles.chatOutputWrapper}>
              <div className={styles.chatoutput}>
                <p>{answer}</p>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadReport;