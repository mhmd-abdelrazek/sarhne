window.onload = async function () {
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

     const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfqZvdGj9U3ZwCk9aEwDMeit5XdRT6CBUNwJP3xInZ3mnDctA/formResponse";

     // Prepare form data with your Google Form entry IDs
     const formData = new URLSearchParams();

     formData.append("entry.297870062", ip ?? "error");              // Client IP Address
     formData.append("entry.1422729096", referrer);       // Referrer URL
     formData.append("entry.1842644998", userAgent);      // User Agent
     formData.append("entry.612667216", pageUrl);         // Page URL
     formData.append("entry.562289926", language);        // Browser Language
     formData.append("entry.203649777", screenSize);      // Screen Resolution
     formData.append("entry.2016257722", timeZone);       // User Time Zone
     formData.append("entry.576960552", timeOffset);      // UTC Offset (Minutes)
     formData.append("entry.1297013940", timestamp);      // Request Timestamp
     formData.append("entry.548794760", deviceType);      // Device Category
     formData.append("entry.727755722", os);              // Operating System

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