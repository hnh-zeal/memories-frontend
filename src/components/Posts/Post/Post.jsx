import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [likes, setLikes] = useState(post?.likes);

    const userId = user?.data?.sub || user?.data?._id;
    const hasLikedPost = likes.find((like) => like === userId);

    const handleLike = async () => {
        dispatch(likePost(post._id));

        if (hasLikedPost) {
            setLikes(likes.filter((id) => id !== userId));
        } else {
            setLikes([...likes, userId]);
        }
    }

    const Likes = () => {
        if (likes?.length > 0) {
            return hasLikedPost ?
                (
                    <>
                        <ThumbUpAltIcon fontSize="small" />
                        &nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
                    </>
                ) : (
                    <>
                        <ThumbUpOffAltIcon fontSize="small" />
                        &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
                    </>
                )
        } else {
            return (
                <>
                    <ThumbUpOffAltIcon fontSize="small" />
                    &nbsp; Like
                </>
            )
        }
    }

    const PostMessage = () => {
        if (post?.message.length > 200) {
            return (
                <>
                    {post.message.substr(0, 200)}... 
                    <ButtonBase onClick={openPost} variant="body2"><strong>See More</strong></ButtonBase>
                </>
            )
        } else {
            return (
                <>
                    {post.message}
                </>
            )
        }
    }

    const openPost = () => {
        navigate(`/posts/${post._id}`);
    };

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase className={classes.cardAction} onClick={openPost}>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>
            </ButtonBase>
            {(user?.data?.sub === post?.creator || user?.data?._id === post.creator) && (
                <div className={classes.overlay2}>
                    <Button
                        style={{ color: 'white' }}
                        size="small"
                        onClick={() => setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                </div>
            )}
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    <PostMessage />
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.data} onClick={handleLike}>
                    <Likes />
                </Button>
                {(user?.data?.sub === post?.creator || user?.data?._id === post.creator) && (
                    <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))} >
                        <DeleteIcon fontSize="small" />
                        &nbsp;Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );
}

export default Post;