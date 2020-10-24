import React, { useState } from 'react';
import Link from 'next/link';

import { useQuery } from 'react-query';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getUserComments, postComment } from '../../actions/auth';

const Comments = ({ userData, me, loggedInUserId }) => {
  const [form, setForm] = useState('');
  const { data: userComments, isSuccess } = useQuery(
    ['userComments', userData.data[0].id],
    getUserComments,
    {
      enabled: userData,
    }
  );

  return (
    <div className='comments-root'>
      <div className='comments-container'>
        {isSuccess &&
          userComments.data.map((comment) => (
            <div className='comment-container'>
              <Link href={`/users/${comment.sender_id}`} passHref>
                <a href={`/users/${comment.sender_id}`}>{comment.name}</a>
              </Link>{' '}
              commented: {comment.comment}
            </div>
          ))}
      </div>
      {!me && (
        <div className='comment-form'>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              postComment(loggedInUserId, userData.data[0].id, form);
              setForm('');
            }}>
            <Form.Group>
              <Form.Label>Comment</Form.Label>
              <Form.Control
                type='text'
                placeholder='comment'
                value={form}
                onChange={(e) => setForm(e.target.value)}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Comment
            </Button>
          </Form>
        </div>
      )}

      <style jsx>{`
        .comments-root {
          padding: 2% 0;
        }

        .comment-container {
          padding: 12px;
          border: 1px solid gray;
          border-radius: 8px;
          margin-bottom: 12px;
        }

        .comment-form {
          margin-top: 5%;
        }
      `}</style>
    </div>
  );
};

export default Comments;
