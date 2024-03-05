import NoHelloUser from "../components/NoHelloUser";
import MainTab from "../components/MainTab";
import styles from './Space.module.css';
import Link from 'next/link';
import EditableTag from "../components/EditableTag";
import Image from "next/image";

const Chats = () => {
return(
<main>
    <div className={styles.maintab}><MainTab></MainTab></div>
    <div className={styles.title}>
        <h1>Space</h1>
    </div>
    <div className={styles.FirRec}>
        <div className={styles.left}>
            <div className={styles.tags}>
                <Image width={0} height={0} sizes="100vw" src="/space/tags.png" className={styles.pic} alt='tags' />
                <p>&nbsp;&nbsp;Tags</p>
                <div className={styles.tag}>
                    <EditableTag initialText="Tag1"></EditableTag>
                </div>
            </div>
            <div className={styles.createdAt}>
                <Image width={0} height={0} sizes="100vw" src="/space/createdAt.png" className={styles.pic} alt='created at' />
                <p>&nbsp;&nbsp;Created At</p>
                <div className={styles.time}>
                    <p>place for timestamp fetched in backend</p>
                </div>
            </div>
        </div>
        <div className={styles.description}>
            <h2>Description</h2>
            <input type="text" placeholder="Description"></input>
        </div>
    </div>
    <div className={styles.SecRec}>
    <div className={styles.chatwithTag}>
        <p>Chat Name</p>
        <EditableTag initialText="Tag2"></EditableTag>
    </div>
    </div>
    <div className={styles.spaceBackground}>
        <Image width={0} height={0} sizes="100vw" src="/process/background2.png" alt="process" />
     </div>
    <NoHelloUser></NoHelloUser>
</main>

);
};

export default Chats;