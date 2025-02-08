// পপআপ শো করার ফাংশন
function showPopup(method) {
    let popup = document.getElementById("paymentPopup");
    let title = document.getElementById("popupTitle");
    let message = document.getElementById("popupMessage");

    let mobileSection = document.getElementById("mobilePayment");
    let cryptoSection = document.getElementById("cryptoPayment");

    if (method === "bkash") {
        title.innerText = "📲 বিকাশ পেমেন্ট";
        message.innerHTML = "নিচের নাম্বারে ৫০৳ পাঠিয়ে আপনার ট্রানজেকশন আইডি দিন।";
        mobileSection.style.display = "block";
        cryptoSection.style.display = "none";
    } 
    else if (method === "nagad") {
        title.innerText = "💳 নগদ পেমেন্ট";
        message.innerHTML = "নিচের নাম্বারে ৫০৳ পাঠিয়ে আপনার ট্রানজেকশন আইডি দিন।";
        mobileSection.style.display = "block";
        cryptoSection.style.display = "none";
    } 
    else if (method === "crypto") {
        title.innerText = "🪙 Trust Wallet (Crypto)";
        message.innerHTML = "নিচের ওয়ালেট অ্যাড্রেসে পেমেন্ট করুন এবং আপনার ওয়ালেট অ্যাড্রেস দিন।";
        mobileSection.style.display = "none";
        cryptoSection.style.display = "block";
    }

    popup.style.display = "block";
}

// পপআপ বন্ধ করার ফাংশন
function closePopup() {
    document.getElementById("paymentPopup").style.display = "none";
}

// টেক্সট কপি করার ফাংশন
function copyText(inputId) {
    let copyText = document.getElementById(inputId);
    copyText.select();
    document.execCommand("copy");
    alert("✅ কপি করা হয়েছে: " + copyText.value);
}

// পেমেন্ট সাবমিট করার ফাংশন
function submitPayment() {
    let method = document.getElementById("popupTitle").innerText;

    let userNumber = document.getElementById("userNumber")?.value || "";
    let transactionId = document.getElementById("transactionId")?.value || "";
    let userWallet = document.getElementById("userWallet")?.value || "";
    let cryptoNetwork = document.getElementById("cryptoNetwork")?.value || "";

    let message = "";

    if (method.includes("বিকাশ") || method.includes("নগদ")) {
        if (userNumber === "" || transactionId === "") {
            alert("⚠ অনুগ্রহ করে আপনার নাম্বার ও ট্রানজেকশন আইডি দিন!");
            return;
        }
        message = `📲 পেমেন্ট মেথড: ${method}\n👤 নাম্বার: ${userNumber}\n📝 ট্রানজেকশন আইডি: ${transactionId}`;
    } 
    else if (method.includes("Trust Wallet")) {
        if (userWallet === "") {
            alert("⚠ অনুগ্রহ করে আপনার ওয়ালেট অ্যাড্রেস দিন!");
            return;
        }
        message = `🪙 পেমেন্ট মেথড: Trust Wallet\n⚡ নেটওয়ার্ক: ${cryptoNetwork}\n📌 ইউজার ওয়ালেট: ${userWallet}`;
    }

    // ✅ টেলিগ্রাম বটকে মেসেজ পাঠানো হবে
    let botToken = "YOUR_TELEGRAM_BOT_TOKEN";
    let chatId = "YOUR_TELEGRAM_CHAT_ID";
    let telegramURL = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    fetch(telegramURL)
        .then(response => response.json())
        .then(data => alert("✅ আপনার অনুরোধ পাঠানো হয়েছে!"))
        .catch(error => alert("❌ কিছু ভুল হয়েছে, আবার চেষ্টা করুন!"));

    closePopup();
}
