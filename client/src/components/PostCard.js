import React from 'react';
import { Card, Icon, Label, Button } from 'semantic-ui-react';
import moment from 'moment'

function PostCard({post:{body, id, createdAt, username, likes, commentCount, likeCount}}){
    function likePost(){

    }
    function commentOnPost(){
    
    }
    return (
        <Card>
          <Card.Content>
            <Card.Header>{username}</Card.Header>
            <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
            <Card.Description>
            {body}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
          <Button as='div' labelPosition='right' onClick={likePost}>
            <Button color='teal' basic>
                <Icon name='heart' />
            </Button>
            <Label basic color='teal' pointing='left'>
                {likeCount}
            </Label>
            </Button>

            <Button as='div' labelPosition='right' onClick={commentOnPost}>
            <Button color='blue' basic>
                <Icon name='comment' />
            </Button>
            <Label basic color='blue' pointing='left'>
                {commentCount}
            </Label>
            </Button>

          </Card.Content>
        </Card>
    )
}

export default PostCard;