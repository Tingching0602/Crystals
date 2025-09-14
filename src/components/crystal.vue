<template>
  <!--Main Header-->
  <el-container>
    <!-- 固定頂部的標題區 -->
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
          <el-button class="searchbtn" @click="openSearch">搜尋功能</el-button>
        </li>
        <li v-if="!isLoggedIn">
          <el-button class="loginMemeber" @click="openLogin"
            >登入您的會員帳號</el-button
          >
        </li>
        <li v-else>
          <el-dropdown @command="handleUserMenu">
            <el-button class="loginMemeber">
              歡迎，{{ currentUser }}
              <el-icon class="el-icon--right"><ArrowDown /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="member">會員中心</el-dropdown-item>
                <el-dropdown-item command="orders">購買清單</el-dropdown-item>
                <el-dropdown-item command="logout" divided>登出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </li>
        <li>
          <el-button class="loginMemeber" @click="openCart">
            <el-icon><ShoppingCart /></el-icon>
            購物車 ({{ cartItemCount }})
          </el-button>
        </li>
      </ul>

      <!-- 漢堡排按鈕 -->
      <div class="hamburger-menu" v-on:click="toggleMenu">
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
        <el-button class="searchbtn" @click="openSearch">搜尋功能</el-button>
      </li>
      <li>
        <el-button class="searchbtn" @click="openLogin">登入</el-button>
      </li>
    </ul>
    <!--Activity-->
    <el-main>
      <section id="activity" class="activity" style="padding-top: 80px">
        <div class="container">
          <el-carousel height="350px">
            <el-carousel-item v-for="item in cover" :key="item">
              <img
                :src="item.imgUrl"
                class="coverSize"
                :srcset="item.imgUrlSamll + ' 500w,' + item.imgUrl + '1400w'"
              />
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- </div> -->
      </section>
      <!--Favorites Section (only show when logged in)-->
      <section v-if="isLoggedIn && favoriteItems.length > 0" id="favorites" style="padding: 40px 0;">
        <div class="container">
          <h2 style="text-align: center; color: #267b98; margin-bottom: 30px;">
            <el-icon style="margin-right: 10px;"><StarFilled /></el-icon>
            我的最愛專區
          </h2>
          <el-row :gutter="30">
            <el-col :md="8" v-for="item in favoriteItems.slice(0, 6)" :key="`${item.type}_${item.title}`">
              <div class="card favorite-card" @click="openFavoriteDetail(item)">
                <img :src="item.imgUrl" alt="" class="card-img" />
                <div class="card-text">
                  <h3 class="card-title">{{ item.title }}</h3>
                  <p class="card-description">{{ item.note }}</p>
                  <div class="favorite-badge">
                    <el-icon color="#ff4757"><StarFilled /></el-icon>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <div style="text-align: center; margin-top: 20px;" v-if="favoriteItems.length > 6">
            <el-button @click="showAllFavorites">查看全部收藏 ({{ favoriteItems.length }})</el-button>
          </div>
        </div>
      </section>

      <!--Album-->

      <section id="album">
        <div class="container">
          <el-tabs v-model="crystalOptions" type="card" class="crystals-tabs">
            <el-tab-pane label="設計款手串" name="first">
              <el-row :gutter="30">
                <el-col :md="8" v-for="item in production">
                  <div class="card" @click="openDetail(item)">
                    <img :src="item.imgUrl" alt="" class="card-img" />
                    <div class="card-text">
                      <h3 class="card-title">{{ item.title }}</h3>
                      <p class="card-description">{{ item.note }}</p>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <div class="example-pagination-block">
                <div class="example-demonstration">查看更多設計款</div>
                <el-pagination
                  layout="prev, pager, next"
                  :total="tempOriginal.length"
                  :default-page-size="12"
                  @change="crystalOne"
                  v-model:current-page="crystalPage"
                />
              </div>
            </el-tab-pane>
            <el-tab-pane label="雕刻件" name="secord">
              <el-row :gutter="30">
                <el-col :md="8" v-for="item in productionTurtle">
                  <div class="card" v-on:click="openDetailTurtle(item)">
                    <img :src="item.imgUrl" alt="" class="card-img" />
                    <div class="card-text">
                      <h3 class="card-title">{{ item.title }}</h3>
                      <p class="card-description">{{ item.note }}</p>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <div class="example-pagination-block">
                <div class="example-demonstration">查看更多雕刻件</div>
                <el-pagination
                  layout="prev, pager, next"
                  :total="tempOriginalTurtle.length"
                  :default-page-size="12"
                  @change="handleTurtlePage"
                  v-model:current-page="TurtlePage"
                />
              </div>
            </el-tab-pane>
            <el-tab-pane label="球球系列" name="balls">
              <el-row :gutter="30">
                <el-col :md="8" v-for="item in productionballs">
                  <div class="card" v-on:click="openDetailballs(item)">
                    <img :src="item.imgUrl" alt="" class="card-img" />
                    <div class="card-text">
                      <h3 class="card-title">{{ item.title }}</h3>
                      <p class="card-description">{{ item.note }}</p>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <div class="example-pagination-block">
                <div class="example-demonstration">查看更多球球系列</div>
                <el-pagination
                  layout="prev, pager, next"
                  :total="tempOriginalballs.length"
                  :default-page-size="12"
                  @change="handleBallsPage"
                  v-model:current-page="ballsPage"
                />
              </div>
            </el-tab-pane>
            <el-tab-pane label="原礦系列" name="ore">
              <el-row :gutter="30">
                <el-col :md="8" v-for="item in productionOre">
                  <div class="card" v-on:click="openDetailOre(item)">
                    <img :src="item.imgUrl" alt="" class="card-img" />
                    <div class="card-text">
                      <h3 class="card-title">{{ item.title }}</h3>
                      <p class="card-description">{{ item.note }}</p>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <div class="example-pagination-block">
                <div class="example-demonstration">查看更多原礦系列</div>
                <el-pagination
                  layout="prev, pager, next"
                  :total="tempOriginalOre.length"
                  :default-page-size="12"
                  @change="handleOrePage"
                  v-model:current-page="OrePage"
                />
              </div>
            </el-tab-pane>
            <el-tab-pane label="項鍊系列" name="necklace">
              <el-row :gutter="30">
                <el-col :md="8" v-for="item in productionNecklace">
                  <div class="card" @click="openDetailNecklace(item)">
                    <img :src="item.imgUrl" alt="" class="card-img" />
                    <div class="card-text">
                      <h3 class="card-title">{{ item.title }}</h3>
                      <p class="card-description">{{ item.note }}</p>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <div class="example-pagination-block">
                <div class="example-demonstration">查看更多項鍊系列</div>
                <el-pagination
                  layout="prev, pager, next"
                  :total="tempOriginalNecklace.length"
                  :default-page-size="12"
                  @change="handleNecklacePage"
                  v-model:current-page="NecklacePage"
                />
              </div>
            </el-tab-pane>
            <el-tab-pane label="耳環系列" name="earrings">
              <el-row :gutter="30">
                <el-col
                  :md="8"
                  v-for="item in productionEarrings"
                  :key="item.id"
                >
                  <div class="card" v-on:click="openDetailEarrings(item)">
                    <img :src="item.imgUrl" alt="" class="card-img" />
                    <div class="card-text">
                      <h3 class="card-title">{{ item.title }}</h3>
                      <p class="card-description">{{ item.note }}</p>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <div class="example-pagination-block">
                <div class="example-demonstration">查看更多耳環系列</div>
                <el-pagination
                  layout="prev, pager, next"
                  :total="tempOriginalEarrings.length"
                  :default-page-size="12"
                  @change="handleEarringsPage"
                  v-model:current-page="EarringsPage"
                />
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </section>
      <footer>
        <p>微光水晶 &copy; 2024</p>
        <input type="hidden" value="v2.0.0" />
      </footer>
    </el-main>
  </el-container>
  <el-row :gutter="30">
    <el-col>
      <el-dialog
        class="crystals"
        v-model="detailVisible"
        title="詳細介紹"
        width="800"
      >
        <p>{{ detailInfo.title }}</p>
        <br />
        <p>
          {{ detailInfo.note }}
        </p>
        <br />
        <p>{{ detailInfo.description }}</p>
        <br />
        <p>適合配戴者:{{ detailInfo.forPerson }}</p>
        <br />
        <p>咪數: {{ detailInfo.crystal_size }}</p>
        <br />
        <p>手圍: {{ detailInfo.head_size }}</p>
        <br />
        <p>邀請價: {{ detailInfo.price }}</p>
        <br />
        <img :src="detailInfo.imgUrl" width="300" />
        <p>注意事項：</p>
        <ul>
          <li>
            🔮天然水晶手串可能有平珠、小礦缺、礦皮、共生現象，無法接受者請繞道，感謝。
          </li>
          <li>🔮本所天然水晶手串設計款，皆為所長的原創設計。</li>
          <li>
            🔮全手工製作及測量，手圍誤差1公分內為正常範圍，介意者請勿下單。
          </li>
          <li>
            🔮天然水晶水串照片，因為拍攝角度與光線不同，和實體可能會有些許色差，產品顏色以實際的為主。
          </li>
          <li>
            🔮使用金屬件為14k包金或銅合金、925純銀配飾，請勿配戴洗澡。潑濕請盡速擦乾以保持金屬件光澤度。
          </li>
          <li>🔮手圍皆可修改，超過17.5公分者則需要加價。</li>
        </ul>
        <div style="text-align: center; margin-top: 20px;">
          <el-button 
            :type="isFavorite('crystal', detailInfo) ? 'danger' : 'info'" 
            :icon="isFavorite('crystal', detailInfo) ? 'Heart' : 'HeartEmpty'"
            @click="toggleFavorite('crystal', detailInfo)"
            style="margin-right: 10px;"
          >
            {{ isFavorite('crystal', detailInfo) ? '已收藏' : '加入最愛' }}
          </el-button>
          <el-button type="primary" class="sumbitBtn" @click="addToCart('crystal', detailInfo)">加入購物車</el-button>
        </div>
      </el-dialog>
    </el-col>
  </el-row>
  <el-dialog
    class="Turtle"
    v-model="detailVisibleTurtle"
    title="詳細介紹"
    width="800"
  >
    <p>{{ detailInfoTurtle.title }}</p>
    <br />
    <p>
      {{ detailInfoTurtle.note }}
    </p>
    <br />
    <p>{{ detailInfoTurtle.description }}</p>
    <br />
    <p>尺寸：{{ detailInfoTurtle.size }}</p>
    <br />
    <p>邀請價： {{ detailInfoTurtle.price }}</p>
    <br />
    <p>注意事項：</p>
    <ul>
      <li>
        🔮每個天然礦石都是獨一無二的，多少有冰裂、棉絮、礦缺等樣貌，都是大自然的匠心。
      </li>
      <li>🔮品項都以實物為主</li>
    </ul>
    <div style="text-align: center; margin-top: 20px;">
      <el-button 
        :type="isFavorite('turtle', detailInfoTurtle) ? 'danger' : 'info'" 
        :icon="isFavorite('turtle', detailInfoTurtle) ? 'Heart' : 'HeartEmpty'"
        @click="toggleFavorite('turtle', detailInfoTurtle)"
        style="margin-right: 10px;"
      >
        {{ isFavorite('turtle', detailInfoTurtle) ? '已收藏' : '加入最愛' }}
      </el-button>
      <el-button type="primary" class="sumbitBtn" @click="addToCart('turtle', detailInfoTurtle)">加入購物車</el-button>
    </div>
  </el-dialog>
  <el-dialog
    class="Balls"
    v-model="detailVisibleballs"
    title="詳細介紹"
    width="800"
  >
    <p>{{ detailInfoballs.title }}</p>
    <br />
    <p>
      {{ detailInfoballs.note }}
    </p>
    <br />
    <p>{{ detailInfoballs.description }}</p>
    <br />
    <p>尺寸：{{ detailInfoballs.size }}</p>
    <br />
    <p>邀請價： {{ detailInfoballs.price }}</p>
    <br />
    <p>注意事項：</p>
    <ul>
      <li>
        🔮每個天然礦石都是獨一無二的，多少有冰裂、棉絮、礦缺等樣貌，都是大自然的匠心。
      </li>
      <li>🔮品項都以實物為主</li>
    </ul>
    <div style="text-align: center; margin-top: 20px;">
      <el-button 
        :type="isFavorite('balls', detailInfoballs) ? 'danger' : 'info'" 
        :icon="isFavorite('balls', detailInfoballs) ? 'Heart' : 'HeartEmpty'"
        @click="toggleFavorite('balls', detailInfoballs)"
        style="margin-right: 10px;"
      >
        {{ isFavorite('balls', detailInfoballs) ? '已收藏' : '加入最愛' }}
      </el-button>
      <el-button type="primary" class="sumbitBtn" @click="addToCart('balls', detailInfoballs)">加入購物車</el-button>
    </div>
  </el-dialog>
  <el-dialog
    class="Ore"
    v-model="detailVisibleOre"
    title="詳細介紹"
    width="800"
  >
    <p>{{ detailInfoOre.title }}</p>
    <br />
    <p>
      {{ detailInfoOre.note }}
    </p>
    <br />
    <p>{{ detailInfoOre.description }}</p>
    <br />
    <p>尺寸：{{ detailInfoOre.size }}</p>
    <br />
    <p>邀請價： {{ detailInfoOre.price }}</p>
    <br />
    <p>注意事項：</p>
    <ul>
      <li>
        🔮每個天然礦石都是獨一無二的，多少有冰裂、棉絮、礦缺等樣貌，都是大自然的匠心。
      </li>
      <li>🔮品項都以實物為主</li>
    </ul>
    <div style="text-align: center; margin-top: 20px;">
      <el-button 
        :type="isFavorite('ore', detailInfoOre) ? 'danger' : 'info'" 
        :icon="isFavorite('ore', detailInfoOre) ? 'Heart' : 'HeartEmpty'"
        @click="toggleFavorite('ore', detailInfoOre)"
        style="margin-right: 10px;"
      >
        {{ isFavorite('ore', detailInfoOre) ? '已收藏' : '加入最愛' }}
      </el-button>
      <el-button type="primary" class="sumbitBtn" @click="addToCart('ore', detailInfoOre)">加入購物車</el-button>
    </div>
  </el-dialog>
  <!-- 項鍊視窗 -->
  <el-dialog
    class="Necklace"
    v-model="detailVisibleNecklace"
    title="詳細介紹"
    width="800"
  >
    <p>{{ detailInfoNecklace.title }}</p>
    <br />
    <p>
      {{ detailInfoNecklace.note }}
    </p>
    <br />
    <p>{{ detailInfoNecklace.description }}</p>
    <br />
    <p>尺寸：{{ detailInfoNecklace.size }}</p>
    <br />
    <p>邀請價： {{ detailInfoNecklace.price }}</p>
    <br />
    <p>注意事項：</p>
    <ul>
      <li>
        🔮每個天然礦石都是獨一無二的，多少有冰裂、棉絮、礦缺等樣貌，都是大自然的匠心。
      </li>
      <li>🔮品項都以實物為主</li>
    </ul>
    <div style="text-align: center; margin-top: 20px;">
      <el-button 
        :type="isFavorite('necklace', detailInfoNecklace) ? 'danger' : 'info'" 
        :icon="isFavorite('necklace', detailInfoNecklace) ? 'Heart' : 'HeartEmpty'"
        @click="toggleFavorite('necklace', detailInfoNecklace)"
        style="margin-right: 10px;"
      >
        {{ isFavorite('necklace', detailInfoNecklace) ? '已收藏' : '加入最愛' }}
      </el-button>
      <el-button type="primary" class="sumbitBtn" @click="addToCart('necklace', detailInfoNecklace)">加入購物車</el-button>
    </div>
  </el-dialog>
  <!-- 耳環視窗 -->
  <el-dialog
    class="Earrings"
    v-model="detailVisibleEarrings"
    title="詳細介紹"
    width="800"
  >
    <p>{{ detailInfoEarrings.title }}</p>
    <br />
    <p>
      {{ detailInfoEarrings.note }}
    </p>
    <br />
    <p>{{ detailInfoEarrings.description }}</p>
    <br />
    <p>尺寸：{{ detailInfoEarrings.size }}</p>
    <br />
    <p>邀請價： {{ detailInfoEarrings.price }}</p>
    <br />
    <p>注意事項：</p>
    <ul>
      <li>
        🔮每個天然礦石都是獨一無二的，多少有冰裂、棉絮、礦缺等樣貌，都是大自然的匠心。
      </li>
      <li>🔮品項都以實物為主</li>
    </ul>
    <div style="text-align: center; margin-top: 20px;">
      <el-button 
        :type="isFavorite('earrings', detailInfoEarrings) ? 'danger' : 'info'" 
        :icon="isFavorite('earrings', detailInfoEarrings) ? 'Heart' : 'HeartEmpty'"
        @click="toggleFavorite('earrings', detailInfoEarrings)"
        style="margin-right: 10px;"
      >
        {{ isFavorite('earrings', detailInfoEarrings) ? '已收藏' : '加入最愛' }}
      </el-button>
      <el-button type="primary" class="sumbitBtn" @click="addToCart('earrings', detailInfoEarrings)">加入購物車</el-button>
    </div>
  </el-dialog>
  <!-- 搜尋系統 -->
  <el-dialog
    class="SearchBtn"
    v-model="detailSearch"
    title="搜尋手串、晶石原礦"
    width="500"
  >
    <el-form
      ref="ruleFormRef"
      style="max-width: 500px"
      status-icon
      label-width="auto"
      class="demo-ruleForm"
    >
      <el-form-item label="關鍵字" prop="keyword">
        <el-input 
          v-model="input" 
          placeholder="請輸入關鍵字" 
          clearable 
          @keyup.enter="searchCrystal"
        />
      </el-form-item>
      <el-form-item label="商品價格">
        <el-select
          v-model="selectPrice"
          placeholder="價格區間"
          style="width: 240px"
          clearable
        >
          <el-option
            v-for="item in productionPrice"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          class="sumbitBtn"
          @click="searchCrystal"
          style="width: 500px"
        >
          送出
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- 登入系統 -->
  <el-dialog
    class="LoginButton"
    v-model="detailLogin"
    title="登入您的會員帳號"
    width="500"
  >
    <el-form
      ref="ruleFormRef"
      style="max-width: 500px"
      status-icon
      label-width="auto"
      class="demo-ruleForm"
    >
      <el-form-item label="帳號" prop="account">
        <el-input v-model="loginForm.account" placeholder="請輸入帳號" />
      </el-form-item>
      <el-form-item label="密碼" prop="password">
        <el-input
          v-model="loginForm.pwd"
          placeholder="請輸入密碼"
          type="password"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          class="sumbitButtonLogin"
          @click="Login"
          style="width: 500px"
        >
          送出
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- 會員登入 -->
  <el-dialog class="login" v-model="memberLogin" title="會員登入" width="600">
    <el-form
      ref="ruleFormRef"
      style="max-width: 500px"
      status-icon
      label-width="auto"
      class="demo-ruleForm"
    >
      <el-form-item label="帳號" prop="acount">
        <el-input v-model="input" placeholder="請輸入關鍵字" clearable />
      </el-form-item>
      <el-form-item label="商品價格">
        <el-select
          v-model="selectPrice"
          placeholder="價格區間"
          style="width: 240px"
          clearable
        >
          <el-option
            v-for="item in productionPrice"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          class="sumbitBtn"
          @click="searchCrystal"
          style="width: 500px"
        >
          送出
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- 購物車視窗 -->
  <el-dialog
    class="ShoppingCart"
    v-model="cartVisible"
    title="購物車"
    width="600"
  >
    <div v-if="cartItems.length === 0" style="text-align: center; color: #999;">
      購物車是空的
    </div>
    <div v-else>
      <el-table :data="cartItems" style="width: 100%">
        <el-table-column prop="title" label="商品名稱" />
        <el-table-column prop="type" label="類型" width="80" />
        <el-table-column prop="quantity" label="數量" width="110">
          <template #default="scope">
            <el-input-number 
              v-model="scope.row.quantity" 
              :min="1" 
              :max="99"
              size="small"
              style="width: 80px;"
              @change="updateCartItem(scope.$index, scope.row.quantity)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template #default="scope">
            <el-button 
              type="danger" 
              size="small" 
              @click="removeFromCart(scope.$index)"
            >
              刪除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center; margin-top: 20px;">
        <el-button type="danger" @click="clearCart">清空購物車</el-button>
        <el-button type="primary" class="sumbitBtn" @click="checkout">結帳</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, computed } from "vue";
