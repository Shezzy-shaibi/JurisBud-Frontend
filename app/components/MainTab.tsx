import Logo from "./Logo"
import styles from "./MainTab.module.css"
import ChatDropDown from "./ChatDropdown"
import SpaceDropDown from "./SpaceDropdown"
import Image from "next/image";

const MainTab = () => {
  return (
    <main>
      <div className={styles.background}>
        <div className={styles.dashboard}>
            <Image width={0} height={0} sizes="100vw" src="/maintab/dashboard.png" alt="dashboard" className={styles.tabpic}/>
            <p>Dashboard</p>
        </div>
        <div className={styles.space}>
            <Image width={0} height={0} sizes="100vw" src="/maintab/space.png" alt="space" className={styles.tabpic} />
            <SpaceDropDown></SpaceDropDown>
        </div>
        <div className={styles.chat}>
            <Image width={0} height={0} sizes="100vw" src="/maintab/chat.png" alt="chat" className={styles.tabpic} />
            <ChatDropDown></ChatDropDown>
        </div>
        <div className={styles.logo}>
            <Logo></Logo>
        </div>
      </div>

    </main>
  )
}

export default MainTab