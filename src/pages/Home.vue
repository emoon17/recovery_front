<template>
  <header class="header">
    <div class="header-inner">
      <router-link to="/" class="logo">Recovery</router-link>

      <nav class="nav">
        <router-link to="/">회수 지연 예측</router-link>
        <router-link to="/recovery">거래처 회수율</router-link>
        <router-link to="/transaction">거래 조회</router-link>
        <router-link to="/client">거래처 조회</router-link>
      </nav>
    </div>
  </header>

  <main class="content">
    <router-view />
  </main>
</template>

<style>
.header {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  background-color: white;
}

.header-inner {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 60px; /* 여기 padding 크게 */
  display: flex;
  align-items: center;
  position: relative;
}

/* 로고 */
.logo {
  font-weight: 800;
  font-size: 20px;
  color: #000;
}

/* 메뉴 */
.nav {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 32px;
}

.nav a {
  color: #000;
  font-weight: 500;
  text-decoration: none;
}

.nav a:hover {
  text-decoration: underline;
}

/* 본문 영역 */
.content {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 24px 32px 64px; /* 왼쪽 패딩을 크게! */
  min-height: calc(100vh - 60px); /* 헤더 빼고 채우기 */
  box-sizing: border-box;
}

</style>
