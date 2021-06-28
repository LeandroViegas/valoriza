import { ReactNode } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type UseAuthRedirectProps = {
  admin?: boolean;
  to: string;
  children: ReactNode;
};

function AuthRedirect({ admin, to, children }: UseAuthRedirectProps) {
  const history = useHistory();
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) return <></>;

  if (!user) {
    history.push(to);
    return <></>;
  }
  if (admin) {
    if (!user?.admin) {
      history.push(to);
      return <></>;
    }
  }

  return <> {children}</>;
}

export { AuthRedirect };
