import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Planning",
    Svg: require("@site/static/img/illustration/Online-calendar-bro.svg")
      .default,
    description: (
      <>
        Gestion efficace des projets avec suivi en temps réel de l'avancement.
      </>
    ),
    link: "/docs/planning",
  },
  {
    title: "Commercial",
    Svg: require("@site/static/img/illustration/Partnership-bro.svg").default,
    description: (
      <>
        Organisation efficace des informations de contact et de relation avec
        les clients.
      </>
    ),
    link: "/docs/commercial",
  },
  {
    title: "Actualités",
    Svg: require("@site/static/img/illustration/Website-Creator-bro.svg")
      .default,
    description: (
      <>
        Les dernières avancées dans le développement de notre application{" "}
        <b>Intranet - 123 Structure.</b>
      </>
    ),
    link: "/blog",
  },
];

function Feature({ title, Svg, description, link }: FeatureItem) {
  return (
    <div
      className={clsx("col col--4")}
      onClick={() => window.open(link, "_self")}
    >
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className={`${styles.content} text--center padding-horiz--md`}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
