import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import {
  Apple, ArrowRight, BadgePercent, CakeSlice, Beef, Bike, Check, ChevronDown,
  CircleUserRound, Clock3, Coffee, Heart, Leaf, Menu, Minus, PackageCheck,
  Plus, Search, ShoppingBag, Sparkles, Star, Trash2, Truck, UserRound, X,
  Wheat, Milk, House, SlidersHorizontal, MapPin, ShieldCheck, Send
} from "lucide-react";

const IMG = {
  hero:"https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=1400&q=85",
  vegetables:"https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=85",
  bakery:"https://images.pexels.com/photos/20008782/pexels-photo-20008782.jpeg?auto=compress&cs=tinysrgb&w=900",
  delivery:"https://images.unsplash.com/photo-1570913196376-dacb677ef459?auto=format&fit=crop&w=900&q=85"
};

const products = [
 {id:1,name:"Organic Hass Avocados",category:"Fruits & Vegetables",price:129,oldPrice:159,rating:4.8,reviewsCount:124,discount:19,image:"https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=700&q=80",badge:"Organic",unit:"4 pcs",stock:24,description:"Creamy, ripe Hass avocados selected for everyday toast, salads and guacamole."},
 {id:2,name:"Fresh Red Tomatoes",category:"Fruits & Vegetables",price:49,oldPrice:65,rating:4.7,reviewsCount:198,discount:25,image:"https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=700&q=80",badge:"Farm Fresh",unit:"500 g",stock:38,description:"Juicy red tomatoes with a bright flavour, ideal for curries, salads and sandwiches."},
 {id:3,name:"Green Broccoli",category:"Fruits & Vegetables",price:89,oldPrice:110,rating:4.6,reviewsCount:87,discount:19,image:"https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=700&q=80",badge:"Fresh",unit:"500 g",stock:21,description:"Crisp green broccoli florets, perfect for steaming, roasting and stir-fries."},
 {id:4,name:"Premium Bananas",category:"Fruits & Vegetables",price:59,oldPrice:70,rating:4.9,reviewsCount:241,discount:16,image:"https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=700&q=80",badge:"Best Seller",unit:"1 kg",stock:46,description:"Naturally sweet bananas that make a convenient breakfast or snack."},
 {id:5,name:"Farm Fresh Milk",category:"Dairy & Eggs",price:68,oldPrice:74,rating:4.8,reviewsCount:312,discount:8,image:"https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=700&q=80",badge:"Daily Fresh",unit:"1 L",stock:50,description:"Fresh dairy milk with a smooth, clean taste for tea, coffee and breakfast."},
 {id:6,name:"Free Range Eggs",category:"Dairy & Eggs",price:99,oldPrice:120,rating:4.9,reviewsCount:276,discount:18,image:"https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=700&q=80",badge:"Protein Pick",unit:"12 pcs",stock:35,description:"Quality free-range eggs for breakfast, baking and wholesome home cooking."},
 {id:7,name:"Greek Yogurt",category:"Dairy & Eggs",price:119,oldPrice:145,rating:4.6,reviewsCount:104,discount:18,image:"https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=700&q=80",badge:"Creamy",unit:"400 g",stock:17,description:"Thick and creamy yogurt with a rich texture for bowls, smoothies and snacks."},
 {id:8,name:"Multigrain Bread",category:"Bakery",price:55,oldPrice:65,rating:4.7,reviewsCount:153,discount:15,image:"https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80",badge:"Baked Today",unit:"400 g",stock:29,description:"Soft multigrain loaf baked with wholesome grains for a satisfying everyday slice."},
 {id:9,name:"Butter Croissant",category:"Bakery",price:85,oldPrice:105,rating:4.8,reviewsCount:92,discount:19,image:"https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80",badge:"Fresh Bake",unit:"4 pcs",stock:13,description:"Flaky, buttery croissants with delicate layers and a golden finish."},
 {id:10,name:"Cold Brew Coffee",category:"Beverages",price:149,oldPrice:180,rating:4.5,reviewsCount:78,discount:17,image:"https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=700&q=80",badge:"Chilled",unit:"250 ml",stock:19,description:"Smooth cold brew coffee made for a refreshing afternoon pick-me-up."},
 {id:11,name:"Orange Juice",category:"Beverages",price:109,oldPrice:135,rating:4.7,reviewsCount:133,discount:19,image:"https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=700&q=80",badge:"No Added Sugar",unit:"1 L",stock:22,description:"Bright citrus juice with a naturally refreshing orange flavour."},
 {id:12,name:"Sparkling Lemon Drink",category:"Beverages",price:79,oldPrice:95,rating:4.4,reviewsCount:64,discount:17,image:"https://images.unsplash.com/photo-1523677011781-c91d1bbe2f5d?auto=format&fit=crop&w=700&q=80",badge:"Refreshing",unit:"750 ml",stock:31,description:"Lightly sparkling lemon drink for a crisp and refreshing break."},
 {id:13,name:"Roasted Almonds",category:"Snacks",price:179,oldPrice:220,rating:4.9,reviewsCount:188,discount:19,image:"https://images.unsplash.com/photo-1508061253366-f7da158b6d8b?auto=format&fit=crop&w=700&q=80",badge:"Protein Pick",unit:"250 g",stock:25,description:"Crunchy roasted almonds, a convenient snack packed with natural goodness."},
 {id:14,name:"Classic Potato Chips",category:"Snacks",price:45,oldPrice:55,rating:4.5,reviewsCount:211,discount:18,image:"https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=700&q=80",badge:"Popular",unit:"120 g",stock:44,description:"Crispy golden potato chips seasoned for a classic crunchy snack."},
 {id:15,name:"Basmati Rice",category:"Rice & Grains",price:249,oldPrice:299,rating:4.8,reviewsCount:205,discount:17,image:"https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=80",badge:"Premium",unit:"5 kg",stock:18,description:"Long-grain aromatic basmati rice that cooks into separate, fluffy grains."},
 {id:16,name:"Rolled Oats",category:"Rice & Grains",price:139,oldPrice:165,rating:4.7,reviewsCount:119,discount:16,image:"https://images.unsplash.com/photo-1517093728432-3a5f2a9c9a1f?auto=format&fit=crop&w=700&q=80",badge:"Healthy",unit:"1 kg",stock:27,description:"Wholesome rolled oats for warm porridge, overnight oats and baking."},
 {id:17,name:"Chicken Breast",category:"Meat & Seafood",price:329,oldPrice:380,rating:4.8,reviewsCount:144,discount:13,image:"https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=700&q=80",badge:"High Protein",unit:"500 g",stock:14,description:"Tender chicken breast, cleaned and ready for grilling, curries or meal prep."},
 {id:18,name:"Salmon Fillet",category:"Meat & Seafood",price:499,oldPrice:570,rating:4.7,reviewsCount:71,discount:12,image:"https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=700&q=80",badge:"Premium",unit:"300 g",stock:9,description:"Premium salmon fillet with a rich flavour, great for pan-searing or baking."},
 {id:19,name:"Natural Dishwash Gel",category:"Household",price:119,oldPrice:145,rating:4.6,reviewsCount:91,discount:18,image:"https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80",badge:"Value Pack",unit:"500 ml",stock:33,description:"Effective everyday dishwash gel designed to cut grease while staying gentle."},
 {id:20,name:"Aloe Vera Hand Wash",category:"Personal Care",price:99,oldPrice:125,rating:4.7,reviewsCount:106,discount:21,image:"https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?auto=format&fit=crop&w=700&q=80",badge:"Gentle",unit:"250 ml",stock:28,description:"Refreshing aloe vera hand wash for a clean, soft and pleasant finish."},
 {id:21,name:"Fresh Strawberries",category:"Fruits & Vegetables",price:159,oldPrice:190,rating:4.9,reviewsCount:173,discount:16,image:"https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=700&q=80",badge:"Seasonal",unit:"250 g",stock:12,description:"Sweet seasonal strawberries selected for colour, aroma and freshness."},
 {id:22,name:"Peanut Butter",category:"Snacks",price:199,oldPrice:240,rating:4.8,reviewsCount:161,discount:17,image:"https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=700&q=80",badge:"Pantry Pick",unit:"340 g",stock:20,description:"Creamy peanut butter for toast, smoothies, snacks and breakfast bowls."}
];

