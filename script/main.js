const screen = document.getElementById('Screen');
const ctx = screen.getContext('2d');
const grid = 16;
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
const main = {
  resetaStatusInicialDoJogador1:()=>{
    main.jogador1 = {x:160,y:160,dx:grid,dy:0,com:[],comMax:4};
  },
  resetaStatusInicialDoJogador2:()=>{
    main.jogador2 = {x:160,y:160,dx:grid,dy:0,com:[],comMax:4};
  },
  jogador1:{x:160,y:160,dx:grid,dy:0,com:[],comMax:4},
  jogador2: {x:160,y:160,dx:grid,dy:0,com:[],comMax:4},
  alvo: {x:320,y:320}
};
let count = 0,
    vel = 12;
function refresh() {
  requestAnimationFrame(refresh)
  if (++count < vel){
    return;
  };
  count = 0;
  main.jogador1.x += main.jogador1.dx;
  main.jogador1.y += main.jogador1.dy;
  const limitesDoJogador1 = {
    ladoEsquedo:main.jogador1.x < 0,
    ladoDireito:main.jogador1.x >= screen.width -1,
    ladoSuperior:main.jogador1.y < 0,
    ladoInferior:main.jogador1.y >= screen.height
  };
  main.jogador2.x += main.jogador2.dx;
  main.jogador2.y += main.jogador2.dy;
  const limitesDoJogador2 = {
    ladoEsquedo:main.jogador2.x < 0,
    ladoDireito:main.jogador2.x >= screen.width,
    ladoSuperior:main.jogador2.y < 0,
    ladoInferior:main.jogador2.y >= screen.height
  };
  const chamadaParaOJogador ={
  chamadaEsquerda:(jogador)=>{
    switch(jogador){
      case "jogador1":
        main.jogador1.x = screen.width - grid;
      break;
      case "jogador2":
        main.jogador2.x = screen.width - grid;
      break;
    };
  },
  chamadaDireita:(jogador)=>{
    switch(jogador){
      case "jogador1":
        main.jogador1.x = 0;
      break;
      case "jogador2":
        main.jogador2.x = 0;
      break;
    };
  },
  chamadaSuperior:(jogador)=>{
    switch(jogador){
      case "jogador1":
        main.jogador1.y= screen.height - grid;
      break;
      case "jogador2":
        main.jogador2.y= screen.height - grid;
      break;
    };
  },
  chamadaInferior:(jogador)=>{
    switch(jogador){
      case "jogador1":
        main.jogador1.y= 0;
      break;
      case "jogador2":
        main.jogador2.y= 0;
      break;
    };
  }
  };
  switch(true){
    case limitesDoJogador1['ladoDireito']:
        chamadaParaOJogador.chamadaDireita('jogador1');
    break;
    case limitesDoJogador1['ladoEsquedo']:
      chamadaParaOJogador.chamadaEsquerda('jogador1');
    break;
    case limitesDoJogador1['ladoSuperior']:
      chamadaParaOJogador.chamadaSuperior('jogador1');
    break;
    case limitesDoJogador1['ladoInferior']:
      chamadaParaOJogador.chamadaInferior('jogador1');
    break;  
};
main.jogador1.com.unshift({x1:main.jogador1.x,y1:main.jogador1.y})
if (main.jogador1.com.length > main.jogador1.comMax) {
  main.jogador1.com.pop();
};
  switch(true){
    case limitesDoJogador2['ladoDireito']:
        chamadaParaOJogador.chamadaDireita("jogador2");
    break;
    case limitesDoJogador2['ladoEsquedo']:
      chamadaParaOJogador.chamadaEsquerda("jogador2");
    break;
    case limitesDoJogador2['ladoSuperior']:
      chamadaParaOJogador.chamadaSuperior("jogador2");
    break;
    case limitesDoJogador2['ladoInferior']:
      chamadaParaOJogador.chamadaInferior("jogador2");
    break;
}
  main.jogador2.com.unshift({x2:main.jogador2.x,y2:main.jogador2.y})
  if (main.jogador2.com.length > main.jogador2.comMax) {
	main.jogador2.com.pop();
  };
  ctx.clearRect(0,0,screen.width,screen.height);
  ctx.fillStyle = 'red';
  ctx.fillRect(main.alvo.x,main.alvo.y,grid,grid);
  ctx.fillStyle = 'darkblue';
  main.jogador1.com.forEach(function(com, index){
    ctx.fillRect(com.x1,com.y1,grid, grid);
      if (com.x1 == main.alvo.x && com.y1 == main.alvo.y) {
        vel -= 0.5;
        main.jogador1.comMax++;
        main.alvo.x = main.alvo.y = getRandomInt(0, 25)*grid;
      };
      for(let i = index + 1; i < main.jogador1.com.length; i++){
        if (com.x1 == main.jogador1.com[i].x1 && com.y1 == main.jogador1.com[i].y1) {
          main.resetaStatusInicialDoJogador1();
        };
      };
      for(let i = index; i < main.jogador2.com.length; i++){
        if(com.x1 == main.jogador2.com[i].x2 && com.y1 == main.jogador2.com[i].y2){
            // console.log(vel)
            vel += 0.7;
            main.resetaStatusInicialDoJogador1();
        };
      };
  });
  ctx.fillStyle = 'darkgreen';
  main.jogador2.com.forEach(function(com, index){
    ctx.fillRect(com.x2,com.y2, grid, grid);
  	if (com.x2 == main.alvo.x && com.y2 == main.alvo.y) {
      // console.log(vel)
      vel -= 0.5;
  		main.jogador2.comMax++;
  		main.alvo.x = main.alvo.y = getRandomInt(0, 25)*grid;
  	};
  	for(let i = index + 1; i < main.jogador2.com.length; i++){
  		if (com.x2 == main.jogador2.com[i].x2 && com.y2 == main.jogador2.com[i].y2) {
  			main.resetaStatusInicialDoJogador2();
  		};
    };
    for(let i = index; i < main.jogador1.com.length; i++){
      if(com.x2 == main.jogador1.com[i].x1 && com.y2 == main.jogador1.com[i].y1){
        // console.log(vel)
        vel += 7;
        main.resetaStatusInicialDoJogador2();
      };
    };
  });
};

