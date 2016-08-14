# node-sanitizeuri

## Install

```
npm install sanitizeuri --save
```

## Usage

```javascript
var sanitizeUri = require('sanitizeuri');

sanitizeUri([undefined, '///x///', '   / / y / /', undefined, 'z/', '///']);

// -> /x/y/z
```

## API

`sanitizeUri ( string|[string], startsSlash = true, endsSlash = false)`

## License

MIT
