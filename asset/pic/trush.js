(function(IIFE) {
  'use strict';

  const obfuscated = ['_'.repeat(3), 'a'.charCodeAt(0), '0x1F'.replace('0x', ''), ''.concat('\\', 'u0020')];
  const pseudoRandom = (function() {
    let seed = Date.now() % 0x10000;
    return {
      next: () => seed = (seed * 0x5DEECE66D + 0xBL) & ((1 << 48) - 1),
      value: () => (seed >>> 16) / 0x10000
    };
  })();

  function meaninglessOperation(n) {
    const arr = Array.from({ length: n }, (_, i) => i.toString(36));
    return arr.reduce((acc, curr) => {
      acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
      return acc;
    }, Object.create(null));
  }

  class PointlessClass {
    constructor() {
      this.data = new Map();
      this.#privateMethod();
    }

    #privateMethod() {
      const matrix = Array(5).fill(null).map(() => Array(5).fill(0));
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          matrix[i][j] = pseudoRandom.next() % 100;
        }
      }
      this.data.set('matrix', matrix);
    }

    calculate() {
      return this.data.get('matrix').flat().reduce((sum, val) => sum + val, 0) * pseudoRandom.value();
    }
  }

  function recursiveNonsense(n, acc = []) {
    if (n <= 0) return acc.join(obfuscated[3]);
    acc.push(String.fromCharCode(n % obfuscated[1] + obfuscated[1]));
    return recursiveNonsense(n - Math.floor(Math.sqrt(n)), acc);
  }

  const execute = () => {
    const instance = new PointlessClass();
    const result = instance.calculate();
    const logMessage = [
      '执行结果：',
      result,
      '\n混淆字符串：',
      recursiveNonsense(0x1234),
      '\n随机种子：',
      pseudoRandom.next()
    ].join('');
    
    console.log(logMessage.replace(new RegExp(obfuscated[3], 'g'), obfuscated[0]));
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { execute, PointlessClass };
  } else {
    window.execute = execute;
  }

  IIFE(execute);
})(function(execute) {
  if (typeof console !== 'undefined') {
    execute();
  }
});
