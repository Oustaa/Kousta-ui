import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  imageSrc: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Component-first",
    imageSrc: require("@site/static/img/logo.png").default,
    description: (
      <>
        A focused set of reusable React components with sensible defaults and a
        consistent API.
      </>
    ),
  },
  {
    title: "Themeable",
    imageSrc: require("@site/static/img/logo.png").default,
    description: (
      <>
        Style with design tokens and class hooks. Customize with provider-driven
        defaults.
      </>
    ),
  },
  {
    title: "Pragmatic",
    imageSrc: require("@site/static/img/logo.png").default,
    description: (
      <>
        Minimal dependencies and straightforward building blocks for product UI.
      </>
    ),
  },
];

function Feature({ title, imageSrc, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}> 
      <div className="text--center">
        <img className={styles.featureSvg} src={imageSrc} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
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
