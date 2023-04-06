import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        {/* <h1 className="hero__title">{siteConfig.title}</h1> */}
        <img
          src={"/img/123STR/logo-white.png"}
          alt="logo"
          style={{ width: "50%" }}
        />
        <p className="hero__subtitle" style={{ color: "black" }}>
          {siteConfig.tagline}
        </p>
        <div className={styles.buttonsContainer}>
          <div className={styles.buttons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/introduction"
              style={{ color: "white", backgroundColor: "#1d1d1b" }}
            >
              📖 Accéder à la documentation
            </Link>
          </div>
          <div className={styles.buttons}>
            <Link
              className="button button--primary button--lg"
              to="/blog"
              style={{ color: "white", backgroundColor: "#1d1d1b" }}
            >
              📰 Accéder aux dernières actualités
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout title={"Accueil"}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
