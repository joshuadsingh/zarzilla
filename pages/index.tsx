import type { NextPage, GetStaticProps } from 'next'
import Link from 'next/link'
import { imageOptimizer } from 'next/dist/server/image-optimizer'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { formatSlug, isServer, truncateByWords } from '../utils/helpers'
import Banner from '../components/banner'

const Home: NextPage = ({shows}: any) => {
  const fallbackImage = 'https://images.unsplash.com/photo-1560109947-543149eceb16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';
  return (
    <div className={styles.page}>
      <Banner bgImage='https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2970&q=80'>
        <h1 className={styles.banner__title}>SHOWZILLA</h1>
        <h3 className={styles.banner__subtitle}>TV <span className='accent_underline'>Show</span> and <span className='accent_underline'>web</span> series database.</h3>
        <h3 className={styles.banner__subtitle}>Create <span className={styles.accent_underline}>Personalised</span> schedules.</h3>
      </Banner>
      <div className={styles.shows_container}>
        <div className={`container grid ${styles.shows}`}>
          {shows && shows.map(({show}: any, index: number) => {
            console.log(show)
            return (
              <div key={index} className={styles.show}>
                <Link href={`shows/${show.id}`}>
                  <div className={styles.show__image_container}>
                    <Image layout='fill' objectFit='cover' src={show.image?.medium || fallbackImage} alt={`Summary for ${show.name}`} />
                  </div>
                </Link>
                <Link href={`shows/${show.id}`}>
                  <h2 className={`${styles.show__title} accent_underline}`}>{show.name}</h2>
                </Link>
                <p className={styles.show__summary}>{truncateByWords(show.summary || 'No summary available.', 40)}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const req = await fetch(`https://api.tvmaze.com/schedule`);
  const shows = await req.json();

  return {
    props: {
      shows
    },
  }
}

export default Home
