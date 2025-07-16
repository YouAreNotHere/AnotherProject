const getComments = async (pageParam: number, postId: string) => {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments?_limit=5&_page=${pageParam}`);
    if (!res.ok) throw new Error("Ошибка при загрузке комментариев");
    const data = await res.json();
    return ({data, nextCursor: data.length ? pageParam+1 : undefined})
}

export default getComments;