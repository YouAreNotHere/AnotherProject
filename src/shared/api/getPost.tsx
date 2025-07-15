const getPost = async (id:string | undefined) => {
    if (!id) throw new Error("Пост с таким id не найден");
    const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!data.ok) throw new Error("Ошибка загрузки поста")
    return data.json();
}
export default getPost;