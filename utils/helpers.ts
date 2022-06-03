export const formatSlug = (title: string) => title
.replace(/([a-z])([A-Z])/g, "$1-$2")
.replace(/[\s_]+/g, '-')
.toLowerCase();

export const isServer: boolean = typeof window === 'undefined';

export const truncateByWords = (text: string, wordCount: number) => {
    console.log(text)
    const removeHTML = text.replace(/<[^>]*>/g, '');
    const splitByWord = removeHTML.split(' ');

    if(splitByWord.length < wordCount) {
        return removeHTML;
    }

    return `${splitByWord.splice(0, wordCount).join(' ')}...`;
};