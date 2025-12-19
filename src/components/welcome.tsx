import React from "react";

function Welcome() {
  return (
    <div className="welcome">
      <h1>He4vyL0v3</h1>
      <div className="float-text" style={{ top: "10%", left: "40%" }}>
        PASSWORD:{" "}
        <p className="blured-text">$5$5f4dcc3b5aa765d61d8327deb882cf99</p>
      </div>
      <div className="float-text" style={{ top: "35%", left: "24%" }}>
        PAYLOAD: <p className="blured-text">meterpreter_reverse_tcp</p>
      </div>
      <div className="float-text" style={{ bottom: "20%", right: "5%" }}>
        TARGET IP: <p className="blured-text">212.192.156.40</p>
      </div>
      <div className="float-text" style={{ top: "30%", left: "70%" }}>
        BSSID: <p className="blured-text">EA:A3:C4:1B:A2:85</p>
      </div>
      <div className="float-text" style={{ bottom: "30%", left: "64%" }}>
        FOUND: <p className="blured-text">CVE-2020-0796</p>
      </div>
      <div className="float-text" style={{ bottom: "5%", left: "60%" }}>
        USERNAME: <p className="blured-text">ADMIN</p>
      </div>
      <div className="float-text" style={{ bottom: "13.4%", left: "30%" }}>
        DORKING:
        <p className="blured-text">account.php?action=</p>
      </div>
      <div className="float-text" style={{ top: "25%", left: "35%" }}>
        rkn.gov.ru fuck you
      </div>
    </div>
  );
}

export default Welcome;