const categories = [
 ["Fruits & Vegetables",Apple,"Fresh produce",IMG.vegetables],
 ["Dairy & Eggs",Milk,"Daily essentials",IMG.vegetables],
 ["Bakery", CakeSlice, "Baked today", IMG.bakery],
 ["Beverages",Coffee,"Cool & refreshing",IMG.delivery],
 ["Snacks",Sparkles,"Tasty bites",IMG.vegetables],
 ["Rice & Grains",Wheat,"Pantry staples",IMG.vegetables]
];

const money = n => `₹${n.toLocaleString("en-IN")}`;

function App(){
 const [search,setSearch]=useState("");
 const [category,setCategory]=useState("All");
 const [sort,setSort]=useState("featured");
 const [maxPrice,setMaxPrice]=useState(550);
 const [minRating,setMinRating]=useState(0);
 const [saleOnly,setSaleOnly]=useState(false);
 const [cart,setCart]=useState(()=>JSON.parse(localStorage.getItem("groco-cart")||"[]"));
 const [wishlist,setWishlist]=useState(()=>JSON.parse(localStorage.getItem("groco-wishlist")||"[]"));
 const [detail,setDetail]=useState(null), [cartOpen,setCartOpen]=useState(false);
 const [checkoutOpen,setCheckoutOpen]=useState(false), [success,setSuccess]=useState(false);
 const [mobileNav,setMobileNav]=useState(false), [notice,setNotice]=useState("");
 const [form,setForm]=useState({name:"",phone:"",email:"",address:"",city:"",pin:""});
 const [contact,setContact]=useState({name:"",email:"",message:""}), [contactSent,setContactSent]=useState(false);

 useEffect(()=>localStorage.setItem("groco-cart",JSON.stringify(cart)),[cart]);
 useEffect(()=>localStorage.setItem("groco-wishlist",JSON.stringify(wishlist)),[wishlist]);
 useEffect(()=>{ if(notice){const t=setTimeout(()=>setNotice(""),2400);return()=>clearTimeout(t)}},[notice]);

 const filtered=useMemo(()=>{
  let a=products.filter(p=>(category==="All"||p.category===category)&&p.price<=maxPrice&&p.rating>=minRating&&(!saleOnly||p.discount>0)&&p.name.toLowerCase().includes(search.toLowerCase()));
  if(sort==="price-low")a.sort((x,y)=>x.price-y.price);
  if(sort==="price-high")a.sort((x,y)=>y.price-x.price);
  if(sort==="rating")a.sort((x,y)=>y.rating-x.rating);
  if(sort==="discount")a.sort((x,y)=>y.discount-x.discount);
  return a;
 },[search,category,sort,maxPrice,minRating,saleOnly]);

 const cartItems=cart.map(x=>({...x,product:products.find(p=>p.id===x.id)})).filter(x=>x.product);
 const count=cart.reduce((s,x)=>s+x.qty,0), subtotal=cartItems.reduce((s,x)=>s+x.product.price*x.qty,0), delivery=subtotal>=499||subtotal===0?0:39, total=subtotal+delivery;

 const addToCart=(p,qty=1)=>{setCart(c=>{const found=c.find(x=>x.id===p.id);return found?c.map(x=>x.id===p.id?{...x,qty:Math.min(x.qty+qty,p.stock)}:x):[...c,{id:p.id,qty}]});setNotice(`${p.name} added to cart`)};
 const changeQty=(id,d)=>setCart(c=>c.map(x=>x.id===id?{...x,qty:x.qty+d}:x).filter(x=>x.qty>0));
 const toggleWish=id=>setWishlist(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]);
 const scrollTo=id=>{setMobileNav(false);document.getElementById(id)?.scrollIntoView({behavior:"smooth"})};
 const reset=()=>{setSearch("");setCategory("All");setSort("featured");setMaxPrice(550);setMinRating(0);setSaleOnly(false)};

 const submitCheckout=e=>{
  e.preventDefault();
  if(!form.name||!form.phone||!form.address||!form.city||!form.pin){setNotice("Please complete all required delivery fields");return}
  setCheckoutOpen(false);setCart([]);setSuccess(true);
 };
 const submitContact=e=>{e.preventDefault();if(contact.name&&contact.email&&contact.message){setContactSent(true);setContact({name:"",email:"",message:""})}};

 return <div className="app">
  <header className="header">
   <div className="container header-inner">
    <button className="brand" data-testid="brand" onClick={()=>scrollTo("home")}><span className="brand-mark"><Leaf size={20}/></span><span>Groco</span></button>
    <nav className={`nav ${mobileNav?"open":""}`}>
      <button data-testid="nav-home" onClick={()=>scrollTo("home")}>Home</button>
      <button data-testid="nav-shop" onClick={()=>scrollTo("shop")}>Shop</button>
      <button data-testid="nav-categories" onClick={()=>scrollTo("categories")}>Categories</button>
      <button data-testid="nav-about" onClick={()=>scrollTo("about")}>About</button>
      <button data-testid="nav-contact" onClick={()=>scrollTo("contact")}>Contact</button>
    </nav>
    <div className="header-actions">
      <div className="header-search"><Search size={17}/><input data-testid="header-search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search groceries..."/></div>
      <button className="icon-button" data-testid="wishlist-button" onClick={()=>{setNotice(`${wishlist.length} item${wishlist.length===1?"":"s"} in wishlist`)}} aria-label="Wishlist"><Heart size={20} fill={wishlist.length?"currentColor":"none"}/><span className="count">{wishlist.length}</span></button>
      <button className="icon-button cart-button" data-testid="cart-button" onClick={()=>setCartOpen(true)} aria-label="Cart"><ShoppingBag size={20}/>{count>0&&<span className="count">{count}</span>}</button>
      <button className="profile-button" data-testid="profile-button" onClick={()=>setNotice("Profile area is ready for account integration")}><CircleUserRound size={20}/><span>Profile</span></button>
      <button className="menu-button" data-testid="mobile-menu" onClick={()=>setMobileNav(v=>!v)}>{mobileNav?<X/>:<Menu/>}</button>
    </div>
   </div>
  </header>

  <main>
   <section className="hero" id="home">
    <img src={IMG.hero} alt="Fresh organic groceries"/>
    <div className="hero-shade"/>
    <div className="container hero-content">
      <div className="hero-copy">
       <span className="eyebrow"><Sparkles size={15}/> Freshness you can feel</span>
       <h1>Good food.<br/><em>Good mood.</em></h1>
       <p>Fresh groceries, everyday essentials and pantry favourites delivered to your door.</p>
       <div className="hero-buttons"><button className="primary-btn" data-testid="hero-shop" onClick={()=>scrollTo("shop")}>Shop fresh <ArrowRight size={18}/></button><button className="ghost-btn" data-testid="hero-categories" onClick={()=>scrollTo("categories")}>Explore categories</button></div>
       <div className="hero-stats"><span><Check/> Farm-picked</span><span><Truck/> Fast delivery</span><span><ShieldCheck/> Quality checked</span></div>
      </div>
    </div>
   </section>

   <section className="promise"><div className="container promise-grid">
    <div><span><Truck/></span><div><strong>Free delivery</strong><small>On orders above ₹499</small></div></div>
    <div><span><Clock3/></span><div><strong>Fresh in 30 min</strong><small>Fast local delivery</small></div></div>
    <div><span><PackageCheck/></span><div><strong>Quality promise</strong><small>Freshness guaranteed</small></div></div>
    <div><span><BadgePercent/></span><div><strong>Daily deals</strong><small>Save more every day</small></div></div>
   </div></section>

   <section className="section" id="categories"><div className="container">
    <div className="section-head"><div><span className="eyebrow dark">Shop by category</span><h2>Everything for your kitchen</h2></div><button className="text-button" data-testid="category-all" onClick={()=>{reset();scrollTo("shop")}}>View all <ArrowRight size={16}/></button></div>
    <div className="category-grid">{categories.map(([name,Icon,desc,img])=><button className="category-card" data-testid={`category-${name}`} key={name} onClick={()=>{setCategory(name);scrollTo("shop")}}><img src={img} alt=""/><div className="category-overlay"/><div className="category-info"><Icon size={23}/><strong>{name}</strong><small>{desc}</small></div></button>)}</div>
   </div></section>

   <section className="section shop-section" id="shop"><div className="container">
    <div className="section-head shop-head"><div><span className="eyebrow dark">Curated for you</span><h2>Fresh picks & favourites</h2><p>{filtered.length} products available</p></div></div>
    <div className="filters">
      <div className="filter-search"><Search size={17}/><input data-testid="product-search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products"/></div>
      <select data-testid="category-filter" value={category} onChange={e=>setCategory(e.target.value)}><option>All</option>{categories.map(c=><option key={c[0]}>{c[0]}</option>)}</select>
      <select data-testid="sort-filter" value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Sort: Featured</option><option value="price-low">Price: Low to high</option><option value="price-high">Price: High to low</option><option value="rating">Top rated</option><option value="discount">Biggest discount</option></select>
      <label className="range"><span>Up to {money(maxPrice)}</span><input data-testid="price-filter" type="range" min="49" max="550" step="10" value={maxPrice} onChange={e=>setMaxPrice(+e.target.value)}/></label>
      <select data-testid="rating-filter" value={minRating} onChange={e=>setMinRating(+e.target.value)}><option value="0">Any rating</option><option value="4">4★ & up</option><option value="4.5">4.5★ & up</option><option value="4.8">4.8★ & up</option></select>
      <label className="sale-toggle"><input data-testid="sale-filter" type="checkbox" checked={saleOnly} onChange={e=>setSaleOnly(e.target.checked)}/><span>Sale only</span></label>
      <button className="reset-button" data-testid="reset-filters" onClick={reset}><SlidersHorizontal size={16}/> Reset</button>
    </div>
    {filtered.length?<div className="product-grid">{filtered.map(p=><ProductCard key={p.id} p={p} wished={wishlist.includes(p.id)} onWish={()=>toggleWish(p.id)} onDetail={()=>setDetail(p)} onAdd={()=>addToCart(p)}/>)}</div>:<div className="empty"><Search size={34}/><h3>No groceries found</h3><p>Try a different search or reset your filters.</p><button className="primary-btn" data-testid="empty-reset" onClick={reset}>Reset filters</button></div>}
   </div></section>

   <section className="offer"><div className="container offer-inner"><div><span className="eyebrow">Weekly harvest</span><h2>Save up to 25% on fresh essentials</h2><p>Stock your kitchen with hand-picked favourites and everyday pantry staples.</p><button className="light-btn" data-testid="offer-shop" onClick={()=>{setSaleOnly(true);scrollTo("shop")}}>Shop offers <ArrowRight size={17}/></button></div><div className="offer-art"><img src={IMG.vegetables} alt="Fresh vegetables"/></div></div></section>

   <section className="section about" id="about"><div className="container about-grid"><div className="about-image"><img src={IMG.delivery} alt="Groco delivery"/></div><div><span className="eyebrow dark">Why Groco</span><h2>Freshness first,<br/>always.</h2><p>We make grocery shopping simpler by bringing fresh produce, trusted essentials and thoughtful everyday picks together in one easy experience.</p><div className="about-list"><div><Leaf/><span><strong>Freshly selected</strong><small>Products chosen with care.</small></span></div><div><Bike/><span><strong>Fast local delivery</strong><small>From our shelves to your doorstep.</small></span></div><div><Heart/><span><strong>Made for everyday life</strong><small>Simple shopping, no clutter.</small></span></div></div></div></div></section>

   <section className="section contact" id="contact"><div className="container contact-card"><div><span className="eyebrow dark">Need a hand?</span><h2>We're here to help.</h2><p>Have a question about an order, a product or your delivery? Send us a message.</p><div className="contact-detail"><MapPin size={18}/><span>Bhiwandi • Mumbai Metropolitan Region</span></div><div className="contact-detail"><Send size={18}/><span>vishalchaurasiya46529@gmail.com</span></div></div><form onSubmit={submitContact}><input data-testid="contact-name" value={contact.name} onChange={e=>setContact({...contact,name:e.target.value})} placeholder="Your name" required/><input data-testid="contact-email" type="email" value={contact.email} onChange={e=>setContact({...contact,email:e.target.value})} placeholder="Email address" required/><textarea data-testid="contact-message" value={contact.message} onChange={e=>setContact({...contact,message:e.target.value})} placeholder="How can we help?" required rows="4"/><button className="primary-btn" data-testid="contact-submit">{contactSent?<><Check/> Message sent</>:<>Send message <ArrowRight size={17}/></>}</button></form></div></section>
  </main>

  <footer><div className="container footer-grid"><div><button className="brand footer-brand" data-testid="footer-brand" onClick={()=>scrollTo("home")}><span className="brand-mark"><Leaf size={20}/></span><span>Groco</span></button><p>Fresh groceries, simple shopping,<br/>better everyday moments.</p></div><div><strong>Shop</strong><button data-testid="footer-shop" onClick={()=>scrollTo("shop")}>All products</button><button onClick={()=>{setSaleOnly(true);scrollTo("shop")}}>Offers</button><button onClick={()=>scrollTo("categories")}>Categories</button></div><div><strong>Company</strong><button onClick={()=>scrollTo("about")}>About Groco</button><button onClick={()=>scrollTo("contact")}>Contact</button><button onClick={()=>setNotice("Privacy policy coming soon")}>Privacy</button></div><div><strong>Delivery promise</strong><p>Free delivery over ₹499.<br/>Freshness guaranteed.</p></div></div><div className="container footer-bottom"><span>© 2026 Groco. Portfolio project.</span><span>Made with fresh ideas.</span></div></footer>

  {notice&&<div className="toast" data-testid="toast"><Check size={17}/>{notice}</div>}

  {detail&&<Modal onClose={()=>setDetail(null)}><div className="product-modal"><img src={detail.image} alt={detail.name}/><div className="modal-info"><button className="modal-close" data-testid="detail-close" onClick={()=>setDetail(null)}><X/></button><span className="product-badge">{detail.badge}</span><h2>{detail.name}</h2><div className="rating"><Star size={16} fill="currentColor"/><b>{detail.rating}</b><span>({detail.reviewsCount} reviews)</span></div><p>{detail.description}</p><div className="modal-price"><strong>{money(detail.price)}</strong><del>{money(detail.oldPrice)}</del><span>{detail.discount}% OFF</span></div><small>{detail.unit} • {detail.stock} in stock</small><button className="primary-btn wide" data-testid="detail-add" onClick={()=>{addToCart(detail);setDetail(null)}}><ShoppingBag size={18}/> Add to cart</button></div></div></Modal>}

  {cartOpen&&<CartDrawer items={cartItems} subtotal={subtotal} delivery={delivery} total={total} onClose={()=>setCartOpen(false)} onChange={changeQty} onRemove={id=>setCart(c=>c.filter(x=>x.id!==id))} onCheckout={()=>{if(!cartItems.length)return;setCartOpen(false);setCheckoutOpen(true)}}/>}
  {checkoutOpen&&<Modal onClose={()=>setCheckoutOpen(false)}><div className="checkout"><div className="checkout-head"><div><span className="eyebrow dark">Almost there</span><h2>Delivery details</h2></div><button className="modal-close" onClick={()=>setCheckoutOpen(false)}><X/></button></div><form onSubmit={submitCheckout}><div className="form-grid"><input data-testid="checkout-name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full name *"/><input data-testid="checkout-phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="Phone number *"/><input data-testid="checkout-email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email (optional)"/><input data-testid="checkout-city" value={form.city} onChange={e=>setForm({...form,city:e.target.value})} placeholder="City *"/><input data-testid="checkout-pin" value={form.pin} onChange={e=>setForm({...form,pin:e.target.value})} placeholder="PIN code *"/><textarea data-testid="checkout-address" className="full" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder="Delivery address *" rows="3"/></div><div className="checkout-total"><span>Order total</span><strong>{money(total)}</strong></div><button className="primary-btn wide" data-testid="place-order">Place order <ArrowRight size={17}/></button><p className="mock-note">Demo checkout — no real payment is processed.</p></form></div></Modal>}
  {success&&<Modal onClose={()=>setSuccess(false)}><div className="success"><div className="success-icon"><Check size={38}/></div><h2>Order confirmed!</h2><p>Your Groco demo order has been placed successfully. Fresh groceries are on their way.</p><button className="primary-btn" data-testid="success-close" onClick={()=>setSuccess(false)}>Continue shopping</button></div></Modal>}
 </div>
}

