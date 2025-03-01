import React from "react";

interface SDKStyleProviderProps {
  children: React.ReactNode;
}

const SDKStyleProvider: React.FC<SDKStyleProviderProps> = ({ children }) => {
  return <div className="payszn-sdk-root">{children}</div>;
};

export default SDKStyleProvider;
