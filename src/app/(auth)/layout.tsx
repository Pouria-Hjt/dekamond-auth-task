import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren;

const AuthLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default AuthLayout;
