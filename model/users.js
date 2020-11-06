import {useEffect, useState} from 'react';
import Airtable from 'airtable';
import Users from '../components/Users';

const base = new Airtable({apiKey: 'keyTkRzZch5L5fRBj'}).base(
  'appzbWSyUGrDmyr4A',
);

function User() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    base('Colaboradores')
      .select({
        view: 'Users',
      })
      .eachPage((records, fetchNextPage) => {
        console.log(records);
        setUsers(records);
        fetchNextPage();
      });
  });

  // eslint-disable-next-line react/react-in-jsx-scope
  return users;
}

export default User;

// export default (Users = [
//   {
//     id: 1,
//     email: 'user1@email.com',
//     username: 'user1',
//     password: 'password',
//     userToken: 'token123',
//   },
//   {
//     id: 2,
//     email: 'user2@email.com',
//     username: 'user2',
//     password: 'pass1234',
//     userToken: 'token12345',
//   },
//   {
//     id: 3,
//     email: 'testuser@email.com',
//     username: 'testuser',
//     password: 'testpass',
//     userToken: 'testtoken',
//   },
// ]);
