const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    // 🔐 Put your key here (only once)
    formData.append("access_key", "8797b014-ed57-4631-aa5f-1e4f7af8c5f7");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("✅ Message sent successfully!");
            form.reset();
        } else {
            alert("❌ Error: " + data.message);
        }

    } catch (error) {
        alert("⚠️ Network error. Try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});