function ProductCard({p,wished,onWish,onDetail,onAdd}){
 return <article className="product-card" data-testid={`product-card-${p.id}`}>
  <div className="product-image"><img src={p.image} alt={p.name}/><span>{p.discount}% OFF</span><button data-testid={`wishlist-${p.id}`} className={`wish ${wished?"active":""}`} onClick={onWish} aria-label="Wishlist"><Heart size={18} fill={wished?"currentColor":"none"}/></button></div>
  <div className="product-body"><small>{p.category}</small><button className="product-name" data-testid={`product-detail-${p.id}`} onClick={onDetail}>{p.name}</button><div className="rating"><Star size={14} fill="currentColor"/><b>{p.rating}</b><span>({p.reviewsCount})</span></div><div className="product-bottom"><div><strong>{money(p.price)}</strong><del>{money(p.oldPrice)}</del><small>{p.unit}</small></div><button className="add-button" data-testid={`add-${p.id}`} onClick={onAdd}><Plus size={18}/></button></div></div>
 </article>
}

function Modal({children,onClose}){return <div className="modal-backdrop" data-testid="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><div className="modal-shell">{children}</div></div>}

function CartDrawer({items,subtotal,delivery,total,onClose,onChange,onRemove,onCheckout}){
 return <div className="drawer-backdrop" data-testid="cart-drawer" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><aside className="drawer"><div className="drawer-head"><div><span className="eyebrow dark">Your basket</span><h2>Shopping cart</h2></div><button className="modal-close" data-testid="cart-close" onClick={onClose}><X/></button></div>{items.length?<><div className="cart-items">{items.map(({product:p,qty})=><div className="cart-item" key={p.id}><img src={p.image} alt=""/><div className="cart-item-info"><strong>{p.name}</strong><small>{p.unit}</small><div><b>{money(p.price*qty)}</b><div className="qty"><button data-testid={`minus-${p.id}`} onClick={()=>onChange(p.id,-1)}><Minus/></button><span>{qty}</span><button data-testid={`plus-${p.id}`} onClick={()=>onChange(p.id,1)}><Plus/></button></div></div></div><button className="remove" data-testid={`remove-${p.id}`} onClick={()=>onRemove(p.id)}><Trash2 size={16}/></button></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><b>{money(subtotal)}</b></div><div><span>Delivery</span><b>{delivery?money(delivery):"FREE"}</b></div><div className="total"><span>Total</span><strong>{money(total)}</strong></div><button className="primary-btn wide" data-testid="checkout-button" onClick={onCheckout}>Checkout <ArrowRight size={17}/></button><small>Free delivery on orders above ₹499.</small></div></>:<div className="empty cart-empty"><ShoppingBag size={42}/><h3>Your basket is empty</h3><p>Add some fresh favourites to get started.</p><button className="primary-btn" onClick={onClose}>Start shopping</button></div>}</aside></div>
}

export default App;
