function ir(tela){
   alert('Roupa salva!');
   ir('closet');
  };

 

 if(file){
  reader.readAsDataURL(file);
 }else{

  db.collection('roupas').add({
   nome:nome,
   categoria:categoria,
   cor:cor
  }).then(()=>{
   alert('Roupa salva!');
   ir('closet');
  });
 }


// VER ROUPAS
function ver(){

 let lista = document.getElementById('lista');

 db.collection('roupas').get().then((dados)=>{

  lista.innerHTML = '';

  if(dados.empty){
   lista.innerHTML = '<p>Seu closet está vazio 😢</p>';
   return;
  }

  dados.forEach((doc)=>{

   let r = doc.data();

   lista.innerHTML += `
   <div class="card">
   <h3>${r.nome}</h3>
   <p>${r.categoria} • ${r.cor}</p>

   ${r.foto ? `<img src="${r.foto}">` : ''}

   </div>
   `;

  });

 });
}

// LOOK
function gerarLook(){

 let resultado = document.getElementById('lookResultado');

 db.collection('roupas').get().then((dados)=>{

  let roupas = [];

  dados.forEach((doc)=>{
   roupas.push(doc.data());
  });

  if(roupas.length == 0){
   resultado.innerHTML = 'Adicione roupas primeiro!';
   return;
  }

  let r = roupas[Math.floor(Math.random()*roupas.length)];

  resultado.innerHTML = `
  <div class="card">
  <h3>✨ Seu look</h3>
  <p>${r.nome}</p>
  <p>${r.categoria}</p>

  ${r.foto ? `<img src="${r.foto}">` : ''}

  </div>
  `;

 });
}