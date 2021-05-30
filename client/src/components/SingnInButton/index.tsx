import { signIn, signOut, useSession } from "next-auth/client";
import { Loading } from "../Loading";
import { SingnIn, SingnOut } from './styles';

export function SingnInButton() {
  const [session, loading] = useSession();

  return !session ? (
    <SingnIn type="button" onClick={(): Promise<void> => signIn("google")}>
      {!loading
        ? "Login"
        : <Loading />
      }
    </SingnIn>
  ) : (
    <SingnOut type="button" onClick={(): Promise<void> => signOut()} >
      Logout
    </SingnOut>
  )
}