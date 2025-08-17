// Character counter
const messageInput = document.getElementById('messageInput');
const charCount = document.getElementById('charCount');

// 20 colors (gradient steps)
const colors = [
  '#ffffff', // 0
  '#e6ffe6', // 1
  '#ccffcc', // 2
  '#b3ffb3', // 3
  '#99ff99', // 4
  '#80ff80', // 5
  '#66ff66', // 6
  '#4dff4d', // 7
  '#33ff33', // 8
  '#1aff1a', // 9
  '#ffff66', // 10
  '#ffcc66', // 11
  '#ff9966', // 12
  '#ff6666', // 13
  '#ff4d4d', // 14
  '#ff3333', // 15
  '#ff1a1a', // 16
  '#ff0000', // 17
  '#cc0000', // 18
  '#990000'  // 19 (max danger)
];

messageInput.addEventListener('input', function () {
  const count = this.value.length;
  charCount.textContent = count;

  const max = 850;
  const steps = colors.length; // 20
  const stepSize = max / steps; // ~42.5 per step

  let index = Math.min(Math.floor(count / stepSize), steps - 1);
  charCount.style.color = colors[index];
});

// Add subtle typing animation
messageInput.addEventListener('focus', function () {
  this.style.background = 'rgba(255, 255, 255, 0.1)';
});

messageInput.addEventListener('blur', function () {
  this.style.background = 'rgba(255, 255, 255, 0.05)';
});

// Form submission feedback
const formContainer = document.getElementById("formContainerDiv");
const loadingContainer = document.getElementById("loadingContainer");
const resultContainer = document.getElementById("resultContainer");
const resultMessage = document.getElementById("resultMessage");
const submitButton = document.getElementById("sendbutton");
const messageInputt = document.getElementById("messageInput");

submitButton.onclick = sendMessage;


async function sendMessage() {
  const message = document.querySelector("textarea[name='message']").value;


  // Hide form, show loading
  formContainer.style.display = "none";
  loadingContainer.style.display = "block";


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

  // Get IP address
  await initIpIfNot();

  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSemeNeRY1iqCyeLPLfUCryVt7gzXOR_gzOE9Kg4W2gFMG8fIA/formResponse";

  const formData = new URLSearchParams();
  formData.append("entry.1846989304", message);
  formData.append("entry.297870062", publicIp);
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

  try {
    await fetch(formUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });
    // Hide loading, show result
    loadingContainer.style.display = "none";
    resultMessage.textContent = "✅ تم الإرسال بنجاح!";
    resultContainer.style.display = "block";

    // Reset textarea
    messageInput.value = "";
    document.getElementById("charCount").textContent = "0";

  } catch (error) {
    console.error("Error sending data:", error);
    // Hide loading, show error
    loadingContainer.style.display = "none";
    resultMessage.textContent = "❌ حدث خطأ، حاول مرة أخرى";
    resultContainer.style.display = "block";
  }

  // After 2s hide result and show form again
  setTimeout(() => {
    resultContainer.style.display = "none";
    formContainer.style.display = "block";
  }, 2000);
}
