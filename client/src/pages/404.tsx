import { Container } from '../styles/error';

export default function Error404() {
  return (
    <Container>
      <div className="size">
        <img src="/404.png" alt="404" />
        <iframe
          className="game"
          src="https://editor.p5js.org/JairoDoni/embed/ylvn1UPfS"
        />
      </div>
    </Container>
  );
}