import crystals from "../model/crystals";
import tutles from "../model/tutles";
// import "../style.css";
import balls from "../model/balls";
import ores from "../model/ores";
import necklace from "../model/necklace";
import earrings from "../model/earrings";
import type { FormInstance } from "element-plus";
import HOHO from "../img/HOHO.png";
// import axios from "axios";
import {useRouter} from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { ShoppingCart, StarFilled, ArrowDown } from '@element-plus/icons-vue'



const router = useRouter()

onMounted(() => {
  // axios.post('https://localhost:7270/Crystal')
  // .then(function (response) {
  //   // handle success
  //   console.log(response.data);
  // })
  // .catch(function (error) {
  //   // handle error
  //   console.log(error);
  // })
  // .finally(function () {
  //   // always executed
  // });
});

// const RedirectMember = ()=>{
//   router.push({name:'member'})
// }

const ruleFormRef = ref<FormInstance>();

const selectPrice = ref("");

const productionPrice = [
  {
    value: "Price1",
    label: "1-500元",
  },
  {
    value: "Price2",
    label: "501-1000元",
  },
  {
    value: "Price3",
    label: "1001-1500元",
  },
  {
    value: "Price4",
    label: "1501-2000元",
  },
  {
    value: "Price5",
    label: "2001元-3000元",
  },
  {
    value: "Price6",
    label: "3001元-4000元",
  },
];

