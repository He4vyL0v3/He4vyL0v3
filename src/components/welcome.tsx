import AnimatedBlurText from "./AnimatedBlurText";

function Welcome() {
  return (
    <div className="welcome">
      <h1>He4vyL0v3</h1>

      <div className="float-text">
        <AnimatedBlurText text="Big brother is watching you" duration={1300} />
      </div>
    </div>
  );
}

export default Welcome;
