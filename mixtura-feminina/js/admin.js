(() => {
  const KEY_PRODUCTS="mixtura_products_v1", KEY_STORE="mixtura_store_v1";
  // Senha inicial demonstrativa: troque este valor antes de publicar.
  const ADMIN_PASSWORD="Mixtura@2026";
  const defaults=[
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
  const defaultStore={name:"Mixtura Feminina",phone:"+55 21 99535-5653",address:"R. Dr. Francisco de Souza, 21 - Centro, Rio Bonito - RJ, 28800-000",instagram:"@mixturafeminina",instagramUrl:"https://www.instagram.com/",mapUrl:"https://maps.google.com/?q=R.+Dr.+Francisco+de+Souza,+21,+Rio+Bonito,+RJ",description:"A Mixtura Feminina acredita que cada mulher tem um jeito único de expressar sua beleza. Nossa proposta é oferecer uma seleção versátil de moda feminina, com atendimento próximo e atenção a cada detalhe."};
  const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
  let products=read(KEY_PRODUCTS,defaults), store=read(KEY_STORE,defaultStore);
  const $=id=>document.getElementById(id);
  const money=n=>Number(n).toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
  const safe=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const saveProducts=()=>localStorage.setItem(KEY_PRODUCTS,JSON.stringify(products));
  const saveStore=()=>localStorage.setItem(KEY_STORE,JSON.stringify(store));
  $("loginForm").addEventListener("submit",e=>{e.preventDefault();if($("adminPassword").value===ADMIN_PASSWORD){$("loginPanel").hidden=true;$("dashboard").hidden=false;renderProducts();fillStore();}else $("loginMessage").textContent="Senha incorreta. Tente novamente.";});
  $("logoutButton").addEventListener("click",()=>{ $("dashboard").hidden=true;$("loginPanel").hidden=false;$("adminPassword").value="";});
  document.querySelectorAll(".tab-button").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".tab-button").forEach(x=>x.classList.toggle("active",x===btn));document.querySelectorAll(".admin-tab-content").forEach(x=>x.hidden=x.id!==btn.dataset.tab);}));
  function renderProducts(){
    $("adminProductList").innerHTML=products.map(p=>`<div class="admin-product-row"><img src="${safe(p.image)}" alt=""><div><b>${safe(p.name)}</b><small>${safe(p.category)} · ${money(p.price)} ${p.featured?"· Novidade":""}</small></div><div class="row-actions"><button data-edit="${safe(p.id)}">Editar</button><button data-delete="${safe(p.id)}">Excluir</button></div></div>`).join("")||"<p>Nenhum produto cadastrado.</p>";
  }
  let selectedImageData = "";
  function showImagePreview(src, label="Imagem pronta para salvar"){
    const preview=$("productImagePreview");
    if(src){preview.src=src;preview.hidden=false;$("imageFileName").textContent=label;}
    else{preview.removeAttribute("src");preview.hidden=true;$("imageFileName").textContent="Nenhuma imagem selecionada.";}
  }
  function optimizeImage(file){
    return new Promise((resolve,reject)=>{
      if(!file || !file.type.startsWith("image/")){reject(new Error("Selecione um arquivo de imagem válido."));return;}
      const reader=new FileReader();
      reader.onerror=()=>reject(new Error("Não foi possível ler a imagem."));
      reader.onload=()=>{
        const img=new Image();
        img.onerror=()=>reject(new Error("O arquivo selecionado não é uma imagem válida."));
        img.onload=()=>{
          const max=1400, scale=Math.min(1,max/Math.max(img.width,img.height));
          const canvas=document.createElement("canvas");
          canvas.width=Math.max(1,Math.round(img.width*scale));canvas.height=Math.max(1,Math.round(img.height*scale));
          const ctx=canvas.getContext("2d");ctx.drawImage(img,0,0,canvas.width,canvas.height);
          const type="image/webp";
          const data=canvas.toDataURL(type,0.82);
          resolve(data.startsWith("data:image/webp")?data:canvas.toDataURL("image/jpeg",0.82));
        };
        img.src=reader.result;
      };
      reader.readAsDataURL(file);
    });
  }
  $("productImageFile").addEventListener("change",async e=>{
    const file=e.target.files[0];
    if(!file){selectedImageData="";showImagePreview("");return;}
    $("productMessage").textContent="Preparando imagem...";
    try{selectedImageData=await optimizeImage(file);showImagePreview(selectedImageData,file.name);$("productMessage").textContent="Imagem anexada. Salve o produto para aplicar.";}
    catch(err){selectedImageData="";showImagePreview("");$("productMessage").textContent=err.message;e.target.value="";}
  });
  function resetProductForm(){ $("productForm").reset();$("productId").value="";$("productFormTitle").textContent="Adicionar produto";$("productForm").hidden=true;$("productMessage").textContent="";selectedImageData="";showImagePreview(""); }

  $("newProductButton").addEventListener("click",()=>{resetProductForm();$("productForm").hidden=false;$("productFormTitle").textContent="Adicionar produto";$("productForm").scrollIntoView({behavior:"smooth",block:"start"});});
  $("cancelProduct").addEventListener("click",resetProductForm);
  $("adminProductList").addEventListener("click",e=>{
    const edit=e.target.closest("[data-edit]"), del=e.target.closest("[data-delete]");
    if(edit){const p=products.find(x=>x.id===edit.dataset.edit);if(!p)return;$("productId").value=p.id;$("productName").value=p.name;$("productCategory").value=p.category;$("productPrice").value=p.price;$("productImage").value=p.image.startsWith("data:image/")?"":p.image;selectedImageData=p.image.startsWith("data:image/")?p.image:"";showImagePreview(p.image,p.image.startsWith("data:image/")?"Imagem já anexada":"Imagem atual do produto");$("productDescription").value=p.description;$("productFeatured").checked=!!p.featured;$("productFormTitle").textContent="Editar produto";$("productForm").hidden=false;$("productForm").scrollIntoView({behavior:"smooth",block:"start"});}
    if(del&&confirm("Deseja realmente excluir este produto?")){products=products.filter(x=>x.id!==del.dataset.delete);saveProducts();renderProducts();}
  });
  $("productForm").addEventListener("submit",e=>{
    e.preventDefault();const id=$("productId").value;
    const existing=id?products.find(p=>p.id===id):null;
    const image=selectedImageData||$("productImage").value.trim()||(existing?existing.image:"");
    const item={id:id||`p${Date.now()}`,name:$("productName").value.trim(),category:$("productCategory").value,price:Number($("productPrice").value),image,description:$("productDescription").value.trim(),featured:$("productFeatured").checked};
    if(!item.name||!item.image||!Number.isFinite(item.price)||item.price<0){$("productMessage").textContent="Informe o nome, o preço e uma imagem (arquivo ou URL).";return;}
    if(id)products=products.map(p=>p.id===id?item:p);else products.unshift(item);
    try{saveProducts();renderProducts();resetProductForm();$("productMessage").textContent="Produto salvo com sucesso.";}
    catch(err){$("productMessage").textContent="Não foi possível salvar: o armazenamento do navegador pode estar cheio. Tente uma imagem menor.";}
  });
  function fillStore(){ $("storeName").value=store.name||"";$("storePhoneInput").value=store.phone||"";$("storeAddressInput").value=store.address||"";$("storeInstagramInput").value=store.instagram||"";$("storeInstagramUrlInput").value=store.instagramUrl||"";$("storeMapInput").value=store.mapUrl||"";$("storeDescriptionInput").value=store.description||""; }
  $("storeForm").addEventListener("submit",e=>{e.preventDefault();store={name:$("storeName").value.trim(),phone:$("storePhoneInput").value.trim(),address:$("storeAddressInput").value.trim(),instagram:$("storeInstagramInput").value.trim(),instagramUrl:$("storeInstagramUrlInput").value.trim(),mapUrl:$("storeMapInput").value.trim(),description:$("storeDescriptionInput").value.trim()};saveStore();$("storeMessage").textContent="Informações salvas neste navegador. Atualize a página da loja para conferir.";});
})();
