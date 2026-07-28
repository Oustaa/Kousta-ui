"use client";

import Link from "next/link";
import { Settings, Shield, Zap } from "lucide-react";
import FormExample from "@/components/HomepageFeatures/FormExample";
import TableExample from "@/components/HomepageFeatures/TableExample";
import HooksExample from "@/components/HomepageFeatures/HooksExample";
import HelpersExample from "@/components/HomepageFeatures/HelpersExample";
import styles from "./home.module.css";

const FeatureList = [
  {
    title: "Performance First",
    Icon: Zap,
    description:
      "Built to be fast, with minimal re-renders and a lightweight footprint.",
  },
  {
    title: "Robust Error Handling",
    Icon: Shield,
    description:
      "Components that can throw errors are wrapped in Error Boundaries by default.",
  },
  {
    title: "Easy to Configure",
    Icon: Settings,
    description:
      "A global configuration provider makes it simple to theme your application.",
  },
];

export default function HomePage() {
  return (
    <>
      <header className={styles.heroBanner}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>Kousta UI</h1>
          <p className={styles.heroSubtitle}>
            A performant React UI library focused on performance, accessibility,
            and ease of use.
          </p>
          <div className={styles.buttons}>
            <Link className={styles.primaryCta} href="/docs/Intro">
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section className={styles.featuresSection}>
          <div className={styles.container}>
            <div className={styles.featuresGrid}>
              {FeatureList.map(({ title, Icon, description }) => (
                <div key={title} className={styles.feature}>
                  <div className={styles.featureIcon}>
                    <Icon size={48} />
                  </div>
                  <h3 className={styles.featureTitle}>{title}</h3>
                  <p>{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className={styles.examplesSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Component Examples</h2>
            <FormExample />
          </div>
        </section>
        <section className={styles.examplesSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Table Example</h2>
            <TableExample />
          </div>
        </section>
        <section className={styles.examplesSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Hooks & Helpers</h2>
            <div className={styles.examplesGrid}>
              <HooksExample />
              <HelpersExample />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
