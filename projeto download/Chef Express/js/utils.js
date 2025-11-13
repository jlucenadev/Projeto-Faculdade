function escapeHtml(str){return String(str||'').replace(/[&<>"']/g,function(m){return({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'})[m];});}
function showToast(msg,time=2200){const t=document.getElementById('toast');if(!t){alert(msg);return;}t.textContent=msg;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),time);}
function debounce(fn,wait=200){let t;return(...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),wait);};}
