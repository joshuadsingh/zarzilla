import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import styles from '../styles/ListItem.module.css';

type ListItemProps = {
    label: string,
    hasImage?: boolean,
    image?: string,
    parameter?: string,
    className?: string,
};

const ListItem: FunctionComponent<ListItemProps> = ({ label, hasImage, image, parameter, className }) => (
    <div className={`${styles.list__item} ${className ? className : ''}`}>
        <p className={styles.label}>
            {!image && hasImage && <Image className={styles.profile} layout='fixed' objectFit='cover' objectPosition='50% 0%' height="50px" width="50px" src={'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'} alt='Actor of show' />}
            {image && hasImage && <Image className={styles.profile} layout='fixed' objectFit='cover' objectPosition='50% 0%' height="50px" width="50px" src={image} alt='Actor of show' />}
            <span className={`${styles.label__text} ${image || hasImage ? styles.text__has__image : ''}`}>{label}</span>
        </p>
        <p className={styles.parameter}>
            {parameter ? parameter : 'N/A'}
        </p>
    </div>
);

export default ListItem;