function carregarCarrinhoLocal(){try{return JSON.parse(localStorage.getItem('carrinho')||'[]');}catch(e){return [];}} 
function salvarCarrinhoLocal(cart){localStorage.setItem('carrinho',JSON.stringify(cart));}
function updateBadgeCarrinho(){const cart=carregarCarrinhoLocal();const badge=document.getElementById('cartBadge');if(badge)badge.textContent=cart.reduce((s,i)=>s+i.quantidade,0);}
function adicionarAoCarrinho(id,quantidade=1){const prod=produtos.find(p=>p.id===id);if(!prod)return showToast('Produto não encontrado');let cart=carregarCarrinhoLocal();const idx=cart.findIndex(i=>i.id===id);if(idx===-1){cart.push({id:prod.id,nome:prod.nome,preco:Number(prod.preco.toFixed(2)),quantidade,imagem:prod.imagem});}else{cart[idx].quantidade+=quantidade;}salvarCarrinhoLocal(cart);updateBadgeCarrinho();showToast(prod.nome+' adicionado ao carrinho');}
function renderProdutos(list){const wrap=document.getElementById('productsGrid');if(!wrap)return;wrap.innerHTML='';if(!list||list.length===0){wrap.innerHTML='<p class="muted">Nenhum produto encontrado.</p>';return;}list.forEach(p=>{const card=document.createElement('article');card.className='product-card';card.innerHTML=`
  <div style="display:flex;gap:12px;align-items:center">
    <div class="product-media" style="width:86px;height:86px;border-radius:10px;overflow:hidden;background:linear-gradient(var(--accent),#fff);">
      <img src="${p.imagem}" alt="${p.nome}" onerror="this.src='img/placeholder.png'" style="width:100%;height:100%;object-fit:cover">
    </div>
    <div style="flex:1">
      <h3 class="product-title">${p.nome}</h3>
      <p class="product-desc">${p.descricao||''}</p>
      <div class="product-footer">
        <div class="price">R$ ${Number(p.preco).toFixed(2).replace('.',',')}</div>
        <div><button class="add-btn" data-id="${p.id}">Adicionar</button></div>
      </div>
    </div>
  </div>
`;wrap.appendChild(card);});wrap.querySelectorAll('.add-btn').forEach(btn=>{btn.addEventListener('click',()=>adicionarAoCarrinho(btn.dataset.id,1));});}
