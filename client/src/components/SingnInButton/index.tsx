import { signIn, signOut, useSession } from "next-auth/client";
import { CircularProgress } from "@material-ui/core";
import { FcGoogle } from 'react-icons/fc'
import { GoSignOut } from 'react-icons/go';
import { SingnIn, SingnOut } from './styles';

export function SingnInButton() {
  const [session, loading] = useSession();

  return !session ? (
    <SingnIn type="button" onClick={(): Promise<void> => signIn("google")}>
      {!loading ? (
        <>
          <FcGoogle size={19} />
          <span>Login</span>
        </>
      )
        : <CircularProgress color="secondary" style={{ padding: "8px" }} />
      }
    </SingnIn>
  ) : (
    <SingnOut type="button" onClick={(): Promise<void> => signOut()} >
      {!loading ? (
        <>
          <GoSignOut size={18} style={{ marginRight: '5px', marginTop: "3px" }} />
          <span>Logout</span>
        </>
      )
        : <CircularProgress color="secondary" style={{ padding: "8px" }} />
      }
    </SingnOut>
  )
}