let roupas = JSON.parse(localStorage.getItem("roupas")) || [];

function salvar(){
localStorage.setItem("roupas", JSON.stringify(roupas));
}

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

// CRIA UM LEITOR DE FOTO
let reader = new FileReader();

reader.onload = function(e){

// SALVA NO FIREBASE
db.collection("roupas").add({
nome: nome,
categoria: categoria,
cor: cor,
foto: e.target.result // FOTO AQUI 📸
});

alert("Roupa salva com foto!");
}

// SE TIVER FOTO
if(file){
reader.readAsDataURL(file);
}else{
// SEM FOTO
db.collection("roupas").add({nome,categoria,cor});
alert("Roupa salva!");
}

}

// VER CLOSET
function ver(){

let lista = document.getElementById("lista");

db.collection("roupas").get().then((dados)=>{

lista.innerHTML = "";

dados.forEach((doc)=>{
let r = doc.data();

lista.innerHTML += `
<div style="background:#fff0f6; padding:10px; margin:10px; border-radius:10px;">
<b>${r.nome}</b><br>
${r.categoria} - ${r.cor}

${r.foto ? `<img src="${r.foto}" style="width:100%; border-radius:10px;">` : ""}

</div>
`;

});

});
}

// GERAR LOOK
function gerarLook(){

if(roupas.length==0){
document.getElementById("lookResultado").innerHTML="Adicione roupas!";
return;
}

let r = roupas[Math.floor(Math.random()*roupas.length)];

document.getElementById("lookResultado").innerHTML = `
<div class="item">
✨ ${r.nome}<br>
${r.categoria}
</div>
`;
}