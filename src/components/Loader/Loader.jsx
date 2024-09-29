import { Bars } from "react-loader-spinner";
import styles from "./Loader.module.css";

export default function Loader () {
  return (
        <div className={styles.loaderWrapper}>
          <Bars
            height="80"
            width="80"
            color="#9381ff"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
    //  <div className={styles.loaderWrapper}>
    //   <ThreeDots
    //     visible={true}
    //     height="120"
    //     width="120"
    //     color="#9381ff"
    //     radius="9"
    //     ariaLabel="three-dots-loading"
    //   />
    //  </div>
  );
};

