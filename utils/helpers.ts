export const formatSlug = (title: string) => title
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

export const isServer: boolean = typeof window === 'undefined';

export const truncateByWords = (text: string, wordCount: number) => {
    const removeHTML = text.replace(/<[^>]*>/g, '');
    const splitByWord = removeHTML.split(' ');

    if (splitByWord.length < wordCount) {
        return removeHTML;
    }

    return `${splitByWord.splice(0, wordCount).join(' ')}...`;
};

// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
// Generate Next custom color image on image load

const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

const triplet = (e1: number, e2: number, e3: number) =>
    keyStr.charAt(e1 >> 2) +
    keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
    keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
    keyStr.charAt(e3 & 63);

export const rgbDataURL = (r: number, g: number, b: number) =>
    `data:image/gif;base64,R0lGODlhAQABAPAA${triplet(0, r, g) + triplet(b, 255, 255)
    }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;