import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks'
import {Grid} from 'semantic-ui-react'
import PostCard from '../components/PostCard';

function Home() {

    const { data:{getPosts: posts}, loading } = useQuery(FETCH_POSTS_QUERY);

    return (
        <Grid columns={3} className="page-title">
            <Grid.Row>
              {loading ? (
                  <h1>Loading posts...</h1>
              ) : (
                posts && posts.map((post) =>
                   <Grid.Column key="{post.id}">
                       <PostCard post={post}/>
                    </Grid.Column> 
                )
                )}
            </Grid.Row>
      </Grid>
    )
}

const FETCH_POSTS_QUERY = gql`{
    getPosts{
        id body createdAt username likeCount commentCount 
        likes{
            username
        }
        comments{
            id body username createdAt
        }
    }    
}`

export default Home;