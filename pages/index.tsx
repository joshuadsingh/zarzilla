import type { NextPage, GetStaticProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Banner from '../components/banner'
import { truncateByWords, rgbDataURL } from '../utils/helpers'
import styles from '../styles/Home.module.css'
import { Constants } from '../utils/constants'

interface HomeProps {
  shows: Array<object>;
  errors?: string;
}

const Home: NextPage<HomeProps> = ({ shows, errors }) => {
  return (
    <div className={styles.page}>
      <Banner bgImage={Constants.BACKGROUND_IMAGE_HOME}>
        <h1 className={styles.banner__title}>SHOWZILLA</h1>
        <h3 className={styles.banner__subtitle}>TV <span className='accent_underline'>Show</span> and <span className='accent_underline'>web</span> series database.</h3>
        <h3 className={styles.banner__subtitle}>Create <span className={styles.accent_underline}>Personalised</span> schedules.</h3>
      </Banner>
      <div className={styles.shows_container}>
        <div className="container">
          <div className="page-info">
            <h2>SCHEDULE</h2>
            <Link href='/shows'>All Shows →</Link>
          </div>
          {
            !errors ?
              <div className={`grid ${styles.shows}`}>
                {shows && shows.map(({ show }: any, index: number) => {
                  return (
                    <div key={index} className={styles.show}>
                      <Link href={`/shows/${show.id}`}>
                        <div className={styles.show__image_container}>
                          <Image placeholder="blur" blurDataURL={rgbDataURL(231, 76, 60)} layout='fill' objectFit='cover' src={show.image?.medium || Constants.FALLBACK_IMAGE} alt={`Summary for ${show.name}`} />
                        </div>
                      </Link>
                      <Link href={`/shows/${show.id}`}>
                        <h2 className={`${styles.show__title} accent_underline}`}>{show.name}</h2>
                      </Link>
                      <p className={styles.show__summary}>{truncateByWords(show.summary || 'No summary available.', 40)}</p>
                    </div>
                  )
                })}
              </div>
              : <h4>{errors}</h4>
          }
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const req = await fetch(`${Constants.BASE_URL}/schedule`);
    const shows = await req.json();

    return {
      props: {
        shows
      },
    }
  } catch (err: any) {
    return { props: { errors: err.message } }
  }
}

export default Home
