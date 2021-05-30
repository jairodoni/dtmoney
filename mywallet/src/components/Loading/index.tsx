import { LoadingAnimation } from "./styles"

export function Loading() {
  return (
    <LoadingAnimation>
      <div className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </LoadingAnimation>
  )
}