const detailVisible = ref(false);
const detailVisibleTurtle = ref(false);
const detailVisibleballs = ref(false);
const detailVisibleOre = ref(false);
const detailVisibleNecklace = ref(false);
const detailVisibleEarrings = ref(false);
const detailSearch = ref(false);
const memberLogin = ref(false);
const detailLogin = ref(false);
const detailInfo = reactive({} as IProduction);

const openDetail = (item: IProduction) => {
  Object.assign(detailInfo, item);
  detailVisible.value = true;
};

const detailInfoTurtle = reactive({} as IproductionTurtle);
const openDetailTurtle = (item: IproductionTurtle) => {
  Object.assign(detailInfoTurtle, item);
  detailVisibleTurtle.value = true;
};

const detailInfoballs = reactive({} as Iproductionballs);
const openDetailballs = (item: Iproductionballs) => {
  Object.assign(detailInfoballs, item);
  detailVisibleballs.value = true;
};
//原礦
const detailInfoOre = reactive({} as IproductionOre);
const openDetailOre = (item: IproductionOre) => {
  Object.assign(detailInfoOre, item);
  detailVisibleOre.value = true;
};

//項鍊
const detailInfoNecklace = reactive({} as IproductionNecklace);
const openDetailNecklace = (item: IproductionNecklace) => {
  Object.assign(detailInfoNecklace, item);
  detailVisibleNecklace.value = true;
};

