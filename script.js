let roupas = JSON.parse(localStorage.getItem("roupas")) || [];

function salvar(){
localStorage.setItem("roupas", JSON.stringify(roupas));
}

function adicionarRoupa(){

let nome = prompt("Digite nome da roupa:");

if(nome){
roupas.push(nome);
salvar();
resultado.innerHTML = "✅ Roupa adicionada!";
}

}

function verCloset(){

if(roupas.length == 0){
resultado.innerHTML = "👚 Closet vazio!";
return;
}

resultado.innerHTML = roupas.map(r => "👗 " + r).join("<br>");
}

function montarLook(){

if(roupas.length == 0){
resultado.innerHTML = "Adicione roupas primeiro!";
return;
}

let sorteio = roupas[Math.floor(Math.random()*roupas.length)];

resultado.innerHTML = "✨ Look do dia:<br><br>👗 " + sorteio;
}