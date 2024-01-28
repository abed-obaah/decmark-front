// src/context/VerificationContext.js

import React, { createContext, useState, useContext } from 'react';

const VerificationContext = createContext();

export const useVerification = () => useContext(VerificationContext);

export const VerificationProvider = ({ children }) => {
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isDocumentUploaded, setIsDocumentUploaded] = useState(false);

  return (
    <VerificationContext.Provider value={{ isOtpVerified, setIsOtpVerified, isDocumentUploaded, setIsDocumentUploaded }}>
      {children}
    </VerificationContext.Provider>
  );
};
