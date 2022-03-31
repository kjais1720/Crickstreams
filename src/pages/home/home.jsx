import styles from "./home.module.css";
import { Link } from "react-router-dom";
import { useAxios } from "utilities";
import { useState } from "react";
export function Home() {
  const [apiUrl, setApiUrl] = useState("/api/categories");
  const { serverResponse, isLoading } = useAxios(apiUrl);
  const categories = serverResponse.data?.categories || [];

  const createCategoryLinks = ({
    categoryName,
    _id,
    linkPath,
    categoryBanner,
  }) => (
    <Link
      key={_id}
      to={linkPath}
      className={`${styles.categoriesBox} flex-center`}
      style={{ backgroundImage: `var(--bg-gradient), url(${categoryBanner})` }}
    >
      <h2>{categoryName}</h2>
    </Link>
  );

  return (
    <main>
      <section
        className={`${styles.hero} pd-lg txt-center flex-center`}
        style={{
          backgroundImage: " var(--bg-gradient), url(/assets/main-banner.jpg)",
        }}
      >
        <div className="hero-content">
          <h1>Relive all of most epic cricket memories</h1>
          <p className="txt-lg txt-accent txt-bold">Start Streaming</p>
          <a href="#categories" className="txt-xlg">
            <i className="fad fa-angle-double-down"></i>
          </a>
        </div>
      </section>
      <section id="categories" className="categories pd-y-lg">
        <h2 className="txt-center">Categories</h2>
        <div className="d-flex gap-xlg f-wrap justify-c-center mr-y-lg">
          {categories[0] ? categories.map(createCategoryLinks) : " "}
        </div>
      </section>
    </main>
  );
}
