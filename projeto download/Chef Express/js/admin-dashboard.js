document.addEventListener('DOMContentLoaded',function(){
  document.getElementById('year').textContent=new Date().getFullYear();
  const pedidos=JSON.parse(localStorage.getItem('pedidos')||'[]'); const tabela=document.getElementById('tabelaPedidos');
  if(!pedidos.length){ tabela.innerHTML='<tr><td colspan="6" class="muted">Nenhum pedido encontrado.</td></tr>'; return; }
  const faturamento=pedidos.filter(p=>p.status!=='Cancelado').reduce((s,p)=>s+(p.total||0),0);
  document.getElementById('faturamentoTotal').textContent='R$ '+faturamento.toFixed(2).replace('.',',');
  document.getElementById('totalPedidos').textContent=pedidos.length;
  document.getElementById('totalCancelados').textContent=pedidos.filter(p=>p.status==='Cancelado').length;
  tabela.innerHTML='';
  pedidos.forEach(p=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`
      <td>${p.id}</td>
      <td>${p.usuario||'-'}</td>
      <td>R$ ${Number(p.total||0).toFixed(2).replace('.',',')}</td>
      <td><span class="status ${p.status}">${p.status}</span></td>
      <td>${new Date(p.criado_em).toLocaleDateString('pt-BR')}</td>
      <td>
        <select data-id="${p.id}" class="statusSelect">
          ${['Recebido','Em preparo','Saiu para entrega','Entregue','Cancelado'].map(s=>`<option ${p.status===s?'selected':''}>${s}</option>`).join('')}
        </select>
      </td>`;
    tabela.appendChild(tr);
  });
  tabela.addEventListener('change',function(e){
    if(e.target.classList.contains('statusSelect')){
      const id=e.target.dataset.id; const novo=e.target.value;
      const idx=pedidos.findIndex(x=>x.id===id); if(idx===-1) return;
      pedidos[idx].status=novo; localStorage.setItem('pedidos',JSON.stringify(pedidos)); showToast('Status atualizado!'); setTimeout(()=>location.reload(),900);
    }
  });
});