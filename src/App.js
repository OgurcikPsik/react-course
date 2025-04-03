import React, {useEffect, useMemo, useState} from 'react';
import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import {usePost} from "./hooks/usePost";
import PostService from "./API/PostService";
import MyButton from "./components/UI/button/MyButton";
import MyModal from "./components/UI/MyModal/MyModal";
import Loader from "./components/UI/loader/Loader";
import {useFetching} from "./hooks/useFetching";
import {getPageCount} from "./utils/pages";
import {usePaginaion} from "./hooks/usePagintaion";
function App() {
    const [posts, setPosts] = React.useState([
        {id: 1, title: 'а', body: 'ц'},
        {id: 2, title: 'у', body: 'б'},
        {id: 3, title: 'в', body: 'м'},
    ]);
    const [filter, setFilter] = React.useState({sort: '', query: ''});
    const [visible, setVisible] = React.useState(false);
    const [totalPages, setTotalPages] = React.useState(0);
    const [limit, setLimit] = React.useState(10);
    const [page, setPage] = React.useState(1);
    const [fetchPosts, isLoadingPosts, errorPosts] = useFetching(async () => {
        const response = await PostService.fetchPosts(limit, page);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
        setPosts(response.data)
    });
    const pageArray = usePaginaion(totalPages);
    const removePost = (post) => {
        setPosts(posts.filter((p) => p.id !== post.id));
    };
    const addNewPost = (newPost) => {
        setPosts([...posts, newPost]);
        setVisible(false);
    }
    const sortedAndSearchedPosts = usePost(posts, filter.sort, filter.query);
    useEffect(() => {
        fetchPosts();
    }, [])
    return (
        <div className="App">
            <MyButton style={{marginTop: '30px'}} onClick={() => setVisible(true)}>Создать пост</MyButton>
            <MyModal visible={visible} setVisible={setVisible}>
                <PostForm create={addNewPost} />
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter} />
            {errorPosts &&
                <h1 style={{textAlign:'center', color:'red'}}>Произошла ошибка</h1>
            }
            {isLoadingPosts
                ? <div style={{display:'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
                : <PostList
                    title='JS'
                    posts={sortedAndSearchedPosts}
                    remove={removePost}
                />
            }
            {pageArray.map(p =>
                <MyButton>{p}</MyButton>
            )}
        </div>
    );
}

export default App;

