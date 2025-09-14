<template>
  <el-container>
    <div class="header">
      <div class="logo">
        <img :src="HOHO" width="160" hight="60" />
      </div>

      <!-- 桌面版選單 -->
      <ul class="nav-menu">
        <li>
          <a
            href="https://linktr.ee/esperanca__crystal?fbclid=PAZXh0bgNhZW0CMTEAAaZY7X1-C2jj7k4Z-Sbo0I2s79W_mbqGy9PHtzpKabMQzyq9joQBmTw66WU_aem_UIk0IsPw5DrJJZsICTWaYg"
            >賣貨便</a
          >
        </li>
        <li><a href="#album">設計款手串</a></li>
        <li>
          <a href="https://www.instagram.com/esperanca__crystal/">客製化手串</a>
        </li>
        <li>
          <el-button class="searchbtn">搜尋功能</el-button>
        </li>
        <li>
          <el-button class="loginMemeber">登入您的會員帳號</el-button>
        </li>
      </ul>

      <!-- 漢堡排按鈕 -->
      <div class="hamburger-menu">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
    </div>

    <!-- 手機選單 -->
    <ul class="nav-menu-mobile" id="navMenuMobile">
      <li>
        <a
          href="https://linktr.ee/esperanca__crystal?fbclid=PAZXh0bgNhZW0CMTEAAaZY7X1-C2jj7k4Z-Sbo0I2s79W_mbqGy9PHtzpKabMQzyq9joQBmTw66WU_aem_UIk0IsPw5DrJJZsICTWaYg"
          >賣貨便</a
        >
      </li>
      <li><a href="#album">設計款手串</a></li>
      <li>
        <a href="https://www.instagram.com/esperanca__crystal/">客製化手串</a>
      </li>
      <li>
        <el-button class="searchbtn">搜尋功能</el-button>
      </li>
      <li>
        <el-button class="searchbtn">登入</el-button>
      </li>
    </ul>
    <!--Activity-->
    <el-main>
      <section id="activity" class="activity" style="padding-top: 80px">
        <div class="container">
          <el-steps
            style="max-width: 600px"
            :space="200"
            :active="1"
            finish-status="success"
          >
            <el-step title="Done" />
            <el-step title="Processing" />
            <el-step title="Step 3" />
          </el-steps>
        </div>
        <!-- </div> -->
      </section>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import HOHO from "../img/HOHO.png";
</script>
