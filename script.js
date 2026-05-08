/* BANCO LOCAL */
let roupas = JSON.parse(
localStorage.getItem("roupas")
) || [];

/* TROCAR TELA */
const foto =
document.getElementById('foto');

foto.addEventListener('change', function(){

const arquivo = this.files[0];

if(arquivo){

const leitor = new FileReader();

leitor.onload = function(e){

const preview =
document.getElementById('preview');

preview.src = e.target.result;
preview.style.display = 'block';

}

leitor.readAsDataURL(arquivo);

}

});

/* SALVAR */

function salvarRoupa(){

const nome =
document.getElementById('nome').value;

const categoria =
document.getElementById('categoria').value;

const cor =
document.getElementById('cor').value;

const arquivo =
document.getElementById('foto').files[0];

if(nome === '' || cor === ''){

alert('Preencha nome e cor');
return;

}

if(arquivo){

const leitor = new FileReader();

leitor.onload = function(e){

adicionarRoupa(e.target.result);

}

leitor.readAsDataURL(arquivo);

}else{

adicionarRoupa('');

}

}

/* ADICIONAR */

function adicionarRoupa(foto){

const roupa = {

nome:
document.getElementById('nome').value,

categoria:
document.getElementById('categoria').value,

cor:
document.getElementById('cor').value,

foto:foto

};

roupas.push(roupa);

localStorage.setItem(
'roupas',
JSON.stringify(roupas)
);

alert('Roupa salva!');

limparCampos();

abrirTela('closet');

}

/* LIMPAR */

function limparCampos(){

nome.value = '';
cor.value = '';
foto.value = '';

preview.style.display = 'none';

}


/* MOSTRAR */

function mostrarRoupas(){

const lista =
document.getElementById('lista');

lista.innerHTML = '';

roupas.forEach(r=>{

lista.innerHTML += `

<div class="card">

${r.foto ?
`<img src="${r.foto}">`
:
`<div class="sem-foto">📸</div>`
}

<h3>${r.nome}</h3>

<p>${r.categoria}</p>

<p>${r.cor}</p>

</div>

`;

});

}

/* LOOK */

function gerarLook(){

const resultado =
document.getElementById('lookResultado');

if(roupas.length === 0){

resultado.innerHTML =
'Nenhuma roupa salva';

return;

}

const r =
roupas[Math.floor(Math.random()*roupas.length)];

resultado.innerHTML = `

<div class="card">

${r.foto ?
`<img src="${r.foto}">`
:
`<div class="sem-foto">📸</div>`
}

<h3>${r.nome}</h3>

<p>${r.categoria}</p>

<p>${r.cor}</p>

</div>

`;

}

/* SERVICE WORKER */

if('serviceWorker' in navigator){

navigator.serviceWorker
.register('service-worker.js');

}