//耳環
const detailInfoEarrings = reactive({} as IproductionEarrings);
const openDetailEarrings = (item: IproductionEarrings) => {
  Object.assign(detailInfoEarrings, item);
  detailVisibleEarrings.value = true;
};

const loginForm = reactive({
  account: "",
  pwd: "",
});

//會員資料登入
const Login = () => {
  
  if (loginForm.account === "Random") {
    router.push({ path: '/randomStation' })
    return;
  }

  if (loginForm.account === "Admin" && loginForm.pwd === "abc1234") {
    // 設置登入狀態
    isLoggedIn.value = true;
    currentUser.value = loginForm.account;
    
    // 保存登入狀態到 localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', loginForm.account);
    
    // 載入該用戶的最愛
    loadFavorites();
    
    // 關閉登入對話框
    detailLogin.value = false;
    
    // 清空登入表單
    loginForm.account = '';
    loginForm.pwd = '';
    
    ElMessage.success('登入成功！現在可以使用收藏功能了');
    // 移除自動跳轉，讓用戶留在首頁
  }else{
    ElMessageBox.alert('登入失敗')
  }
};

const input = ref("");
//搜尋水晶手串
const searchCrystal = () => {
  // const newRow = Array<IProduction>();

  tempOriginal.length = 0;
  production.length = 0;
  crystalPage.value = 1;
  original.forEach((item) => {
    if (
      (item.title.includes(input.value) ||
        item.forPerson.includes(input.value) || item.note.includes(input.value) ||
        !input.value) &&
      (item.priceType === selectPrice.value || !selectPrice.value)
    ) {
      tempOriginal.push(item);
    }
  });
  tempOriginal.slice(0, 12).forEach((item) => production.push(item));

  productionTurtle.length = 0;
  originalTurtle.forEach((item) => {
    if (
      (item.title.includes(input.value) || !input.value) &&
      (item.priceType === selectPrice.value || !selectPrice.value)
    ) {
      productionTurtle.push(item);
    }
  });

  productionballs.length = 0;
  originalballs.forEach((item) => {
    if (
      (item.title.includes(input.value) || !input.value) &&
      (item.priceType === selectPrice.value || !selectPrice.value)
    ) {
      productionballs.push(item);
    }
  });
  productionOre.length = 0;
  originalOre.forEach((item) => {
    if (
      (item.title.includes(input.value) || !input.value) &&
      (item.priceType === selectPrice.value || !selectPrice.value)
    ) {
      productionOre.push(item);
    }
  });
  productionNecklace.length = 0;
  originalNecklace.forEach((item) => {
    if (
      (item.title.includes(input.value) || !input.value) &&
      (item.priceType === selectPrice.value || !selectPrice.value)
    ) {
      productionNecklace.push(item);
    }
  });
  productionEarrings.length = 0;
  originalEarrings.forEach((item) => {
    if (
      (item.title.includes(input.value) || !input.value) &&
      (item.priceType === selectPrice.value || !selectPrice.value)
    ) {
      productionEarrings.push(item);
    }
  });

  // 關閉搜尋對話框
  detailSearch.value = false;
  
  // 顯示搜尋結果訊息給使用者
  const totalResults = tempOriginal.length + productionTurtle.length + productionballs.length + 
                      productionOre.length + productionNecklace.length + productionEarrings.length;
  
  const searchTerm = input.value || '全部商品';
  const priceFilter = selectPrice.value ? productionPrice.find(p => p.value === selectPrice.value)?.label : '';
  
  let message = `搜尋「${searchTerm}」`;
  if (priceFilter) {
    message += ` (${priceFilter})`;
  }
  message += ` 找到 ${totalResults} 個結果`;
  
  ElMessage.success(message);
};

