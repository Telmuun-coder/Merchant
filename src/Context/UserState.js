import React, {useState} from 'react';

export const UserState = React.createContext();

const UserStore = (props) => {
  const [who, setWho] = useState(null);
  const voter = (a) => {
    console.log('==============> ' + a);
    setWho(a);
  };
  return (
    <UserState.Provider value={{who, voter}}>
      {props.children}
    </UserState.Provider>
  );
};

export default UserStore;
