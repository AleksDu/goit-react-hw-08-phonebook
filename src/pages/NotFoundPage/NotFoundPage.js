import pageNotF from "../../icons/33979180-error-404.jpg";
import s from "./NotFound.module.css";

export default function NotFoundPage() {
  return (
    <main role="alert" className={s.main}>
      <img src={pageNotF} width="450" alt="error" className={s.img} />
      <h1 className={s.title}>Page Not Found🧷</h1>
    </main>
  );
}
