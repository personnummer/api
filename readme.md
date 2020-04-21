# personnummer-api

> work in progress

Serverless API to parse and validate and parse a Swedish personal identity numbers. Built with [OpenFaaS](https://www.openfaas.com/).

## Docs

```json
POST /parse
{
  "ssn": "198507099805"
}

{
  "data": {
    "valid": true,
    "age": 34,
    "female": true,
    "male": false,
    "coordination_number": false,
    "century": "19",
    "full_year": "1985",
    "year": "85",
    "month": "07",
    "day": "09",
    "sep": "-",
    "num": "980",
    "check": "5",
    "format_long": "198507099805",
    "format_short": "850709-9805"
  }
}
```

```json
POST /validate
{
  "ssn": "198507099805"
}

{
  "data": {
    "valid": true
  }
}
```

## License

MIT
