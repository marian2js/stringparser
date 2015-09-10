var expect = require('expect.js');
var parser = require('../parser.js');

describe('parser function', function () {

  it('should return the same string if there are no replaceable keys', function () {
    var str = 'Test String';
    var result = parser(str);
    expect(result).to.be(str);
  });

  it('should replace keys for their corresponding object values', function () {
    var str = 'This is a string with {{ ab49fd20.key_1 }}, including {{ 9822df87.another_key }}';
    var expectedStr = 'This is a string with some data, including big data';
    var obj = {
      ab49fd20: {
        key_1: 'some data'
      },
      '9822df87': {
        another_key: 'big data',
        yet_another_key: 'small data'
      }
    };
    var result = parser(str, obj);
    expect(result).to.be(expectedStr);
  });

  it('should return <nothing> when a key does not exist in the object values', function () {
    var str = 'This is a string with {{ ab49fd20.key_1 }}, including {{ 9822df87.another_key }} and also {{ ab49fd20.key_2 }}.';
    var expectedStr = 'This is a string with some data, including big data and also <nothing>.';
    var obj = {
      'ab49fd20': {
        key_1: 'some data'
      },
      '9822df87': {
        another_key: 'big data',
        yet_another_key: 'small data'
      }
    };
    var result = parser(str, obj);
    expect(result).to.be(expectedStr);
  });

  it('should replace multilevels keys for their corresponding object values', function () {
    var str = 'String with {{ dad12cc9.key1.key2.key3.key4.key5 }} key.';
    var expectedStr = 'String with multilevel key.';
    var obj = {
      dad12cc9: {
        key1: {
          key2: {
            key3: {
              key4: {
                key5: 'multilevel'
              }
            }
          }
        }
      }
    };
    var result = parser(str, obj);
    expect(result).to.be(expectedStr);
  });

});
