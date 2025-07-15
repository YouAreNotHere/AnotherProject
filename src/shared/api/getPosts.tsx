import type {Post} from "../types/IPost.ts";

const getPosts = async (pageParam: number, text: string) => {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?title_like=${text}&_limit=12&_page=${pageParam}`
    )
    if (!res.ok) {
        throw new Error('Ошибка загрузки постов');
    }
    const data: Post[] = await res.json();
    return {data, nextCursor: data.length ? pageParam + 1 : undefined}
};

export default getPosts;