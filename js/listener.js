
const contectMe = document.getElementById("contact-me");

contectMe.onclick = () => {
     window.open("https://wa.me/201005768534", "_blank");
     sendUpdate("contact-me-clicked");
};

document.getElementById("messageInput").addEventListener("focus", () => {
     sendUpdate("textarea-focused");
});

async function sendUpdate(action) {
     const referrer = document.referrer || "Direct";
     const userAgent = navigator.userAgent;
     const pageUrl = window.location.href;
     const language = navigator.language || "unknown";
     const screenSize = `${window.screen.width}x${window.screen.height}`;
     const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown";
     const timeOffset = new Date().getTimezoneOffset();
     const timestamp = new Date().toISOString();
     const deviceType = /Mobi|Android/i.test(userAgent) ? "Mobile" : "Desktop";

     let os = "Other";
     if (userAgent.includes("Windows")) os = "Windows";
     else if (userAgent.includes("Mac")) os = "Mac";
     else if (userAgent.includes("Linux")) os = "Linux";
     else if (/iPhone|iPad|iPod/i.test(userAgent)) os = "iOS";
     else if (/Android/i.test(userAgent)) os = "Android";

     // Get IP address from ipify API
     let ip = "Unavailable";
     try {
          const res = await fetch("https://api.ipify.org?format=json");
          const data = await res.json();
          ip = data.ip;
     } catch (e) {
          console.warn("Failed to get IP:", e);
     }

     const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfFq1Zo5A83fsWNugJGwNkBhYM25q65smBVsqSm-FOgXlrjtg/formResponse";

     // Prepare form data with your Google Form entry IDs
     const formData = new URLSearchParams();

     formData.append("entry.1846989304", action);
     formData.append("entry.297870062", ip ?? "error");
     formData.append("entry.1422729096", referrer);
     formData.append("entry.1842644998", userAgent);
     formData.append("entry.612667216", pageUrl);
     formData.append("entry.562289926", language);
     formData.append("entry.203649777", screenSize);
     formData.append("entry.2016257722", timeZone);
     formData.append("entry.576960552", timeOffset);
     formData.append("entry.1297013940", timestamp);
     formData.append("entry.548794760", deviceType);
     formData.append("entry.727755722", os);

     // Send the data using fetch
     fetch(formUrl, {
          method: "POST",
          mode: "no-cors",  // no response needed
          headers: {
               "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
     })
          .then(() => {
               console.log("Visitor data sent successfully");
          })
          .catch((error) => {
               console.error("Error sending visitor data:", error);
          });
};