import type { NextPage, GetStaticProps, NextPageContext } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { rgbDataURL, truncateByWords } from '../../utils/helpers'
import Banner from '../../components/banner'

interface Props {
    shows: Array<object>;
    pageNumber: number;
}

const Shows: NextPage<Props> = ({ shows, pageNumber }) => {
    const fallbackImage = 'https://images.unsplash.com/photo-1560109947-543149eceb16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';
    return (
        <div className={styles.page}>
            <Banner bgImage='https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2970&q=80'>
                <h1 className={styles.banner__title}>SHOWZILLA</h1>
                <h2 className={styles.banner__subtitle}>All our <span className='accent_underline'>shows</span> you can check out on our <span className='accent_underline'>database</span>!</h2>
            </Banner>
            <div className={styles.shows_container}>
                <div className="container">
                    <div className="page-info">
                        <h2>SHOWS</h2>
                        <Link href='/'>See Schedule →</Link>
                    </div>
                    {
                        pageNumber > 1 &&
                        <Link href={`/shows?page=${pageNumber - 1}`}>
                            <div className="page-btn btn-previous">
                                <span>←</span>
                            </div>
                        </Link>
                    }
                    {
                        shows.length > 0 &&
                        <Link href={`/shows?page=${pageNumber + 1}`}>
                            <div className="page-btn btn-next">
                                <span>→</span>
                            </div>
                        </Link>
                    }
                    <div className={`grid ${styles.shows}`}>
                        {shows.length ?
                            shows.map((show: any, index: number) => {
                                return (
                                    <div key={index} className={styles.show}>
                                        <Link href={`/shows/${show.id}`}>
                                            <div className={styles.show__image_container}>
                                                <Image placeholder="blur" blurDataURL={rgbDataURL(231, 76, 60)} layout='fill' objectFit='cover' src={show.image?.medium || fallbackImage} alt={`Summary for ${show.name}`} />
                                            </div>
                                        </Link>
                                        <Link href={`/shows/${show.id}`}>
                                            <h2 className={`${styles.show__title} accent_underline}`}>{show.name}</h2>
                                        </Link>
                                        <p className={styles.show__summary}>{truncateByWords(show.summary || 'No summary available.', 40)}</p>
                                    </div>
                                )
                            })
                            :
                            <h4>Those are all our Shows...</h4>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps({ query: { page } }: any) {
    const pageNumber = Number(page || 1);
    const req = await fetch(`https://api.tvmaze.com/shows?page=${pageNumber}`);
    const shows = await req.json();

    return {
        props: {
            shows,
            pageNumber,
        },
    }
}

export default Shows
