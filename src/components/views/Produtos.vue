<template>
  <div class="bar">
    <h2>Produtos</h2>
    <button class="btn red" id="open">+ Criar produto</button>
  </div>
  <div class="grid" id="list"></div>

<div class="layer" id="layer">
    <PassadorHorizontal>
              <ProdutoCard 
              v-for="produto in produtos"
              :key="produto.id"
              :produto="produto"
              />
            </PassadorHorizontal>
</div>

<div class="modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="mTitle"></div>

<aside class="drawer" id="drawer" aria-label="Criar produto" aria-hidden="true">
  <button class="x" id="close" aria-label="Fechar">X</button>
  <h2>Novo produto</h2>
  <label for="fName">
    Nome
    </label>
  <input id="fName" maxlength="40">
  <label for="fPhoto">Foto do produto</label>
  <input id="fPhoto" type="file" accept="image/*">
  <div class="prev" id="prev">Sem foto</div>
  <label for="fDesc">Descrição</label>
  <textarea id="fDesc" maxlength="300"></textarea>
  <label for="fPrice">Preço (R$)</label>
  <input id="fPrice" type="number" min="0" step="0.01" inputmode="decimal" placeholder="0,00">
  <div class="err" id="err" role="alert"></div>
  <button class="btn" id="publish" style="margin-top:8px">Publicar produto</button>
</aside>

<div id="toast" role="status" aria-live="polite"></div>
</template>

<script scoped>
import PassadorHorizontal from './PassadorHorizontal.vue'
import ProdutoCard from './Produtocard.vue'
import { produtos } from '../data/produtos.js'
</script>
<style setup>
@import url('../css/base.css');
.bar{
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:12px;
    margin-bottom:24px;
    flex-wrap:wrap
}
h2{
    font-size:16px;
    margin:0
}
h2::before{
    content:"> ";
    color:var(--red)
}
.btn{
    background:var(--cyan);
    color:var(--ink);
    border:4px solid var(--ink);
    box-shadow:4px 4px 0 var(--ink);
    padding:10px 16px;
    cursor:pointer;
    font-family:"Press Start 2P",monospace;font-size:11px
}
.btn:hover{
    transform:translate(-2px,-2px);
    box-shadow:6px 6px 0 var(--ink)
}
.btn:active{
    transform:translate(2px,2px);
    box-shadow:2px 2px 0 var(--ink)
}

.btn.red{
    background:var(--red);color:#fff}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:24px}
.card{background:var(--card);border:4px solid var(--ink);box-shadow:6px 6px 0 var(--ink);padding:12px;display:flex;flex-direction:column;gap:10px;text-align:left;cursor:pointer;width:100%}
.card:hover{border-color:var(--red)}
.ph{aspect-ratio:4/3;width:100%;border:4px solid var(--ink);background:var(--line);display:grid;place-items:center;font-size:64px;overflow:hidden;image-rendering:pixelated}
.ph img{width:100%;height:100%;object-fit:cover}
.card h3{font-size:12px;margin:0;word-break:break-word}
.card p{margin:0;color:var(--muted);flex:1;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.price{font-family:"Press Start 2P",monospace;font-size:14px;color:var(--gold)}
.stars{display:inline-flex;gap:2px;font-size:26px;letter-spacing:0}
.stars .on{color:var(--gold)}.stars .off{color:var(--line)}
.meta{display:flex;justify-content:space-between;align-items:center;color:var(--muted)}
.empty{grid-column:1/-1;text-align:center;padding:40px;color:var(--muted)}
.layer{position:fixed;inset:0;background:rgba(5,8,16,.65);display:none;z-index:20}
.layer.on{display:block}
.modal{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);width:min(560px,92vw);max-height:90vh;overflow:auto;background:var(--card);border:4px solid var(--ink);box-shadow:8px 8px 0 var(--ink);padding:18px;display:none;z-index:30}
.modal.on{display:block}
.modal h3{font-size:14px;margin:14px 0 8px}
.rate button{background:none;border:0;cursor:pointer;font-size:38px;padding:0 2px;color:var(--line)}
.rate button.on{color:var(--gold)}
.x{float:right;background:var(--red);color:#fff;border:4px solid var(--ink);cursor:pointer;width:38px;height:38px;font-family:"Press Start 2P",monospace;font-size:12px}
.drawer{position:fixed;top:0;right:0;bottom:0;width:min(400px,100vw);background:var(--bar);border-left:6px solid var(--ink);padding:20px;padding-top:calc(20px + env(safe-area-inset-top,0px));transform:translateX(100%);transition:transform .2s;z-index:40;overflow:auto}
.drawer.on{transform:none}
.drawer h2{margin-bottom:16px}
.drawer label{display:block;margin:14px 0 6px;color:var(--cyan)}
.drawer input,.drawer textarea{width:100%;background:var(--ink);border:4px solid var(--line);padding:8px 10px}
.drawer textarea{min-height:110px;resize:vertical}
.prev{aspect-ratio:4/3;border:4px dashed var(--line);display:grid;place-items:center;color:var(--muted);overflow:hidden;margin-top:6px}
.prev img{width:100%;height:100%;object-fit:cover}
.err{color:var(--red);min-height:1.2em;margin-top:10px}
#toast{position:fixed;left:50%;bottom:calc(20px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);background:var(--ink);border:4px solid var(--cyan);padding:10px 18px;z-index:60;opacity:0;pointer-events:none}
#toast.on{opacity:1}
@media(prefers-reduced-motion:reduce){
    .drawer{
        transition:none
    }
    .btn:hover,.btn:active{
        transform:none
    }
}
@media(max-width:600px){.logo{font-size:15px}.user span{display:none}}
</style>