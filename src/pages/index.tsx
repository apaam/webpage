import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';

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
    <Layout
      title={translate({id: 'homepage.hero.eyebrow', message: 'Phynexis'})}
      description={translate({id: 'homepage.description', message: siteConfig.tagline})}>
      <main className={styles.main}>
        <header className={styles.hero}>
          <div className={styles.heroBg} aria-hidden />
          <div className={styles.container}>
            <div className={styles.heroInner}>
              <p className={styles.heroEyebrow}>
                <Translate id="homepage.hero.eyebrow">Phynexis</Translate>
              </p>
              <h1 className={styles.heroTitle}>
                <Translate id="homepage.hero.title">
                  Particle simulation for granular media and fluid–solid systems
                </Translate>
              </h1>
              <p className={styles.heroLead}>
                <Translate id="homepage.hero.lead">
                  A unified engine for discrete elements, CFD–DEM coupling, and
                  solid mechanics—scaled from laptops to clusters, with a Python
                  surface for everyday workflows.
                </Translate>
              </p>
              <div className={styles.heroActions}>
                <Link className={styles.btnPrimary} to="/docs/manual/installation/">
                  <Translate id="homepage.hero.install">Install</Translate>
                </Link>
                <Link className={styles.btnGhost} to="/docs/manual/">
                  <Translate id="homepage.hero.manual">Manual</Translate>
                </Link>
              </div>
              <p className={styles.heroHint}>
                <Link className={styles.heroHintLink} to="/docs/python-api/">
                  <Translate id="homepage.hero.pythonApi">Python API</Translate>
                </Link>
                <span className={styles.heroHintSep} aria-hidden>
                  ·
                </span>
                <Link className={styles.heroHintLink} to="/docs/about/">
                  <Translate id="homepage.hero.about">About</Translate>
                </Link>
              </p>
            </div>
          </div>
        </header>

        <section className={styles.scope} aria-labelledby="scope-heading">
          <div className={styles.container}>
            <h2 id="scope-heading" className={styles.sectionTitle}>
              <Translate id="homepage.scope.heading">What this site is for</Translate>
            </h2>
            <p className={styles.sectionLead}>
              <Translate
                id="homepage.scope.text"
                values={{
                  pythonInterface: <strong className={styles.scopeEm}>Python interface</strong>,
                  aboutLink: <Link to="/docs/about/"><Translate id="homepage.hero.about">About</Translate></Link>,
                }}>
                {
                  'Guides, examples, and reference material for using Phynexis—especially through its {pythonInterface}, which is the main integration path we document here. The high-performance C++ core is distributed under research licensing; see {aboutLink} for contact and acknowledgements.'
                }
              </Translate>
            </p>
          </div>
        </section>

        <section className={styles.pillars} aria-labelledby="pillars-heading">
          <div className={styles.container}>
            <h2 id="pillars-heading" className={styles.sectionTitle}>
              <Translate id="homepage.pillars.heading">Capabilities</Translate>
            </h2>
            <p className={styles.sectionSubtitle}>
              <Translate id="homepage.pillars.subtitle">
                DEM contacts, coupled flows, heterogeneous shapes, and parallel execution.
              </Translate>
            </p>
            <ul className={styles.pillarGrid}>
              <li className={styles.pillarCard}>
                <h3 className={styles.pillarTitle}>
                  <Translate id="homepage.pillars.card1.title">Discrete elements</Translate>
                </h3>
                <p className={styles.pillarBody}>
                  <Translate id="homepage.pillars.card1.desc">
                    Robust contact for spheres, meshes, level sets, and learned shape
                    fields—with solvers suited to stiff and irregular assemblies.
                  </Translate>
                </p>
              </li>
              <li className={styles.pillarCard}>
                <h3 className={styles.pillarTitle}>
                  <Translate id="homepage.pillars.card2.title">Fluid–particle coupling</Translate>
                </h3>
                <p className={styles.pillarBody}>
                  <Translate id="homepage.pillars.card2.desc">
                    Multiple CFD–DEM formulations for resolved and hybrid regimes, so you
                    can move from dry granular packs to suspension-like flows.
                  </Translate>
                </p>
              </li>
              <li className={styles.pillarCard}>
                <h3 className={styles.pillarTitle}>
                  <Translate id="homepage.pillars.card3.title">Mechanics &amp; scale-out</Translate>
                </h3>
                <p className={styles.pillarBody}>
                  <Translate id="homepage.pillars.card3.desc">
                    Continuum and multiphysics hooks alongside hybrid OpenMP/MPI runs—one
                    codebase from prototyping to batch jobs on HPC.
                  </Translate>
                </p>
              </li>
              <li className={styles.pillarCard}>
                <h3 className={styles.pillarTitle}>
                  <Translate id="homepage.pillars.card4.title">ML where it helps</Translate>
                </h3>
                <p className={styles.pillarBody}>
                  <Translate id="homepage.pillars.card4.desc">
                    Optional GPU-aware workflows (e.g. PyTorch) for surrogate contacts and
                    geometric representations when classical models are too costly.
                  </Translate>
                </p>
              </li>
            </ul>
          </div>
        </section>

        <section className={styles.paths} aria-labelledby="paths-heading">
          <div className={styles.container}>
            <h2 id="paths-heading" className={styles.sectionTitle}>
              <Translate id="homepage.paths.heading">Explore the docs</Translate>
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
                <span className={styles.pathLabel}>
                  <Translate id="homepage.paths.manual.label">Manual</Translate>
                </span>
                <span className={styles.pathDesc}>
                  <Translate id="homepage.paths.manual.desc">Tutorials, theory notes, build tips</Translate>
                </span>
              </Link>
              <Link to="/docs/python-api/" className={styles.pathTile}>
                <span className={styles.pathIconWrap} aria-hidden>
                  <svg className={styles.pathIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </span>
                <span className={styles.pathLabel}>
                  <Translate id="homepage.paths.pythonApi.label">Python API</Translate>
                </span>
                <span className={styles.pathDesc}>
                  <Translate id="homepage.paths.pythonApi.desc">Modules, classes, and signatures</Translate>
                </span>
              </Link>
              <Link to="/docs/download/" className={styles.pathTile}>
                <span className={styles.pathIconWrap} aria-hidden>
                  <svg className={styles.pathIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </span>
                <span className={styles.pathLabel}>
                  <Translate id="homepage.paths.download.label">Download</Translate>
                </span>
                <span className={styles.pathDesc}>
                  <Translate id="homepage.paths.download.desc">PDFs and packaged assets</Translate>
                </span>
              </Link>
            </div>
            <div className={styles.pathMore}>
              <Link to="/docs/examples/" className={styles.pathChip}>
                <Translate id="homepage.paths.examples">Examples</Translate>
              </Link>
              <Link to="/docs/gallery/animations/" className={styles.pathChip}>
                <Translate id="homepage.paths.gallery">Gallery</Translate>
              </Link>
              <a
                href={doxygenHref}
                className={styles.pathChip}
                target="_blank"
                rel="noopener noreferrer">
                <Translate id="homepage.paths.cppReference">C++ reference</Translate>
                <ExternalIcon />
                <span className={styles.srOnly}>
                  <Translate id="homepage.paths.opensInNewTab"> (opens in new tab)</Translate>
                </span>
              </a>
            </div>
          </div>
        </section>

        <section className={styles.outro} aria-labelledby="outro-heading">
          <div className={styles.container}>
            <div className={styles.outroCard}>
              <h2 id="outro-heading" className={styles.outroTitle}>
                <Translate id="homepage.outro.title">APAAM Lab</Translate>
              </h2>
              <p className={styles.outroText}>
                <Translate
                  id="homepage.outro.text"
                  values={{
                    aboutLink: <Link to="/docs/about/"><Translate id="homepage.hero.about">About</Translate></Link>,
                  }}>
                  {'Collaboration, licensing, and acknowledgements: {aboutLink}. Or reach us directly:'}
                </Translate>
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