// 切換手機選單顯示狀態

function toggleMenu() {
  const menu = document.getElementById("navMenuMobile");
  if (menu) {
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
  }
}

//打開搜尋欄位
const openSearch = () => {
  detailSearch.value = true;
};

//打開登入欄位
const openLogin = () => {
  detailLogin.value = true;
};

// 購物車相關
const cartVisible = ref(false);
const cartItems = ref<Array<any>>([]);

// 我的最愛相關
const favoriteItems = ref<Array<any>>([]);
const isLoggedIn = ref(false);
const currentUser = ref('');

const cartItemCount = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0);
});

const openCart = () => {
  cartVisible.value = true;
};

const addToCart = (type: string, item: any) => {
  const existingItem = cartItems.value.find(cartItem => 
    cartItem.title === item.title && cartItem.type === type
  );
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.value.push({
      title: item.title,
      type: type,
      quantity: 1,
      item: item
    });
  }
  
  ElMessageBox.alert(`已將 ${item.title} 加入購物車！`, '成功', {
    type: 'success'
  });
};

const updateCartItem = (index: number, quantity: number) => {
  if (quantity > 0) {
    cartItems.value[index].quantity = quantity;
  }
};

const removeFromCart = (index: number) => {
  cartItems.value.splice(index, 1);
};

