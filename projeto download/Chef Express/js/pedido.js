const statusEtapas=['Recebido','Em preparo','Saiu para entrega','Entregue'];let etapa=0;
document.addEventListener('DOMContentLoaded',()=>{
  const pedido=JSON.parse(localStorage.getItem('pedido')||'null'); const box=document.getElementById('pedidoBox');
  if(!pedido){box.innerHTML='<p class="muted">Nenhum pedido encontrado.</p>';return;}
  box.innerHTML=`
  <p><strong>ID:</strong> ${pedido.id}</p>
  <p><strong>Status:</strong> <span id="status">${pedido.status}</span></p>
  <p><strong>Total:</strong> R$ ${pedido.total.toFixed(2).replace('.',',')}</p>
  <hr/>
  <p><strong>Itens:</strong></p>
  <ul>${pedido.itens.map(i=>`<li>${i.quantidade}x ${i.nome}</li>`).join('')}</ul>
  `;
  function atualizar(){ if(etapa<statusEtapas.length){ pedido.status=statusEtapas[etapa]; localStorage.setItem('pedido',JSON.stringify(pedido)); const el=document.getElementById('status'); if(el) el.textContent=pedido.status; etapa++; setTimeout(atualizar,8000); } }
  atualizar();
});