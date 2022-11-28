import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
    const { posts, isLoading } = useSelector((state) => state.posts);
    const classes = useStyles();
    const [fetchedPosts, setFetchedPosts] = useState(posts);
    const location = useLocation();

    useEffect(() => {

    }, [location])

    if (!posts?.length && !isLoading) return 'No Posts';

    return (
        isLoading ? <CircularProgress /> : (
            <>
                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                    {
                        posts.map((post) => (
                            <Grid key={post._id} item xs={12} sm={12} md={8} lg={4}>
                                <Post post={post} setCurrentId={setCurrentId} />
                            </Grid>
                        ))
                    }
                </Grid>
            </>
        )
    );
}

export default Posts;