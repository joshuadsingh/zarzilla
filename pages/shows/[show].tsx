import { MutableRefObject, useEffect, useRef, useState } from 'react'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Banner from '../../components/banner'
import ListItem from '../../components/list-item'
import { Constants } from '../../utils/constants';
import styles from '../../styles/Show.module.css'

interface ShowProps {
  show: any;
  errors?: string;
}

export const Show: NextPage<ShowProps> = ({ show, errors }) => {
  const [isLargeSummary, setIsLargeSummary] = useState(false);
  const summary = useRef() as MutableRefObject<HTMLDivElement>;

  const router = useRouter();

  useEffect(() => {
    if (summary.current?.clientHeight > summaryMaxHeight) {
      setIsLargeSummary(true);
    }
  }, []);

  if (errors) {
    return (
      <>
        <Link href='/'>← Back to homepage</Link>
        <h4>{errors}</h4>
      </>
    )
  }

  const summaryMaxHeight = 256;

  const showRating = show.rating.average && Math.floor(show.rating.average / 2);
  const actorList = show._embedded.cast.slice(0, 5);

  return (
    <>
      <Banner className={isLargeSummary ? styles.banner__custom__large : styles.banner__custom} bgImage={Constants.BACKGROUND_IMAGE_SHOW}>
        <span onClick={() => router.back()} className={styles.back__button}>← Back</span>
        <div className={styles.heading}>
          <div className={styles.heading__image_container}>
            <Image priority layout='fill' objectFit='cover' src={show.image?.medium || Constants.FALLBACK_IMAGE} alt={`Summary for ${show.name}`} />
          </div>
          <div className={styles.heading__show}>
            {
              show.rating.average ?
                <>
                  <span className={styles.star}>
                    {'★'.repeat(showRating)}
                    {'☆'.repeat(5 - showRating)}
                  </span>
                  <span>{show.rating.average / 2} / 5</span>
                </>
                :
                <span >Show has not yet been rated.</span>
            }
            <h1 className={`${styles.heading__title}`}>{show.name}</h1>
            <div ref={summary} className={styles.heading__summary} dangerouslySetInnerHTML={{ __html: show.summary || `No summary available.` }} />
          </div>

        </div>
      </Banner>
      <div className={styles.details}>
        <div className="container">
          <div className={styles.details__inner}>
            <div className={styles.show__info}>
              <h2>Show Info</h2>

              <ListItem label='Streamed on' parameter={show.network?.name} />

              <ListItem label='Schedule' parameter={show.schedule?.days.join(' ')} />

              <ListItem label='Status' parameter={show.status} />

              <ListItem label='Genres' parameter={show.genres.join(' ')} />

            </div>
            <div className={styles.starring}>
              <h2>Starring</h2>
              {
                actorList.length > 0 ?
                  actorList.map((actor: any, index: number) => {
                    return <ListItem key={index} hasImage image={actor.person.image?.medium} label={actor.person?.name} parameter={actor.character.name} />
                  })
                  :
                  <p>Cast information not available.</p>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const req = await fetch(`${Constants.BASE_URL}/shows/${params?.show}?embed=cast`);
    const show = await req.json();

    return {
      props: {
        show
      },
    }
  } catch (err: any) {
    return { props: { errors: err.message } }
  }
}

export default Show