const clearCart = () => {
  ElMessageBox.confirm('確定要清空購物車嗎？', '確認', {
    type: 'warning'
  }).then(() => {
    cartItems.value = [];
    ElMessageBox.alert('購物車已清空', '完成');
  }).catch(() => {
    // 用戶取消
  });
};

const checkout = () => {
  if (cartItems.value.length === 0) {
    ElMessageBox.alert('購物車是空的，請先添加商品！', '提示');
    return;
  }
  
  // 將購物車數據保存到 localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
  
  // 導向結帳頁面
  router.push('/checkout');
};

// 我的最愛功能
const loadFavorites = () => {
  if (isLoggedIn.value && currentUser.value) {
    const savedFavorites = localStorage.getItem(`favorites_${currentUser.value}`);
    if (savedFavorites) {
      favoriteItems.value = JSON.parse(savedFavorites);
    }
  }
};

const saveFavorites = () => {
  if (isLoggedIn.value && currentUser.value) {
    localStorage.setItem(`favorites_${currentUser.value}`, JSON.stringify(favoriteItems.value));
  }
};

const isFavorite = (type: string, item: any) => {
  if (!isLoggedIn.value) return false;
  return favoriteItems.value.some(fav => 
    fav.type === type && fav.title === item.title
  );
};

const toggleFavorite = (type: string, item: any) => {
  if (!isLoggedIn.value) {
    ElMessage.warning('請先登入會員才能使用收藏功能');
    return;
  }

  const existingIndex = favoriteItems.value.findIndex(fav => 
    fav.type === type && fav.title === item.title
  );

  if (existingIndex > -1) {
    // 移除收藏
    favoriteItems.value.splice(existingIndex, 1);
    ElMessage.success('已從我的最愛移除');
  } else {
    // 添加到收藏
    favoriteItems.value.push({
      ...item,
      type: type,
      favoriteTime: new Date().toISOString()
    });
    ElMessage.success('已加入我的最愛');
  }
  
  saveFavorites();
};

