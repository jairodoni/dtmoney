import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { HeaderLogin } from "../components/HeaderLogin";
import { Container } from '../styles/login';


export default function Login() {
  return (
    <>
      <head>
        <title>Login | My Wallet</title>
      </head>
      <div>

        <HeaderLogin />
        <Container >
          <div>
            <div>
              <h2>O que é o dt money?</h2>
              <p>
                Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro.
                De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.
                Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium.
                Qui animated corpse, cricket bat max brucks terribilem incessu zomby.
                The voodoo sacerdos flesh eater, suscitat mortuos comedere carnem virus.
                Zonbi tattered for solum oculi eorum defunctis go lum cerebro. Nescio brains an Undead zombies.
                Sicut malus putrid voodoo horror. Nigh tofth eliv ingdead.
            </p>
            </div>
          </div>
          <section>
            <div>
              <iframe
                width="720"
                height="415"
                src="https://www.youtube.com/embed/FFaNjggFbo8"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
            </div>
          </section>
        </Container>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: `/home`,
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}