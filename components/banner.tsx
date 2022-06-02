import React, { FunctionComponent, ReactNode } from 'react';
import Image from 'next/image';
import styles from '../styles/Banner.module.css';
import Link from 'next/link'

type Props = {
    bgImage: string,
    children: ReactNode,
    className?: string,
};

const Banner: FunctionComponent<Props> = ({ bgImage, children, className }) => (
    <div className={styles.banner}>
        <Image priority className={styles.banner_bgImage} layout='fill' objectPosition='50% 75%' objectFit='cover' src={bgImage} alt='hero bg' />
        <div className={`container ${styles.banner_inner} ${className ? className : ''}`}>
            {children}
        </div>
    </div>
);

export default Banner;