
import styles from "./page.module.css";
import Index from "@/components/Index";
import awsexports from "../aws-exports";
import { Amplify } from "aws-amplify";
Amplify.configure(awsexports);

export default function Home() {
  return (
    <div className={styles.page}>
      <Index />
    </div>
  );
}
