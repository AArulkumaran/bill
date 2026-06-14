import { useState, useEffect, useRef, useMemo, useCallback, memo } from "react";

// ─── FULL MENU DATA ─────────────────────────────────────────────────────────
const MENU = [
  { id:1, name:"Gulab Jamun Ice Cream", category:"Moon Light Special", foodType:"veg", basePrice:199 },
  { id:2, name:"Puttu Ice Cream", category:"Moon Light Special", foodType:"veg", basePrice:299 },
  { id:3, name:"Titanic Ice Cream", category:"Moon Light Special", foodType:"veg", basePrice:299 },
  { id:4, name:"Rainbow Delight", category:"Moon Light Special", foodType:"veg", basePrice:299 },
  { id:5, name:"Dry Fruit Sundae", category:"Moon Light Special", foodType:"veg", basePrice:199 },
  { id:6, name:"Hot Choco Brownie Sundae", category:"Moon Light Special", foodType:"veg", basePrice:199 },
  { id:7, name:"French Fries (Salted)", category:"Starters", foodType:"veg", basePrice:100, extraNote:"Extra Dip - ₹15" },
  { id:8, name:"French Fries (Peri Peri)", category:"Starters", foodType:"veg", basePrice:100, extraNote:"Extra Dip - ₹15" },
  { id:9, name:"Cheese Fries", category:"Starters", foodType:"veg", basePrice:120, extraNote:"Extra Dip - ₹15" },
  { id:10, name:"Mayo Fries", category:"Starters", foodType:"veg", basePrice:120, extraNote:"Extra Dip - ₹15" },
  { id:11, name:"Chicken Loaded Fries", category:"Starters", foodType:"non-veg", basePrice:150, extraNote:"Extra Dip - ₹15" },
  { id:12, name:"Smiley", category:"Starters", foodType:"veg", basePrice:100, extraNote:"Extra Dip - ₹15" },
  { id:13, name:"Veg Nuggets", category:"Starters", foodType:"veg", basePrice:100, extraNote:"Extra Dip - ₹15" },
  { id:14, name:"Chicken Nuggets", category:"Starters", foodType:"non-veg", basePrice:110, extraNote:"Extra Dip - ₹15" },
  { id:15, name:"Veg Roll", category:"Starters", foodType:"veg", basePrice:100, extraNote:"Extra Dip - ₹15" },
  { id:16, name:"Chicken Roll", category:"Starters", foodType:"non-veg", basePrice:130, extraNote:"Extra Dip - ₹15" },
  { id:17, name:"Veg Momos", category:"Momos", section:"VEG", foodType:"veg", basePrice:100, extraNote:"Extra Dip - ₹15" },
  { id:18, name:"Veg Schezwan Momos", category:"Momos", section:"VEG", foodType:"veg", basePrice:150, extraNote:"Extra Dip - ₹15" },
  { id:19, name:"Paneer Momos", category:"Momos", section:"VEG", foodType:"veg", basePrice:175, extraNote:"Extra Dip - ₹15" },
  { id:20, name:"Corn Cheese", category:"Momos", section:"VEG", foodType:"veg", basePrice:195, extraNote:"Extra Dip - ₹15" },
  { id:21, name:"Mushroom Momos", category:"Momos", section:"VEG", foodType:"veg", basePrice:180, extraNote:"Extra Dip - ₹15" },
  { id:22, name:"Paneer Tikka Momos", category:"Momos", section:"VEG", foodType:"veg", basePrice:180, extraNote:"Extra Dip - ₹15" },
  { id:23, name:"Chicken Momos", category:"Momos", section:"NON-VEG", foodType:"non-veg", basePrice:110, extraNote:"Extra Dip - ₹15" },
  { id:24, name:"Butter Chicken Momos", category:"Momos", section:"NON-VEG", foodType:"non-veg", basePrice:160, extraNote:"Extra Dip - ₹15" },
  { id:25, name:"Chicken Schezwan Momos", category:"Momos", section:"NON-VEG", foodType:"non-veg", basePrice:165, extraNote:"Extra Dip - ₹15" },
  { id:26, name:"Chicken Barbique", category:"Momos", section:"NON-VEG", foodType:"non-veg", basePrice:180, extraNote:"Extra Dip - ₹15" },
  { id:27, name:"Chicken Cheese Momos", category:"Momos", section:"NON-VEG", foodType:"non-veg", basePrice:195, extraNote:"Extra Dip - ₹15" },
  { id:28, name:"Chicken Tikka Momos", category:"Momos", section:"NON-VEG", foodType:"non-veg", basePrice:160, extraNote:"Extra Dip - ₹15" },
  { id:29, name:"Veg Sandwich", category:"Sandwich", foodType:"veg", extraNote:"Extra Cheese - ₹15", variants:[{label:"Regular",price:90},{label:"Tandoori",price:100},{label:"Mexican",price:100}] },
  { id:30, name:"Egg Sandwich", category:"Sandwich", foodType:"non-veg", extraNote:"Extra Cheese - ₹15", variants:[{label:"Regular",price:120},{label:"Tandoori",price:130},{label:"Mexican",price:130}] },
  { id:31, name:"Corn Sandwich", category:"Sandwich", foodType:"veg", extraNote:"Extra Cheese - ₹15", variants:[{label:"Regular",price:120},{label:"Tandoori",price:130},{label:"Mexican",price:130}] },
  { id:32, name:"Paneer Sandwich", category:"Sandwich", foodType:"veg", extraNote:"Extra Cheese - ₹15", variants:[{label:"Regular",price:130},{label:"Tandoori",price:140},{label:"Mexican",price:140}] },
  { id:33, name:"Fried Chicken Sandwich", category:"Sandwich", foodType:"non-veg", extraNote:"Extra Cheese - ₹15", variants:[{label:"Regular",price:170},{label:"Tandoori",price:180},{label:"Mexican",price:180}] },
  { id:34, name:"Veg Burger", category:"Burger", foodType:"veg", extraNote:"Extra Cheese - ₹15", variants:[{label:"Regular",price:99},{label:"Schezwan",price:110},{label:"Mexican",price:110}] },
  { id:35, name:"Paneer Burger", category:"Burger", foodType:"veg", extraNote:"Extra Cheese - ₹15", variants:[{label:"Regular",price:170},{label:"Schezwan",price:180},{label:"Mexican",price:180}] },
  { id:36, name:"Chicken Burger", category:"Burger", foodType:"non-veg", extraNote:"Extra Cheese - ₹15", variants:[{label:"Regular",price:149},{label:"Schezwan",price:160},{label:"Mexican",price:160}] },
  { id:37, name:"Fried Chicken Burger", category:"Burger", foodType:"non-veg", extraNote:"Extra Cheese - ₹15", variants:[{label:"Regular",price:199},{label:"Schezwan",price:210},{label:"Mexican",price:210}] },
  { id:38, name:"No Bun Burger", category:"Burger", foodType:"non-veg", basePrice:250, extraNote:"Extra Cheese - ₹15" },
  { id:39, name:"Veg Pizza", category:"Pizza", foodType:"veg", basePrice:150, extraNote:"Extra Cheese - ₹15" },
  { id:40, name:"Corn Pizza", category:"Pizza", foodType:"veg", basePrice:180, extraNote:"Extra Cheese - ₹15" },
  { id:41, name:"Paneer Pizza", category:"Pizza", foodType:"veg", basePrice:180, extraNote:"Extra Cheese - ₹15" },
  { id:42, name:"Fried Chicken Pizza", category:"Pizza", foodType:"non-veg", basePrice:200, extraNote:"Extra Cheese - ₹15" },
  { id:43, name:"Chicken Wings (Korean)", category:"Korean Spicy / Garlic", foodType:"non-veg", basePrice:179 },
  { id:44, name:"Chicken Lollipop (Korean)", category:"Korean Spicy / Garlic", foodType:"non-veg", basePrice:179 },
  { id:45, name:"Chicken Popcorn (Korean)", category:"Korean Spicy / Garlic", foodType:"non-veg", basePrice:179 },
  { id:46, name:"Chicken Momos (Korean)", category:"Korean Spicy / Garlic", foodType:"non-veg", basePrice:179 },
  { id:47, name:"Chicken Strips (4 pcs)", category:"Fried Chicken", foodType:"non-veg", basePrice:149 },
  { id:48, name:"Chicken Drumstick (2 pcs)", category:"Fried Chicken", foodType:"non-veg", basePrice:149 },
  { id:49, name:"Chicken Wings (4 pcs)", category:"Fried Chicken", foodType:"non-veg", basePrice:149 },
  { id:50, name:"Chicken Popcorn (8-12 pcs)", category:"Fried Chicken", foodType:"non-veg", basePrice:149 },
  { id:51, name:"Chicken Lollipop (4 pcs)", category:"Fried Chicken", foodType:"non-veg", basePrice:149 },
  { id:52, name:"Mixed Chicken", category:"Fried Chicken", foodType:"non-veg", basePrice:149 },
  { id:53, name:"Vanilla", category:"Ice Cream", foodType:"veg", basePrice:45 },
  { id:54, name:"Strawberry", category:"Ice Cream", foodType:"veg", basePrice:45 },
  { id:55, name:"Mango", category:"Ice Cream", foodType:"veg", basePrice:50 },
  { id:56, name:"Butterscotch", category:"Ice Cream", foodType:"veg", basePrice:50 },
  { id:57, name:"Pista", category:"Ice Cream", foodType:"veg", basePrice:60 },
  { id:58, name:"Chocolate", category:"Ice Cream", foodType:"veg", basePrice:60 },
  { id:59, name:"Black Current", category:"Ice Cream", foodType:"veg", basePrice:70 },
  { id:60, name:"Red Velvet", category:"Spl Ice Cream", foodType:"veg", basePrice:150 },
  { id:61, name:"Tender Coconut", category:"Spl Ice Cream", foodType:"veg", basePrice:150 },
  { id:62, name:"Cotton Candy", category:"Spl Ice Cream", foodType:"veg", basePrice:150 },
  { id:63, name:"Caramel Latte", category:"Spl Ice Cream", foodType:"veg", basePrice:150 },
  { id:64, name:"Spanish Delight", category:"Spl Ice Cream", foodType:"veg", basePrice:150 },
  { id:65, name:"Kulfi", category:"Spl Ice Cream", foodType:"veg", basePrice:150 },
  { id:66, name:"Red Velvet Shake", category:"Spl Milkshake", foodType:"veg", basePrice:200 },
  { id:67, name:"Tender Coconut Shake", category:"Spl Milkshake", foodType:"veg", basePrice:200 },
  { id:68, name:"Cotton Candy Shake", category:"Spl Milkshake", foodType:"veg", basePrice:200 },
  { id:69, name:"Brownie Shake", category:"Spl Milkshake", foodType:"veg", basePrice:150 },
  { id:70, name:"Vanilla Shake", category:"Milkshake", foodType:"veg", basePrice:120 },
  { id:71, name:"Strawberry Shake", category:"Milkshake", foodType:"veg", basePrice:120 },
  { id:72, name:"Mango Shake", category:"Milkshake", foodType:"veg", basePrice:150 },
  { id:73, name:"Pista Shake", category:"Milkshake", foodType:"veg", basePrice:150 },
  { id:74, name:"Chocolate Shake", category:"Milkshake", foodType:"veg", basePrice:150 },
  { id:75, name:"Butterscotch Shake", category:"Milkshake", foodType:"veg", basePrice:150 },
  { id:76, name:"Black Current Shake", category:"Milkshake", foodType:"veg", basePrice:160 },
  { id:77, name:"Cold Coffee Shake", category:"Milkshake", foodType:"veg", basePrice:150 },
  { id:78, name:"Oreo Shake", category:"Milkshake", foodType:"veg", basePrice:160 },
  { id:79, name:"Kitkat Shake", category:"Milkshake", foodType:"veg", basePrice:160 },
  { id:80, name:"Kulfi Shake", category:"Milkshake", foodType:"veg", basePrice:160 },
  { id:81, name:"Mini Falooda", category:"Falooda", foodType:"veg", basePrice:120 },
  { id:82, name:"Mango Falooda", category:"Falooda", foodType:"veg", basePrice:160 },
  { id:83, name:"Chocolate Bliss", category:"Falooda", foodType:"veg", basePrice:180 },
  { id:84, name:"Arabian Nights", category:"Falooda", foodType:"veg", basePrice:180 },
  { id:85, name:"Special Falooda", category:"Falooda", foodType:"veg", basePrice:180 },
  { id:86, name:"Royal Falooda", category:"Falooda", foodType:"veg", basePrice:200 },
  { id:87, name:"Gulab Jamun Falooda", category:"Falooda", foodType:"veg", basePrice:180 },
  { id:88, name:"Kulfi Falooda", category:"Falooda", foodType:"veg", basePrice:200 },
  { id:89, name:"Blue Curacao", category:"Mocktail", foodType:"veg", basePrice:100 },
  { id:90, name:"Bubble Gum", category:"Mocktail", foodType:"veg", basePrice:100 },
  { id:91, name:"Lemon Mint", category:"Mocktail", foodType:"veg", basePrice:100 },
  { id:92, name:"Watermelon", category:"Mocktail", foodType:"veg", basePrice:100 },
  { id:93, name:"Green Apple", category:"Mocktail", foodType:"veg", basePrice:100 },
  { id:94, name:"Spicy Lemon Soda", category:"Mocktail", foodType:"veg", basePrice:80 },
  { id:95, name:"Brownie", category:"Desserts", foodType:"veg", basePrice:70 },
  { id:96, name:"Choco Lava Cake", category:"Desserts", foodType:"veg", basePrice:80 },
  { id:97, name:"Brownie with Vanilla", category:"Desserts", foodType:"veg", basePrice:120 },
  { id:98, name:"Brownie with Butterscotch", category:"Desserts", foodType:"veg", basePrice:130 },
  { id:99, name:"Brownie with Chocolate", category:"Desserts", foodType:"veg", basePrice:150 },
  { id:100, name:"Sizzling Brownie", category:"Desserts", foodType:"veg", basePrice:150 },
  { id:101, name:"Rosemilk Tres Leches", category:"Desserts", foodType:"veg", basePrice:150 },
  { id:102, name:"Pista Tres Leches", category:"Desserts", foodType:"veg", basePrice:150 },
  { id:103, name:"Caramel Tres Leches", category:"Desserts", foodType:"veg", basePrice:150 },
  { id:104, name:"Hot Chocolate", category:"Desserts", foodType:"veg", basePrice:150 },
  { id:105, name:"Veg Maggie", category:"Maggie / Bread Omelette", foodType:"veg", basePrice:60, extraNote:"Extra Cheese - ₹15" },
  { id:106, name:"Egg Maggie", category:"Maggie / Bread Omelette", foodType:"non-veg", basePrice:80, extraNote:"Extra Cheese - ₹15" },
  { id:107, name:"Chicken Maggie", category:"Maggie / Bread Omelette", foodType:"non-veg", basePrice:100, extraNote:"Extra Cheese - ₹15" },
  { id:108, name:"Bread Omelette", category:"Maggie / Bread Omelette", foodType:"non-veg", basePrice:80 },
  { id:109, name:"Cheese Bread Omelette", category:"Maggie / Bread Omelette", foodType:"non-veg", basePrice:100 },
  { id:110, name:"Assorted Brownie",   category:"Brownies (Pre-Order)", foodType:"veg", extraNote:"Pre Order Only", variants:[{label:"1/2 KG",price:600},{label:"1 KG",price:1200}] },
  { id:111, name:"Chocochip Brownie",  category:"Brownies (Pre-Order)", foodType:"veg", extraNote:"Pre Order Only", variants:[{label:"1/2 KG",price:500},{label:"1 KG",price:1000}] },
  { id:112, name:"Double Brownie",     category:"Brownies (Pre-Order)", foodType:"veg", extraNote:"Pre Order Only", variants:[{label:"1/2 KG",price:500},{label:"1 KG",price:1050}] },
  { id:113, name:"Fudgy Brownie",      category:"Brownies (Pre-Order)", foodType:"veg", extraNote:"Pre Order Only", variants:[{label:"1/2 KG",price:400},{label:"1 KG",price:800}] },
  { id:1130,name:"Nutella Brownie",    category:"Brownies (Pre-Order)", foodType:"veg", extraNote:"Pre Order Only", variants:[{label:"1/2 KG",price:500},{label:"1 KG",price:1000}] },
  { id:1131,name:"Nuts Brownie",       category:"Brownies (Pre-Order)", foodType:"veg", extraNote:"Pre Order Only", variants:[{label:"1/2 KG",price:500},{label:"1 KG",price:1000}] },
  { id:1132,name:"Ragi Brownie",       category:"Brownies (Pre-Order)", foodType:"veg", extraNote:"Pre Order Only", variants:[{label:"1/2 KG",price:450},{label:"1 KG",price:900}] },
  { id:1133,name:"Triple Brownie",     category:"Brownies (Pre-Order)", foodType:"veg", extraNote:"Pre Order Only", variants:[{label:"1/2 KG",price:550},{label:"1 KG",price:1100}] },
  { id:1134,name:"Wheat Brownie",      category:"Brownies (Pre-Order)", foodType:"veg", extraNote:"Pre Order Only", variants:[{label:"1/2 KG",price:450},{label:"1 KG",price:900}] },
  { id:114, name:"Vanilla Cake", category:"Home Made Cake (Pre-Order)", foodType:"veg", extraNote:"Pre Order Only", variants:[{label:"Regular",price:700},{label:"Premium",price:1000}] },
  { id:115, name:"Chocolate Cake", category:"Home Made Cake (Pre-Order)", foodType:"veg", extraNote:"Pre Order Only", variants:[{label:"Regular",price:800},{label:"Premium",price:1200}] },
  { id:116, name:"Strawberry Cake", category:"Home Made Cake (Pre-Order)", foodType:"veg", extraNote:"Pre Order Only", variants:[{label:"Regular",price:900},{label:"Premium",price:1100}] },
  { id:117, name:"Black Forest Cake", category:"Home Made Cake (Pre-Order)", foodType:"veg", extraNote:"Pre Order Only", variants:[{label:"Regular",price:750}] },
  { id:118, name:"Butterscotch Cake", category:"Home Made Cake (Pre-Order)", foodType:"veg", extraNote:"Pre Order Only", variants:[{label:"Regular",price:850},{label:"Premium",price:1200}] },
  { id:119, name:"Choco Truffle Cake", category:"Moon Light Special Cakes (Pre-Order)", foodType:"veg", basePrice:1000, extraNote:"Pre Order Only" },
  { id:120, name:"Red Velvet Cake", category:"Moon Light Special Cakes (Pre-Order)", foodType:"veg", basePrice:1000, extraNote:"Pre Order Only" },
  { id:121, name:"Cotton Candy Cake", category:"Moon Light Special Cakes (Pre-Order)", foodType:"veg", basePrice:1300, extraNote:"Pre Order Only" },
  { id:122, name:"Kitkat Cake", category:"Moon Light Special Cakes (Pre-Order)", foodType:"veg", basePrice:1200, extraNote:"Pre Order Only" },
  { id:123, name:"Gulab Jamun Cake", category:"Moon Light Special Cakes (Pre-Order)", foodType:"veg", basePrice:1200, extraNote:"Pre Order Only" },
];

