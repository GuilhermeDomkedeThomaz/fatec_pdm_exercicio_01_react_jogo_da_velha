class Quadrado extends React.Component {

  render() {
    return /*#__PURE__*/(
      React.createElement("button", { className: "quadrado",
        onClick:
        () => {
          this.props.onClick();
        } },


      this.props.value));



  }}


class Tabuleiro extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quadrados: Array(9).fill(null),
      xIsNext: true,
      array: Array.from(Array(9).keys()) };

  }

  renderizarQuadrado(i) {
    return /*#__PURE__*/(
      React.createElement(Quadrado, {
        value:
        this.state.quadrados[i],

        onClick:
        () => this.handleClick(i) }));



  }

  render() {
    const array = this.state.array.slice();
    const vencedor =
    calculateWinner(this.state.quadrados);
    let status;

    if (array.length === 0) {
      status = 'Empatou';
    } else if (vencedor) {
      status = 'Vencedor: ' + vencedor;
    } else {
      status = 'Jogador: ' + (
      this.state.xIsNext ? 'X' : 'O');
    }

    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { className: "status" }, " ", status, " "), /*#__PURE__*/
      React.createElement("div", { className: "board-row" },
      this.renderizarQuadrado(0),
      this.renderizarQuadrado(1),
      this.renderizarQuadrado(2)), /*#__PURE__*/

      React.createElement("div", { className: "board-row" },
      this.renderizarQuadrado(3),
      this.renderizarQuadrado(4),
      this.renderizarQuadrado(5)), /*#__PURE__*/

      React.createElement("div", { className: "board-row" },
      this.renderizarQuadrado(6),
      this.renderizarQuadrado(7),
      this.renderizarQuadrado(8)), /*#__PURE__*/

      React.createElement("button", {
        onClick:
        () => {
          this.clean();
        } }, "Limpar Jogo"), /*#__PURE__*/


      React.createElement("button", {
        onClick:
        () => {
          this.random();
        } }, "Jogada Aleat\xF3ria")));




  }

  handleClick(i) {
    const quadrados = this.state.quadrados.slice();
    const array = this.state.array.slice();

    if (calculateWinner(quadrados) ||
    array.length === 0) {
      alert('Jogo já acabou');
      return;
    }

    if (quadrados[i]) {
      alert('Quadrado ocupado!');
      return;
    }

    quadrados[i] = this.state.xIsNext ? 'X' : '0';
    array.splice(array.indexOf(i), 1);

    this.setState(
    {
      quadrados: quadrados,
      xIsNext: !this.state.xIsNext,
      array: array });


  }

  clean() {
    const quadrados = this.state.quadrados.slice();

    for (let i = 0; i < 9; i++) {
      quadrados[i] = null;
    }

    this.setState(
    {
      quadrados: quadrados,
      xIsNext: true,
      array: Array.from(Array(9).keys()) });


  }

  random() {
    const quadrados = this.state.quadrados.slice();
    const array = this.state.array.slice();

    if (calculateWinner(quadrados) ||
    array.length === 0) {
      alert('Jogo já acabou');
      return;
    }

    var i =
    array[Math.floor(Math.random() * array.length)];

    quadrados[i] = this.state.xIsNext ? 'X' : '0';
    array.splice(array.indexOf(i), 1);

    this.setState(
    {
      quadrados: quadrados,
      xIsNext: !this.state.xIsNext,
      array: array });


  }}


class Jogo extends React.Component {

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "game" }, /*#__PURE__*/
      React.createElement("div", { className: "game-board" }, /*#__PURE__*/
      React.createElement(Tabuleiro, {
        quadrados:
        Array(9).fill().map((value, pos) => pos) }))));





  }}


ReactDOM.render( /*#__PURE__*/
React.createElement(Jogo, null),
document.getElementById("root"));


function calculateWinner(squares) {
  const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]];


  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] &&
    squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}