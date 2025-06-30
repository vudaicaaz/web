<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Cân điện tử ESP32</title>
  <link rel="stylesheet" href="styles.css" />

  <!-- ✅ Firebase SDK -->
  <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>
  <script src="script.js"></script>
</head>
<body>
  <!-- LOGIN -->
  <div id="loginForm" class="login-container">
    <h2>Đăng nhập</h2>
    <form onsubmit="handleLogin(event)">
      <input type="text" id="username" placeholder="Email" required />
      <input type="password" id="password" placeholder="Mật khẩu" required />
      <button type="submit">Đăng nhập</button>
      <div id="errorMessage" class="error"></div>
    </form>
    <p>Chưa có tài khoản? <a href="#" onclick="showRegister()">Đăng ký</a></p>
  </div>

  <!-- ĐĂNG KÝ -->
  <div id="registerForm" class="login-container" style="display: none;">
    <h2>Đăng ký tài khoản</h2>
    <form onsubmit="handleRegister(event)">
      <input type="text" id="newUsername" placeholder="Email" required />
      <input type="password" id="newPassword" placeholder="Mật khẩu mới" required />
      <button type="submit">Đăng ký</button>
      <div id="registerMessage" class="error"></div>
    </form>
    <p>Đã có tài khoản? <a href="#" onclick="showLogin()">Đăng nhập</a></p>
  </div>

  <!-- GIAO DIỆN CHÍNH -->
  <div id="dashboard" class="dashboard" style="display: none;">
    <h1>Chào, <span id="userDisplay"></span> 👋</h1>
    <div class="weight-display">
      <h2>Số cân hiện tại:</h2>
      <div id="weightValue">-- kg</div>
    </div>
    <div id="advice" class="advice-box">Lời khuyên sẽ hiển thị tại đây.</div>
    <button onclick="logout()">Đăng xuất</button>
  </div>

  <script src="script.js"></script>
</body>
</html>