const openFavoriteDetail = (item: any) => {
  // 根據商品類型開啟對應的詳細視窗
  switch (item.type) {
    case 'crystal':
      Object.assign(detailInfo, item);
      detailVisible.value = true;
      break;
    case 'turtle':
      Object.assign(detailInfoTurtle, item);
      detailVisibleTurtle.value = true;
      break;
    case 'balls':
      Object.assign(detailInfoballs, item);
      detailVisibleballs.value = true;
      break;
    case 'ore':
      Object.assign(detailInfoOre, item);
      detailVisibleOre.value = true;
      break;
    case 'necklace':
      Object.assign(detailInfoNecklace, item);
      detailVisibleNecklace.value = true;
      break;
    case 'earrings':
      Object.assign(detailInfoEarrings, item);
      detailVisibleEarrings.value = true;
      break;
  }
};

const showAllFavorites = () => {
  // 創建一個顯示所有收藏的對話框
  ElMessageBox.alert(
    `您總共收藏了 ${favoriteItems.value.length} 個商品！<br/>
    您可以在商品詳細頁面中管理您的收藏。`,
    '我的最愛',
    {
      dangerouslyUseHTMLString: true,
      type: 'info'
    }
  );
};

// 處理用戶下拉選單
const handleUserMenu = (command: string) => {
  switch (command) {
    case 'member':
      router.push('/member');
      break;
    case 'orders':
      router.push('/orders');
      break;
    case 'logout':
      logout();
      break;
  }
};

// 登出功能
const logout = () => {
  ElMessageBox.confirm('確定要登出嗎？', '確認登出', {
    type: 'warning'
  }).then(() => {
    isLoggedIn.value = false;
    currentUser.value = '';
    favoriteItems.value = [];
    
    // 清除 localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    
    ElMessage.success('已成功登出');
  }).catch(() => {
    // 用戶取消登出
  });
};

interface ICover {
  imgUrl: string;
  imgUrlSamll: string;
}

interface IProduction {
  imgUrl: string;
  title: string;
  note: string;
  description: string;
  head_size: string;
  crystal_size: string;
  price: string;
  forPerson: string;
  priceType?: string;
}

interface IproductionTurtle {
  imgUrl: string;
  title: string;
  note: string;
  description: string;
  size: string;
  price: string;
  priceType?: string;
}

interface Iproductionballs {
  imgUrl: string;
  title: string;
  note: string;
  description: string;
  size: string;
  price: string;
  priceType?: string;
}

interface IproductionOre {
  imgUrl: string;
  title: string;
  note: string;
  description: string;
  size: string;
  price: string;
  priceType?: string;
}

interface IproductionNecklace {
  imgUrl: string;
  title: string;
  note: string;
  description: string;
  size: string;
  price: string;
  priceType?: string;
}

interface IproductionEarrings {
  imgUrl: string;
  title: string;
  note: string;
  description: string;
  size: string;
  price: string;
  priceType?: string;
  id: string;
}

//設計款分頁
const crystalOne = (currentPage: number, pageSize: number) => {
  const pageData = tempOriginal.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  production.length = 0;
  pageData.forEach((item) => {
    production.push(item);
  });
};

//雕刻件的分頁事件
const handleTurtlePage = (currentPage: number, pageSize: number) => {
  const pageData = tempOriginalTurtle.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  productionTurtle.length = 0;
  pageData.forEach((item) => {
    productionTurtle.push(item);
  });
};

//球球系列
const handleBallsPage = (currentPage: number, pageSize: number) => {
  const pageData = tempOriginalballs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  productionballs.length = 0;
  pageData.forEach((item) => {
    productionballs.push(item);
  });
};

