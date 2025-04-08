import React from 'react';
import {useParams} from "react-router-dom";

const PostIdPage = () => {
    const params = useParams();
    console.log(params);
    return (
        <div>
            <h1>Вы на странице поста</h1>
        </div>
    );
};

export default PostIdPage;