const CAT_EMOJI = {
  "Moon Light Special":     "✨",
  "Starters":               "🍟",
  "Momos":                  "🥟",
  "Sandwich":               "🥪",
  "Burger":                 "🍔",
  "Pizza":                  "🍕",
  "Korean Spicy / Garlic":  "🌶️",
  "Fried Chicken":          "🍗",
  "Ice Cream":              "🍦",
  "Spl Ice Cream":          "🍨",
  "Spl Milkshake":          "🧋",
  "Milkshake":              "🥛",
  "Falooda":                "🫙",
  "Mocktail":               "🍹",
  "Desserts":               "🍰",
  "Maggie / Bread Omelette":"🍳",
  "Brownies (Pre-Order)":   "🍫",
  "Home Made Cake (Pre-Order)":"🎂",
  "Moon Light Special Cakes (Pre-Order)":"🌙",
};

// ─── MASTER STYLESHEET ──────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,700;1,9..144,400&family=Manrope:wght@400;500;600;700;800&family=Roboto+Mono:wght@400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#07070F; --surface:#0F0F1C; --card:#141424; --line:rgba(255,255,255,.07);
  --cream:#FBF7EF; --gold:#F0C36D; --gold2:#FFD97D; --goldDark:#C89A3A;
  --blue:#3FB6F2; --blue2:#7DD8FF; --ember:#E2483D; --sage:#3FA66B;
  --purple:#8B7CF6; --pink:#F06292;
}
html,body,#root{height:100%;overflow:hidden;}
body{font-family:'Manrope',sans-serif;background:var(--bg);color:var(--cream);-webkit-font-smoothing:antialiased;}
.ff{font-family:'Fraunces',serif;}
.fm{font-family:'Roboto Mono',monospace;}
button{cursor:pointer;border:none;background:none;font-family:inherit;color:inherit;outline:none;}
input{font-family:inherit;outline:none;}
::-webkit-scrollbar{width:3px;height:3px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:99px;}
::-webkit-scrollbar-thumb:hover{background:rgba(255,255,255,.2);}

/* ── Animated background mesh ── */
.mesh-bg{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;}
.mesh-orb{position:absolute;border-radius:50%;filter:blur(80px);animation:orbDrift var(--d,20s) ease-in-out var(--delay,0s) infinite alternate;}
@keyframes orbDrift{0%{transform:translate(0,0) scale(1)}100%{transform:translate(var(--tx,40px),var(--ty,30px)) scale(var(--s,1.1))}}

/* ── Star canvas ── */
.stars-canvas{position:fixed;inset:0;pointer-events:none;z-index:0;}

/* ── Page transitions ── */
.p-in{animation:pIn .55s cubic-bezier(.22,1,.36,1) both;}
.p-out{animation:pOut .35s ease forwards;}
@keyframes pIn{from{opacity:0;transform:translateY(30px) scale(.96) blur(4px)}to{opacity:1;transform:none filter:none}}
@keyframes pOut{to{opacity:0;transform:translateY(-20px) scale(.97)}}

/* ── Card animations ── */
.card-in{opacity:0;animation:cardIn .5s cubic-bezier(.34,1.3,.64,1) var(--delay,0s) forwards;}
@keyframes cardIn{from{opacity:0;transform:translateY(22px) scale(.94)}to{opacity:1;transform:none}}

/* ── Hover lift ── */
.lift{transition:transform .3s cubic-bezier(.34,1.56,.64,1),box-shadow .3s cubic-bezier(.34,1.56,.64,1),border-color .2s,background .25s;}
.lift:hover{transform:translateY(-5px) scale(1.018);box-shadow:0 18px 44px rgba(0,0,0,.45),0 0 0 1px rgba(63,182,242,.18),0 0 30px rgba(63,182,242,.06);}

/* ── Glow pulse ── */
.glow{animation:glowAnim 3s ease-in-out infinite;}
@keyframes glowAnim{0%,100%{box-shadow:0 0 24px rgba(240,195,109,.2),0 0 0 1px rgba(240,195,109,.15)}50%{box-shadow:0 0 48px rgba(240,195,109,.5),0 0 80px rgba(240,195,109,.12),0 0 0 1px rgba(240,195,109,.3)}}

/* ── Float ── */
.float{animation:floatAnim var(--fd,5s) ease-in-out var(--fdelay,0s) infinite;}
@keyframes floatAnim{0%,100%{transform:translateY(0) rotate(var(--rot,0deg))}50%{transform:translateY(var(--fy,-10px)) rotate(var(--rot2,0deg))}}

/* ── Spin ── */
.spin{animation:spinAnim var(--sd,1s) linear infinite;}
@keyframes spinAnim{to{transform:rotate(360deg)}}

/* ── Shimmer sweep ── */
.shimmer{position:relative;overflow:hidden;}
.shimmer::after{content:'';position:absolute;inset:0;background:linear-gradient(100deg,transparent 30%,rgba(255,255,255,.06) 50%,transparent 70%);background-size:200% 100%;animation:shimmerSweep 2.8s infinite;}
@keyframes shimmerSweep{0%{background-position:200% 0}100%{background-position:-200% 0}}

/* ── Count change flash ── */
.flash{animation:flashAnim .4s cubic-bezier(.34,1.56,.64,1);}
@keyframes flashAnim{0%{transform:scale(1.35);color:var(--gold2)}100%{transform:scale(1)}}

/* ── Cart item enter/exit ── */
.ci-in{animation:ciIn .38s cubic-bezier(.34,1.4,.64,1) both;}
@keyframes ciIn{from{opacity:0;transform:translateX(24px) scale(.88)}to{opacity:1;transform:none}}
.ci-out{animation:ciOut .25s ease forwards;}
@keyframes ciOut{to{opacity:0;transform:translateX(30px) scale(.85);max-height:0;margin:0;padding:0;overflow:hidden;}}

/* ── Table pulse ring ── */
.pulse-ring::before{content:'';position:absolute;inset:-5px;border-radius:inherit;border:2px solid rgba(240,195,109,.5);animation:pulseRing 2.2s ease-out infinite;}
@keyframes pulseRing{0%{transform:scale(1);opacity:.7}100%{transform:scale(1.1);opacity:0}}

/* ── Receipt enter ── */
.receipt-in{animation:receiptIn .5s cubic-bezier(.22,1,.36,1) both;}
@keyframes receiptIn{from{opacity:0;transform:translateY(50px) scale(.92)}to{opacity:1;transform:none}}

/* ── Drawer slide ── */
.drawer-slide{transition:transform .4s cubic-bezier(.22,1,.36,1);}