//Evento de Movimentação em games com contexto 2d
document.addEventListener('keydown', function(e) {
 // Tecla 'A', Esquerda
  if (e.which === 65 && main.jogador1.dx === 0) {
    main.jogador1.dx = -grid;
    main.jogador1.dy = 0;
  }
 // Tecla 'W', Cima
  else if (e.which === 87 && main.jogador1.dy === 0) {
    main.jogador1.dy = -grid;
    main.jogador1.dx = 0;
  }
 // Tecla 'D', Direita
  else if (e.which === 68 && main.jogador1.dx === 0) {
    main.jogador1.dx = grid;
    main.jogador1.dy = 0;
  }
 // Tecla 'S', Baixo
  else if (e.which === 83 && main.jogador1.dy === 0) {
    main.jogador1.dy = grid;
    main.jogador1.dx = 0;
  }
 // Tecla 'left arrow', Esquerda
  if (e.which === 37 && main.jogador2.dx === 0) {
    main.jogador2.dx = -grid;
    main.jogador2.dy = 0;
  }
 // Tecla 'up arrow', Cima
  else if (e.which === 38 && main.jogador2.dy === 0) {
    main.jogador2.dy = -grid;
    main.jogador2.dx = 0;
  }
 // Tecla 'right arrow', Direita
  else if (e.which === 39 && main.jogador2.dx === 0) {
    main.jogador2.dx = grid;
    main.jogador2.dy = 0;
  }
 // Tecla 'down arrow', Baixo
  else if (e.which === 40 && main.jogador2.dy === 0) {
    main.jogador2.dy = grid;
    main.jogador2.dx = 0;
  }
})


requestAnimationFrame(refresh)
