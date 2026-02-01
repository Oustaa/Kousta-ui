import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Zap, Shield, Settings } from 'lucide-react';
import FormExample from '@site/src/components/HomepageFeatures/FormExample';
import TableExample from '@site/src/components/HomepageFeatures/TableExample';
import HooksExample from '@site/src/components/HomepageFeatures/HooksExample';
import HelpersExample from '@site/src/components/HomepageFeatures/HelpersExample';

import styles from './index.module.css';

const FeatureList = [
  {
    title: 'Performance First',
    Icon: Zap,
    description: 'Built to be fast, with minimal re-renders and a lightweight footprint.',
  },
  {
    title: 'Robust Error Handling',
    Icon: Shield,
    description: 'Components that can throw errors are wrapped in Error Boundaries by default.',
  },
  {
    title: 'Easy to Configure',
    Icon: Settings,
    description: 'A global configuration provider makes it simple to theme your application.',
  },
];

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <a
            className="button button--primary button--lg"
            href="/docs/Intro">
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}

function Feature({ title, Icon, description }) {
  return (
    <div className={styles.feature}>
      <div className={styles.featureIcon}>
        <Icon size={48} />
      </div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - A Performant React UI Library`}
      description="Kousta-UI is a React component library focused on performance, accessibility, and ease of use.">
      <HomepageHeader />
      <main>
        <section className={styles.featuresSection}>
          <div className="container">
            <div className={styles.featuresGrid}>
              {FeatureList.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
        {/* Placeholders for examples */}
        <section className={styles.examplesSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Component Examples</h2>
            <FormExample />
          </div>
        </section>
        <section className={styles.examplesSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Table Example</h2>
            <TableExample />
          </div>
        </section>
        <section className={styles.examplesSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Hooks & Helpers</h2>
            <div className={styles.examplesGrid}>
              <HooksExample />
              <HelpersExample />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