/* ── Number morph ── */
@keyframes numMorph{0%{transform:translateY(6px);opacity:0}50%{transform:translateY(-2px)}100%{transform:translateY(0);opacity:1}}
.num-morph{animation:numMorph .3s ease both;}

/* ── Toast ── */
@keyframes toastSlide{from{opacity:0;transform:translateY(-16px) scale(.88)}to{opacity:1;transform:none}}

/* ── Gradient border ── */
.grad-border{position:relative;}
.grad-border::before{content:'';position:absolute;inset:-1px;border-radius:inherit;background:linear-gradient(135deg,rgba(240,195,109,.4),rgba(63,182,242,.3),rgba(139,124,246,.3));z-index:-1;}

/* ── Ripple ── */
@keyframes ripple{to{transform:translate(-50%,-50%) scale(4);opacity:0;}}

/* ── Add burst ── */
@keyframes burst{0%{transform:scale(1);opacity:1}50%{transform:scale(1.6);opacity:.6}100%{transform:scale(2.2);opacity:0}}

/* ── Notepad / ticket scalloped top ── */
.notepad{position:relative;border-radius:0 0 20px 20px !important;}
.notepad::before{
  content:'';position:absolute;top:-14px;left:0;right:0;height:14px;
  background:radial-gradient(circle at center,transparent 9px,var(--np-bg,#FDFAF2) 10px);
  background-size:28px 28px;background-position:0 bottom;
  pointer-events:none;z-index:3;
}
/* Spiral holes row */
.notepad::after{
  content:'';position:absolute;top:-20px;left:0;right:0;height:20px;
  background:repeating-linear-gradient(90deg,transparent 0px,transparent 10px,rgba(0,0,0,.0) 10px,rgba(0,0,0,.0) 18px);
  pointer-events:none;z-index:2;
}
/* Receipt bottom scallop */
.receipt-scallop{position:relative;}
.receipt-scallop::after{
  content:'';position:absolute;bottom:-12px;left:0;right:0;height:12px;
  background:radial-gradient(circle at center,transparent 7px,var(--rs-bg,#FDFAF2) 8px);
  background-size:22px 22px;background-position:0 top;
  pointer-events:none;z-index:3;
}

/* ── Gradient text ── */
.grad-text{background:linear-gradient(135deg,var(--gold),var(--gold2),#FFEDAA);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}

@media print{
  @page{size:80mm auto;margin:4mm 0;}
  html,body{width:80mm !important;margin:0 !important;padding:0 !important;background:#fff !important;}
  body *{visibility:hidden !important;}
  #print-receipt,#print-receipt *{visibility:visible !important;}
  #print-receipt{
    position:fixed !important;top:0 !important;left:0 !important;
    width:80mm !important;
    background:#fff !important;
    color:#000 !important;
    padding:8px 12px 16px !important;
    font-size:12px !important;
    font-family:'Courier New',Courier,monospace !important;
    -webkit-print-color-adjust:exact !important;
    print-color-adjust:exact !important;
    box-shadow:none !important;
  }
  /* KOT header styles */
  #print-receipt .kot-cafe-name{font-size:17px !important;font-weight:900 !important;text-align:center;letter-spacing:.12em;}
  #print-receipt .kot-address{font-size:10px !important;text-align:center;color:#333 !important;line-height:1.6;}
  #print-receipt .kot-divider{border:none !important;border-top:1.5px dashed #555 !important;margin:7px 0 !important;}
  #print-receipt .kot-divider-solid{border:none !important;border-top:2px solid #000 !important;margin:7px 0 !important;}
  #print-receipt .kot-info{font-size:11px !important;display:flex;justify-content:space-between;}
  #print-receipt table{width:100% !important;border-collapse:collapse !important;font-size:12px !important;}
  #print-receipt table th{font-size:11px !important;font-weight:700;padding:4px 2px !important;border-bottom:1px solid #333 !important;}
  #print-receipt table td{padding:5px 2px !important;vertical-align:top !important;font-size:12px !important;}
  #print-receipt .tot-row{font-size:11px !important;}
  #print-receipt .grand-total-row{font-size:14px !important;font-weight:900 !important;}
  #print-receipt .kot-footer{text-align:center;font-size:11px !important;font-style:italic;}
  /* Hide only the no-print elements */
  .no-print{display:none !important;}
  /* Make logo circle print-friendly with forced colors */
  #print-receipt [data-logo]{
    width:72px !important;height:72px !important;
    border:2.5px solid #000 !important;
    background:#000 !important;
    display:flex !important;flex-direction:column !important;
    align-items:center !important;justify-content:center !important;
    margin:0 auto 10px !important;border-radius:50% !important;
    overflow:hidden !important;
    -webkit-print-color-adjust:exact !important;print-color-adjust:exact !important;
  }
  #print-receipt [data-logo] > div:nth-child(1){ font-size:24px !important; filter:brightness(0) invert(1) !important; }
  #print-receipt [data-logo] > div:nth-child(2){ font-size:9px !important; color:#fff !important; letter-spacing:.15em !important; font-weight:900 !important; -webkit-print-color-adjust:exact !important; }
  #print-receipt [data-logo] > div:nth-child(3){ font-size:7.5px !important; color:#3FB6F2 !important; letter-spacing:.3em !important; font-weight:700 !important; -webkit-print-color-adjust:exact !important; }
}

/* ── Hide scrollbar on tab row ── */
.tabs-scroll{scrollbar-width:none;-ms-overflow-style:none;}
.tabs-scroll::-webkit-scrollbar{display:none;}

/* ── Smooth page-level scroll ── */
.menu-scroll{scroll-behavior:smooth;}
.menu-scroll::-webkit-scrollbar{width:3px;}
.menu-scroll::-webkit-scrollbar-thumb{background:rgba(240,195,109,.2);border-radius:99px;}

/* ── Category heading underline ── */
.cat-heading::after{content:'';display:block;height:1px;background:linear-gradient(to right,rgba(240,195,109,.35),transparent);margin-top:6px;}

/* ── Smooth cart item transition ── */
.cart-list-item{transition:background .18s;}

/* ── Notepad ruled lines ── */
.ruled-lines{
  background-image:repeating-linear-gradient(transparent,transparent 31px,rgba(27,27,34,.07) 31px,rgba(27,27,34,.07) 32px);
  background-attachment:local;
}

/* ── Red margin line on notepad ── */
.margin-line{
  border-left:2px solid rgba(226,72,61,.15);
  padding-left:12px;
}
`;

// ─── ANIMATED STAR CANVAS ───────────────────────────────────────────────────
const Stars = memo(function Stars() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext('2d');
    let W = c.width = window.innerWidth, H = c.height = window.innerHeight;
    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.5 + 0.2,
      speed: Math.random() * 0.4 + 0.05,
      phase: Math.random() * Math.PI * 2,
      freq: Math.random() * 0.02 + 0.008,
    }));
    let frame, t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.016;
      stars.forEach(s => {
        const alpha = 0.15 + Math.sin(s.phase + t * s.freq * 60) * 0.55 + 0.4;
        const r = s.r * (0.8 + Math.sin(s.phase + t * s.freq * 40) * 0.2);
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 3);
        grad.addColorStop(0, `rgba(255,255,255,${Math.max(0, Math.min(1, alpha))})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(s.x, s.y, r * 3, 0, Math.PI * 2); ctx.fill();
        s.y -= s.speed * 0.1; if (s.y < -5) s.y = H + 5;
      });
      frame = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight; };
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="stars-canvas" />;
});

// ─── MESH ORBS BACKGROUND ───────────────────────────────────────────────────
function MeshBg({ variant = 'default' }) {
  const orbs = useMemo(() => {
    const configs = {
      default: [
        { color:'rgba(63,182,242,.08)', w:600, h:600, top:'5%', left:'15%', d:'22s', tx:'60px', ty:'40px', s:1.15, delay:'0s' },
        { color:'rgba(240,195,109,.06)', w:500, h:500, top:'50%', right:'5%', d:'18s', tx:'-40px', ty:'-50px', s:1.2, delay:'-6s' },
        { color:'rgba(139,124,246,.05)', w:400, h:400, bottom:'10%', left:'5%', d:'25s', tx:'30px', ty:'-30px', s:1.1, delay:'-12s' },
        { color:'rgba(63,166,107,.04)', w:350, h:350, top:'30%', left:'50%', d:'30s', tx:'-50px', ty:'40px', s:0.9, delay:'-8s' },
      ],
      billing: [
        { color:'rgba(63,182,242,.06)', w:500, h:500, top:'0%', right:'20%', d:'20s', tx:'-40px', ty:'50px', s:1.1, delay:'0s' },
        { color:'rgba(240,195,109,.05)', w:400, h:400, bottom:'0%', left:'10%', d:'16s', tx:'50px', ty:'-30px', s:1.2, delay:'-5s' },
        { color:'rgba(226,72,61,.04)', w:300, h:300, top:'50%', right:'5%', d:'24s', tx:'-20px', ty:'-40px', s:1.0, delay:'-10s' },
      ]
    };
    return configs[variant] || configs.default;
  }, [variant]);
  return (
    <div className="mesh-bg">
      {orbs.map((o, i) => (
        <div key={i} style={{
          position:'absolute', borderRadius:'50%',
          width: o.w, height: o.h,
          background: `radial-gradient(circle, ${o.color}, transparent 70%)`,
          top: o.top, left: o.left, right: o.right, bottom: o.bottom,
          filter: 'blur(60px)',
          animation: `orbDrift ${o.d} ease-in-out ${o.delay} infinite alternate`,
          '--tx': o.tx, '--ty': o.ty, '--s': o.s, '--d': o.d, '--delay': o.delay,
        }} />
      ))}
    </div>
  );
}

// ─── RIPPLE BUTTON ──────────────────────────────────────────────────────────
function RippleBtn({ children, onClick, style, className = '', disabled }) {
  const ref = useRef(null);
  const doRipple = (e) => {
    const btn = ref.current; if (!btn || disabled) return;
    const rect = btn.getBoundingClientRect();
    const span = document.createElement('span');
    const size = Math.max(rect.width, rect.height) * 2;
    Object.assign(span.style, {
      position:'absolute', width:size+'px', height:size+'px', borderRadius:'50%',
      background:'rgba(255,255,255,.18)', pointerEvents:'none',
      left: (e.clientX - rect.left - size/2) + 'px',
      top: (e.clientY - rect.top - size/2) + 'px',
      transform:'scale(0)', animation:'ripple .55s ease forwards',
    });
    btn.appendChild(span);
    setTimeout(() => span.remove(), 600);
    onClick && onClick(e);
  };
  return (
    <button ref={ref} onClick={doRipple} disabled={disabled}
      className={className}
      style={{ position:'relative', overflow:'hidden', ...style }}>
      {children}
    </button>
  );
}

