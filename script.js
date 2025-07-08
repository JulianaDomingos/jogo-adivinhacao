let numerosJogador1 = [];
let tentativasFeitas = 0;
const maxTentativas = 4;

function confirmarNumeros() {
  numerosJogador1 = [
    parseInt(document.getElementById("n0").value),
    parseInt(document.getElementById("n1").value),
    parseInt(document.getElementById("n2").value),
    parseInt(document.getElementById("n3").value)
  ];

  if (numerosJogador1.some(isNaN)) {
    alert("Digite todos os 4 números corretamente!");
    return;
  }

  // Mostra fase 2 e o gabarito
  document.getElementById("fase1").classList.add("d-none");
  document.getElementById("fase2").classList.remove("d-none");
  document.getElementById("gabarito").innerText = `Números escolhidos: [ ${numerosJogador1.join(" ")} ]`;
}

function verificarTentativa() {
  if (tentativasFeitas >= maxTentativas) return;

  let tentativa = [
    parseInt(document.getElementById("t0").value),
    parseInt(document.getElementById("t1").value),
    parseInt(document.getElementById("t2").value),
    parseInt(document.getElementById("t3").value)
  ];

  if (tentativa.some(isNaN)) {
    alert("Preencha todos os campos!");
    return;
  }

  // Cópias para manipulação
  let original = [...numerosJogador1];
  let tentativaCopy = [...tentativa];

  // Para definir a cor de cada número da tentativa no histórico
  // Inicialmente todos errados (vermelho)
  let cores = ["text-danger", "text-danger", "text-danger", "text-danger"];

  let posicaoCorreta = 0;
  let acertos = 0;

  // Primeiro: verificar posições corretas (verde)
  for (let i = 0; i < 4; i++) {
    if (tentativa[i] === original[i]) {
      posicaoCorreta++;
      original[i] = null;
      tentativaCopy[i] = null;
      cores[i] = "text-success"; // verde
    }
  }

  // Depois: verificar números certos em posições erradas (amarelo)
  for (let i = 0; i < 4; i++) {
    if (tentativaCopy[i] !== null) {
      let index = original.indexOf(tentativaCopy[i]);
      if (index !== -1) {
        acertos++;
        original[index] = null;
        cores[i] = "text-warning"; // amarelo
      }
    }
  }

  tentativasFeitas++;

  const resultadoDiv = document.getElementById("resultado");
  const historicoDiv = document.getElementById("historico");

  // Montar texto colorido da tentativa
  let tentativaColorida = tentativa.map((num, i) =>
    `<span class="${cores[i]} fw-bold me-1">${num}</span>`
  ).join("");

  // Atualiza histórico com cores
  const tentativaTexto = `<div>Rodada ${tentativasFeitas}: [${tentativaColorida}] → ${acertos} fora de posição | ${posicaoCorreta} na posição correta</div>`;
  historicoDiv.innerHTML += tentativaTexto;

  // Verifica vitória
  if (posicaoCorreta === 4) {
    resultadoDiv.innerHTML = `
      <p>Rodada ${tentativasFeitas} de ${maxTentativas}</p>
      <p class="text-success fw-bold fs-4">🎉 Parabéns! Você acertou todos os números!</p>
    `;
    mostrarReiniciar();
    tentativasFeitas = maxTentativas;
    return;
  }

  // Exibe resultado normal
  resultadoDiv.innerHTML = `
    <p>Rodada ${tentativasFeitas} de ${maxTentativas}</p>
    <p>Acertos (fora de posição): ${acertos} | Posições Corretas: ${posicaoCorreta}</p>
  `;

  // Verifica fim de jogo por tentativas
  if (tentativasFeitas >= maxTentativas) {
    resultadoDiv.innerHTML += `
      <p class="text-danger mt-3">🎮 Fim de jogo!</p>
    `;
    mostrarReiniciar();
  }
}

function mostrarReiniciar() {
  document.getElementById("btn-reiniciar").classList.remove("d-none");
}

function reiniciarJogo() {
  numerosJogador1 = [];
  tentativasFeitas = 0;

  for (let i = 0; i < 4; i++) {
    document.getElementById("n" + i).value = "";
    document.getElementById("t" + i).value = "";
  }

  document.getElementById("fase1").classList.remove("d-none");
  document.getElementById("fase2").classList.add("d-none");
  document.getElementById("resultado").innerHTML = "";
  document.getElementById("historico").innerHTML = "";
  document.getElementById("gabarito").innerHTML = "";
  document.getElementById("btn-reiniciar").classList.add("d-none");
}
