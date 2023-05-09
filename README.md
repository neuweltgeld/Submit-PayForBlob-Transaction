# Submit PayForBlob Transaction
This tool allows you to send a PayForBlob transaction in Celestia using the UI.

If you want to use the tool on your own node, you should configure ```Apache2``` and ```Flask``` settings. You can use the repository at [this link](https://github.com/neuweltgeld/ubuntu-python-server) for the guide.

The project folder may look like the following:

```
pfb_project/
├── static/
│   ├── logo.png
│   └── style.css
│   └── script.js
├── templates/
│   └── index.html
└── app.py
```



## Details

When running a Celestia node, you will need to use the following flags when starting your node to submit a PFB:

the ```--core.ip string``` flag, to allow you to submit transactions to your node
the ```--gateway```, ```--gateway.addr string```, and ```--gateway.port string```, to open the gateway and allow anyone to use your IP as an endpoint to submit PFBs

### What does the UI do?

To send a PFB Transaction, Celestia uses the following command,

```
curl -X POST -d '{"namespace_id": "0c204d39600fddd3",
  "data": "f1f20ca8007e910a3bf8b2e61da0f26bca07ef78717a6ea54165f5",
  "gas_limit": 80000, "fee": 2000}' http://localhost:26659/submit_pfb
```

It allows you to send Namespace ID and Data values among the UI inputs via your node (localhost) without using a terminal. 
