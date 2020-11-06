// function Calc(value = 0) {
//     if (!(this instanceof Calc)) {
//         return new Calc(value);
//     }
//     const that = this
//     var _value = value;
//     this.op = {
//         add: function (value) {
//             _value += value
//             return that
//         },
//         sub: function (value) {
//             _value -= value
//             return that
//         }
//     }
//     // this.add = function (value) {
//     //     _value += value
//     //     return this
//     // }
//     // this.sub = function (value) {
//     //     _value -= value
//     //     return this
//     // }
//     this.partial = function () {
//         console.log(_value)
//         return this
//     }
//     this.total = function () {
//         return _value
//     }
// }
// // var c1 = Calc(15);
// // c1.op.add(0).partial().op.sub(5)
// // var total = c1.total()
// // console.log(total)
// // console.log(c1)
// const calculadora = Calc(0)
// let num = 3;
// let calcular = calculadora.op.add(num).op.sub(2).total()
// console.log(calcular)

// const funcaodaalegria = function () {
//     console.log('sera que consigo transformar em string?')
// }
// // funcaodaalegria()
// // console.log(funcaodaalegria.toString())
// // var funcstr = funcaodaalegria.toString()
// // console.log(funcstr)
// // var olhacomofaz = Function('return ' + funcstr)()
// // olhacomofaz()
// console.log(funcaodaalegria.toString())
const obj1 = {
    name: 'fulano',
    idade: 20,
    funcao: () => {
        return 'Olha a função aqui!';
    },
};
​
const objectStringfy = (obj = {}) => {
    // crio um objeto vazio
    var objModel = {}
    // crio uma chave dentro desse objeto com um array para guardar quais chaves são funções
    objModel.functionKeys = []
    // essa função copia todo conteúdo de um objeto para outro
    Object.assign(objModel, obj)
    // faço um loop em todas as chaves do objeto
    Object.keys(objModel).forEach(key => {
        // testo se o valor dessa chave é uma função
        if (typeof objModel[key] === 'function') {
            // se for uma função transformo em string
            objModel[key] = objModel[key].toString()
            // aqui eu guardo os a informação de quais chaves eram funções em um Array
            // dessa forma eu sei que posteriormente eu devo converter em função
            objModel.functionKeys.push(key)
        }
    })
    return JSON.stringify(objModel)
}
​
const objectParser = (stringObj = '') => {
    // crio um objeto vazio
    var objModel = {}
    // Converto a string (dados) em um objeto novamente
    var obj = JSON.parse(stringObj)
​
    // pego a lista de chaves que devo converter em funções novamente
    var list = obj.functionKeys || []
​
    // faço um loop em todas as chaves do objeto
    Object.keys(obj).forEach(key => {
        // se a chave não for aquela key que era aonde estava guardado o que era inicialmente uma função
        // Lembra? objeto original não havia ela
        if (key !== 'functionKeys') {
            // Testo se existe essa chave na lista
            if (list.indexOf(key) >= 0) {
                // transformo em função novamente
                objModel[key] = Function('return ' + obj[key])()
            } else {
                // se não está na lista apenas copio a chave e o valor para o novo objeto
                objModel[key] = obj[key]
            }
        }
    })
    return objModel
}
​
console.log(objectStringfy(obj1))
​
const strObj = objectStringfy(obj1)
​
var obj2 = objectParser(strObj)
​
console.log(obj2)
​
console.log(obj2.funcao())