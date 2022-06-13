import React from "react";
import Particles from "react-tsparticles";
// import Particles from "tsparticles";
// import particleConfig from "./particlesjs-config";
// import particleConfig from "./extra/particlesjs-config";
import particleConfig2 from "./extra/particlesjs-config2";

const ParticleSetting = () => {
  return (
    <div>
      <Particles height="100vh" width="100vw" params={particleConfig2} />
    </div>
  );
};

export default ParticleSetting;
