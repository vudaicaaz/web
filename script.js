// ⚙️ Khởi tạo Firebase (dùng bản compat cho HTML thuần)
const firebaseConfig = {
  apiKey: "AIzaSyAZ-4OBafTyAvqIdlVTBnvsmC76UjRNh_w",
  authDomain: "webb-32ae6.firebaseapp.com",
  projectId: "webb-32ae6",
  storageBucket: "webb-32ae6.firebasestorage.app",
  messagingSenderId: "986678901711",
  appId: "1:986678901711:web:4be05cf366e8df53f8b0ba",
  measurementId: "G-TWWYQVF4Y8"
};

// 👉 Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 🌐 Địa chỉ IP của ESP32
const esp32IP = "http://192.168.1.24"; // THAY BẰNG IP THỰC TẾ CỦA ESP32
let weightInterval = null;

// 🔑 Đăng nhập
function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => showDashboard(email))
    .catch(() => {
      document.getElementById("errorMessage").textContent = "❌ Sai email hoặc mật khẩu!";
    });
}

// ➕ Đăng ký
function handleRegister(event) {
  event.preventDefault();
  const email = document.getElementById("newUsername").value.trim();
  const password = document.getElementById("newPassword").value;

  if (!email || !password) {
    document.getElementById("registerMessage").textContent = "❌ Không được để trống!";
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById("registerMessage").textContent = "✅ Đăng ký thành công!";
      document.getElementById("newUsername").value = "";
      document.getElementById("newPassword").value = "";
      setTimeout(showLogin, 1000);
    })
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        document.getElementById("registerMessage").textContent = "❌ Tài khoản đã tồn tại!";
      } else {
        document.getElementById("registerMessage").textContent = "❌ Lỗi: " + error.message;
      }
    });
}

// 🧭 Giao diện
function showRegister() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "block";
  document.getElementById("registerMessage").textContent = "";
}

function showLogin() {
  document.getElementById("registerForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("errorMessage").textContent = "";
}

// 👤 Giao diện người dùng sau đăng nhập
function showDashboard(username) {
  document.getElementById("userDisplay").textContent = username;
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
  startFetchingWeight();
}

// 🚪 Đăng xuất
function logout() {
  auth.signOut().then(() => {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    stopFetchingWeight();
  });
}

// 📡 Đọc số cân định kỳ
function startFetchingWeight() {
  fetchWeight();
  weightInterval = setInterval(fetchWeight, 5000);
}

function stopFetchingWeight() {
  clearInterval(weightInterval);
}

// ⚖️ Gọi API từ ESP32
async function fetchWeight() {
  try {
    const res = await fetch(`${esp32IP}/weight`);
    const data = await res.json();
    const weight = parseFloat(data.weight).toFixed(1);

    document.getElementById("weightValue").textContent = `${weight} kg`;

    let advice = "";
    if (weight < 45) advice = "📌 Bạn hơi gầy, nên ăn uống đầy đủ.";
    else if (weight < 60) advice = "✅ Cân nặng lý tưởng, duy trì nhé!";
    else if (weight < 75) advice = "⚠️ Hơi dư cân. Nên vận động nhiều hơn.";
    else advice = "❗ Cân nặng cao, hãy chú ý sức khoẻ.";

    document.getElementById("advice").textContent = advice;
  } catch (err) {
    document.getElementById("weightValue").textContent = "-- kg";
    document.getElementById("advice").textContent = "🚫 Không kết nối được ESP32.";
    console.error("ESP32 fetch error:", err);
  }
}

// 🚀 Kiểm tra trạng thái đăng nhập khi mở trang
window.onload = () => {
  auth.onAuthStateChanged(user => {
    if (user) {
      showDashboard(user.email);
    } else {
      showLogin();
    }
  });
};
