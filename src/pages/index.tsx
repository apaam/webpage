import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

import styles from './index.module.css';

function ExternalIcon(): ReactNode {
  return (
    <svg
      className={styles.externalGlyph}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const doxygenHref = useBaseUrl('/doxygen/html/');

  return (
    <Layout title="Phynexis" description={siteConfig.tagline}>
      <main className={styles.main}>
        <header className={styles.hero}>
          <div className={styles.heroBg} aria-hidden />
          <div className={styles.container}>
            <div className={styles.heroInner}>
              <p className={styles.heroEyebrow}>Phynexis</p>
              <h1 className={styles.heroTitle}>
                Particle simulation for granular media and fluid–solid systems
              </h1>
              <p className={styles.heroLead}>
                A unified engine for discrete elements, CFD–DEM coupling, and
                solid mechanics—scaled from laptops to clusters, with a Python
                surface for everyday workflows.
              </p>
              <div className={styles.heroActions}>
                <Link className={styles.btnPrimary} to="/docs/manual/installation/">
                  Install
                </Link>
                <Link className={styles.btnGhost} to="/docs/manual/">
                  Manual
                </Link>
              </div>
              <p className={styles.heroHint}>
                <Link className={styles.heroHintLink} to="/docs/python-api/">
                  Python API
                </Link>
                <span className={styles.heroHintSep} aria-hidden>
                  ·
                </span>
                <Link className={styles.heroHintLink} to="/docs/about/">
                  About
                </Link>
              </p>
            </div>
          </div>
        </header>

        <section className={styles.scope} aria-labelledby="scope-heading">
          <div className={styles.container}>
            <h2 id="scope-heading" className={styles.sectionTitle}>
              What this site is for
            </h2>
            <p className={styles.sectionLead}>
              Guides, examples, and reference material for using Phynexis—especially
              through its{' '}
              <strong className={styles.scopeEm}>Python interface</strong>, which is
              the main integration path we document here. The high-performance C++
              core is distributed under research licensing; see{' '}
              <Link to="/docs/about/">About</Link> for contact and acknowledgements.
            </p>
          </div>
        </section>

        <section className={styles.pillars} aria-labelledby="pillars-heading">
          <div className={styles.container}>
            <h2 id="pillars-heading" className={styles.sectionTitle}>
              Capabilities
            </h2>
            <p className={styles.sectionSubtitle}>
              DEM contacts, coupled flows, heterogeneous shapes, and parallel execution.
            </p>
            <ul className={styles.pillarGrid}>
              <li className={styles.pillarCard}>
                <h3 className={styles.pillarTitle}>Discrete elements</h3>
                <p className={styles.pillarBody}>
                  Robust contact for spheres, meshes, level sets, and learned shape
                  fields—with solvers suited to stiff and irregular assemblies.
                </p>
              </li>
              <li className={styles.pillarCard}>
                <h3 className={styles.pillarTitle}>Fluid–particle coupling</h3>
                <p className={styles.pillarBody}>
                  Multiple CFD–DEM formulations for resolved and hybrid regimes, so you
                  can move from dry granular packs to suspension-like flows.
                </p>
              </li>
              <li className={styles.pillarCard}>
                <h3 className={styles.pillarTitle}>Mechanics &amp; scale-out</h3>
                <p className={styles.pillarBody}>
                  Continuum and multiphysics hooks alongside hybrid OpenMP/MPI runs—one
                  codebase from prototyping to batch jobs on HPC.
                </p>
              </li>
              <li className={styles.pillarCard}>
                <h3 className={styles.pillarTitle}>ML where it helps</h3>
                <p className={styles.pillarBody}>
                  Optional GPU-aware workflows (e.g. PyTorch) for surrogate contacts and
                  geometric representations when classical models are too costly.
                </p>
              </li>
            </ul>
          </div>
        </section>

        <section className={styles.paths} aria-labelledby="paths-heading">
          <div className={styles.container}>
            <h2 id="paths-heading" className={styles.sectionTitle}>
              Explore the docs
            </h2>
            <div className={styles.pathFeatured}>
              <Link to="/docs/manual/" className={styles.pathTile}>
                <span className={styles.pathIconWrap} aria-hidden>
                  <svg className={styles.pathIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14,2 14,8 20,8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </span>
                <span className={styles.pathLabel}>Manual</span>
                <span className={styles.pathDesc}>Tutorials, theory notes, build tips</span>
              </Link>
              <Link to="/docs/python-api/" className={styles.pathTile}>
                <span className={styles.pathIconWrap} aria-hidden>
                  <svg className={styles.pathIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </span>
                <span className={styles.pathLabel}>Python API</span>
                <span className={styles.pathDesc}>Modules, classes, and signatures</span>
              </Link>
              <Link to="/docs/download/" className={styles.pathTile}>
                <span className={styles.pathIconWrap} aria-hidden>
                  <svg className={styles.pathIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </span>
                <span className={styles.pathLabel}>Download</span>
                <span className={styles.pathDesc}>PDFs and packaged assets</span>
              </Link>
            </div>
            <div className={styles.pathMore}>
              <Link to="/docs/examples/" className={styles.pathChip}>
                Examples
              </Link>
              <Link to="/docs/gallery/animations/" className={styles.pathChip}>
                Gallery
              </Link>
              <a
                href={doxygenHref}
                className={styles.pathChip}
                target="_blank"
                rel="noopener noreferrer">
                <span>C++ reference</span>
                <ExternalIcon />
                <span className={styles.srOnly}> (opens in new tab)</span>
              </a>
            </div>
          </div>
        </section>

        <section className={styles.outro} aria-labelledby="outro-heading">
          <div className={styles.container}>
            <div className={styles.outroCard}>
              <h2 id="outro-heading" className={styles.outroTitle}>
                APAAM Lab
              </h2>
              <p className={styles.outroText}>
                Collaboration, licensing, and acknowledgements:{' '}
                <Link to="/docs/about/">About</Link>. Or reach us directly:
              </p>
              <p className={styles.outroMail}>
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