// ─── TOAST SYSTEM ───────────────────────────────────────────────────────────
let _tid = 0;
function useToast() {
  const [toasts, setToasts] = useState([]);
  const show = useCallback((msg, type = 'success', icon = '') => {
    const id = ++_tid;
    setToasts(p => [...p.slice(-3), { id, msg, type, icon }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 2600);
  }, []);
  return { toasts, show };
}
function ToastStack({ toasts }) {
  return (
    <div style={{ position:'fixed', top:18, left:'50%', transform:'translateX(-50%)', zIndex:9999, display:'flex', flexDirection:'column', gap:8, alignItems:'center', pointerEvents:'none' }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          background: t.type === 'error' ? 'rgba(50,12,10,.96)' : 'rgba(14,14,26,.96)',
          border: `1px solid ${t.type === 'error' ? 'rgba(226,72,61,.35)' : 'rgba(63,182,242,.25)'}`,
          color: t.type === 'error' ? '#F47067' : '#FBF7EF',
          padding:'10px 22px 10px 16px', borderRadius:40, fontSize:13, fontWeight:700,
          boxShadow:`0 8px 32px rgba(0,0,0,.7), 0 0 0 1px rgba(255,255,255,.04), 0 0 20px ${t.type==='error'?'rgba(226,72,61,.15)':'rgba(63,182,242,.12)'}`,
          backdropFilter:'blur(16px)',
          animation:'toastSlide .35s cubic-bezier(.34,1.4,.64,1) both',
          display:'flex', alignItems:'center', gap:9, whiteSpace:'nowrap',
        }}>
          <span style={{
            width:22, height:22, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, flexShrink:0,
            background: t.type === 'error' ? 'rgba(226,72,61,.2)' : 'rgba(63,182,242,.2)',
            color: t.type === 'error' ? '#E2483D' : '#3FB6F2',
          }}>{t.type === 'error' ? '✕' : '✓'}</span>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

// ─── COUNT UP HOOK ──────────────────────────────────────────────────────────
function useCountUp(target, duration = 650) {
  const [val, setVal] = useState(target);
  const prev = useRef(target), raf = useRef(null);
  useEffect(() => {
    const from = prev.current, to = target, t0 = performance.now();
    if (from === to) { setVal(to); return; }
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setVal(from + (to - from) * ease);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else prev.current = to;
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);
  return val;
}

// ─── SVG ICONS ──────────────────────────────────────────────────────────────
const I = ({ d, size = 16, style, sw = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={style}>
    {[d].flat().map((p, i) => <path key={i} d={p} />)}
  </svg>
);
const IcoMoon = p => <I {...p} d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />;
const IcoBack = p => <I {...p} d={["M19 12H5","M12 19l-7-7 7-7"]} />;
const IcoOut  = p => <I {...p} d={["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4","M16 17l5-5-5-5","M21 12H9"]} />;
const IcoSearch = p => <I {...p} d={["M11 17.25a6.25 6.25 0 1 1 0-12.5 6.25 6.25 0 0 1 0 12.5z","M16 16l4.5 4.5"]} />;
const IcoPlus = p => <I {...p} d={["M12 5v14","M5 12h14"]} />;
const IcoMinus = p => <I {...p} d="M5 12h14" />;
const IcoTrash = p => <I {...p} d={["M3 6h18","M19 6l-1 14H6L5 6","M9 6V4h6v2"]} />;
const IcoReceipt = p => <I {...p} d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z" />;
const IcoTrend = p => <I {...p} d={["M23 6l-9.5 9.5-5-5L1 18","M17 6h6v6"]} />;
const IcoHistory = p => <I {...p} d={["M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8","M3 3v5h5","M12 7v5l4 2"]} />;
const IcoX = p => <I {...p} d={["M18 6L6 18","M6 6l12 12"]} />;
const IcoPrint = p => <I {...p} d={["M6 9V2h12v7","M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2","M6 14h12v8H6z"]} />;
const IcoUser = p => <I {...p} d={["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2","M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"]} />;
const IcoLock = p => <I {...p} d={["M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z","M7 11V7a5 5 0 0 1 10 0v4"]} />;
const IcoStar = p => <I {...p} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />;

// ═══════════════════════════════════════════════════════════════════════════
//  LOGIN PAGE
// ═══════════════════════════════════════════════════════════════════════════
function LoginPage({ onLogin }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0); // 0=hidden, 1=logo, 2=form

  useEffect(() => {
    setTimeout(() => setStep(1), 100);
    setTimeout(() => setStep(2), 600);
  }, []);

  const submit = () => {
    if (!user.trim()) { setErr('Please enter username'); return; }
    setErr(''); setLoading(true);
    setTimeout(() => {
      if (user === 'admin' && pass === 'moonlight123') onLogin(user);
      else { setErr('Invalid credentials. Try admin / moonlight123'); setLoading(false); }
    }, 900);
  };

  return (
    <div style={{ position:'relative', display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', overflow:'hidden' }}>
      <Stars />
      <MeshBg />

      {/* Rotating ring behind logo */}
      <div style={{
        position:'absolute', width:220, height:220, borderRadius:'50%',
        border:'1px solid rgba(240,195,109,.12)',
        animation:'spinAnim 20s linear infinite',
        top:'50%', left:'50%', transform:'translate(-50%,-50%)',
      }} />
      <div style={{
        position:'absolute', width:300, height:300, borderRadius:'50%',
        border:'1px dashed rgba(63,182,242,.07)',
        animation:'spinAnim 35s linear infinite reverse',
        top:'50%', left:'50%', transform:'translate(-50%,-50%)',
      }} />

      <div style={{
        position:'relative', zIndex:1, width:'100%', maxWidth:380, padding:'0 18px',
        transition:'opacity .6s ease, transform .6s cubic-bezier(.22,1,.36,1)',
        opacity: step >= 1 ? 1 : 0,
        transform: step >= 1 ? 'none' : 'translateY(40px)',
      }}>
        {/* Logo block */}
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <div className="glow float" style={{
            '--fd':'5s', '--fy':'-12px',
            width:80, height:80, borderRadius:'50%',
            background:'radial-gradient(circle at 35% 35%, #1E1E30, #0A0A16)',
            border:'1.5px solid rgba(240,195,109,.5)',
            display:'flex', alignItems:'center', justifyContent:'center',
            margin:'0 auto 16px', position:'relative',
          }}>
            <IcoMoon size={32} style={{ color:'var(--gold)' }} />
            {/* Orbiting dot */}
            <div style={{
              position:'absolute', width:8, height:8, borderRadius:'50%',
              background:'var(--gold2)', boxShadow:'0 0 12px var(--gold)',
              top:4, right:4,
              animation:'spinAnim 4s linear infinite',
              transformOrigin:'calc(100% + 30px) calc(100% + 30px)',
            }} />
          </div>
          <h1 className="ff grad-text" style={{ fontSize:28, fontWeight:500, letterSpacing:'.02em' }}>
            Moonlight Cafe
          </h1>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginTop:6 }}>
            <div style={{ height:1, width:30, background:'linear-gradient(to right,transparent,rgba(63,182,242,.4))' }} />
            <p style={{ fontSize:10, letterSpacing:'.35em', color:'var(--blue)', textTransform:'uppercase', opacity:.8 }}>Staff Portal</p>
            <div style={{ height:1, width:30, background:'linear-gradient(to left,transparent,rgba(63,182,242,.4))' }} />
          </div>
        </div>

        {/* Card */}
        <div style={{
          background:'rgba(14,14,24,.85)', backdropFilter:'blur(32px)',
          border:'1px solid rgba(255,255,255,.07)', borderRadius:24, padding:32,
          boxShadow:'0 40px 80px rgba(0,0,0,.7), 0 0 0 1px rgba(255,255,255,.04), inset 0 1px 0 rgba(255,255,255,.06)',
          transition:'opacity .5s ease, transform .5s cubic-bezier(.22,1,.36,1)',
          opacity: step >= 2 ? 1 : 0,
          transform: step >= 2 ? 'none' : 'translateY(16px)',
        }}>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {[
              { Icon:IcoUser, val:user, set:setUser, ph:'Username', type:'text' },
              { Icon:IcoLock, val:pass, set:setPass, ph:'Password', type:'password' },
            ].map(({ Icon, val, set, ph, type }, idx) => (
              <div key={ph} style={{ position:'relative' }}>
                <Icon size={15} style={{ position:'absolute', left:13, top:'50%', transform:'translateY(-50%)', color:'rgba(63,182,242,.45)', pointerEvents:'none' }} />
                <input value={val} onChange={e => set(e.target.value)} placeholder={ph} type={type}
                  onKeyDown={e => e.key === 'Enter' && submit()}
                  style={{
                    width:'100%', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.09)',
                    borderRadius:14, padding:'13px 14px 13px 40px', color:'var(--cream)', fontSize:14,
                    transition:'border-color .2s, box-shadow .2s, background .2s',
                  }}
                  onFocus={e => { e.target.style.borderColor='rgba(63,182,242,.5)'; e.target.style.boxShadow='0 0 0 4px rgba(63,182,242,.07)'; e.target.style.background='rgba(63,182,242,.04)'; }}
                  onBlur={e => { e.target.style.borderColor='rgba(255,255,255,.09)'; e.target.style.boxShadow='none'; e.target.style.background='rgba(255,255,255,.04)'; }}
                />
              </div>
            ))}

            {err && (
              <div style={{
                background:'rgba(226,72,61,.08)', border:'1px solid rgba(226,72,61,.25)', borderRadius:12,
                padding:'9px 14px', fontSize:12.5, color:'#F47067', textAlign:'center',
                animation:'toastSlide .3s ease',
              }}>{err}</div>
            )}

            <RippleBtn onClick={submit} disabled={loading} style={{
              background: loading ? 'rgba(63,182,242,.3)' : 'linear-gradient(135deg,#2AA8E8,#3FB6F2,#5CC8FF)',
              color:'#07070F', borderRadius:14, padding:'14px', fontWeight:800, fontSize:13.5,
              letterSpacing:'.1em', textTransform:'uppercase', marginTop:4,
              boxShadow: loading ? 'none' : '0 6px 24px rgba(63,182,242,.4), 0 2px 8px rgba(63,182,242,.2)',
              transition:'all .25s',
            }}>
              {loading ? (
                <span style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:9 }}>
                  <span className="spin" style={{ '--sd':'.7s', width:15, height:15, border:'2.5px solid rgba(7,7,15,.3)', borderTopColor:'#07070F', borderRadius:'50%', display:'inline-block' }} />
                  Signing in…
                </span>
              ) : '✦ Sign In'}
            </RippleBtn>
          </div>

          <div style={{ marginTop:20, textAlign:'center', fontSize:11, color:'rgba(251,247,239,.28)' }}>
            Default: <span style={{ fontFamily:'monospace', color:'rgba(251,247,239,.45)', letterSpacing:'.05em' }}>admin / moonlight123</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  SALES STATS CARDS
// ═══════════════════════════════════════════════════════════════════════════
function StatsCards({ bills }) {
  const total = bills.reduce((s, b) => s + b.grandTotal, 0);
  const aTotal = useCountUp(total);
  const aCount = useCountUp(bills.length);
  const avgOrder = bills.length ? total / bills.length : 0;
  const aAvg = useCountUp(avgOrder);

  const cards = [
    { label:"Today's Revenue", val:`₹${aTotal.toFixed(0)}`, icon:<IcoTrend size={18}/>, color:'var(--gold)', bg:'rgba(240,195,109,.08)', border:'rgba(240,195,109,.18)', glow:'rgba(240,195,109,.15)' },
    { label:'Orders', val:Math.round(aCount), icon:<IcoReceipt size={18}/>, color:'var(--blue)', bg:'rgba(63,182,242,.08)', border:'rgba(63,182,242,.18)', glow:'rgba(63,182,242,.15)' },
    { label:'Avg. Order', val:`₹${aAvg.toFixed(0)}`, icon:<IcoStar size={18}/>, color:'var(--purple)', bg:'rgba(139,124,246,.08)', border:'rgba(139,124,246,.18)', glow:'rgba(139,124,246,.15)' },
  ];

  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:28, maxWidth:500 }}>
      {cards.map((c, i) => (
        <div key={c.label} className="shimmer lift card-in" style={{
          '--delay': `${i * 0.08}s`,
          background:`linear-gradient(135deg,${c.bg},rgba(7,7,15,.4))`,
          border:`1px solid ${c.border}`,
          borderRadius:20, padding:16,
          boxShadow:`0 4px 24px rgba(0,0,0,.35), 0 0 30px ${c.glow}`,
        }}>
          <div style={{ width:38, height:38, borderRadius:12, background:c.bg, color:c.color, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:10, boxShadow:`0 0 20px ${c.glow}` }}>{c.icon}</div>
          <p style={{ fontSize:9.5, letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(251,247,239,.35)', marginBottom:3 }}>{c.label}</p>
          <p className="fm" style={{ fontSize:18, fontWeight:700, color:'var(--cream)' }}>{c.val}</p>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  RECENT BILLS DRAWER
// ═══════════════════════════════════════════════════════════════════════════
function BillsDrawer({ open, onClose, bills }) {
  return (
    <>
      <div onClick={onClose} style={{
        position:'fixed', inset:0, zIndex:40, background:'rgba(0,0,0,.7)', backdropFilter:'blur(6px)',
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition:'opacity .35s',
      }} />
      <div className="drawer-slide" style={{
        position:'fixed', top:0, right:0, height:'100vh', width:Math.min(360, window.innerWidth),
        background:'rgba(10,10,20,.97)', backdropFilter:'blur(24px)',
        borderLeft:'1px solid rgba(255,255,255,.06)', zIndex:50,
        display:'flex', flexDirection:'column',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        boxShadow:'-12px 0 48px rgba(0,0,0,.6)',
      }}>
        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 22px', borderBottom:'1px solid rgba(255,255,255,.06)', flexShrink:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:34, height:34, borderRadius:11, background:'rgba(240,195,109,.1)', border:'1px solid rgba(240,195,109,.2)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <IcoHistory size={16} style={{ color:'var(--gold)' }} />
            </div>
            <span className="ff" style={{ fontSize:18, color:'var(--cream)', fontWeight:500 }}>Today's Bills</span>
            {bills.length > 0 && (
              <span style={{ padding:'2px 9px', borderRadius:99, background:'rgba(240,195,109,.15)', color:'var(--gold)', fontSize:11, fontWeight:700 }}>{bills.length}</span>
            )}
          </div>
          <RippleBtn onClick={onClose} style={{ width:32, height:32, borderRadius:9, border:'1px solid rgba(255,255,255,.08)', display:'flex', alignItems:'center', justifyContent:'center', color:'rgba(251,247,239,.4)' }}>
            <IcoX size={15} />
          </RippleBtn>
        </div>

        {/* Total bar */}
        {bills.length > 0 && (
          <div style={{ padding:'12px 22px', borderBottom:'1px solid rgba(255,255,255,.04)', background:'rgba(240,195,109,.04)', flexShrink:0 }}>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:12 }}>
              <span style={{ color:'rgba(251,247,239,.45)' }}>Total collected</span>
              <span className="fm" style={{ color:'var(--gold)', fontWeight:700, fontSize:15 }}>
                ₹{bills.reduce((s, b) => s + b.grandTotal, 0).toFixed(0)}
              </span>
            </div>
          </div>
        )}

        <div style={{ flex:1, overflowY:'auto', padding:'14px 22px' }}>
          {bills.length === 0 ? (
            <div style={{ textAlign:'center', marginTop:60 }}>
              <div style={{ fontSize:42, marginBottom:12, opacity:.3 }}>🧾</div>
              <p style={{ color:'rgba(251,247,239,.3)', fontSize:14 }}>No bills yet today</p>
            </div>
          ) : (
            [...bills].reverse().map((b, i) => (
              <div key={b.billNo} className="lift" style={{
                background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.06)',
                borderRadius:16, padding:'12px 15px', marginBottom:8,
                animation:`cardIn .4s ${i * .04}s both`,
              }}>
                <div style={{ display:'flex', justifyContent:'space-between' }}>
                  <span className="fm" style={{ color:'var(--cream)', fontWeight:600, fontSize:13 }}>#{b.billNo}</span>
                  <span className="fm" style={{ color:'var(--gold)', fontWeight:700, fontSize:14 }}>₹{b.grandTotal.toFixed(0)}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'rgba(251,247,239,.35)', marginTop:5 }}>
                  <span>Table {b.tableNo}  ·  {b.items.length} items  ·  {b.paymentMode}</span>
                  <span>{new Date(b.createdAt).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  TABLE SELECTOR
// ═══════════════════════════════════════════════════════════════════════════
function TableSelector({ username, onLogout, onSelectTable, tables, bills }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 60); }, []);

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100vh', overflow:'hidden', position:'relative' }}>
      <Stars />
      <MeshBg />

      {/* Header */}
      <header style={{
        position:'relative', zIndex:2, display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'14px 28px', borderBottom:'1px solid rgba(255,255,255,.05)',
        background:'rgba(7,7,15,.75)', backdropFilter:'blur(24px)', flexShrink:0,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <div className="glow float" style={{ '--fd':'6s', '--fy':'-8px', width:46, height:46, borderRadius:'50%', background:'rgba(14,14,24,.9)', border:'1.5px solid rgba(240,195,109,.45)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <IcoMoon size={21} style={{ color:'var(--gold)' }} />
          </div>
          <div>
            <h1 className="ff" style={{ fontSize:20, color:'var(--cream)', fontWeight:500 }}>Moonlight Cafe</h1>
            <p style={{ fontSize:9.5, letterSpacing:'.3em', color:'var(--blue)', textTransform:'uppercase', opacity:.75 }}>Table Management</p>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontSize:12, color:'rgba(251,247,239,.38)' }}>
            Welcome, <strong style={{ color:'rgba(251,247,239,.65)' }}>{username}</strong>
          </span>
          {[
            { icon:<IcoHistory size={15}/>, onClick:()=>setDrawerOpen(true), title:'Bills' },
            { icon:<IcoOut size={13}/>, onClick:onLogout, title:'Logout', danger:true },
          ].map(({ icon, onClick, title, danger }) => (
            <RippleBtn key={title} onClick={onClick} style={{
              display:'flex', alignItems:'center', gap:5, padding:'7px 12px', borderRadius:99,
              border:'1px solid rgba(255,255,255,.08)', background:'rgba(255,255,255,.03)',
              fontSize:12, fontWeight:600, color:'rgba(251,247,239,.4)',
              transition:'all .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = danger ? 'rgba(226,72,61,.4)' : 'rgba(240,195,109,.4)'; e.currentTarget.style.color = danger ? 'var(--ember)' : 'var(--gold)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)'; e.currentTarget.style.color = 'rgba(251,247,239,.4)'; }}>
              {icon} {title}
            </RippleBtn>
          ))}
        </div>
      </header>

      <main style={{ flex:1, overflowY:'auto', padding:'32px 28px', position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:920, margin:'0 auto' }}>
          <div style={{
            opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)',
            transition:'opacity .5s ease, transform .5s ease',
          }}>
            <StatsCards bills={bills} />
          </div>

          <h2 className="ff" style={{ fontSize:14, letterSpacing:'.15em', textTransform:'uppercase', color:'rgba(251,247,239,.3)', marginBottom:16, fontStyle:'italic' }}>
            Select a Table
          </h2>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(155px,1fr))', gap:14 }}>
            {tables.map((t, i) => {
              const occ = t.status === 'occupied';
              return (
                <RippleBtn key={t.no} onClick={() => onSelectTable(t.no)}
                  className={`lift ${occ ? 'pulse-ring' : ''} card-in`}
                  style={{
                    '--delay': `${i * 0.04}s`,
                    display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                    gap:10, padding:'26px 14px', borderRadius:24, textAlign:'center',
                    border: occ ? '1px solid rgba(240,195,109,.35)' : '1px solid rgba(255,255,255,.06)',
                    background: occ
                      ? 'linear-gradient(145deg,rgba(240,195,109,.1),rgba(240,195,109,.04),rgba(7,7,15,.6))'
                      : 'linear-gradient(145deg,rgba(255,255,255,.04),rgba(7,7,15,.6))',
                    boxShadow: occ ? '0 4px 28px rgba(240,195,109,.1), inset 0 1px 0 rgba(240,195,109,.1)' : 'inset 0 1px 0 rgba(255,255,255,.04)',
                    backdropFilter:'blur(10px)',
                    position:'relative',
                  }}>
                  <span className="ff" style={{ fontSize:12, color:'rgba(251,247,239,.35)', textTransform:'uppercase', letterSpacing:'.15em', fontStyle:'italic' }}>Table</span>
                  <span className="ff" style={{
                    fontSize:32, fontWeight:500, lineHeight:1,
                    color: occ ? 'transparent' : 'var(--cream)',
                    background: occ ? 'linear-gradient(135deg,var(--gold),var(--gold2))' : 'none',
                    WebkitBackgroundClip: occ ? 'text' : 'unset',
                    WebkitTextFillColor: occ ? 'transparent' : 'unset',
                  }}>{t.no}</span>
                  <span style={{
                    padding:'4px 14px', borderRadius:99, fontSize:11, fontWeight:800, textTransform:'uppercase', letterSpacing:'.06em',
                    background: occ ? 'linear-gradient(135deg,var(--gold),var(--gold2))' : 'rgba(63,166,107,.14)',
                    color: occ ? 'rgba(7,7,15,.9)' : 'var(--sage)',
                    boxShadow: occ ? '0 3px 12px rgba(240,195,109,.35)' : 'none',
                  }}>{occ ? 'Occupied' : 'Free'}</span>
                  {occ && (
                    <span className="fm" style={{ fontSize:11, color:'rgba(251,247,239,.5)', marginTop:-4 }}>
                      {t.itemCount} items · ₹{t.total.toFixed(0)}
                    </span>
                  )}
                </RippleBtn>
              );
            })}
          </div>
        </div>
      </main>

      <BillsDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} bills={bills} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  MENU ITEM CARD
// ═══════════════════════════════════════════════════════════════════════════
const MenuCard = memo(function MenuCard({ item, onAdd, animDelay }) {
  const [justAdded, setJustAdded] = useState(null);
  const hasV = item.variants?.length > 0;
  const veg = item.foodType === 'veg';
  const dotColor = veg ? 'var(--sage)' : 'var(--ember)';

  const add = (variant) => {
    const key = variant?.label || 'base';
    setJustAdded(key);
    setTimeout(() => setJustAdded(null), 500);
    onAdd(item, variant);
  };

  return (
    <div className="lift card-in" style={{
      '--delay': `${animDelay}s`,
      display:'flex', flexDirection:'column', justifyContent:'space-between',
      background:'linear-gradient(145deg,rgba(24,24,38,.9),rgba(14,14,24,.8))',
      border:'1px solid rgba(255,255,255,.06)', borderRadius:20, padding:14,
      boxShadow:'0 2px 16px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.04)',
      backdropFilter:'blur(8px)',
    }}>
      <div style={{ marginBottom:10 }}>
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:8, marginBottom:5 }}>
          <div style={{ display:'flex', alignItems:'center', gap:7, flex:1, minWidth:0 }}>
            {item.foodType !== 'na' && (
              <span style={{ width:14, height:14, border:`1.5px solid ${dotColor}`, borderRadius:3, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:`0 0 8px ${dotColor}44` }}>
                <span style={{ width:6.5, height:6.5, borderRadius:'50%', background:dotColor, display:'block' }} />
              </span>
            )}
            <span className="ff" style={{ fontSize:14, color:'var(--cream)', lineHeight:1.35, WebkitLineClamp:2, display:'-webkit-box', WebkitBoxOrient:'vertical', overflow:'hidden' }}>{item.name}</span>
          </div>
          {!hasV && (
            <span className="fm" style={{ fontSize:13.5, color:'var(--gold)', fontWeight:600, flexShrink:0, textShadow:'0 0 12px rgba(240,195,109,.4)' }}>₹{item.basePrice}</span>
          )}
        </div>
        {item.extraNote && (
          <p style={{ fontSize:10, textTransform:'uppercase', letterSpacing:'.08em', color:'rgba(63,182,242,.6)', marginLeft:21 }}>{item.extraNote}</p>
        )}
      </div>

      {hasV ? (
        <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
          {item.variants.map(v => (
            <RippleBtn key={v.label} onClick={() => add(v)} style={{
              display:'flex', alignItems:'center', gap:5, padding:'5px 10px', borderRadius:99,
              border: justAdded === v.label ? '1px solid rgba(240,195,109,.5)' : '1px solid rgba(255,255,255,.09)',
              background: justAdded === v.label ? 'rgba(240,195,109,.1)' : 'rgba(255,255,255,.04)',
              fontSize:12, color:'rgba(251,247,239,.75)', transition:'all .2s',
              boxShadow: justAdded === v.label ? '0 0 12px rgba(240,195,109,.2)' : 'none',
            }}>
              {v.label}
              <span className="fm" style={{ color:'var(--gold)', fontWeight:700 }}>₹{v.price}</span>
              <IcoPlus size={10} style={{ color:'var(--gold)' }} />
            </RippleBtn>
          ))}
        </div>
      ) : (
        <RippleBtn onClick={() => add(null)} style={{
          display:'flex', alignItems:'center', justifyContent:'center', gap:7, padding:'9px 12px',
          borderRadius:13,
          border: justAdded === 'base' ? '1px solid rgba(63,182,242,.4)' : '1px solid rgba(255,255,255,.08)',
          background: justAdded === 'base' ? 'rgba(63,182,242,.1)' : 'rgba(255,255,255,.03)',
          fontSize:13, fontWeight:600, color:'rgba(251,247,239,.7)',
          transition:'all .2s',
          boxShadow: justAdded === 'base' ? '0 0 16px rgba(63,182,242,.2)' : 'none',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(63,182,242,.35)'; e.currentTarget.style.color='var(--blue2)'; e.currentTarget.style.boxShadow='0 0 16px rgba(63,182,242,.15)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,.08)'; e.currentTarget.style.color='rgba(251,247,239,.7)'; e.currentTarget.style.boxShadow='none'; }}>
          <IcoPlus size={13} /> Add to bill
        </RippleBtn>
      )}
    </div>
  );
});

// ═══════════════════════════════════════════════════════════════════════════
//  CART ITEM ROW
// ═══════════════════════════════════════════════════════════════════════════
function CartRow({ line, onQtyChange, onRemove }) {
  const [exiting, setExiting] = useState(false);
  const doRemove = () => { setExiting(true); setTimeout(() => onRemove(line.key), 220); };

  return (
    <li className={exiting ? 'ci-out' : 'ci-in'} style={{
      display:'flex', alignItems:'flex-start', gap:9, padding:'9px 0',
      borderBottom:'1px solid rgba(27,27,34,.12)',
    }}>
      <div style={{ flex:1, minWidth:0 }}>
        <p style={{ fontWeight:700, fontSize:13, color:'#1B1B22', lineHeight:1.2 }}>{line.name}</p>
        {line.variant && <p style={{ fontSize:10, textTransform:'uppercase', letterSpacing:'.05em', color:'rgba(27,27,34,.4)', marginTop:1 }}>{line.variant}</p>}
        <p className="fm" style={{ fontSize:11, color:'rgba(27,27,34,.45)', marginTop:1 }}>₹{line.price} × {line.qty}</p>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:5, flexShrink:0 }}>
        {[[-1,<IcoMinus size={11}/>],[1,<IcoPlus size={11}/>]].map(([d, icon], i) => (
          <RippleBtn key={d} onClick={() => onQtyChange(line.key, d)} style={{
            width:26, height:26, borderRadius:9, border:'1px solid rgba(27,27,34,.18)',
            display:'flex', alignItems:'center', justifyContent:'center', transition:'all .15s', color:'#1B1B22',
          }}
          onMouseEnter={e => { e.currentTarget.style.background='rgba(27,27,34,.08)'; e.currentTarget.style.borderColor='rgba(27,27,34,.35)'; }}
          onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='rgba(27,27,34,.18)'; }}>
            {icon}
          </RippleBtn>
        ))}
      </div>
      <span className="fm" style={{ width:52, textAlign:'right', fontSize:13, fontWeight:700, color:'#1B1B22', flexShrink:0 }}>₹{(line.price * line.qty).toFixed(0)}</span>
      <RippleBtn onClick={doRemove} style={{ color:'rgba(27,27,34,.28)', transition:'color .15s', padding:2, marginTop:1 }}
        onMouseEnter={e => e.currentTarget.style.color='var(--ember)'}
        onMouseLeave={e => e.currentTarget.style.color='rgba(27,27,34,.28)'}>
        <IcoTrash size={13} />
      </RippleBtn>
    </li>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  CART PANEL
// ═══════════════════════════════════════════════════════════════════════════
function CartPanel({ cart, tableNo, customerName, setCustomerName, discountPct, setDiscountPct, taxPct, setTaxPct, paymentMode, setPaymentMode, totals, onQtyChange, onRemove, onCheckout, loading }) {
  const animTotal = useCountUp(totals.grandTotal);
  const prevTotal = useRef(totals.grandTotal);
  const [flashing, setFlashing] = useState(false);

  useEffect(() => {
    if (Math.abs(totals.grandTotal - prevTotal.current) > 0.001) {
      setFlashing(true);
      setTimeout(() => setFlashing(false), 420);
      prevTotal.current = totals.grandTotal;
    }
  }, [totals.grandTotal]);

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', position:'relative' }}>
      {/* ── Notepad body ── */}
      <div style={{
        flex:1, display:'flex', flexDirection:'column', overflow:'hidden',
        background:'linear-gradient(175deg,#FDFAF2 0%,#EDE8D5 100%)',
        color:'#1B1B22',
        border:'1px solid rgba(27,27,34,.1)',
        borderRadius:'12px 12px 0 0',
        boxShadow:'0 20px 48px rgba(0,0,0,.5), 4px 4px 0 rgba(0,0,0,.08), inset 0 -1px 0 rgba(27,27,34,.06)',
      }}>

      {/* Header */}
      <div style={{ flexShrink:0, borderBottom:'1px dashed rgba(27,27,34,.14)', padding:'14px 18px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
          <div>
            <h2 className="ff" style={{ fontSize:17, fontWeight:600, color:'#1B1B22' }}>Table {tableNo}</h2>
            <p style={{ fontSize:10.5, color:'rgba(27,27,34,.4)', textTransform:'uppercase', letterSpacing:'.12em' }}>Bill Ticket</p>
          </div>
          <div style={{ width:36, height:36, borderRadius:12, background:'rgba(27,27,34,.06)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <IcoReceipt size={17} style={{ color:'rgba(27,27,34,.35)' }} />
          </div>
        </div>
        <input value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Customer name (optional)"
          style={{
            width:'100%', border:'1.5px solid rgba(27,27,34,.12)', borderRadius:11,
            padding:'8px 11px', fontSize:12.5, background:'rgba(255,255,255,.6)', color:'#1B1B22',
            transition:'border-color .2s, box-shadow .2s',
          }}
          onFocus={e => { e.target.style.borderColor='rgba(63,182,242,.5)'; e.target.style.boxShadow='0 0 0 3px rgba(63,182,242,.1)'; }}
          onBlur={e => { e.target.style.borderColor='rgba(27,27,34,.12)'; e.target.style.boxShadow='none'; }}
        />
      </div>

      {/* Items */}
      <div style={{ flex:1, overflowY:'auto', padding:'4px 18px' }}>
        {cart.length === 0 ? (
          <div style={{ textAlign:'center', padding:'36px 0' }}>
            <div style={{ fontSize:40, marginBottom:12, opacity:.2, filter:'grayscale(1)' }}>🛒</div>
            <p style={{ color:'rgba(27,27,34,.3)', fontSize:13, lineHeight:1.8, fontStyle:'italic' }}>
              Nothing here yet.<br />Tap a menu item to start.
            </p>
          </div>
        ) : (
          <ul className="ruled-lines margin-line" style={{ listStyle:'none', minHeight:'100%', paddingLeft:8 }}>
            {cart.map(line => <CartRow key={line.key} line={line} onQtyChange={onQtyChange} onRemove={onRemove} />)}
          </ul>
        )}
      </div>

      {/* ── Vintage ticket perforation tear edge ── */}
      <div style={{
        flexShrink:0, position:'relative', height:20, overflow:'visible',
        background:'linear-gradient(180deg,#EDE8D5 0%,#E4DDCA 100%)',
        display:'flex', alignItems:'center',
      }}>
        {/* Zigzag tear edge at top */}
        <svg width="100%" height="20" style={{ position:'absolute', top:-10, left:0 }} viewBox="0 0 360 20" preserveAspectRatio="none">
          <path d="M0,20 L10,0 L20,20 L30,0 L40,20 L50,0 L60,20 L70,0 L80,20 L90,0 L100,20 L110,0 L120,20 L130,0 L140,20 L150,0 L160,20 L170,0 L180,20 L190,0 L200,20 L210,0 L220,20 L230,0 L240,20 L250,0 L260,20 L270,0 L280,20 L290,0 L300,20 L310,0 L320,20 L330,0 L340,20 L350,0 L360,20 Z" fill="#EDE8D5"/>
        </svg>
        {/* Perforation dots */}
        <div style={{ display:'flex', justifyContent:'space-between', width:'100%', padding:'0 8px' }}>
          {Array.from({ length:20 }).map((_, i) => (
            <div key={i} style={{ width:5, height:5, borderRadius:'50%', background:'var(--bg)', opacity:.35 }} />
          ))}
        </div>
      </div>

      {/* Footer stub — vintage receipt/ticket style */}
      <div style={{
        flexShrink:0,
        background:'linear-gradient(180deg,#EDE8D5 0%,#E4DDCA 100%)',
        padding:'4px 18px 18px',
      }}>
        {/* Discount / Tax inputs */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:9, marginBottom:11 }}>
          {[['DISCOUNT %', discountPct, setDiscountPct, 100], ['TAX / GST %', taxPct, setTaxPct, 28]].map(([lbl, val, set, max]) => (
            <label key={lbl} style={{ fontSize:9.5, color:'rgba(27,27,34,.4)', fontWeight:800, letterSpacing:'.1em' }}>
              {lbl}
              <input type="number" min="0" max={max} value={val} onChange={e => set(Number(e.target.value))}
                className="fm"
                style={{ marginTop:3, width:'100%', border:'1px solid rgba(27,27,34,.2)', borderRadius:4, padding:'5px 8px', fontSize:13, background:'rgba(255,255,255,.5)', color:'#1B1B22', display:'block', transition:'border-color .2s', fontWeight:700 }}
                onFocus={e => { e.target.style.borderColor='rgba(27,27,34,.55)'; e.target.style.boxShadow='inset 0 1px 3px rgba(0,0,0,.08)'; }}
                onBlur={e => { e.target.style.borderColor='rgba(27,27,34,.2)'; e.target.style.boxShadow='none'; }}
              />
            </label>
          ))}
        </div>

        {/* Subtotals — receipt row style */}
        <div style={{ borderTop:'1px dashed rgba(27,27,34,.25)', paddingTop:8, display:'flex', flexDirection:'column', gap:3 }}>
          {[
            ['Subtotal', `₹${totals.subtotal.toFixed(2)}`],
            [`Disc. (${discountPct}%)`, `-₹${totals.discountAmount.toFixed(2)}`],
            [`Tax (${taxPct}%)`, `+₹${totals.taxAmount.toFixed(2)}`],
          ].map(([k, v]) => (
            <div key={k} className="fm" style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'rgba(27,27,34,.42)', letterSpacing:'.03em' }}>
              <span>{k}</span><span>{v}</span>
            </div>
          ))}

          {/* Total — double rule vintage style */}
          <div style={{ borderTop:'1px solid rgba(27,27,34,.3)', borderBottom:'3px double rgba(27,27,34,.3)', padding:'6px 0 5px', marginTop:3 }}>
            <div className="fm" style={{ display:'flex', justifyContent:'space-between', fontWeight:900, fontSize:17 }}>
              <span style={{ color:'#1B1B22', letterSpacing:'.06em' }}>TOTAL</span>
              <span className={flashing ? 'flash' : ''} style={{ color:'#7A1515', letterSpacing:'.02em' }}>
                ₹{animTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment mode — vintage stamp style */}
        <div style={{ display:'flex', gap:5, margin:'10px 0 11px' }}>
          {['Cash', 'UPI', 'Card'].map(m => (
            <RippleBtn key={m} onClick={() => setPaymentMode(m)} style={{
              flex:1, padding:'7px 4px', fontSize:11, fontWeight:800,
              letterSpacing:'.1em', textTransform:'uppercase',
              border: paymentMode === m ? '2px solid #1B1B22' : '1.5px dashed rgba(27,27,34,.25)',
              borderRadius:4,
              background: paymentMode === m ? '#1B1B22' : 'transparent',
              color: paymentMode === m ? '#EDE8D5' : 'rgba(27,27,34,.38)',
              transition:'all .18s ease',
              boxShadow: paymentMode === m ? '2px 2px 0 rgba(27,27,34,.2)' : 'none',
            }}>{m}</RippleBtn>
          ))}
        </div>

        {/* Generate Bill — vintage ticket button */}
        <RippleBtn onClick={onCheckout} disabled={cart.length === 0 || loading} style={{
          width:'100%', padding:'13px 14px', borderRadius:5, fontWeight:900, fontSize:13,
          textTransform:'uppercase', letterSpacing:'.16em',
          background: cart.length === 0 || loading ? 'rgba(27,27,34,.07)' : '#1B1B22',
          color: cart.length === 0 || loading ? 'rgba(27,27,34,.25)' : '#EDE8D5',
          cursor: cart.length === 0 || loading ? 'not-allowed' : 'pointer',
          border: cart.length === 0 || loading ? '1.5px dashed rgba(27,27,34,.18)' : '2px solid #1B1B22',
          boxShadow: cart.length === 0 || loading ? 'none' : '3px 3px 0 rgba(27,27,34,.28)',
          transition:'all .18s ease',
          display:'flex', alignItems:'center', justifyContent:'center', gap:9,
        }}
        onMouseEnter={e => { if (cart.length > 0 && !loading) { e.currentTarget.style.boxShadow='4px 4px 0 rgba(27,27,34,.22)'; e.currentTarget.style.transform='translate(-1px,-1px)'; } }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow= cart.length === 0 ? 'none' : '3px 3px 0 rgba(27,27,34,.28)'; e.currentTarget.style.transform='none'; }}>
          {loading ? (
            <>
              <span className="spin" style={{ '--sd':'.7s', width:14, height:14, border:'2px solid rgba(237,232,213,.25)', borderTopColor:'#EDE8D5', borderRadius:'50%', display:'inline-block', flexShrink:0 }} />
              <span style={{ fontSize:11 }}>Generating…</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z"/>
                <line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/>
              </svg>
              <span>Generate Bill</span>
              {cart.length > 0 && (
                <span style={{ background:'rgba(237,232,213,.14)', border:'1px solid rgba(237,232,213,.2)', borderRadius:3, padding:'1px 6px', fontSize:10.5, fontWeight:900 }}>
                  ₹{cart.reduce((s,l)=>s+l.price*l.qty,0).toFixed(0)}
                </span>
              )}
            </>
          )}
        </RippleBtn>

        {/* Stub branding */}
        <p className="fm" style={{ textAlign:'center', marginTop:9, fontSize:8.5, letterSpacing:'.2em', color:'rgba(27,27,34,.25)', textTransform:'uppercase' }}>
          ✦ Moonlight Cafe · Erode ✦
        </p>
      </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  RECEIPT MODAL  — matches thermal print format from image 3
// ═══════════════════════════════════════════════════════════════════════════
function ReceiptModal({ bill, onClose }) {
  if (!bill) return null;
  const d = new Date(bill.createdAt);
  const fmt = (n) => String(n).padStart(2,'0');
  const dateStr = `${fmt(d.getDate())}/${fmt(d.getMonth()+1)}/${d.getFullYear()}`;
  const timeStr = `${fmt(d.getHours())}:${fmt(d.getMinutes())}`;

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:60, display:'flex', alignItems:'center', justifyContent:'center',
      background:'rgba(0,0,0,.84)', backdropFilter:'blur(14px)',
      padding:16, animation:'toastSlide .35s ease',
    }}>
      <div className="receipt-in" style={{ width:'100%', maxWidth:340, maxHeight:'92vh', display:'flex', flexDirection:'column' }}>

        {/* ── Clean top accent bar (no spiral rings) ── */}
        <div style={{
          height:8, flexShrink:0, borderRadius:'16px 16px 0 0',
          background:'linear-gradient(90deg,#1B1B22,#2a2a3e,#1B1B22)',
          borderBottom:'3px solid #3FB6F2',
        }}/>

        {/* ── Receipt body ── */}
        <div id="print-receipt" style={{
          background:'#FFFFFF', color:'#1B1B22',
          padding:'0 22px 0', overflowY:'auto', flex:1,
        }}>
          {/* Cafe logo circle + name */}
          <div style={{ textAlign:'center', padding:'20px 0 14px' }}>
            <div data-logo style={{
              width:90, height:90, borderRadius:'50%',
              background:'#0E0E1C',
              border:'3px solid #1B1B22',
              display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
              margin:'0 auto 12px',
              boxShadow:'0 4px 16px rgba(0,0,0,.25)',
              overflow:'hidden',
            }}>
              <div style={{ fontSize:26, lineHeight:1, filter:'brightness(0) invert(1)' }}>🌙</div>
              <div style={{ fontSize:9.5, fontWeight:900, letterSpacing:'.15em', color:'#FFFFFF', lineHeight:1.1, marginTop:2 }}>MOONLIGHT</div>
              <div style={{ fontSize:8, fontWeight:700, letterSpacing:'.3em', color:'#3FB6F2', lineHeight:1.3 }}>CAFE</div>
            </div>
            <div className="kot-cafe-name" style={{ fontSize:18, fontWeight:900, letterSpacing:'.1em', color:'#1B1B22', marginBottom:4 }}>MOONLIGHT CAFE</div>
            <p className="kot-address fm" style={{ fontSize:11, color:'rgba(27,27,34,.55)', lineHeight:1.8 }}>
              402, Brough Rd, Erode Fort, Erode,<br/>
              Tamil Nadu 638001<br/>
              Ph: 9952888344 / 8124230876
            </p>
          </div>

          <hr className="kot-divider-solid" style={{ border:'none', borderTop:'2px solid rgba(27,27,34,.25)', margin:'0 0 12px' }}/>

          {/* Bill info row */}
          <div className="kot-info fm" style={{ display:'flex', justifyContent:'space-between', fontSize:11.5, marginBottom:3 }}>
            <span>Bill No: <strong>#{bill.billNo}</strong></span>
            <span>{dateStr} {timeStr}</span>
          </div>
          <div className="kot-info fm" style={{ display:'flex', justifyContent:'space-between', fontSize:11.5, color:'rgba(27,27,34,.6)', marginBottom:12 }}>
            <span>Customer: {bill.customerName || 'Walk-in'}</span>
            <span>Table: {bill.tableNo}</span>
          </div>

          <hr className="kot-divider" style={{ border:'none', borderTop:'1.5px dashed rgba(27,27,34,.2)', margin:'0 0 10px' }}/>

          {/* Items table */}
          <table style={{ width:'100%', fontSize:12, borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ borderBottom:'1px solid rgba(27,27,34,.15)' }}>
                <th style={{ textAlign:'left', paddingBottom:6, fontSize:11, color:'rgba(27,27,34,.5)', fontWeight:700 }}>Item</th>
                <th style={{ textAlign:'center', paddingBottom:6, fontSize:11, color:'rgba(27,27,34,.5)', fontWeight:700, width:36 }}>Qty</th>
                <th style={{ textAlign:'center', paddingBottom:6, fontSize:11, color:'rgba(27,27,34,.5)', fontWeight:700, width:50 }}>Rate</th>
                <th style={{ textAlign:'right', paddingBottom:6, fontSize:11, color:'rgba(27,27,34,.5)', fontWeight:700, width:50 }}>Amt</th>
              </tr>
            </thead>
            <tbody>
              {bill.items.map((it, i) => (
                <tr key={i}>
                  <td style={{ paddingTop:7, paddingBottom:4, verticalAlign:'top' }}>
                    <div style={{ fontWeight:600, fontSize:12 }}>{it.name}</div>
                    {it.variant && <div style={{ fontSize:10, color:'rgba(27,27,34,.45)', marginTop:1 }}>{it.variant}</div>}
                  </td>
                  <td style={{ textAlign:'center', paddingTop:7, verticalAlign:'top' }}>{it.qty}</td>
                  <td style={{ textAlign:'center', paddingTop:7, verticalAlign:'top' }}>{it.price}</td>
                  <td style={{ textAlign:'right', paddingTop:7, verticalAlign:'top', fontWeight:700 }}>{(it.price*it.qty).toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <hr className="kot-divider" style={{ border:'none', borderTop:'1.5px dashed rgba(27,27,34,.2)', margin:'12px 0' }}/>

          {/* Totals */}
          <div className="fm" style={{ display:'flex', flexDirection:'column', gap:5, fontSize:12 }}>
            {[
              ['Subtotal',                   `₹${bill.subtotal.toFixed(2)}`,         false],
              [`Discount (${bill.discountPercent}%)`, `-₹${bill.discountAmount.toFixed(2)}`,  false],
              [`Tax (${bill.taxPercent}%)`,  `+₹${bill.taxAmount.toFixed(2)}`,        false],
            ].map(([k,v]) => (
              <div key={k} className="tot-row" style={{ display:'flex', justifyContent:'space-between', color:'rgba(27,27,34,.55)' }}>
                <span>{k}</span><span>{v}</span>
              </div>
            ))}
            <div className="grand-total-row" style={{ display:'flex', justifyContent:'space-between', borderTop:'2px dashed rgba(27,27,34,.18)', paddingTop:9, marginTop:3, fontSize:14, fontWeight:900, color:'#1B1B22' }}>
              <span>GRAND TOTAL</span>
              <span>₹{bill.grandTotal.toFixed(2)}</span>
            </div>
            <div className="tot-row" style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'rgba(27,27,34,.5)', marginTop:2 }}>
              <span>Payment</span>
              <span style={{ fontWeight:700, color:'rgba(27,27,34,.7)' }}>{bill.paymentMode}</span>
            </div>
          </div>

          <hr className="kot-divider" style={{ border:'none', borderTop:'1.5px dashed rgba(27,27,34,.2)', margin:'14px 0 12px' }}/>

          {/* Footer */}
          <div className="kot-footer" style={{ textAlign:'center', paddingBottom:20 }}>
            <p className="ff" style={{ fontSize:15, fontWeight:600, fontStyle:'italic', color:'#1B1B22' }}>
              Thank you for dining with us!
            </p>
            <p style={{ fontSize:10, letterSpacing:'.22em', color:'#3FB6F2', marginTop:5, textTransform:'uppercase', fontWeight:600 }}>
              Share a scoop with someone special 💕
            </p>
          </div>
        </div>

        {/* ── Action buttons ── */}
        <div style={{ display:'flex', gap:10, marginTop:14 }}>
          <RippleBtn onClick={() => {
            document.title = `Bill_${bill.billNo}_Table${bill.tableNo}`;
            window.print();
            setTimeout(() => { document.title = 'Moonlight Cafe'; }, 1000);
          }} style={{
            flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:2,
            padding:'13px', borderRadius:16,
            background:'linear-gradient(135deg,#2AA8E8,#3FB6F2,#5DCCFF)',
            color:'#07070F', fontWeight:800, fontSize:13, textTransform:'uppercase', letterSpacing:'.08em',
            boxShadow:'0 6px 24px rgba(63,182,242,.45)',
          }}>
            <span style={{ display:'flex', alignItems:'center', gap:7 }}>
              <IcoPrint size={15}/> Print Receipt
            </span>
            <span style={{ fontSize:9, fontWeight:600, letterSpacing:'.06em', opacity:.6, textTransform:'none' }}>or Save as PDF</span>
          </RippleBtn>
          <RippleBtn onClick={onClose} style={{
            display:'flex', alignItems:'center', justifyContent:'center', gap:7,
            padding:'13px 18px', borderRadius:16,
            border:'1px solid rgba(251,247,239,.2)', color:'var(--cream)',
            fontWeight:800, fontSize:13, textTransform:'uppercase',
            background:'rgba(255,255,255,.06)', backdropFilter:'blur(12px)',
          }}>
            <IcoX size={15}/> New Order
          </RippleBtn>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  BILLING PAGE
// ═══════════════════════════════════════════════════════════════════════════
let _billNo = 1000;
function nextBillNo() { return ++_billNo; }

// ═══════════════════════════════════════════════════════════════════════════
//  CATEGORY TABS — scrollable with arrow buttons
// ═══════════════════════════════════════════════════════════════════════════
function CategoryTabs({ categories, activeCategory, switchCat, CAT_EMOJI }) {
  const tabsRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const checkScroll = () => {
    const el = tabsRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive:true });
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, [categories]);

  const scroll = (dir) => {
    if (tabsRef.current) tabsRef.current.scrollBy({ left: dir * 220, behavior:'smooth' });
  };

  const ArrowBtn = ({ dir, visible }) => (
    <button onClick={() => scroll(dir)} style={{
      flexShrink:0, width:30, height:30, borderRadius:'50%',
      border:'1.5px solid rgba(255,255,255,.14)',
      background: visible ? 'rgba(14,14,28,.9)' : 'transparent',
      color: visible ? 'rgba(251,247,239,.75)' : 'transparent',
      cursor: visible ? 'pointer' : 'default',
      display:'flex', alignItems:'center', justifyContent:'center',
      margin: dir < 0 ? '0 4px 12px 8px' : '0 8px 12px 4px',
      fontSize:18, fontWeight:300, lineHeight:1,
      transition:'all .2s', pointerEvents: visible ? 'auto' : 'none',
      boxShadow: visible ? '0 2px 10px rgba(0,0,0,.4)' : 'none',
    }}
    onMouseEnter={e => { if (visible) { e.currentTarget.style.borderColor='rgba(63,182,242,.5)'; e.currentTarget.style.color='var(--blue)'; e.currentTarget.style.boxShadow='0 0 14px rgba(63,182,242,.3)'; }}}
    onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,.14)'; e.currentTarget.style.color='rgba(251,247,239,.75)'; e.currentTarget.style.boxShadow='0 2px 10px rgba(0,0,0,.4)'; }}>
      {dir < 0 ? '‹' : '›'}
    </button>
  );

  return (
    <div style={{ display:'flex', alignItems:'center', position:'relative' }}>
      <ArrowBtn dir={-1} visible={canLeft} />
      <div ref={tabsRef} className="tabs-scroll" style={{
        overflowX:'auto', padding:'0 0 12px', display:'flex', gap:6, flex:1, scrollBehavior:'smooth',
      }}>
        {[{ k:'all', l:'All Items', e:'⊞' }, ...categories.map(c => ({ k:c, l:c, e:CAT_EMOJI[c] || '🍽️' }))].map(({ k, l, e }) => {
          const active = activeCategory === k;
          return (
            <RippleBtn key={k} onClick={() => switchCat(k)} style={{
              display:'flex', alignItems:'center', gap:6,
              whiteSpace:'nowrap', flexShrink:0,
              padding:'7px 16px', borderRadius:99, fontSize:12.5, fontWeight:700,
              background: active ? 'linear-gradient(135deg,#E8B84B,var(--gold2),#FFE89A)' : 'rgba(255,255,255,.04)',
              color: active ? 'rgba(7,7,15,.9)' : 'rgba(251,247,239,.52)',
              border: active ? 'none' : '1px solid rgba(255,255,255,.07)',
              boxShadow: active ? '0 4px 18px rgba(240,195,109,.45),0 1px 0 rgba(255,255,255,.3) inset' : 'none',
              transition:'all .28s cubic-bezier(.34,1.4,.64,1)',
              transform: active ? 'scale(1.05) translateY(-1px)' : 'scale(1) translateY(0)',
              letterSpacing: active ? '-.01em' : 'normal',
            }}>
              <span style={{ fontSize:14 }}>{e}</span>
              <span>{l}</span>
            </RippleBtn>
          );
        })}
      </div>
      <ArrowBtn dir={1} visible={canRight} />
    </div>
  );
}

function BillingPage({ tableNo, username, onBack, onLogout, tableOrders, setTableOrders, onBillGenerated, toast }) {
  const blank = { cart:[], customerName:'', discountPct:0, taxPct:0, paymentMode:'Cash' };
  const order = tableOrders[tableNo] || blank;
  const { cart, customerName, discountPct, taxPct, paymentMode } = order;
  const upd = patch => setTableOrders(p => ({ ...p, [tableNo]:{ ...p[tableNo] || blank, ...patch } }));

  const [search, setSearch] = useState('');
  const [foodFilter, setFoodFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [catKey, setCatKey] = useState(0);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [bill, setBill] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => { setTimeout(() => setHeaderVisible(true), 80); }, []);

  const categories = useMemo(() => { const s = []; MENU.forEach(m => { if (!s.includes(m.category)) s.push(m.category); }); return s; }, []);

  const filtered = useMemo(() => MENU.filter(m => {
    if (activeCategory !== 'all' && m.category !== activeCategory) return false;
    if (foodFilter !== 'all' && m.foodType !== foodFilter) return false;
    if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [activeCategory, foodFilter, search]);

  const groups = useMemo(() => {
    const g = {};
    filtered.forEach(m => {
      const k = activeCategory === 'all' ? m.category : (m.section || m.category);
      if (!g[k]) g[k] = []; g[k].push(m);
    });
    return g;
  }, [filtered, activeCategory]);

  const totals = useMemo(() => {
    const sub = cart.reduce((s, l) => s + l.price * l.qty, 0);
    const disc = +(sub * (discountPct / 100)).toFixed(2);
    const tax = +((sub - disc) * (taxPct / 100)).toFixed(2);
    return { subtotal:sub, discountAmount:disc, taxAmount:tax, grandTotal:+(sub - disc + tax).toFixed(2) };
  }, [cart, discountPct, taxPct]);

  const handleAdd = (item, variant) => {
    const key = `${item.id}-${variant?.label || 'base'}`;
    const price = variant ? variant.price : item.basePrice;
    const existing = cart.find(l => l.key === key);
    upd({ cart: existing ? cart.map(l => l.key === key ? { ...l, qty:l.qty + 1 } : l) : [...cart, { key, name:item.name, variant:variant?.label || '', price, qty:1 }] });
    toast(`${item.name}${variant ? ` (${variant.label})` : ''} added ✦`);
  };

  const handleQtyChange = (key, d) => upd({ cart: cart.map(l => l.key === key ? { ...l, qty:l.qty + d } : l).filter(l => l.qty > 0) });
  const handleRemove = key => upd({ cart: cart.filter(l => l.key !== key) });

  const handleCheckout = () => {
    setCheckoutLoading(true);
    setTimeout(() => {
      const nb = {
        billNo:nextBillNo(), tableNo, customerName:customerName || 'Walk-in',
        items:cart.map(l => ({ name:l.name, variant:l.variant, price:l.price, qty:l.qty })),
        subtotal:totals.subtotal, discountPercent:discountPct, discountAmount:totals.discountAmount,
        taxPercent:taxPct, taxAmount:totals.taxAmount, grandTotal:totals.grandTotal,
        paymentMode, createdAt:new Date().toISOString(),
      };
      setBill(nb); onBillGenerated(nb); setCheckoutLoading(false);
      toast(`Bill #${nb.billNo} — ₹${nb.grandTotal.toFixed(0)} ✓`);
    }, 900);
  };

  const closeReceipt = () => {
    setBill(null);
    upd({ cart:[], customerName:'', discountPct:0, taxPct:0, paymentMode:'Cash' });
    onBack();
  };

  const switchCat = cat => { setActiveCategory(cat); setCatKey(k => k + 1); };

  return (
    <div className="p-in" style={{ display:'flex', flexDirection:'column', height:'100vh', overflow:'hidden', background:'var(--bg)', position:'relative' }}>
      <MeshBg variant="billing" />

      {/* Header */}
      <header style={{
        flexShrink:0, borderBottom:'1px solid rgba(255,255,255,.05)',
        background:'rgba(7,7,15,.82)', backdropFilter:'blur(28px)',
        position:'relative', zIndex:2,
        opacity:headerVisible ? 1 : 0, transform:headerVisible ? 'none' : 'translateY(-12px)',
        transition:'opacity .4s ease, transform .4s ease',
      }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'11px 20px', gap:12, flexWrap:'wrap' }}>
          {/* Left: back + logo */}
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <RippleBtn onClick={onBack} style={{
              display:'flex', alignItems:'center', gap:5, padding:'7px 13px', borderRadius:99,
              border:'1px solid rgba(255,255,255,.08)', background:'rgba(255,255,255,.03)',
              fontSize:12, fontWeight:600, color:'rgba(251,247,239,.4)', transition:'all .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(63,182,242,.4)'; e.currentTarget.style.color='var(--blue)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,.08)'; e.currentTarget.style.color='rgba(251,247,239,.4)'; }}>
              <IcoBack size={13} /> Tables
            </RippleBtn>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div className="float" style={{ '--fd':'6s', '--fy':'-7px', width:38, height:38, borderRadius:'50%', background:'rgba(14,14,24,.9)', border:'1px solid rgba(240,195,109,.35)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <IcoMoon size={18} style={{ color:'var(--gold)' }} />
              </div>
              <div>
                <p className="ff" style={{ fontSize:17, color:'var(--cream)', fontWeight:500 }}>Moonlight Cafe</p>
                <p style={{ fontSize:9.5, letterSpacing:'.28em', color:'var(--blue)', textTransform:'uppercase', opacity:.75 }}>Table {tableNo} · Billing</p>
              </div>
            </div>
          </div>

          {/* Right: search + filters + cart toggle */}
          <div style={{ display:'flex', alignItems:'center', gap:8, flex:1, minWidth:180, maxWidth:460 }}>
            <div style={{ position:'relative', flex:1 }}>
              <IcoSearch size={13} style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', color:'rgba(255,255,255,.2)', pointerEvents:'none' }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search menu…"
                style={{
                  width:'100%', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.09)',
                  borderRadius:99, padding:'8px 12px 8px 30px', color:'var(--cream)', fontSize:13, transition:'all .2s',
                }}
                onFocus={e => { e.target.style.borderColor='rgba(63,182,242,.45)'; e.target.style.boxShadow='0 0 0 4px rgba(63,182,242,.08)'; e.target.style.background='rgba(63,182,242,.03)'; }}
                onBlur={e => { e.target.style.borderColor='rgba(255,255,255,.09)'; e.target.style.boxShadow='none'; e.target.style.background='rgba(255,255,255,.04)'; }}
              />
            </div>
            <div style={{ display:'flex', gap:4 }}>
              {[['all','All'], ['veg','🟢'], ['non-veg','🔴']].map(([k, l]) => (
                <RippleBtn key={k} onClick={() => setFoodFilter(k)} style={{
                  padding:'6px 10px', borderRadius:99, fontSize:12, fontWeight:700,
                  border: foodFilter === k ? '1px solid rgba(63,182,242,.5)' : '1px solid rgba(255,255,255,.07)',
                  background: foodFilter === k ? 'rgba(63,182,242,.14)' : 'rgba(255,255,255,.03)',
                  color: foodFilter === k ? 'var(--blue2)' : 'rgba(251,247,239,.38)',
                  transition:'all .2s',
                  boxShadow: foodFilter === k ? '0 0 12px rgba(63,182,242,.2)' : 'none',
                }}>{l}</RippleBtn>
              ))}
            </div>
            {cart.length > 0 && (
              <RippleBtn onClick={() => setShowCart(v => !v)} style={{
                position:'relative', padding:'8px 14px', borderRadius:99,
                background:'linear-gradient(135deg,var(--gold),var(--gold2))',
                color:'rgba(7,7,15,.85)', fontSize:12.5, fontWeight:800,
                display:'flex', alignItems:'center', gap:5,
                boxShadow:'0 3px 16px rgba(240,195,109,.4)',
              }}>
                <IcoReceipt size={13} /> {cart.length}
                <span style={{
                  position:'absolute', top:-6, right:-6, width:18, height:18, borderRadius:'50%',
                  background:'var(--ember)', color:'#fff', fontSize:10, fontWeight:900,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  border:'2px solid var(--bg)', boxShadow:'0 2px 8px rgba(226,72,61,.5)',
                  animation:'burst .4s ease',
                }}>{cart.length}</span>
              </RippleBtn>
            )}
            <RippleBtn onClick={onLogout} style={{
              width:34, height:34, borderRadius:11, border:'1px solid rgba(255,255,255,.08)',
              display:'flex', alignItems:'center', justifyContent:'center', color:'rgba(251,247,239,.32)', transition:'all .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color='var(--ember)'; e.currentTarget.style.borderColor='rgba(226,72,61,.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.color='rgba(251,247,239,.32)'; e.currentTarget.style.borderColor='rgba(255,255,255,.08)'; }}>
              <IcoOut size={13} />
            </RippleBtn>
          </div>
        </div>

        {/* Category tabs — with scroll arrows */}
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          switchCat={switchCat}
          CAT_EMOJI={CAT_EMOJI}
        />
      </header>

      {/* Body */}
      <div style={{ display:'flex', flex:1, overflow:'hidden', gap:14, padding:'14px 18px', position:'relative', zIndex:1 }}>
        {/* Menu */}
        <div style={{ flex:1, overflowY:'auto', minWidth:0 }}>
          {Object.entries(groups).length === 0 ? (
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:180, border:'1px dashed rgba(255,255,255,.07)', borderRadius:20, color:'rgba(251,247,239,.22)', gap:10 }}>
              <span style={{ fontSize:32 }}>🔍</span>
              <span style={{ fontSize:14 }}>No items found</span>
            </div>
          ) : (
            <div key={catKey} style={{ display:'flex', flexDirection:'column', gap:26 }}>
              {Object.entries(groups).map(([groupName, items]) => (
                <div key={groupName}>
                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
                    <span style={{ fontSize:20 }}>{CAT_EMOJI[items[0].category] || '🍽️'}</span>
                    <h2 className="ff" style={{ fontSize:17, color:'var(--gold)', fontWeight:500, opacity:.9 }}>{groupName}</h2>
                    <div style={{ flex:1, height:1, background:'linear-gradient(to right,rgba(240,195,109,.2),transparent)' }} />
                    <span style={{ fontSize:11, color:'rgba(251,247,239,.22)', fontStyle:'italic' }}>{items.length} items</span>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(195px,1fr))', gap:10 }}>
                    {items.map((item, i) => <MenuCard key={item.id} item={item} onAdd={handleAdd} animDelay={Math.min(i * 0.025, 0.3)} />)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Desktop cart */}
        <div style={{ width:332, flexShrink:0, height:'100%', display:window.innerWidth < 1024 ? 'none' : 'block' }}>
          <CartPanel cart={cart} tableNo={tableNo} customerName={customerName} setCustomerName={v => upd({ customerName:v })}
            discountPct={discountPct} setDiscountPct={v => upd({ discountPct:v })}
            taxPct={taxPct} setTaxPct={v => upd({ taxPct:v })}
            paymentMode={paymentMode} setPaymentMode={v => upd({ paymentMode:v })}
            totals={totals} onQtyChange={handleQtyChange} onRemove={handleRemove}
            onCheckout={handleCheckout} loading={checkoutLoading} />
        </div>
      </div>

      {/* Mobile cart overlay */}
      {showCart && (
        <div style={{ position:'fixed', inset:0, zIndex:50, display:'flex', flexDirection:'column', justifyContent:'flex-end', background:'rgba(0,0,0,.75)', backdropFilter:'blur(8px)' }}
          onClick={() => setShowCart(false)}>
          <div onClick={e => e.stopPropagation()} style={{ height:'80vh', padding:'0 10px 10px', animation:'receiptIn .38s cubic-bezier(.22,1,.36,1)' }}>
            <CartPanel cart={cart} tableNo={tableNo} customerName={customerName} setCustomerName={v => upd({ customerName:v })}
              discountPct={discountPct} setDiscountPct={v => upd({ discountPct:v })}
              taxPct={taxPct} setTaxPct={v => upd({ taxPct:v })}
              paymentMode={paymentMode} setPaymentMode={v => upd({ paymentMode:v })}
              totals={totals} onQtyChange={handleQtyChange} onRemove={handleRemove}
              onCheckout={handleCheckout} loading={checkoutLoading} />
          </div>
        </div>
      )}

      {bill && <ReceiptModal bill={bill} onClose={closeReceipt} />}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  ROOT APP
// ═══════════════════════════════════════════════════════════════════════════
export default function App() {
  const [username, setUsername] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableOrders, setTableOrders] = useState({});
  const [bills, setBills] = useState([]);
  const { toasts, show:toast } = useToast();

  const tables = useMemo(() => Array.from({ length:10 }, (_, i) => {
    const no = i + 1, order = tableOrders[no], cart = order?.cart || [];
    return { no, status:cart.length > 0 ? 'occupied' : 'free', itemCount:cart.length, total:cart.reduce((s, l) => s + l.price * l.qty, 0) };
  }), [tableOrders]);

  const handleBillGenerated = bill => {
    setBills(p => [...p, bill]);
    setTableOrders(p => { const n = { ...p }; delete n[bill.tableNo]; return n; });
  };

  return (
    <>
      <style>{CSS + `
        @keyframes ripple{to{transform:translate(-50%,-50%) scale(5);opacity:0;}}
        @keyframes burst{0%{transform:scale(1);opacity:1}100%{transform:scale(2.5);opacity:0}}
      `}</style>

      {!username && <LoginPage onLogin={setUsername} />}

      {username && !selectedTable && (
        <TableSelector username={username} onLogout={() => setUsername(null)}
          onSelectTable={setSelectedTable} tables={tables} bills={bills} />
      )}

      {username && selectedTable && (
        <BillingPage tableNo={selectedTable} username={username}
          onBack={() => setSelectedTable(null)}
          onLogout={() => { setUsername(null); setSelectedTable(null); }}
          tableOrders={tableOrders} setTableOrders={setTableOrders}
          onBillGenerated={handleBillGenerated} toast={toast} />
      )}

      <ToastStack toasts={toasts} />
    </>
  );
}
