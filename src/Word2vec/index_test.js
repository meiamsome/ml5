import Word2Vec from './index';

const URL = 'https://raw.githubusercontent.com/ml5js/ml5-examples/master/p5js/Word2Vec/data/wordvecs1000.json';

describe('initialize word2vec', () => {
  let word2vec;
  beforeAll((done) => {
    word2vec = Word2Vec(URL, done);
  });

  it('creates a new instance', () => {
    expect(word2vec).toEqual(jasmine.objectContaining({
      ready: true,
      modelSize: 1,
    }));
  });
});
