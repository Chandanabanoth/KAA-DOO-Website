import React, {useMemo, useState} from "react";
import {createRoot} from "react-dom/client";
import {
  Search, ShoppingBag, Menu, X, Plus, Minus, Trash2, ChevronRight,
  Star, Leaf, ShieldCheck, Truck, Heart, MessageCircle, ArrowRight,
  Instagram, Facebook,Whatsup, MapPin, Phone, Mail
} from "lucide-react";
import "./styles.css";

const products = [
  {id:1,name:"A2 Pure Ghee",slug:"a2-pure-ghee",price:649,mrp:749,size:"500 ml",cat:"Ghee",tag:"Bestseller",rating:4.9,desc:"Rich, aromatic ghee crafted for everyday cooking and traditional recipes.",image:"/images/ghee.jpg"},
  {id:2,name:"Pure Honey",slug:"forest-honey",price:399,mrp:449,size:"500 g",cat:"Honey",tag:"Pure",rating:4.8,desc:"Naturally golden honey with a smooth, floral finish.",image:"/images/pure-honey.jpg"},
  {id:3,name:"Organic Jaggery",slug:"organic-jaggery",price:249,mrp:299,size:"1 kg",cat:"Jaggery",tag:"Farm Fresh",rating:4.8,desc:"Deep, caramel-like sweetness made from traditionally processed sugarcane.",image:"/images/jaggery.jpg"},
  {id:4,name:"Dry Ginger Powder",slug:"dry-ginger",price:179,mrp:219,size:"200 g",cat:"Dry Ginger",tag:"Aromatic",rating:4.7,desc:"Fine sun-dried ginger powder for chai, cooking and classic recipes.",image:"/images/dry-ginger"},
  {id:5,name:"Ghee + Jaggery Duo",slug:"ghee-Jaggery-duo",price:899,mrp:998,size:"500 ml + 500 g",cat:"Combos",tag:"Best Value",rating:4.9,desc:"A thoughtfully paired duo for your pantry and gifting moments.",image:/images/kaa-doo-jaggery-ghee-combo"},
  {id:6,name:"Traditional Wellness Mix",slug:"traditional-wellness-mix",price:499,mrp:579,size:"300 g",cat:"Combos",tag:"Signature",rating:4.9,desc:"A comforting blend inspired by familiar Indian pantry traditions.",image:/images/traditional-wellness-mix.jpg"}
];

const cats=["All","Ghee","Honey","Jaggery","Dry Ginger","Combos"];

function App(){
  const [cart,setCart]=useState([]);
  const [openCart,setOpenCart]=useState(false);
  const [menu,setMenu]=useState(false);
  const [query,setQuery]=useState("");
  const [cat,setCat]=useState("All");
  const [toast,setToast]=useState("");
  const [email,setEmail]=useState("");

  const filtered=useMemo(()=>products.filter(p=>
    (cat==="All"||p.cat===cat) &&
    (p.name+" "+p.desc).toLowerCase().includes(query.toLowerCase())
  ),[cat,query]);

  const count=cart.reduce((s,x)=>s+x.qty,0);
  const total=cart.reduce((s,x)=>s+x.price*x.qty,0);

  function add(p){
    setCart(c=>{
      const found=c.find(x=>x.id===p.id);
      return found?c.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x):[...c,{...p,qty:1}];
    });
    setToast(`${p.name} added to cart`);
    setTimeout(()=>setToast(""),1800);
  }
  function change(id,d){setCart(c=>c.map(x=>x.id===id?{...x,qty:Math.max(0,x.qty+d)}:x).filter(x=>x.qty))}
  function checkout(){
    const text=encodeURIComponent(
      "Hello KAA DOO! I want to order:%0A"+
      cart.map(x=>`• ${x.name} (${x.size}) × ${x.qty} — ₹${x.price*x.qty}`).join("%0A")+
      `%0A%0ATotal: ₹${total}`
    );
    window.open(`https://wa.me/917993499778?text=${text}`,"_blank");
  }

  return <div className="app">
    <div className="announcement">🌿 Pure ingredients • Traditional goodness • Delivered across India</div>

    <header className="header">
      <div className="nav">
        <button className="iconBtn mobileOnly" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
        <a className="logo" href="#home"><span>KAA</span> DOO<small>PURE • TRADITIONAL • HONEST</small></a>
        <nav className={menu?"navLinks open":"navLinks"}>
          {["Home","Shop","About","Combos","Contact"].map(x=><a key={x} href={"#"+x.toLowerCase()} onClick={()=>setMenu(false)}>{x}</a>)}
        </nav>
        <div className="actions">
          <div className="search"><Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products"/></div>
          <button className="iconBtn cartBtn" onClick={()=>setOpenCart(true)}><ShoppingBag/><b>{count}</b></button>
        </div>
      </div>
    </header>

    <main>
      <section id="home" className="hero">
        <div className="heroCopy">
          <span className="eyebrow">FROM OUR PANTRY TO YOUR HOME</span>
          <h1>Pure goodness.<br/><em>Made the traditional way.</em></h1>
          <p>Discover everyday staples made with simple ingredients, familiar traditions and a whole lot of care.</p>
          <div className="heroBtns"><a className="btn primary" href="#shop">Shop the collection <ArrowRight size={18}/></a><a className="textBtn" href="#about">Our story <ChevronRight size={17}/></a></div>
          <div className="trustRow"><span><Leaf/> Carefully sourced</span><span><ShieldCheck/> Quality focused</span><span><Truck/> Pan-India delivery</span></div>
        </div>
        <div className="heroVisual">
          <div className="sun"></div><div className="heroJar">🍯</div>
          <div className="floating f1">100%<small>TRADITIONAL</small></div>
          <div className="floating f2">FRESH<small>EVERY BATCH</small></div>
        </div>
      </section>

      <section className="categoryStrip">
        {cats.slice(1).map((x,i)=><button key={x} onClick={()=>{setCat(x);document.getElementById("shop").scrollIntoView({behavior:"smooth"})}}><span>{["🫙","🍯","🧱","🌿","🎁"][i]}</span>{x}<ChevronRight size={16}/></button>)}
      </section>

      <section id="shop" className="section shop">
        <div className="sectionHead"><div><span className="eyebrow">SHOP KAA DOO</span><h2>Good things for your pantry.</h2></div><p>Simple staples. Thoughtfully made. Easy to love.</p></div>
        <div className="filters">{cats.map(x=><button className={cat===x?"active":""} key={x} onClick={()=>setCat(x)}>{x}</button>)}</div>
        <div className="grid">{filtered.map(p=><Product key={p.id} p={p} add={add}/>)}</div>
        {!filtered.length&&<div className="empty">No products found. Try another search.</div>}
      </section>

      <section className="storyBand">
        <div className="storyImage">🌾<span>ROOTED IN<br/>TRADITION</span></div>
        <div className="storyText"><span className="eyebrow">WHY KAA DOO</span><h2>Old-fashioned goodness for modern homes.</h2><p>We believe everyday food should feel honest. KAA DOO brings familiar Indian pantry ingredients into a clean, thoughtful shopping experience—without losing the traditions that make them special.</p><div className="miniFeatures"><div><Leaf/><b>Simple ingredients</b><small>Nothing unnecessary.</small></div><div><Heart/><b>Made with care</b><small>Quality in every batch.</small></div></div><a className="btn dark" href="#about">Discover our story</a></div>
      </section>

      <section id="combos" className="section combo"><div className="sectionHead"><div><span className="eyebrow">SAVE WITH KAA DOO</span><h2>Pantry-ready combos.</h2></div><p>Giftable pairings for families, festivals and everyday rituals.</p></div><div className="comboGrid">{products.filter(x=>x.cat==="Combos").map(p=><Product key={p.id} p={p} add={add} compact/>)}</div></section>

      <section className="benefits"><div><Truck/><b>Pan-India delivery</b><span>Safe doorstep delivery</span></div><div><ShieldCheck/><b>Quality first</b><span>Carefully selected ingredients</span></div><div><Heart/><b>Made with care</b><span>Thoughtful from source to shelf</span></div><div><MessageCircle/><b>Easy ordering</b><span>WhatsApp support</span></div></section>

      <section id="about" className="section about"><span className="eyebrow">THE KAA DOO PROMISE</span><h2>Keep it pure. Keep it familiar.</h2><p>From rich ghee and golden honey to jaggery and aromatic dry ginger, KAA DOO celebrates ingredients that already belong in Indian kitchens. Our goal is simple: make trustworthy pantry shopping feel warm, clear and convenient.</p><div className="promise"><span>01 <b>Source thoughtfully</b></span><span>02 <b>Pack carefully</b></span><span>03 <b>Deliver reliably</b></span></div></section>

      <section id="contact" className="newsletter"><div><span className="eyebrow">STAY IN THE LOOP</span><h2>Goodness, delivered to your inbox.</h2><p>New products, offers and KAA DOO stories—occasionally, not annoyingly.</p></div><form onSubmit={e=>{e.preventDefault();setToast("Thanks! You're on the list.");setEmail("")}}><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email address"/><button className="btn primary">Subscribe</button></form></section>
    </main>

    <footer><div className="footerTop"><div><a className="logo light" href="#home"><span>KAA</span> DOO<small>PURE • TRADITIONAL • HONEST</small></a><p>Traditional pantry goodness, made for everyday life.</p><div className="social"><Instagram/><Facebook/><MessageCircle/></div></div><div><h4>Shop</h4><a href="#shop">All products</a><a href="#shop">Ghee</a><a href="#shop">Honey</a><a href="#shop">Jaggery</a></div><div><h4>Help</h4><a href="#contact">Contact us</a><a href="#home">Shipping</a><a href="#home">Returns</a><a href="#home">FAQs</a></div><div><h4>Contact</h4><span><Phone/> +91 90000 00000</span><span><Mail/> hello@kaadoo.in</span><span><MapPin/> Telangana, India</span></div></div><div className="copyright">© 2026 KAA DOO. All rights reserved. <span>Made for good food.</span></div></footer>

    {openCart&&<div className="overlay" onClick={()=>setOpenCart(false)}><aside className="cart" onClick={e=>e.stopPropagation()}><div className="cartHead"><h2>Your cart</h2><button className="iconBtn" onClick={()=>setOpenCart(false)}><X/></button></div>{!cart.length?<div className="cartEmpty"><ShoppingBag size={46}/><h3>Your cart is empty</h3><p>Add something good to get started.</p><button className="btn primary" onClick={()=>setOpenCart(false)}>Start shopping</button></div>:<><div className="cartItems">{cart.map(x=><div className="cartItem" key={x.id}><div className="thumb">{x.emoji}</div><div className="ciMain"><b>{x.name}</b><small>{x.size}</small><strong>₹{x.price}</strong><div className="qty"><button onClick={()=>change(x.id,-1)}><Minus/></button><span>{x.qty}</span><button onClick={()=>change(x.id,1)}><Plus/></button></div></div><button className="trash" onClick={()=>change(x.id,-x.qty)}><Trash2/></button></div>)}</div><div className="cartBottom"><div><span>Subtotal</span><b>₹{total}</b></div><small>Shipping calculated at order confirmation.</small><button className="btn primary full" onClick={checkout}><MessageCircle/> Order on WhatsApp</button></div></>}</aside></div>}

    {toast&&<div className="toast">✓ {toast}</div>}
  </div>
}

function Product({p,add,compact}){
 return <article className={"product "+(compact?"compact":"")}><div className="productVisual"><span className="tag">{p.tag}</span><button className="heart"><Heart size={18}/></button><div className="productEmoji">{p.emoji}</div></div><div className="productInfo"><div className="rating"><Star fill="currentColor" size={14}/>{p.rating} <span>• {p.size}</span></div><h3>{p.name}</h3><p>{p.desc}</p><div className="price"><b>₹{p.price}</b><del>₹{p.mrp}</del><span>{Math.round((1-p.price/p.mrp)*100)}% off</span></div><button className="add" onClick={()=>add(p)}><Plus size={18}/> Add to cart</button></div></article>
}

createRoot(document.getElementById("root")).render(<App/>);
