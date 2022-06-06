import type { NextPage, GetStaticProps, NextPageContext, GetServerSideProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Banner from '../../components/banner'
import { rgbDataURL, truncateByWords } from '../../utils/helpers'
import { Constants } from '../../utils/constants'
import styles from '../../styles/Home.module.css'
interface ShowsProps {
    shows: Array<object>;
    pageNumber: number;
    errors?: string;
}

const Shows: NextPage<ShowsProps> = ({ shows, pageNumber, errors }) => {
    return (
        <div className={styles.page}>
            <Banner bgImage={Constants.BACKGROUND_IMAGE_HOME}>
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
                        !errors ?
                            <>
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
                                                            <Image placeholder="blur" blurDataURL={rgbDataURL(231, 76, 60)} layout='fill' objectFit='cover' src={show.image?.medium || Constants.FALLBACK_IMAGE} alt={`Summary for ${show.name}`} />
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
                            </>
                            :
                            <h4>{errors}</h4>
                    }
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query: { page } }: any) => {
    try {
        const pageNumber = Number(page || 1);
        const req = await fetch(`${Constants.BASE_URL}/shows?page=${pageNumber}`);
        const shows = await req.json();

        return {
            props: {
                shows,
                pageNumber,
            },
        }
    } catch (err: any) {
        return { props: { errors: err.message } }
    }
}

export default Shows