//原礦系列
const handleOrePage = (currentPage: number, pageSize: number) => {
  const pageData = tempOriginalOre.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  productionOre.length = 0;
  pageData.forEach((item) => {
    productionOre.push(item);
  });
};
//項鍊系列
const handleNecklacePage = (currentPage: number, pageSize: number) => {
  const pageData = tempOriginalNecklace.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  productionNecklace.length = 0;
  pageData.forEach((item) => {
    productionNecklace.push(item);
  });
};
//耳環系列
const handleEarringsPage = (currentPage: number, pageSize: number) => {
  const pageData = tempOriginalEarrings.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  productionEarrings.length = 0;
  pageData.forEach((item) => {
    productionEarrings.push(item);
  });
};

const crystalOptions = ref("first");

const originalcover: Array<ICover> = [
  {
    imgUrl: "https://i.imgur.com/gdQvu9y.png",
    imgUrlSamll: "https://i.imgur.com/0ktv9Am.png",
  },
  {
    imgUrl: "https://i.imgur.com/WQuzfuy.jpeg",
    imgUrlSamll: "https://i.imgur.com/V0Okrl3.jpeg",
  },
  {
    imgUrl: "https://i.imgur.com/GduXnt8.jpeg",
    imgUrlSamll: "https://i.imgur.com/DCz9YCL.jpeg",
  },
  {
    imgUrl: "https://i.imgur.com/JuNdJxp.jpeg",
    imgUrlSamll: "https://i.imgur.com/886JGqO.png",
  },
  {
    imgUrl: "https://i.imgur.com/GtbSeIi.png",
    imgUrlSamll: "https://i.imgur.com/Jz5lVQl.png",
  },
];

//型別要注意~
//手串資料
const original: Array<IProduction> = crystals;
const tempOriginal: Array<IProduction> = reactive([]);
const crystalPage = ref(1);
//雕刻件資料
const originalTurtle: Array<IproductionTurtle> = tutles;
const tempOriginalTurtle: Array<IproductionTurtle> = reactive([]);
const TurtlePage = ref(1);
//球球系列資料
const originalballs: Array<Iproductionballs> = balls;
const tempOriginalballs: Array<Iproductionballs> = reactive([]);
const ballsPage = ref(1);
//原礦系列資料
const originalOre: Array<IproductionOre> = ores;
const tempOriginalOre: Array<IproductionOre> = reactive([]);
const OrePage = ref(1);
//項鍊系列資料
const originalNecklace: Array<IproductionNecklace> = necklace;
const tempOriginalNecklace: Array<IproductionNecklace> = reactive([]);
const NecklacePage = ref(1);
//耳環系列資料
const originalEarrings: Array<IproductionEarrings> = earrings;
const tempOriginalEarrings: Array<IproductionEarrings> = reactive([]);
const EarringsPage = ref(1);

const cover: Array<ICover> = reactive([]);
const production: Array<IProduction> = reactive([]);
const productionTurtle: Array<IproductionTurtle> = reactive([]);
const productionballs: Array<Iproductionballs> = reactive([]);
const productionOre: Array<IproductionOre> = reactive([]);
const productionNecklace: Array<IproductionNecklace> = reactive([]);
const productionEarrings: Array<IproductionEarrings> = reactive([]);

onMounted(() => {
  original.forEach((item) => tempOriginal.push(item));
  original.slice(0, 12).forEach((item) => production.push(item));

  originalTurtle.slice(0, 12).forEach((item) => productionTurtle.push(item));

  originalballs.slice(0, 12).forEach((item) => productionballs.push(item));

  originalcover.slice(0, 12).forEach((item) => cover.push(item));
  originalOre.slice(0, 12).forEach((item) => productionOre.push(item));
  originalNecklace
    .slice(0, 12)
    .forEach((item) => productionNecklace.push(item));
  originalEarrings
    .slice(0, 12)
    .forEach((item) => productionEarrings.push(item));
  
  // 檢查是否有保存的登入狀態
  const savedLoginStatus = localStorage.getItem('isLoggedIn');
  const savedUser = localStorage.getItem('currentUser');
  if (savedLoginStatus === 'true' && savedUser) {
    isLoggedIn.value = true;
    currentUser.value = savedUser;
    loadFavorites();
  }
  
  // 檢查是否有從會員中心點擊的收藏項目
  const favoriteDetailData = sessionStorage.getItem('openFavoriteDetail');
  if (favoriteDetailData) {
    try {
      const item = JSON.parse(favoriteDetailData);
      sessionStorage.removeItem('openFavoriteDetail'); // 清除暫存資料
      
      // 延遲一下再開啟對話框，確保頁面已載入完成
      setTimeout(() => {
        openFavoriteDetail(item);
      }, 500);
    } catch (error) {
      console.error('解析收藏項目資料失敗:', error);
    }
  }
});
</script>
