// TROCAR TELA
function ir(tela){
document.querySelectorAll(".tela").forEach(t=>{
t.classList.remove("ativa");
});
document.getElementById(tela).classList.add("ativa");

if(tela=="closet") ver();
}

// ADICIONAR ROUPA
function adicionar(){

let nome = document.getElementById("nome").value;
let categoria = document.getElementById("categoria").value;
let cor = document.getElementById("cor").value;
let file = document.getElementById("foto").files[0];

if(!nome || !cor){
alert("Preencha tudo!");
return;
}

let reader = new FileReader();

reader.onload = function(e){

db.collection("roupas").add({
nome,
categoria,
cor,
foto: e.target.result
}).then(()=>{
alert("Salvo com sucesso!");
ir("home");
});

}

if(file){
reader.readAsDataURL(file);
}else{
db.collection("roupas").add({nome,categoria,cor}).then(()=>{
alert("Salvo!");
ir("home");
});
}
}

// VER ROUPAS
function ver(){

let lista = document.getElementById("lista");

db.collection("roupas").get().then((dados)=>{

lista.innerHTML = "";

if(dados.empty){
lista.innerHTML = "Closet vazio 😢";
return;
}

dados.forEach((doc)=>{
let r = doc.data();

lista.innerHTML += `
<div class="card">
<b>${r.nome}</b>
<p>${r.categoria} - ${r.cor}</p>

${r.foto ? `<img src="${r.foto}">` : ""}

</div>
`;
});

});
}

// GERAR LOOK (corrigido)
function gerarLook(){

let resultado = document.getElementById("lookResultado");

db.collection("roupas").get().then((dados)=>{

if(dados.empty){
resultado.innerHTML = "Adicione roupas!";
return;
}

let roupas = [];

dados.forEach(doc=>{
roupas.push(doc.data());
});

let r = roupas[Math.floor(Math.random()*roupas.length)];

resultado.innerHTML = `
<div class="card">
<h3>✨ Look do dia</h3>
<b>${r.nome}</b>
<p>${r.categoria}</p>
</div>
`;

});
}