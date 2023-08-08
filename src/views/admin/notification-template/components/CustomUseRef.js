// import React, { createContext, useContext, useRef } from 'react';

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const nameRef = useRef(null);
//   const typeRef = useRef(null);
//   const templateRef = useRef(null);

//   return (
//     <AppContext.Provider value={{ nameRef, typeRef, templateRef }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

import { createContext, useRef, useContext } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const nameRef = useRef(null);
  const typeRef = useRef(null);
  const templateRef = useRef(null);

  return (
    <AppContext.Provider value={{ nameRef, typeRef, templateRef }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
