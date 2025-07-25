import React from "react";
import DarkVeil from "./uiComponents/DarkVeil";
import Particles from "./uiComponents/Particles";

function ParticipantDashboard() {
  return (
    <div className="participant-dashboard">
      <div style={{ width: "100%", height: "600px", position: "relative" }}>
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
        
      </div>
    </div>
  );
}

export default ParticipantDashboard;
