// Function to set a cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie by name
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Function to create and display the cookie consent banner
function displayCookieConsent() {
  const consentBanner = document.createElement("div");
  consentBanner.id = "cookie-consent-banner";
  consentBanner.style.position = "fixed";
  consentBanner.style.bottom = "0";
  consentBanner.style.width = "100%";
  consentBanner.style.backgroundColor = "#f9f9f9";
  consentBanner.style.padding = "10px";
  consentBanner.style.boxShadow = "0 -2px 5px rgba(0, 0, 0, 0.1)";
  consentBanner.style.display = "flex";
  consentBanner.style.justifyContent = "space-evenly";
  consentBanner.style.alignItems = "center";

  const description = document.createElement("p");
  description.innerText = "We use cookies to enhance your experience.";
  const agreeButton = document.createElement("button");
  agreeButton.innerText = "Accept";
  agreeButton.onclick = () => {
    setCookie("userConsent", "true", 365);
    document.body.removeChild(consentBanner);
  };

  const declineButton = document.createElement("button");
  declineButton.innerText = "Decline";
  declineButton.onclick = () => {
    setCookie("userConsent", "false", 365);
    document.body.removeChild(consentBanner);
  };

  const closeButton = document.createElement("button");
  closeButton.innerText = "Close";
  closeButton.style.background = "none";
  closeButton.style.border = "none";
  closeButton.style.fontSize = "16px";
  closeButton.style.cursor = "pointer";
  closeButton.style.marginLeft = "10px";
  closeButton.style.color = "black";
  closeButton.onclick = () => {
    document.body.removeChild(consentBanner);
  };

  consentBanner.appendChild(description);
  consentBanner.appendChild(agreeButton);
  consentBanner.appendChild(declineButton);
  consentBanner.appendChild(closeButton);
  document.body.appendChild(consentBanner);
}

// Function to check and handle cookie consent
async function handleCookieConsent() {
  const consent = getCookie("userConsent");
  if (consent === null) {
    displayCookieConsent();
  }
}
