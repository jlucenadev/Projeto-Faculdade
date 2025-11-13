document.getElementById('checkoutForm').addEventListener('submit',function(e){e.preventDefault();
  const carrinho=JSON.parse(localStorage.getItem('carrinho')||'[]'); if(!carrinho.length){showToast('Carrinho vazio');return;}
  const endereco={rua:document.getElementById('rua').value.trim(),numero:document.getElementById('numero').value.trim(),bairro:document.getElementById('bairro').value.trim(),cidade:document.getElementById('cidade').value.trim(),referencia:document.getElementById('referencia').value.trim()};
  if(!endereco.rua||!endereco.numero||!endereco.bairro||!endereco.cidade){showToast('Preencha o endereço corretamente');return;}
  const pagamento=document.getElementById('pagamento').value; const troco=document.getElementById('troco').value||null;
  const pedido={id:'PED'+Math.floor(Math.random()*9000+1000),usuario:JSON.parse(localStorage.getItem('usuario')||'{}').nome||'Cliente',itens:carrinho,total:carrinho.reduce((s,i)=>s+i.preco*i.quantidade,0),status:'Recebido',criado_em:new Date().toISOString(),endereco,pagamento,troco};
  let pedidos=JSON.parse(localStorage.getItem('pedidos')||'[]'); pedidos.push(pedido); localStorage.setItem('pedidos',JSON.stringify(pedidos));
  localStorage.setItem('pedido',JSON.stringify(pedido)); localStorage.removeItem('carrinho'); showToast('Pedido realizado!'); setTimeout(()=>location.href='pedido.html',1200);
});