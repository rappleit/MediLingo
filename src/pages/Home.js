import styles from "../styles/Home.module.css"
import profile from "../assets/profile.jpeg"
import { RiChatNewLine } from "react-icons/ri";
import { FaFileUpload, FaCommentMedical, FaFileInvoice } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className={styles.main}>
            <div className={styles.mainCard}>
                <div className={styles.left}>
                    <img src={profile} alt="" />
                </div>
                <div className={styles.right}>
                    <h1>Welcome, Jing Kai!</h1>
                    <h3>You have <span>0</span> notifications.</h3>
                    <p>What would you like to do today?</p>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.row}>
                    <Link to="/new_session" className={styles.cardLink}>

                        <div className={styles.card}>
                            <RiChatNewLine className={styles.icon} />
                            <h3>Create New Session</h3>
                        </div>
                    </Link>
                    <Link to="/new_report" className={styles.cardLink}>

                        <div className={styles.card}>
                            <FaFileUpload className={styles.icon} />
                            <h3>Upload New Report</h3>
                        </div>
                    </Link>
                </div>
                <div className={styles.row}>
                    <Link to="/sessions" className={styles.cardLink}>

                        <div className={styles.card}>
                            <FaCommentMedical className={styles.icon} />
                            <h3>View My Sessions</h3>
                        </div>
                    </Link>
                    <Link to="/reports" className={styles.cardLink}>
                        <div className={styles.card}>
                            <FaFileInvoice className={styles.icon} />
                            <h3 >View My Reports</h3>
                        </div>
                    </Link>


                </div>
            </div>
        </div>
    );
}

export default Home;