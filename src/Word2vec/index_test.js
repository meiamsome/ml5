import * as tf from '@tensorflow/tfjs';

import Word2Vec from './index';

const URL = 'https://raw.githubusercontent.com/ml5js/ml5-examples/master/p5js/Word2Vec/data/wordvecs1000.json';

describe('word2vec', () => {
  let word2vec;
  let numTensorsBefore;
  beforeAll((done) => {
    word2vec = Word2Vec(URL, done);
  });

  beforeEach(() => {
    numTensorsBefore = tf.memory().numTensors;
  });

  afterEach(() => {
    let numTensorsAfter = tf.memory().numTensors;
    if(numTensorsBefore !== numTensorsAfter) {
      throw new Error('Leaking Tensors');
    }
  });

  it('creates a new instance', () => {
    expect(word2vec).toEqual(jasmine.objectContaining({
      ready: true,
      modelSize: 1,
    }));
  });

  describe('getRandomWord', () => {
    it('returns a word', () => {
      let word = word2vec.getRandomWord();
      expect(typeof word).toEqual('string');
    });
  });

  describe('nearest', () => {
    it('returns a sorted array of nearest words', () => {
      for(let i = 0; i < 100; i++) {
        let word = word2vec.getRandomWord();
        let nearest = word2vec.nearest(word);
        let currentDistance = 0;
        for(let { word, distance: nextDistance } of nearest) {
          expect(typeof word).toEqual('string');
          expect(nextDistance).toBeGreaterThan(currentDistance);
          currentDistance = nextDistance;
        }
      }
    });

    it('returns a list of the right length', () => {
      for(let i = 0; i < 100; i++) {
        let word = word2vec.getRandomWord();
        let nearest = word2vec.nearest(word, i);
        expect(nearest.length).toEqual(i);
      }
    });
  });

  describe('sum', () => {
    it('', () => {
      let word1 = word2vec.getRandomWord();
      let word2 = word2vec.getRandomWord();
      let sum = word2vec.subtract([word1, word2]);
    })
  })

  describe('average', () => {
    it('returns a value equidistant to the inputs', (done) => {
      let word1 = word2vec.getRandomWord();
      let word2 = word2vec.getRandomWord();
      let average = word2vec.average([word1, word2]);
      console.log(average);
      setTimeout(done, 1000);
    });
  });
});
