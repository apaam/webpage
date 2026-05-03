import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

import styles from './index.module.css';

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title="Phynexis"
      description={siteConfig.tagline}
    >
      <main className={styles.main}>
        {/* Hero Section */}
        <header className={styles.header}>
          <div className={styles.heroBg} />
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <p className={styles.labAcronym}>Phynexis</p>
              <h1 className={styles.labName}>
                A Universal Particle Engine
              </h1>
              <p className={styles.labNameEn}>
                Integrating NetDEM, CFDDEM, and computational mechanics modules
                with machine-learning acceleration. Supporting arbitrary particle
                shapes, hybrid OpenMP/MPI parallelism, and PyTorch integration.
              </p>
              <div className={styles.heroActions}>
                <Link
                  className={styles.primaryButton}
                  to="/docs/documentation/user-manual">
                  Get Started
                </Link>
                <Link
                  className={styles.secondaryButton}
                  to="/docs/about/help-and-support">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Intro Section */}
        <section className={styles.introSection}>
          <div className={styles.container}>
            <p className={styles.introText}>
              Phynexis is a versatile C++ particle engine for computational
              mechanics of irregular granular materials. It unifies NetDEM
              (discrete element method), CFDDEM (fluid-particle coupling), and
              machine-learning tools under a single framework, scaling from
              desktop workstations to HPC clusters.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.areasSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Key Features</h2>
            <div className={styles.areasGrid}>
              <div className={styles.areaCard}>
                <h3 className={styles.areaTitle}>NetDEM Module</h3>
                <p className={styles.areaDesc}>
                  Sphere, GJK, and SDF contact solvers for arbitrary particle
                  shapes with hybrid OpenMP/MPI parallelism.
                </p>
              </div>
              <div className={styles.areaCard}>
                <h3 className={styles.areaTitle}>CFDDEM Coupling</h3>
                <p className={styles.areaDesc}>
                  Multiple CFD-DEM solvers (hybridCFDdem, interIBdem,
                  semiResolvedCFDdem) for fluid-particle interaction.
                </p>
              </div>
              <div className={styles.areaCard}>
                <h3 className={styles.areaTitle}>PyTorch Integration</h3>
                <p className={styles.areaDesc}>
                  Neural network-based shape representation (NetSDF, NetSPF)
                  and ANN contact solvers with GPU acceleration.
                </p>
              </div>
              <div className={styles.areaCard}>
                <h3 className={styles.areaTitle}>Arbitrary Shapes</h3>
                <p className={styles.areaDesc}>
                  Sphere, cylinder, poly-super-ellipsoid, spherical harmonics,
                  triangle mesh, level set, and more.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className={styles.linksSection}>
          <div className={styles.container}>
            <div className={styles.linksGrid}>
              <Link to="/docs/documentation/user-manual" className={styles.linkCard}>
                <svg className={styles.linkIconSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
                <span className={styles.linkText}>Documentation</span>
              </Link>
              <Link to="/docs/examples/" className={styles.linkCard}>
                <svg className={styles.linkIconSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"/>
                  <polyline points="8 6 2 12 8 18"/>
                </svg>
                <span className={styles.linkText}>Examples</span>
              </Link>
              <Link to="/docs/gallery/animations" className={styles.linkCard}>
                <svg className={styles.linkIconSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="23 7 16 12 23 17 23 7"/>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                </svg>
                <span className={styles.linkText}>Gallery</span>
              </Link>
              <Link href="pathname:///doxygen/html/index.html" className={styles.linkCard}>
                <svg className={styles.linkIconSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
                <span className={styles.linkText}>API (Doxygen)</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className={styles.contactSection}>
          <div className={styles.container}>
            <div className={styles.contactCard}>
              <h2 className={styles.contactTitle}>Contact</h2>
              <p className={styles.contactInfo}>
                For inquiries, collaboration opportunities, or technical
                support, please reach out via email.
              </p>
              <p className={styles.contactAddress}>
                <Link href="mailto:laizhengsh@mail.sysu.edu.cn">
                  laizhengsh@mail.sysu.edu.cn
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
