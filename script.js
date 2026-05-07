function openScreen(id){

 document.querySelectorAll('.screen').forEach(screen=>{
  screen.classList.remove('active');
 });

 document.getElementById(id).classList.add('active');

 if(id === 'closet'){
  carregarRoupas();
 }
}

// PREVIEW FOTO
const fotoInput = document.getElementById('foto');

fotoInput.addEventListener('change',()=>{

 const file = fotoInput.files[0];

 if(file){
  const reader = new FileReader();

  reader.onload = function(e){
   const preview = document.getElementById('preview');
   preview.src = e.target.result;
   preview.style.display = 'block';
  }

  reader.readAsDataURL(file);
 }

});

// ADICIONAR
function adicionar(){

 const nome = document.getElementById('nome').value;
 const categoria = document.getElementById('categoria').value;
 const cor = document.getElementById('cor').value;
 const file = document.getElementById('foto').files[0];

 if(!nome || !cor || !file){
  alert('Preencha tudo e escolha uma foto!');
  return;
 }

 const reader = new FileReader();

 reader.onload = function(e){

  db.collection('roupas').add({
   nome:nome,
   categoria:categoria,
   cor:cor,
   foto:e.target.result
  }).then(()=>{

   alert('Roupa salva com sucesso! 💖');

   document.getElementById('nome').value='';
   document.getElementById('cor').value='';
   document.getElementById('foto').value='';
   document.getElementById('preview').style.display='none';

   openScreen('closet');

  });
 }

 reader.readAsDataURL(file);
}

// CARREGAR
function carregarRoupas(){

 const lista = document.getElementById('lista');

 lista.innerHTML = 'Carregando...';

 db.collection('roupas').get().then((dados)=>{

  lista.innerHTML = '';

  if(dados.empty){
   lista.innerHTML = 'Nenhuma roupa cadastrada 😢';
}
 });
}
 