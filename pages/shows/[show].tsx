import { useRouter } from 'next/router'
import type { GetStaticPaths, NextPage } from 'next'
import Link from 'next/link'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import styles from '../../styles/Show.module.css'
import Banner from '../../components/banner'
import ListItem from '../../components/list-item'
import Image from 'next/image'

export const Show: NextPage = ({ show }: any) => {
  const [isLargeSummary, setIsLargeSummary] = useState(false);

  const showRating = show.rating.average && Math.floor(show.rating.average / 2);
  const actorList = show._embedded.cast.slice(0, 5);

  const summary = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    console.log(summary.current.clientHeight);
    if(summary.current.clientHeight > 400){
      setIsLargeSummary(true);
    }
  }, []);

  return (
    <>
      <Banner className={isLargeSummary ? styles.banner__custom__large : styles.banner__custom} bgImage='https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80'>
        <Link href="/">
          <a className={styles.back__button}>← Back to shows</a>
        </Link>
        <div className={styles.heading}>
          <div className={styles.heading__image_container}>
            <Image layout='fill' objectFit='cover' src={show.image.medium} alt={`Summary for ${show.name}`} />
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
            <h1 className={`accent_underline ${styles.heading__title}`}>{show.name}</h1>
            <div ref={summary} className={styles.heading__summary} dangerouslySetInnerHTML={{ __html: show.summary }} />
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

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async (test) => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  }
}

export async function getStaticProps({ params }: any) {
  const req = await fetch(`https://api.tvmaze.com/shows/${params.show}?embed=cast`);
  const show = await req.json();

  return {
    props: {
      show
    },
  }
}

export default Show