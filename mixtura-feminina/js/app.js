(() => {
  const STORAGE = { products: "mixtura_products_v1", store: "mixtura_store_v1" };
  const initialProducts = [
    {id:"p1",name:"Vestido Aurora",category:"Vestidos",price:189.90,description:"Leveza e movimento para momentos especiais.",image:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85",featured:true},
    {id:"p2",name:"Blusa Serena",category:"Blusas",price:89.90,description:"Um básico elegante para infinitas combinações.",image:"https://images.unsplash.com/photo-1564257577-1a9d7c9f7b5d?auto=format&fit=crop&w=900&q=85",featured:false},
    {id:"p3",name:"Conjunto Verona",category:"Conjuntos",price:229.90,description:"Praticidade e sofisticação em uma só produção.",image:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85",featured:true},
    {id:"p4",name:"Calça Elegance",category:"Calças",price:159.90,description:"Caimento confortável com toque contemporâneo.",image:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=85",featured:false},
    {id:"p5",name:"Saia Florença",category:"Saias",price:119.90,description:"Uma peça versátil para compor looks delicados.",image:"https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=900&q=85",featured:false},
    {id:"p6",name:"Vestido Jardim",category:"Vestidos",price:199.90,description:"Estampa romântica para dias cheios de charme.",image:"https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=900&q=85",featured:true},
    {id:"p7",name:"Camisa Lírio",category:"Blusas",price:139.90,description:"Clássica, fresca e fácil de combinar.",image:"https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=85",featured:false},
    {id:"p8",name:"Bolsa Siena",category:"Acessórios",price:149.90,description:"O detalhe que transforma a produção.",image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",featured:false},
    {id:"p9",name:"Conjunto Íris",category:"Conjuntos",price:219.90,description:"Conforto com uma proposta moderna e feminina.",image:"https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=900&q=85",featured:false},
    {id:"p10",name:"Vestido Dália",category:"Vestidos",price:179.90,description:"Silhueta fluida para acompanhar sua rotina.",image:"https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85",featured:false},
    {id:"p11",name:"Calça Chiara",category:"Calças",price:169.90,description:"Modelagem atual para um visual descomplicado.",image:"https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85",featured:false},
    {id:"p12",name:"Lenço Amora",category:"Acessórios",price:49.90,description:"Um toque de cor e personalidade no seu look.",image:"https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=900&q=85",featured:false}
  ];
  const initialStore = {name:"Mixtura Feminina",phone:"+55 21 99535-5653",address:"R. Dr. Francisco de Souza, 21 - Centro, Rio Bonito - RJ, 28800-000",instagram:"@mixturafeminina",instagramUrl:"https://www.instagram.com/",mapUrl:"https://maps.google.com/?q=R.+Dr.+Francisco+de+Souza,+21,+Rio+Bonito,+RJ",description:"A Mixtura Feminina acredita que cada mulher tem um jeito único de expressar sua beleza. Nossa proposta é oferecer uma seleção versátil de moda feminina, com atendimento próximo e atenção a cada detalhe."};
  const read = (key, fallback) => { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; } };
  const products = read(STORAGE.products, initialProducts);
  const store = read(STORAGE.store, initialStore);
  const digits = value => String(value || "").replace(/\D/g, "");
  const waUrl = (message="Olá! Gostaria de conhecer as novidades da Mixtura Feminina.") => `https://wa.me/${digits(store.phone)}?text=${encodeURIComponent(message)}`;
  const money = value => Number(value).toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
  const setText = (id, value) => { const el=document.getElementById(id); if(el) el.textContent=value; };
  document.querySelectorAll('[data-store="name"]').forEach(el => { el.innerHTML = `${escapeHtml(store.name.split(" ")[0] || "Mixtura")} <b>${escapeHtml(store.name.split(" ").slice(1).join(" ") || "Feminina")}</b><small>MODA & ESTILO</small>`; });
  ["headerWhats","heroWhats","collectionWhats","editorialWhats","contactWhats","floatingWhats"].forEach(id=>{const el=document.getElementById(id);if(el)el.href=waUrl();});
  setText("storeAddress",store.address); setText("storePhone",store.phone); setText("storeInstagram",store.instagram); setText("storeDescription",store.description);
  const map=document.getElementById("mapLink"); if(map) map.href=store.mapUrl || "#";
  const instagramHandle = String(store.instagram || "@mixturafeminina").trim();
  const cleanInstagram = instagramHandle.replace(/^@+/, "").replace(/^https?:\/\/(www\.)?instagram\.com\//i, "").replace(/\/?$/, "");
  const instagramHref = store.instagramUrl && !/^https?:\/\/(www\.)?instagram\.com\/?$/i.test(store.instagramUrl)
    ? store.instagramUrl
    : (cleanInstagram ? `https://www.instagram.com/${encodeURIComponent(cleanInstagram)}/` : "https://www.instagram.com/");
  const insta=document.getElementById("instagramLink"); if(insta) insta.href=instagramHref;
  const instaHandle=document.getElementById("instagramHandleLink"); if(instaHandle){instaHandle.href=instagramHref;instaHandle.textContent=instagramHandle.startsWith("@")?instagramHandle:`@${instagramHandle}`;}
  setText("year",new Date().getFullYear());
  function escapeHtml(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
  const grid=document.getElementById("productGrid");
  if(grid){
    let category="Todas", query="";
    const filters=document.getElementById("categoryFilters");
    const categories=["Todas","Vestidos","Blusas","Conjuntos","Calças","Saias","Acessórios"];
    filters.innerHTML=categories.map(c=>`<button class="filter-button ${c==="Todas"?"active":""}" data-category="${c}">${c}</button>`).join("");
    filters.addEventListener("click",e=>{const b=e.target.closest("button[data-category]");if(!b)return;category=b.dataset.category;filters.querySelectorAll("button").forEach(x=>x.classList.toggle("active",x===b));render();});
    document.getElementById("productSearch").addEventListener("input",e=>{query=e.target.value.toLocaleLowerCase("pt-BR");render();});
    function render(){
      const shown=products.filter(p=>(category==="Todas"||p.category===category)&&`${p.name} ${p.description} ${p.category}`.toLocaleLowerCase("pt-BR").includes(query));
      grid.innerHTML=shown.map(p=>`<article class="product-card"><div class="product-photo"><img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80'">${p.featured?'<span class="product-tag">Novidade</span>':""}</div><div class="product-info"><span class="product-category">${escapeHtml(p.category)}</span><h3>${escapeHtml(p.name)}</h3><p class="product-description">${escapeHtml(p.description)}</p><div class="product-bottom"><span class="product-price">${money(p.price)}</span><a class="product-buy" href="${waUrl(`Olá! Tenho interesse no produto ${p.name} (${money(p.price)}).`)}" target="_blank" rel="noopener">Consultar ↗</a></div></div></article>`).join("");
      document.getElementById("emptyState").hidden=shown.length>0;
    }
    render();
  }
  const toggle=document.getElementById("menuToggle"), nav=document.getElementById("mainNav");
  if(toggle&&nav)toggle.addEventListener("click",()=>nav.classList.toggle("open"));
})();
