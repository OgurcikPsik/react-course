import {useMemo} from "react";

export const useSort = (posts, sort) => {
    const sortedPosts = useMemo(() => {
        if (sort) {
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
        }
        else {
            return posts;
        }
    }, [posts, sort]);
    return sortedPosts;
};

export const usePost = (posts, sort, query) => {
    const sortedPosts = useSort(posts, sort)
    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()));
    }, [query, sortedPosts]);
    return sortedAndSearchedPosts;
}